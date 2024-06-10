import type { OperationContext, Exchange } from "@urql/core";
import { pipe, map } from "wonka";
import { GadgetConnection, AuthenticationMode, GadgetTransaction, InternalModelManager, ActionFunctionMetadata, GlobalActionFunction } from "@gadgetinc/api-client-core";
import type { ClientOptions as ApiClientOptions, AnyClient } from '@gadgetinc/api-client-core';
import { enqueueActionRunner, assert, BackgroundActionHandle, type EnqueueBackgroundActionOptions, type AnyActionFunction, type BackgroundActionResultData } from '@gadgetinc/api-client-core';

import type { DocumentNode } from 'graphql';
import type {
  Scalars,
        Scalars,
} from "./types";

import { SessionManager } from "./models/Session.js";
import { ShopifyGdprRequestManager } from "./models/ShopifyGdprRequest.js";
import { ShopifyProductManager } from "./models/ShopifyProduct.js";
import { ShopifyShopManager } from "./models/ShopifyShop.js";
import { ShopifySyncManager } from "./models/ShopifySync.js";
import { ShopifyCollectionManager } from "./models/ShopifyCollection.js";
import { ShopifyProductVariantManager } from "./models/ShopifyProductVariant.js";
import { ShopifyCollectManager } from "./models/ShopifyCollect.js";
import { ShopifyProductImageManager } from "./models/ShopifyProductImage.js";
import { CurrentSessionManager } from "./models/CurrentSession.js";

import { globalActionRunner } from "@gadgetinc/api-client-core";

type InternalModelManagers = {
  session: InternalModelManager;
  shopifyGdprRequest: InternalModelManager;
  shopifyProduct: InternalModelManager;
  shopifyShop: InternalModelManager;
  shopifySync: InternalModelManager;
  shopifyCollection: InternalModelManager;
  shopifyProductVariant: InternalModelManager;
  shopifyCollect: InternalModelManager;
  shopifyProductImage: InternalModelManager;
};

type ClientOptions = Omit<ApiClientOptions, "environment"> & { environment?: string };
type AllOptionalVariables<T> = Partial<T> extends T ? object : never;
const productionEnv = "production";
const fallbackEnv = "development";
const $modelRelationships = Symbol.for("gadget/modelRelationships");

/**
 * Return the implicit environment
 * We specifically use the string `process.env.NODE_ENV` or similar so that bundlers like webpack or vite can string replace this value in built source codes with the user's desired value.
 * In browsers or other environments, `process` may be undefined, so we catch any errors and return undefined.
 */
const getImplicitEnv = () => {
  try {
    return process.env.GADGET_ENV;
  } catch (error) {
    return undefined;
  }
}

/**
 * Root object used for interacting with the "checkout-testing" API. `Client` has `query` and `mutation` functions for executing raw GraphQL queries and mutations, as well as `ModelManager` objects for manipulating models with a JavaScript API. Client also wraps a `connection`, which implements the transport layer if you need access to that.
 * */
export class Client implements AnyClient {
  connection: GadgetConnection;

  session: SessionManager;
  shopifyGdprRequest: ShopifyGdprRequestManager;
  shopifyProduct: ShopifyProductManager;
  shopifyShop: ShopifyShopManager;
  shopifySync: ShopifySyncManager;
  shopifyCollection: ShopifyCollectionManager;
  shopifyProductVariant: ShopifyProductVariantManager;
  shopifyCollect: ShopifyCollectManager;
  shopifyProductImage: ShopifyProductImageManager;
  currentSession: CurrentSessionManager;

  /**
  * Namespaced object for accessing models via the Gadget internal APIs, which provide lower level and higher privileged operations directly against the database. Useful for maintenance operations like migrations or correcting broken data, and for implementing the high level actions.
  *
  * Returns an object of model API identifiers to `InternalModelManager` objects.
  *
  * Example:
  * `api.internal.user.findOne(...)`
  */
  internal: InternalModelManagers;

