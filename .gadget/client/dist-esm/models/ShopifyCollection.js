import {
  findManyRunner,
  findOneRunner
} from "@gadgetinc/api-client-core";
const DefaultShopifyCollectionSelection = {
  "__typename": true,
  "body": true,
  "collectionType": true,
  "createdAt": true,
  "disjunctive": true,
  "handle": true,
  "id": true,
  "image": true,
  "publishedAt": true,
  "publishedScope": true,
  "rules": true,
  "shopifyUpdatedAt": true,
  "sortOrder": true,
  "templateSuffix": true,
  "title": true,
  "updatedAt": true
};
;
;
;
;
;
const apiIdentifier = "shopifyCollection";
const pluralApiIdentifier = "shopifyCollections";
class ShopifyCollectionManager {
  constructor(connection) {
    this.connection = connection;
    /**
    * Finds one shopifyCollection by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.findOne = Object.assign(
      async (id, options) => {
        return await findOneRunner(
          this,
          "shopifyCollection",
          id,
          DefaultShopifyCollectionSelection,
          apiIdentifier,
          options
        );
      },
      {
        type: "findOne",
        findByVariableName: "id",
        operationName: "shopifyCollection",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyCollectionSelection
      }
    );
    /**
    * Finds one shopifyCollection by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.maybeFindOne = Object.assign(
      async (id, options) => {
        const record = await findOneRunner(
          this,
          "shopifyCollection",
          id,
          DefaultShopifyCollectionSelection,
          apiIdentifier,
          options,
          false
        );
        return record.isEmpty() ? null : record;
      },
      {
        type: "maybeFindOne",
        findByVariableName: "id",
        operationName: "shopifyCollection",
        modelApiIdentifier: "shopifyCollection",
        defaultSelection: DefaultShopifyCollectionSelection
      }
    );
    /**
    * Finds many shopifyCollection. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
    **/
    this.findMany = Object.assign(
      async (options) => {
        return await findManyRunner(
          this,
          "shopifyCollections",
          DefaultShopifyCollectionSelection,
          "shopifyCollection",
          options
        );
      },
      {
        type: "findMany",
        operationName: "shopifyCollections",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyCollectionSelection
      }
    );
    /**
    * Finds the first matching shopifyCollection. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
    **/
    this.findFirst = Object.assign(
      async (options) => {
        const list = await findManyRunner(
          this,
          "shopifyCollections",
          DefaultShopifyCollectionSelection,
          apiIdentifier,
          { ...options, first: 1, last: void 0, before: void 0, after: void 0 },
          true
        );
        return list[0];
      },
      {
        type: "findFirst",
        operationName: "shopifyCollections",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyCollectionSelection
      }
    );
    /**
    * Finds the first matching shopifyCollection. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
    **/
    this.maybeFindFirst = Object.assign(
      async (options) => {
        const list = await findManyRunner(
          this,
          "shopifyCollections",
          DefaultShopifyCollectionSelection,
          apiIdentifier,
          { ...options, first: 1, last: void 0, before: void 0, after: void 0 },
          false
        );
        return list?.[0] ?? null;
      },
      {
        type: "maybeFindFirst",
        operationName: "shopifyCollections",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultShopifyCollectionSelection
      }
    );
  }
}
export {
  DefaultShopifyCollectionSelection,
  ShopifyCollectionManager
};
//# sourceMappingURL=ShopifyCollection.js.map
