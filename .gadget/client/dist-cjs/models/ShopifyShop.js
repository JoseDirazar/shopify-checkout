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
var ShopifyShop_exports = {};
__export(ShopifyShop_exports, {
  DefaultShopifyShopSelection: () => DefaultShopifyShopSelection,
  ShopifyShopManager: () => ShopifyShopManager
});
module.exports = __toCommonJS(ShopifyShop_exports);
var import_api_client_core = require("@gadgetinc/api-client-core");
var import_support = require("../support.js");
const DefaultShopifyShopSelection = {
  "__typename": true,
  "address1": true,
  "address2": true,
  "checkoutApiSupported": true,
  "city": true,
  "cookieConsentLevel": true,
  "country": true,
  "countryCode": true,
  "countryName": true,
  "countyTaxes": true,
  "createdAt": true,
  "currency": true,
  "customerAccountsV2": true,
  "customerEmail": true,
  "disabledWebhooks": true,
  "domain": true,
  "eligibleForCardReaderGiveaway": true,
  "eligibleForPayments": true,
  "email": true,
  "enabledPresentmentCurrencies": true,
  "finances": true,
  "forceSsl": true,
  "googleAppsDomain": true,
  "googleAppsLoginEnabled": true,
  "grantedScopes": true,
  "hasDiscounts": true,
  "hasGiftCards": true,
  "hasStorefront": true,
  "ianaTimezone": true,
  "id": true,
  "installedViaApiKey": true,
  "latitude": true,
  "longitude": true,
  "marketingSmsContentEnabledAtCheckout": true,
  "moneyFormat": true,
  "moneyInEmailsFormat": true,
  "moneyWithCurrencyFormat": true,
  "moneyWithCurrencyInEmailsFormat": true,
  "multiLocationEnabled": true,
  "myshopifyDomain": true,
  "name": true,
  "passwordEnabled": true,
  "phone": true,
  "planDisplayName": true,
  "planName": true,
  "preLaunchEnabled": true,
  "prePurchaseProduct": true,
  "primaryLocale": true,
  "province": true,
  "provinceCode": true,
  "registeredWebhooks": true,
  "requiresExtraPaymentsAgreement": true,
  "setupRequired": true,
  "shopOwner": true,
  "shopifyCreatedAt": true,
  "shopifyUpdatedAt": true,
  "source": true,
  "state": true,
  "taxShipping": true,
  "taxesIncluded": true,
  "timezone": true,
  "transactionalSmsDisabled": true,
  "updatedAt": true,
  "weightUnit": true,
  "zipCode": true
};
;
;
;
;
;
;
const apiIdentifier = "shopifyShop";
const pluralApiIdentifier = "shopifyShops";
async function savePrePurchaseProductShopifyShop(id, variables, options) {
  const newVariables = (0, import_support.disambiguateActionParams)(
    this["savePrePurchaseProduct"],
    id,
    variables
  );
  return await (0, import_api_client_core.actionRunner)(
    this,
    "savePrePurchaseProductShopifyShop",
    DefaultShopifyShopSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
      id: {
        value: id,
        required: true,
        type: "GadgetID"
      },
      "productId": {
        value: newVariables.productId,
        required: false,
        type: "String"
      }
    },
    options,
    null,
    false
  );
}
class ShopifyShopManager {
  constructor(connection) {
    this.connection = connection;
    /**
    * Finds one shopifyShop by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.findOne = Object.assign(
      async (id, options) => {
        return await (0, import_api_client_core.findOneRunner)(
          this,
          "shopifyShop",
          id,
          DefaultShopifyShopSelection,
          apiIdentifier,
          options
        );
      },
      {
        type: "findOne",
        findByVariableName: "id",
        operationName: "shopifyShop",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyShopSelection
      }
    );
    /**
    * Finds one shopifyShop by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.maybeFindOne = Object.assign(
      async (id, options) => {
        const record = await (0, import_api_client_core.findOneRunner)(
          this,
          "shopifyShop",
          id,
          DefaultShopifyShopSelection,
          apiIdentifier,
          options,
          false
        );
        return record.isEmpty() ? null : record;
      },
      {
        type: "maybeFindOne",
        findByVariableName: "id",
        operationName: "shopifyShop",
        modelApiIdentifier: "shopifyShop",
        defaultSelection: DefaultShopifyShopSelection
      }
    );
    /**
    * Finds many shopifyShop. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
    **/
    this.findMany = Object.assign(
      async (options) => {
        return await (0, import_api_client_core.findManyRunner)(
          this,
          "shopifyShops",
          DefaultShopifyShopSelection,
          "shopifyShop",
          options
        );
      },
      {
        type: "findMany",
        operationName: "shopifyShops",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyShopSelection
      }
    );
    /**
    * Finds the first matching shopifyShop. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
    **/
    this.findFirst = Object.assign(
      async (options) => {
        const list = await (0, import_api_client_core.findManyRunner)(
          this,
          "shopifyShops",
          DefaultShopifyShopSelection,
          apiIdentifier,
          { ...options, first: 1, last: void 0, before: void 0, after: void 0 },
          true
        );
        return list[0];
      },
      {
        type: "findFirst",
        operationName: "shopifyShops",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyShopSelection
      }
    );
    /**
    * Finds the first matching shopifyShop. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
    **/
    this.maybeFindFirst = Object.assign(
      async (options) => {
        const list = await (0, import_api_client_core.findManyRunner)(
          this,
          "shopifyShops",
          DefaultShopifyShopSelection,
          apiIdentifier,
          { ...options, first: 1, last: void 0, before: void 0, after: void 0 },
          false
        );
        return (list == null ? void 0 : list[0]) ?? null;
      },
      {
        type: "maybeFindFirst",
        operationName: "shopifyShops",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyShopSelection
      }
    );
    this.savePrePurchaseProduct = Object.assign(
      savePrePurchaseProductShopifyShop,
      {
        type: "action",
        operationName: "savePrePurchaseProductShopifyShop",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: apiIdentifier,
        isBulk: false,
        defaultSelection: DefaultShopifyShopSelection,
        variables: {
          id: {
            required: true,
            type: "GadgetID"
          },
          "productId": {
            required: false,
            type: "String"
          }
        },
        hasAmbiguousIdentifier: false,
        /** @deprecated -- effects are dead, long live AAC */
        hasCreateOrUpdateEffect: false,
        paramOnlyVariables: ["productId"],
        hasReturnType: false,
        acceptsModelInput: false
      }
    );
    /**
    * Executes the bulkSavePrePurchaseProduct action with the given inputs.
    */
    this.bulkSavePrePurchaseProduct = Object.assign(
      async (inputs, options) => {
        const fullyQualifiedInputs = inputs.map(
          (input) => (0, import_support.disambiguateActionParams)(
            this["savePrePurchaseProduct"],
            void 0,
            input
          )
        );
        return await (0, import_api_client_core.actionRunner)(
          this,
          "bulkSavePrePurchaseProductShopifyShops",
          DefaultShopifyShopSelection,
          "shopifyShop",
          "shopifyShops",
          true,
          {
            inputs: {
              value: fullyQualifiedInputs,
              ...this["bulkSavePrePurchaseProduct"].variables["inputs"]
            }
          },
          options,
          null,
          false
        );
      },
      {
        type: "action",
        operationName: "bulkSavePrePurchaseProductShopifyShops",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: "shopifyShops",
        isBulk: true,
        defaultSelection: DefaultShopifyShopSelection,
        variables: {
          inputs: {
            required: true,
            type: "[BulkSavePrePurchaseProductShopifyShopsInput!]"
          }
        },
        hasReturnType: false,
        acceptsModelInput: false
      }
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultShopifyShopSelection,
  ShopifyShopManager
});
//# sourceMappingURL=ShopifyShop.js.map
