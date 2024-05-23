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
      ShopifyProductVariant,
      ShopifyProductVariantSort,
      ShopifyProductVariantFilter,
      AvailableShopifyProductVariantSelection,
  
} from "../types.js";

import { disambiguateActionParams } from "../support.js";

export const DefaultShopifyProductVariantSelection = {
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
} as const;

/**
* Produce a type that holds only the selected fields (and nested fields) of "shopifyProductVariant". The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyProductVariantOrDefault<Options extends Selectable<AvailableShopifyProductVariantSelection>> = DeepFilterNever<
  Select<
    ShopifyProductVariant,
    DefaultSelection<
      AvailableShopifyProductVariantSelection,
      Options,
      typeof DefaultShopifyProductVariantSelection
    >
  >>;

/** Options that can be passed to the `ShopifyProductVariantManager#findOne` method */
export interface FindOneShopifyProductVariantOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductVariantSelection;
};

/** Options that can be passed to the `ShopifyProductVariantManager#maybeFindOne` method */
export interface MaybeFindOneShopifyProductVariantOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductVariantSelection;
};

/** Options that can be passed to the `ShopifyProductVariantManager#findMany` method */
export interface FindManyShopifyProductVariantsOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductVariantSelection;
  /** Return records sorted by these sorts */
  sort?: ShopifyProductVariantSort | ShopifyProductVariantSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyProductVariantFilter | ShopifyProductVariantFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};

/** Options that can be passed to the `ShopifyProductVariantManager#findFirst` method */
export interface FindFirstShopifyProductVariantOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductVariantSelection;
  /** Return records sorted by these sorts */
  sort?: ShopifyProductVariantSort | ShopifyProductVariantSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyProductVariantFilter | ShopifyProductVariantFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};

/** Options that can be passed to the `ShopifyProductVariantManager#maybeFindFirst` method */
export interface MaybeFindFirstShopifyProductVariantOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyProductVariantSelection;
  /** Return records sorted by these sorts */
  sort?: ShopifyProductVariantSort | ShopifyProductVariantSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyProductVariantFilter | ShopifyProductVariantFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};


const apiIdentifier = "shopifyProductVariant";
const pluralApiIdentifier = "shopifyProductVariants";





