import {
  GadgetConnection,
  GadgetRecord,
  GadgetRecordImplementation,
  GadgetRecordList,
  GadgetNonUniqueDataError,
  actionRunner,
  findManyRunner,
  findOneRunner,
  findOneByFieldRunner,
  DefaultSelection,
  LimitToKnownKeys,
  Selectable
} from "@gadgetinc/api-client-core";

import {
  Query,
  ExplicitNestingRequired,
  Select,
  DeepFilterNever,
  IDsList,
      ShopifyCollection,
      ShopifyCollectionSort,
      ShopifyCollectionFilter,
      AvailableShopifyCollectionSelection,
  
} from "../types.js";

import { disambiguateActionParams } from "../support.js";

export const DefaultShopifyCollectionSelection = {
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
} as const;

/**
* Produce a type that holds only the selected fields (and nested fields) of "shopifyCollection". The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyCollectionOrDefault<Options extends Selectable<AvailableShopifyCollectionSelection>> = DeepFilterNever<
  Select<
    ShopifyCollection,
    DefaultSelection<
      AvailableShopifyCollectionSelection,
      Options,
      typeof DefaultShopifyCollectionSelection
    >
  >>;

/** Options that can be passed to the `ShopifyCollectionManager#findOne` method */
export interface FindOneShopifyCollectionOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCollectionSelection;
};

/** Options that can be passed to the `ShopifyCollectionManager#maybeFindOne` method */
export interface MaybeFindOneShopifyCollectionOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCollectionSelection;
};

/** Options that can be passed to the `ShopifyCollectionManager#findMany` method */
export interface FindManyShopifyCollectionsOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCollectionSelection;
  /** Return records sorted by these sorts */
  sort?: ShopifyCollectionSort | ShopifyCollectionSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCollectionFilter | ShopifyCollectionFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};

/** Options that can be passed to the `ShopifyCollectionManager#findFirst` method */
export interface FindFirstShopifyCollectionOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCollectionSelection;
  /** Return records sorted by these sorts */
  sort?: ShopifyCollectionSort | ShopifyCollectionSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCollectionFilter | ShopifyCollectionFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};

/** Options that can be passed to the `ShopifyCollectionManager#maybeFindFirst` method */
export interface MaybeFindFirstShopifyCollectionOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCollectionSelection;
  /** Return records sorted by these sorts */
  sort?: ShopifyCollectionSort | ShopifyCollectionSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCollectionFilter | ShopifyCollectionFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};


const apiIdentifier = "shopifyCollection";
const pluralApiIdentifier = "shopifyCollections";





