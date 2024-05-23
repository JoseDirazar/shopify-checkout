"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Client_exports = {};
__export(Client_exports, {
  Client: () => Client
});
module.exports = __toCommonJS(Client_exports);
var import_wonka = require("wonka");
var import_api_client_core = require("@gadgetinc/api-client-core");
var import_api_client_core2 = require("@gadgetinc/api-client-core");
var import_Session = require("./models/Session.js");
var import_ShopifyGdprRequest = require("./models/ShopifyGdprRequest.js");
var import_ShopifyProduct = require("./models/ShopifyProduct.js");
var import_ShopifyShop = require("./models/ShopifyShop.js");
var import_ShopifySync = require("./models/ShopifySync.js");
var import_ShopifyCollection = require("./models/ShopifyCollection.js");
var import_ShopifyProductVariant = require("./models/ShopifyProductVariant.js");
var import_ShopifyProductImage = require("./models/ShopifyProductImage.js");
var import_ShopifyCollect = require("./models/ShopifyCollect.js");
var import_CurrentSession = require("./models/CurrentSession.js");
var import_api_client_core3 = require("@gadgetinc/api-client-core");
var _a;
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
        return await (0, import_api_client_core3.globalActionRunner)(
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
    var _a2;
    this.environment = ((options == null ? void 0 : options.environment) ?? getImplicitEnv() ?? fallbackEnv).toLocaleLowerCase();
    let apiRoot;
    if (this.apiRoots[this.environment]) {
      apiRoot = this.apiRoots[this.environment];
    } else {
      const envPart = this.environment == productionEnv ? "" : `--${this.environment}`;
      apiRoot = `https://checkout-testing${envPart}.gadget.app`;
    }
    const exchanges = { ...options == null ? void 0 : options.exchanges };
    if (this.environment !== productionEnv) {
      const devHarnessExchange = ({ forward }) => {
        return (operations$) => {
          const operationResult$ = forward(operations$);
          return (0, import_wonka.pipe)(
            operationResult$,
            (0, import_wonka.map)((result) => {
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
    this.connection = new import_api_client_core.GadgetConnection({
      endpoint: new URL("api/graphql", apiRoot).toString(),
      applicationId: this.applicationId,
      authenticationMode: (options == null ? void 0 : options.authenticationMode) ?? (typeof window == "undefined" ? { anonymous: true } : { browserSession: true }),
      ...options,
      exchanges,
      environment: this.environment
    });
    if (typeof window != "undefined" && this.connection.authenticationMode == import_api_client_core.AuthenticationMode.APIKey && !((_a2 = options == null ? void 0 : options.authenticationMode) == null ? void 0 : _a2.dangerouslyAllowBrowserApiKey)) {
      throw new Error("GGT_BROWSER_API_KEY_USAGE: Using a Gadget API key to authenticate this client object is insecure and will leak your API keys to attackers. Please use a different authentication mode.");
    }
    this.session = new import_Session.SessionManager(this.connection);
    this.shopifyGdprRequest = new import_ShopifyGdprRequest.ShopifyGdprRequestManager(this.connection);
    this.shopifyProduct = new import_ShopifyProduct.ShopifyProductManager(this.connection);
    this.shopifyShop = new import_ShopifyShop.ShopifyShopManager(this.connection);
    this.shopifySync = new import_ShopifySync.ShopifySyncManager(this.connection);
    this.shopifyCollection = new import_ShopifyCollection.ShopifyCollectionManager(this.connection);
    this.shopifyProductVariant = new import_ShopifyProductVariant.ShopifyProductVariantManager(this.connection);
    this.shopifyProductImage = new import_ShopifyProductImage.ShopifyProductImageManager(this.connection);
    this.shopifyCollect = new import_ShopifyCollect.ShopifyCollectManager(this.connection);
    this.currentSession = new import_CurrentSession.CurrentSessionManager(this.connection);
    this.internal = {
      session: new import_api_client_core.InternalModelManager("session", this.connection, {
        pluralApiIdentifier: "sessions",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyGdprRequest: new import_api_client_core.InternalModelManager("shopifyGdprRequest", this.connection, {
        pluralApiIdentifier: "shopifyGdprRequests",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyProduct: new import_api_client_core.InternalModelManager("shopifyProduct", this.connection, {
        pluralApiIdentifier: "shopifyProducts",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyShop: new import_api_client_core.InternalModelManager("shopifyShop", this.connection, {
        pluralApiIdentifier: "shopifyShops",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifySync: new import_api_client_core.InternalModelManager("shopifySync", this.connection, {
        pluralApiIdentifier: "shopifySyncs",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyCollection: new import_api_client_core.InternalModelManager("shopifyCollection", this.connection, {
        pluralApiIdentifier: "shopifyCollections",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyProductVariant: new import_api_client_core.InternalModelManager("shopifyProductVariant", this.connection, {
        pluralApiIdentifier: "shopifyProductVariants",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyProductImage: new import_api_client_core.InternalModelManager("shopifyProductImage", this.connection, {
        pluralApiIdentifier: "shopifyProductImages",
        // @ts-ignore
        hasAmbiguousIdentifier: false
      }),
      shopifyCollect: new import_api_client_core.InternalModelManager("shopifyCollect", this.connection, {
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
    (0, import_api_client_core2.assert)(action, ".enqueue must be passed an action as the first argument but was passed undefined");
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
    return await (0, import_api_client_core2.enqueueActionRunner)(this.connection, action, input, options);
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
    return new import_api_client_core2.BackgroundActionHandle(this.connection, action, id);
  }
  toString() {
    return `GadgetAPIClient<${this.environment}>`;
  }
  toJSON() {
    return this.toString();
  }
}
_a = $modelRelationships;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Client
});
//# sourceMappingURL=Client.js.map
