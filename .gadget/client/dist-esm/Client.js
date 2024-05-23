var _a;
import { pipe, map } from "wonka";
import { GadgetConnection, AuthenticationMode, InternalModelManager } from "@gadgetinc/api-client-core";
import { enqueueActionRunner, assert, BackgroundActionHandle } from "@gadgetinc/api-client-core";
import { SessionManager } from "./models/Session.js";
import { ShopifyGdprRequestManager } from "./models/ShopifyGdprRequest.js";
import { ShopifyProductManager } from "./models/ShopifyProduct.js";
import { ShopifyShopManager } from "./models/ShopifyShop.js";
import { ShopifySyncManager } from "./models/ShopifySync.js";
import { ShopifyCollectionManager } from "./models/ShopifyCollection.js";
import { ShopifyProductVariantManager } from "./models/ShopifyProductVariant.js";
import { ShopifyProductImageManager } from "./models/ShopifyProductImage.js";
import { ShopifyCollectManager } from "./models/ShopifyCollect.js";
import { CurrentSessionManager } from "./models/CurrentSession.js";
import { globalActionRunner } from "@gadgetinc/api-client-core";
const productionEnv = "production";
const fallbackEnv = "development";
const $modelRelationships = Symbol.for("gadget/modelRelationships");
const getImplicitEnv = () => {
  try {
    return process.env.GADGET_ENV;
  } catch (error) {
    return void 0;
  }
};
class Client {
  constructor(options) {
    /**
     * The list of environments with a customized API root endpoint
     */
    this.apiRoots = { "development": "https://checkout-testing--development.gadget.app/", "production": "https://checkout-testing.gadget.app/" };
    this.applicationId = "121673";
    this[_a] = { "session": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyGdprRequest": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyProduct": { "images": { "type": "HasMany", "model": "shopifyProductImage" }, "variants": { "type": "HasMany", "model": "shopifyProductVariant" }, "customCollections": { "type": "HasManyThrough", "model": "shopifyCollection", "through": "shopifyCollect" }, "shopifyCollects": { "model": "shopifyCollect", "type": "HasMany" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyShop": { "products": { "type": "HasMany", "model": "shopifyProduct" }, "collections": { "type": "HasMany", "model": "shopifyCollection" }, "syncs": { "type": "HasMany", "model": "shopifySync" }, "productVariants": { "type": "HasMany", "model": "shopifyProductVariant" }, "gdprRequests": { "type": "HasMany", "model": "shopifyGdprRequest" }, "productImages": { "type": "HasMany", "model": "shopifyProductImage" }, "collects": { "type": "HasMany", "model": "shopifyCollect" } }, "shopifySync": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyCollection": { "products": { "type": "HasManyThrough", "model": "shopifyProduct", "through": "shopifyCollect" }, "shopifyCollects": { "model": "shopifyCollect", "type": "HasMany" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyProductVariant": { "product": { "type": "BelongsTo", "model": "shopifyProduct" }, "productImage": { "type": "BelongsTo", "model": "shopifyProductImage" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyProductImage": { "variants": { "type": "HasMany", "model": "shopifyProductVariant" }, "product": { "type": "BelongsTo", "model": "shopifyProduct" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyCollect": { "customCollection": { "type": "BelongsTo", "model": "shopifyCollection" }, "product": { "type": "BelongsTo", "model": "shopifyProduct" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } } };
    /** Executes the scheduledShopifySync global action. */
    this.scheduledShopifySync = Object.assign(
      async (variables) => {
        return await globalActionRunner(
          this.connection,
          "scheduledShopifySync",
          {
            "apiKeys": {
              value: variables.apiKeys,
              required: false,
              type: "[String!]"
            },
            "syncSince": {
              value: variables.syncSince,
              required: false,
              type: "DateTime"
            },
            "models": {
              value: variables.models,
              required: false,
              type: "[String!]"
            },
            "force": {
              value: variables.force,
              required: false,
              type: "Boolean"
            },
            "startReason": {
              value: variables.startReason,
              required: false,
              type: "String"
            }
          },
          null
        );
      },
      {
        type: "globalAction",
        operationName: "scheduledShopifySync",
        namespace: null,
        variables: {
          "apiKeys": {
            required: false,
            type: "[String!]"
          },
          "syncSince": {
            required: false,
            type: "DateTime"
          },
          "models": {
            required: false,
            type: "[String!]"
          },
          "force": {
            required: false,
            type: "Boolean"
          },
          "startReason": {
            required: false,
            type: "String"
          }
        }
      }
    );
    /** Start a transaction against the Gadget backend which will atomically commit (or rollback). */
    this.transaction = async (callback) => {
      return await this.connection.transaction(callback);
    };
    /**
    * Get a new direct upload token for file uploads to directly to cloud storage.
    * See https://docs.gadget.dev/guides/storing-files#direct-uploads-using-tokens for more information
    * @return { url: string, token: string } A `url` to upload one file to, and a token for that file to pass back to Gadget as an action input.
    */
    this.getDirectUploadToken = async () => {
      const result = await this.query(`query GetDirectUploadToken($nonce: String) { gadgetMeta { directUploadToken(nonce: $nonce) { url, token } } }`, { nonce: Math.random().toString(36).slice(2, 7) }, {
        requestPolicy: "network-only"
      });
      return result.gadgetMeta.directUploadToken;
    };
    this.environment = (options?.environment ?? getImplicitEnv() ?? fallbackEnv).toLocaleLowerCase();
    let apiRoot;
    if (this.apiRoots[this.environment]) {
      apiRoot = this.apiRoots[this.environment];
    } else {
      const envPart = this.environment == productionEnv ? "" : `--${this.environment}`;
      apiRoot = `https://checkout-testing${envPart}.gadget.app`;
    }
    const exchanges = { ...options?.exchanges };
    if (this.environment !== productionEnv) {
      const devHarnessExchange = ({ forward }) => {
        return (operations$) => {
          const operationResult$ = forward(operations$);
          return pipe(
            operationResult$,
            map((result) => {
              try {
                if (typeof window !== "undefined" && typeof CustomEvent === "function") {
                  const event = new CustomEvent("gadget:devharness:graphqlresult", { detail: result });
                  window.dispatchEvent(event);
                }
              } catch (error) {
                console.warn("[gadget] error dispatching gadget dev harness event", error);
              }
              return result;
            })
          );
        };
      };
      exchanges.beforeAll = [
        devHarnessExchange,
        ...exchanges.beforeAll ?? []
      ];
    }
    this.connection = new GadgetConnection({
      endpoint: new URL("api/graphql", apiRoot).toString(),
      applicationId: this.applicationId,
      authenticationMode: options?.authenticationMode ?? (typeof window == "undefined" ? { anonymous: true } : { browserSession: true }),
      ...options,
      exchanges,
      environment: this.environment
    });
    if (typeof window != "undefined" && this.connection.authenticationMode == AuthenticationMode.APIKey && !options?.authenticationMode?.dangerouslyAllowBrowserApiKey) {
      throw new Error("GGT_BROWSER_API_KEY_USAGE: Using a Gadget API key to authenticate this client object is insecure and will leak your API keys to attackers. Please use a different authentication mode.");
    }
    this.session = new SessionManager(this.connection);
    this.shopifyGdprRequest = new ShopifyGdprRequestManager(this.connection);
    this.shopifyProduct = new ShopifyProductManager(this.connection);
    this.shopifyShop = new ShopifyShopManager(this.connection);
    this.shopifySync = new ShopifySyncManager(this.connection);
    this.shopifyCollection = new ShopifyCollectionManager(this.connection);
    this.shopifyProductVariant = new ShopifyProductVariantManager(this.connection);
    this.shopifyProductImage = new ShopifyProductImageManager(this.connection);
    this.shopifyCollect = new ShopifyCollectManager(this.connection);
    this.currentSession = new CurrentSessionManager(this.connection);
    this.internal = {
      session: new InternalModelManager("session", this.connection, {
        pluralApiIdentifier: "sessions",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyGdprRequest: new InternalModelManager("shopifyGdprRequest", this.connection, {
        pluralApiIdentifier: "shopifyGdprRequests",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyProduct: new InternalModelManager("shopifyProduct", this.connection, {
        pluralApiIdentifier: "shopifyProducts",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyShop: new InternalModelManager("shopifyShop", this.connection, {
        pluralApiIdentifier: "shopifyShops",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifySync: new InternalModelManager("shopifySync", this.connection, {
        pluralApiIdentifier: "shopifySyncs",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyCollection: new InternalModelManager("shopifyCollection", this.connection, {
        pluralApiIdentifier: "shopifyCollections",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyProductVariant: new InternalModelManager("shopifyProductVariant", this.connection, {
        pluralApiIdentifier: "shopifyProductVariants",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyProductImage: new InternalModelManager("shopifyProductImage", this.connection, {
        pluralApiIdentifier: "shopifyProductImages",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyCollect: new InternalModelManager("shopifyCollect", this.connection, {
        pluralApiIdentifier: "shopifyCollects",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      })
    };
  }
  /** Run an arbitrary GraphQL query. */
  async query(graphQL, variables, options) {
    const { data, error } = await this.connection.currentClient.query(graphQL, variables, options).toPromise();
    if (error)
      throw error;
    return data;
  }
  /** Run an arbitrary GraphQL mutation. */
  async mutate(graphQL, variables, options) {
    const { data, error } = await this.connection.currentClient.mutation(graphQL, variables, options).toPromise();
    if (error)
      throw error;
    return data;
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
  async fetch(input, init = {}) {
    return await this.connection.fetch(input, init);
  }
  async enqueue(action, inputOrOptions, maybeOptions) {
    assert(action, ".enqueue must be passed an action as the first argument but was passed undefined");
    let input;
    let options;
    if (typeof maybeOptions !== "undefined") {
      input = inputOrOptions;
      options = maybeOptions;
    } else if (!action.variables || Object.keys(action.variables).length == 0) {
      input = {};
      options = inputOrOptions;
    } else {
      if (typeof inputOrOptions == "string") {
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
  handle(action, id) {
    return new BackgroundActionHandle(this.connection, action, id);
  }
  toString() {
    return `GadgetAPIClient<${this.environment}>`;
  }
  toJSON() {
    return this.toString();
  }
}
_a = $modelRelationships;
export {
  Client
};
//# sourceMappingURL=Client.js.map