/** All the actions available at the collection level and record level for "shopifyCollection" */
export class ShopifyCollectionManager {
  constructor(readonly connection: GadgetConnection) {}

  
    /**
 * Finds one shopifyCollection by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
findOne: {
  <Options extends FindOneShopifyCollectionOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyCollectionOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyCollectionOrDefault<Options>
      >
    >;
  type: "findOne",
  findByVariableName: "id";
  operationName: "shopifyCollection";
  modelApiIdentifier: "shopifyCollection";
  defaultSelection: typeof DefaultShopifyCollectionSelection;
  selectionType: AvailableShopifyCollectionSelection;
  optionsType: FindOneShopifyCollectionOptions;
  schemaType: Query["shopifyCollection"];
} = Object.assign(
  async <Options extends FindOneShopifyCollectionOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyCollectionOptions>): Promise<
  GadgetRecord<
    SelectedShopifyCollectionOrDefault<Options>
  >
> => {
    return await findOneRunner<SelectedShopifyCollectionOrDefault<Options>>(
      this,
      "shopifyCollection",
      id,
      DefaultShopifyCollectionSelection,
      apiIdentifier,
      options
    ) as any;
  },
  {
    type: "findOne",
    findByVariableName: "id",
    operationName: "shopifyCollection",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultShopifyCollectionSelection,
  } as any
)

  
    /**
 * Finds one shopifyCollection by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
maybeFindOne: {
  <Options extends MaybeFindOneShopifyCollectionOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyCollectionOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyCollectionOrDefault<Options>
      > | null
    >;
  type: "maybeFindOne";
  findByVariableName: "id";
  operationName: "shopifyCollection";
  modelApiIdentifier: "shopifyCollection";
  defaultSelection: typeof DefaultShopifyCollectionSelection;
  selectionType: AvailableShopifyCollectionSelection;
  optionsType: MaybeFindOneShopifyCollectionOptions;
  schemaType: Query["shopifyCollection"];
} = Object.assign(
  async <Options extends MaybeFindOneShopifyCollectionOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyCollectionOptions>) => {
    const record = await findOneRunner<SelectedShopifyCollectionOrDefault<Options>>(
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
    defaultSelection: DefaultShopifyCollectionSelection,
  } as any
)

  
    /**
 * Finds many shopifyCollection. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findMany: {
  <Options extends FindManyShopifyCollectionsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyCollectionsOptions>):
    Promise<
      GadgetRecordList<
        SelectedShopifyCollectionOrDefault<Options>
      >
    >;
  type: "findMany";
  operationName: "shopifyCollections";
  modelApiIdentifier: "shopifyCollection";
  defaultSelection: typeof DefaultShopifyCollectionSelection;
  selectionType: AvailableShopifyCollectionSelection;
  optionsType: FindManyShopifyCollectionsOptions;
  schemaType: Query["shopifyCollection"];
} = Object.assign(
  async <Options extends FindManyShopifyCollectionsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyCollectionsOptions>):
    Promise<
      GadgetRecordList<
        SelectedShopifyCollectionOrDefault<Options>
      >
    > =>
  {
    return await findManyRunner<SelectedShopifyCollectionOrDefault<Options>>(
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
    defaultSelection: DefaultShopifyCollectionSelection,
  } as any
);

  
    /**
 * Finds the first matching shopifyCollection. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findFirst: {
  <Options extends FindFirstShopifyCollectionOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyCollectionOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyCollectionOrDefault<Options>
      >
    >;
  type: "findFirst";
  operationName: "shopifyCollections";
  modelApiIdentifier: "shopifyCollection";
  defaultSelection: typeof DefaultShopifyCollectionSelection;
  selectionType: AvailableShopifyCollectionSelection;
  optionsType: FindFirstShopifyCollectionOptions;
  schemaType: Query["shopifyCollection"];
} = Object.assign(
  async <Options extends FindFirstShopifyCollectionOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyCollectionOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyCollectionOrDefault<Options>
      >
    > =>
  {
    const list = await findManyRunner<SelectedShopifyCollectionOrDefault<Options>>(
      this,
      "shopifyCollections",
      DefaultShopifyCollectionSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      true
    );
    return list[0];
  },
  {
    type: "findFirst",
    operationName: "shopifyCollections",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultShopifyCollectionSelection,
  } as any
);

  
    /**
 * Finds the first matching shopifyCollection. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
 **/
maybeFindFirst: {
  <Options extends MaybeFindFirstShopifyCollectionOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyCollectionOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyCollectionOrDefault<Options>
      > | null
    >;
  type: "maybeFindFirst";
  operationName: "shopifyCollections";
  modelApiIdentifier: "shopifyCollection";
  defaultSelection: typeof DefaultShopifyCollectionSelection;
  selectionType: AvailableShopifyCollectionSelection;
  optionsType: MaybeFindFirstShopifyCollectionOptions;
  schemaType: Query["shopifyCollection"];
} = Object.assign(
  async <Options extends MaybeFindFirstShopifyCollectionOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyCollectionOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyCollectionOrDefault<Options>
      > | null
    > =>
  {
    const list = await findManyRunner<SelectedShopifyCollectionOrDefault<Options>>(
      this,
      "shopifyCollections",
      DefaultShopifyCollectionSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      false
    );
    return list?.[0] ?? null;
  },
  {
    type: "maybeFindFirst",
    operationName: "shopifyCollections",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultShopifyCollectionSelection,
  } as any
);

  
}