/** All the actions available at the collection level and record level for "shopifyProductVariant" */
export class ShopifyProductVariantManager {
  constructor(readonly connection: GadgetConnection) {}

  
    /**
 * Finds one shopifyProductVariant by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
findOne: {
  <Options extends FindOneShopifyProductVariantOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyProductVariantOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyProductVariantOrDefault<Options>
      >
    >;
  type: "findOne",
  findByVariableName: "id";
  operationName: "shopifyProductVariant";
  modelApiIdentifier: "shopifyProductVariant";
  defaultSelection: typeof DefaultShopifyProductVariantSelection;
  selectionType: AvailableShopifyProductVariantSelection;
  optionsType: FindOneShopifyProductVariantOptions;
  schemaType: Query["shopifyProductVariant"];
} = Object.assign(
  async <Options extends FindOneShopifyProductVariantOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyProductVariantOptions>): Promise<
  GadgetRecord<
    SelectedShopifyProductVariantOrDefault<Options>
  >
> => {
    return await findOneRunner<SelectedShopifyProductVariantOrDefault<Options>>(
      this,
      "shopifyProductVariant",
      id,
      DefaultShopifyProductVariantSelection,
      apiIdentifier,
      options
    ) as any;
  },
  {
    type: "findOne",
    findByVariableName: "id",
    operationName: "shopifyProductVariant",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultShopifyProductVariantSelection,
  } as any
)

  
    /**
 * Finds one shopifyProductVariant by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
maybeFindOne: {
  <Options extends MaybeFindOneShopifyProductVariantOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyProductVariantOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyProductVariantOrDefault<Options>
      > | null
    >;
  type: "maybeFindOne";
  findByVariableName: "id";
  operationName: "shopifyProductVariant";
  modelApiIdentifier: "shopifyProductVariant";
  defaultSelection: typeof DefaultShopifyProductVariantSelection;
  selectionType: AvailableShopifyProductVariantSelection;
  optionsType: MaybeFindOneShopifyProductVariantOptions;
  schemaType: Query["shopifyProductVariant"];
} = Object.assign(
  async <Options extends MaybeFindOneShopifyProductVariantOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyProductVariantOptions>) => {
    const record = await findOneRunner<SelectedShopifyProductVariantOrDefault<Options>>(
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
    defaultSelection: DefaultShopifyProductVariantSelection,
  } as any
)

  
    /**
 * Finds many shopifyProductVariant. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findMany: {
  <Options extends FindManyShopifyProductVariantsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyProductVariantsOptions>):
    Promise<
      GadgetRecordList<
        SelectedShopifyProductVariantOrDefault<Options>
      >
    >;
  type: "findMany";
  operationName: "shopifyProductVariants";
  modelApiIdentifier: "shopifyProductVariant";
  defaultSelection: typeof DefaultShopifyProductVariantSelection;
  selectionType: AvailableShopifyProductVariantSelection;
  optionsType: FindManyShopifyProductVariantsOptions;
  schemaType: Query["shopifyProductVariant"];
} = Object.assign(
  async <Options extends FindManyShopifyProductVariantsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyProductVariantsOptions>):
    Promise<
      GadgetRecordList<
        SelectedShopifyProductVariantOrDefault<Options>
      >
    > =>
  {
    return await findManyRunner<SelectedShopifyProductVariantOrDefault<Options>>(
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
    defaultSelection: DefaultShopifyProductVariantSelection,
  } as any
);

  
    /**
 * Finds the first matching shopifyProductVariant. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findFirst: {
  <Options extends FindFirstShopifyProductVariantOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyProductVariantOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyProductVariantOrDefault<Options>
      >
    >;
  type: "findFirst";
  operationName: "shopifyProductVariants";
  modelApiIdentifier: "shopifyProductVariant";
  defaultSelection: typeof DefaultShopifyProductVariantSelection;
  selectionType: AvailableShopifyProductVariantSelection;
  optionsType: FindFirstShopifyProductVariantOptions;
  schemaType: Query["shopifyProductVariant"];
} = Object.assign(
  async <Options extends FindFirstShopifyProductVariantOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyProductVariantOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyProductVariantOrDefault<Options>
      >
    > =>
  {
    const list = await findManyRunner<SelectedShopifyProductVariantOrDefault<Options>>(
      this,
      "shopifyProductVariants",
      DefaultShopifyProductVariantSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      true
    );
    return list[0];
  },
  {
    type: "findFirst",
    operationName: "shopifyProductVariants",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultShopifyProductVariantSelection,
  } as any
);

  
    /**
 * Finds the first matching shopifyProductVariant. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
 **/
maybeFindFirst: {
  <Options extends MaybeFindFirstShopifyProductVariantOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyProductVariantOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyProductVariantOrDefault<Options>
      > | null
    >;
  type: "maybeFindFirst";
  operationName: "shopifyProductVariants";
  modelApiIdentifier: "shopifyProductVariant";
  defaultSelection: typeof DefaultShopifyProductVariantSelection;
  selectionType: AvailableShopifyProductVariantSelection;
  optionsType: MaybeFindFirstShopifyProductVariantOptions;
  schemaType: Query["shopifyProductVariant"];
} = Object.assign(
  async <Options extends MaybeFindFirstShopifyProductVariantOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyProductVariantOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyProductVariantOrDefault<Options>
      > | null
    > =>
  {
    const list = await findManyRunner<SelectedShopifyProductVariantOrDefault<Options>>(
      this,
      "shopifyProductVariants",
      DefaultShopifyProductVariantSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      false
    );
    return list?.[0] ?? null;
  },
  {
    type: "maybeFindFirst",
    operationName: "shopifyProductVariants",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultShopifyProductVariantSelection,
  } as any
);

  
}