  /**
   * The list of environments with a customized API root endpoint
   */
  apiRoots: Record<string, string> = {"development":"https://checkout-testing--development.gadget.app/","production":"https://checkout-testing.gadget.app/"};


  applicationId = "121673";
  [$modelRelationships] = {"session":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyGdprRequest":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyProduct":{"images":{"type":"HasMany","model":"shopifyProductImage"},"variants":{"type":"HasMany","model":"shopifyProductVariant"},"customCollections":{"type":"HasManyThrough","model":"shopifyCollection","through":"shopifyCollect"},"shopifyCollects":{"model":"shopifyCollect","type":"HasMany"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyShop":{"products":{"type":"HasMany","model":"shopifyProduct"},"collections":{"type":"HasMany","model":"shopifyCollection"},"syncs":{"type":"HasMany","model":"shopifySync"},"productVariants":{"type":"HasMany","model":"shopifyProductVariant"},"gdprRequests":{"type":"HasMany","model":"shopifyGdprRequest"},"productImages":{"type":"HasMany","model":"shopifyProductImage"},"collects":{"type":"HasMany","model":"shopifyCollect"}},"shopifySync":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyCollection":{"products":{"type":"HasManyThrough","model":"shopifyProduct","through":"shopifyCollect"},"shopifyCollects":{"model":"shopifyCollect","type":"HasMany"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyProductVariant":{"product":{"type":"BelongsTo","model":"shopifyProduct"},"productImage":{"type":"BelongsTo","model":"shopifyProductImage"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyCollect":{"customCollection":{"type":"BelongsTo","model":"shopifyCollection"},"product":{"type":"BelongsTo","model":"shopifyProduct"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyProductImage":{"variants":{"type":"HasMany","model":"shopifyProductVariant"},"product":{"type":"BelongsTo","model":"shopifyProduct"},"shop":{"type":"BelongsTo","model":"shopifyShop"}}};
  environment: string;

  constructor(options?: ClientOptions) {
    // for multi environment apps (this one), we accept any ole string as an environment, and we look in GADGET_ENV to determine the environment if not passed explicitly
    this.environment = (options?.environment ?? getImplicitEnv() ?? fallbackEnv).toLocaleLowerCase();
    let apiRoot: string;
    if (this.apiRoots[this.environment]) {
      apiRoot = this.apiRoots[this.environment];
    } else {
      const envPart = this.environment == productionEnv ? "" : `--${this.environment}`;
      apiRoot = `https://checkout-testing${envPart}.gadget.app`;
    }

    const exchanges = {...options?.exchanges};
    if (this.environment !== productionEnv) {
      const devHarnessExchange: Exchange = ({ forward }) => {
        return operations$ => {
          const operationResult$ = forward(operations$)

          return pipe(
            operationResult$,
            map(result => {
              try {
                if (typeof window !== "undefined" && typeof CustomEvent === "function") {
                  const event = new CustomEvent("gadget:devharness:graphqlresult", { detail: result });
                  window.dispatchEvent(event);
                }
              } catch (error: any) {
                // gracefully handle environments where CustomEvent is misbehaved like jsdom
                console.warn("[gadget] error dispatching gadget dev harness event", error)
              }

              return result;
            })
          );
        };
      };

      exchanges.beforeAll = [
        devHarnessExchange,
        ...(exchanges.beforeAll ?? []),
      ];
    }

    this.connection = new GadgetConnection({
      endpoint: new URL("api/graphql", apiRoot).toString(),
      applicationId: this.applicationId,
      authenticationMode: options?.authenticationMode ?? (typeof window == 'undefined' ? { anonymous: true } : { browserSession: true }),
      ...options,
      exchanges,
      environment: this.environment,
    });

    if (typeof window != 'undefined' && this.connection.authenticationMode == AuthenticationMode.APIKey && !(options as any)?.authenticationMode?.dangerouslyAllowBrowserApiKey) {
      throw new Error("GGT_BROWSER_API_KEY_USAGE: Using a Gadget API key to authenticate this client object is insecure and will leak your API keys to attackers. Please use a different authentication mode.")

    }




    this.session = new SessionManager(this.connection);
    this.shopifyGdprRequest = new ShopifyGdprRequestManager(this.connection);
    this.shopifyProduct = new ShopifyProductManager(this.connection);
    this.shopifyShop = new ShopifyShopManager(this.connection);
    this.shopifySync = new ShopifySyncManager(this.connection);
    this.shopifyCollection = new ShopifyCollectionManager(this.connection);
    this.shopifyProductVariant = new ShopifyProductVariantManager(this.connection);
    this.shopifyCollect = new ShopifyCollectManager(this.connection);
    this.shopifyProductImage = new ShopifyProductImageManager(this.connection);
    this.currentSession = new CurrentSessionManager(this.connection);

    this.internal = {
      session: new InternalModelManager("session", this.connection, {
      	pluralApiIdentifier: "sessions",
        // @ts-ignore
	      hasAmbiguousIdentifier: false,
      }),
      shopifyGdprRequest: new InternalModelManager("shopifyGdprRequest", this.connection, {
      	pluralApiIdentifier: "shopifyGdprRequests",
        // @ts-ignore
	      hasAmbiguousIdentifier: false,
      }),
      shopifyProduct: new InternalModelManager("shopifyProduct", this.connection, {
      	pluralApiIdentifier: "shopifyProducts",
        // @ts-ignore
	      hasAmbiguousIdentifier: false,
      }),
      shopifyShop: new InternalModelManager("shopifyShop", this.connection, {
      	pluralApiIdentifier: "shopifyShops",
        // @ts-ignore
	      hasAmbiguousIdentifier: false,
      }),
      shopifySync: new InternalModelManager("shopifySync", this.connection, {
      	pluralApiIdentifier: "shopifySyncs",
        // @ts-ignore
	      hasAmbiguousIdentifier: false,
      }),
      shopifyCollection: new InternalModelManager("shopifyCollection", this.connection, {
      	pluralApiIdentifier: "shopifyCollections",
        // @ts-ignore
	      hasAmbiguousIdentifier: false,
      }),
      shopifyProductVariant: new InternalModelManager("shopifyProductVariant", this.connection, {
      	pluralApiIdentifier: "shopifyProductVariants",
        // @ts-ignore
	      hasAmbiguousIdentifier: false,
      }),
      shopifyCollect: new InternalModelManager("shopifyCollect", this.connection, {
      	pluralApiIdentifier: "shopifyCollects",
        // @ts-ignore
	      hasAmbiguousIdentifier: false,
      }),
      shopifyProductImage: new InternalModelManager("shopifyProductImage", this.connection, {
      	pluralApiIdentifier: "shopifyProductImages",
        // @ts-ignore
	      hasAmbiguousIdentifier: false,
      }),
    };
  }


  /** Executes the scheduledShopifySync global action. */
scheduledShopifySync: {
  (
    variables: {
            apiKeys?: ((Scalars['String'] | null))[];
            syncSince?: Date | Scalars['ISO8601DateString'] | null;
            models?: ((Scalars['String'] | null))[];
            force?: (Scalars['Boolean'] | null) | null;
            startReason?: (Scalars['String'] | null) | null;
          }
  ): Promise<any>;
  type: "globalAction",
  operationName: "scheduledShopifySync",
  namespace: null,
  variablesType: {
    apiKeys?: ((Scalars['String'] | null))[];
    syncSince?: Date | Scalars['ISO8601DateString'] | null;
    models?: ((Scalars['String'] | null))[];
    force?: (Scalars['Boolean'] | null) | null;
    startReason?: (Scalars['String'] | null) | null;
  } | undefined;
  variables: {
    "apiKeys": {
      required: false;
      type: "[String!]";
    },
    "syncSince": {
      required: false;
      type: "DateTime";
    },
    "models": {
      required: false;
      type: "[String!]";
    },
    "force": {
      required: false;
      type: "Boolean";
    },
    "startReason": {
      required: false;
      type: "String";
    },
  }
} = Object.assign(
  async (
    variables: {
            apiKeys?: ((Scalars['String'] | null))[],
            syncSince?: Date | Scalars['ISO8601DateString'] | null,
            models?: ((Scalars['String'] | null))[],
            force?: (Scalars['Boolean'] | null) | null,
            startReason?: (Scalars['String'] | null) | null,
          },
  ): Promise<any> => {
    return (await globalActionRunner(
      this.connection,
      "scheduledShopifySync",
      {
        "apiKeys": {
          value: variables.apiKeys,
          required: false,
          type: "[String!]",
        },
        "syncSince": {
          value: variables.syncSince,
          required: false,
          type: "DateTime",
        },
        "models": {
          value: variables.models,
          required: false,
          type: "[String!]",
        },
        "force": {
          value: variables.force,
          required: false,
          type: "Boolean",
        },
        "startReason": {
          value: variables.startReason,
          required: false,
          type: "String",
        },
      },
      null
    ));
  },
  {
    type: "globalAction",
    operationName: "scheduledShopifySync",
    namespace: null,
    variables: {
          "apiKeys": {
        required: false,
        type: "[String!]",
      },
          "syncSince": {
        required: false,
        type: "DateTime",
      },
          "models": {
        required: false,
        type: "[String!]",
      },
          "force": {
        required: false,
        type: "Boolean",
      },
          "startReason": {
        required: false,
        type: "String",
      },
        },
  } as any
);



  /** Run an arbitrary GraphQL query. */
  async query(graphQL: string | DocumentNode, variables?: Record<string, any>, options?: Partial<OperationContext>) {
    const {data, error} = await this.connection.currentClient.query(graphQL, variables, options).toPromise();
    if (error) throw error
    return data;
  }

  /** Run an arbitrary GraphQL mutation. */
  async mutate(graphQL: string | DocumentNode, variables?: Record<string, any>, options?: Partial<OperationContext>) {
    const {data, error} = await this.connection.currentClient.mutation(graphQL, variables, options).toPromise();
    if (error) throw error
    return data;
  }

  /** Start a transaction against the Gadget backend which will atomically commit (or rollback). */
  transaction = async <T>(callback: (transaction: GadgetTransaction) => Promise<T>): Promise<T> => {
    return await this.connection.transaction(callback)
  }

  /**
   * `fetch` function that works the same as the built-in `fetch` function, but automatically passes authentication information for this API client.
   *
   * @example
   * await api.fetch("https://myapp--development.gadget.app/foo/bar");
   *
   * @example
   * // fetch a relative URL from the endpoint this API client is configured to fetch from
   * await api.fetch("/foo/bar");
   **/
  async fetch(input: RequestInfo | URL, init: RequestInit = {}) {
    return await this.connection.fetch(input, init);
  }

  /**
  * Get a new direct upload token for file uploads to directly to cloud storage.
  * See https://docs.gadget.dev/guides/storing-files#direct-uploads-using-tokens for more information
  * @return { url: string, token: string } A `url` to upload one file to, and a token for that file to pass back to Gadget as an action input.
  */
  getDirectUploadToken = async (): Promise<{url: string, token: string}> => {
    const result = await this.query(`query GetDirectUploadToken($nonce: String) { gadgetMeta { directUploadToken(nonce: $nonce) { url, token } } }`, {nonce: Math.random().toString(36).slice(2, 7)}, {
      requestPolicy: "network-only",
    });
    return result.gadgetMeta.directUploadToken;
  }

    /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status.
   *
   * @param action The action to enqueue
   * @param input The input variables for the action, in object form. Optional for actions that have only optional params, but required for actions with required params.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" }, { retries: 3, priority: "HIGH" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { retries: 3, priority: "LOW" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "new name b" }, { name: "new name b" }]);
   **/
  async enqueue<SchemaT, Action extends AnyActionFunction & AllOptionalVariables<Action['variablesType']>>(action: Action, input?: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status.
   *
   * @param action The action to enqueue
   * @param input The id for the record to run the action on. This is only one overload of this function, see the other forms for other input types.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" }, { retries: 3, priority: "HIGH" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, "123");
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { retries: 3, priority: "LOW" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "new name b" }, { name: "new name b" }]);
   **/
  async enqueue<SchemaT, Action extends AnyActionFunction & {variablesType: {id: string}}>(action: Action, id: string, options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status. This is the variant of enqueue for actions which accept no inputs.
   *
   * @param action The action to enqueue.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction);
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "new name b" }, { name: "new name b" }]);
   **/
  async enqueue<SchemaT, Action extends ActionFunctionMetadata<any, Record<string, never>, any, any, any, any> | GlobalActionFunction<Record<string, never>>>(action: Action, options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  /**
   * Enqueue a set of actions in bulk for execution. The backend will run each action as soon as possible, and return an array of handles to each action right away that can be used to check their statuses.
   *
   * @param bulkAction The bulk action to enqueue
   * @param input The input variables for the action, in array or object form.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "foo" }, {name: "bar"}], { retries: 3, priority: "HIGH" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkDelete, [2, 42]);
   *
   * @example
   * const handle = await api.enqueue(api.widget.addInventory, [{id: 1, amount: 10}, {id: 2, amount: 15}]);
   *
  **/
  async enqueue<SchemaT, Action extends ActionFunctionMetadata<any, any, any, any, any, true>>(action: Action, input: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>[]>;
  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status.
   *
   * @param action The action to enqueue
   * @param input The input variables for the action, in object form. Optional for actions that have only optional params, but required for actions with required params.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction);
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   **/
  async enqueue<SchemaT, Action extends AnyActionFunction>(action: Action, input: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  async enqueue<SchemaT, Action extends AnyActionFunction>(action: Action, inputOrOptions?: Action["variablesType"] | EnqueueBackgroundActionOptions<Action>, maybeOptions?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action> | BackgroundActionHandle<SchemaT, Action>[]> {
    assert(action, ".enqueue must be passed an action as the first argument but was passed undefined");

    let input: Action["variablesType"] | undefined;
    let options: EnqueueBackgroundActionOptions<Action> | undefined;

    // process different overloads to pull out the input and or options
    if (typeof maybeOptions !== "undefined") {
      input = inputOrOptions;
      options = maybeOptions;
    } else if (!action.variables || Object.keys(action.variables).length == 0) {
      input = {};
      options = inputOrOptions;
    } else {
      if (typeof inputOrOptions == "string") {
        // id input shorthand passes just the id as a string, wrap it into a variables object
        input = { id: inputOrOptions };
      } else {
        input = inputOrOptions;
      }
      options = {};
    }

    return await enqueueActionRunner(this.connection, action, input, options);
  }

  /**
   * Returns a handle for a given background action id
   *
   * @param action The action that was enqueued
   * @param id The id of the background action
   *
   * @example
   * const handle = api.handle(api.widget.update, "app-job-12346");
   *
   * @example
   * const handle = api.handle(api.someGlobalAction, "app-job-56789");
   **/
  handle<SchemaT, Action extends AnyActionFunction>(action: Action, id: string): BackgroundActionHandle<SchemaT, Action> {
    return new BackgroundActionHandle(this.connection, action, id);
  }
  
  toString() {
    return `GadgetAPIClient<${this.environment}>`;
  }

  toJSON() {
    return this.toString()
  }
}
