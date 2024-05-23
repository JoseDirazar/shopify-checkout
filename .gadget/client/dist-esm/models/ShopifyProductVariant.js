import {
  findManyRunner,
  findOneRunner
} from "@gadgetinc/api-client-core";
const DefaultShopifyProductVariantSelection = {
  "__typename": true,
  "barcode": true,
  "compareAtPrice": true,
  "createdAt": true,
  "fulfillmentService": true,
  "id": true,
  "inventoryManagement": true,
  "inventoryPolicy": true,
  "inventoryQuantity": true,
  "option1": true,
  "option2": true,
  "option3": true,
  "position": true,
  "presentmentPrices": true,
  "price": true,
  "requiresShipping": true,
  "selectedOptions": true,
  "shopifyCreatedAt": true,
  "shopifyUpdatedAt": true,
  "sku": true,
  "taxCode": true,
  "taxable": true,
  "title": true,
  "updatedAt": true,
  "weight": true,
  "weightUnit": true
};
;
;
;
;
;
const apiIdentifier = "shopifyProductVariant";
const pluralApiIdentifier = "shopifyProductVariants";
class ShopifyProductVariantManager {
  constructor(connection) {
    this.connection = connection;
    /**
    * Finds one shopifyProductVariant by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.findOne = Object.assign(
      async (id, options) => {
        return await findOneRunner(
          this,
          "shopifyProductVariant",
          id,
          DefaultShopifyProductVariantSelection,
          apiIdentifier,
          options
        );
      },
      {
        type: "findOne",
        findByVariableName: "id",
        operationName: "shopifyProductVariant",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyProductVariantSelection
      }
    );
    /**
    * Finds one shopifyProductVariant by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.maybeFindOne = Object.assign(
      async (id, options) => {
        const record = await findOneRunner(
          this,
          "shopifyProductVariant",
          id,
          DefaultShopifyProductVariantSelection,
          apiIdentifier,
          options,
          false
        );
        return record.isEmpty() ? null : record;
      },
      {
        type: "maybeFindOne",
        findByVariableName: "id",
        operationName: "shopifyProductVariant",
        modelApiIdentifier: "shopifyProductVariant",
        defaultSelection: DefaultShopifyProductVariantSelection
      }
    );
    /**
    * Finds many shopifyProductVariant. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
    **/
    this.findMany = Object.assign(
      async (options) => {
        return await findManyRunner(
          this,
          "shopifyProductVariants",
          DefaultShopifyProductVariantSelection,
          "shopifyProductVariant",
          options
        );
      },
      {
        type: "findMany",
        operationName: "shopifyProductVariants",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyProductVariantSelection
      }
    );
    /**
    * Finds the first matching shopifyProductVariant. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
    **/
    this.findFirst = Object.assign(
      async (options) => {
        const list = await findManyRunner(
          this,
          "shopifyProductVariants",
          DefaultShopifyProductVariantSelection,
          apiIdentifier,
          { ...options, first: 1, last: void 0, before: void 0, after: void 0 },
          true
        );
        return list[0];
      },
      {
        type: "findFirst",
        operationName: "shopifyProductVariants",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyProductVariantSelection
      }
    );
    /**
    * Finds the first matching shopifyProductVariant. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
    **/
    this.maybeFindFirst = Object.assign(
      async (options) => {
        const list = await findManyRunner(
          this,
          "shopifyProductVariants",
          DefaultShopifyProductVariantSelection,
          apiIdentifier,
          { ...options, first: 1, last: void 0, before: void 0, after: void 0 },
          false
        );
        return list?.[0] ?? null;
      },
      {
        type: "maybeFindFirst",
        operationName: "shopifyProductVariants",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyProductVariantSelection
      }
    );
  }
}
export {
  DefaultShopifyProductVariantSelection,
  ShopifyProductVariantManager
};
//# sourceMappingURL=ShopifyProductVariant.js.map
