import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, ShopifyProductVariant, ShopifyProductVariantSort, ShopifyProductVariantFilter, AvailableShopifyProductVariantSelection } from "../types.js";
export declare const DefaultShopifyProductVariantSelection: {
    readonly __typename: true;
    readonly barcode: true;
    readonly compareAtPrice: true;
    readonly createdAt: true;
    readonly fulfillmentService: true;
    readonly id: true;
    readonly inventoryManagement: true;
    readonly inventoryPolicy: true;
    readonly inventoryQuantity: true;
    readonly option1: true;
    readonly option2: true;
    readonly option3: true;
    readonly position: true;
    readonly presentmentPrices: true;
    readonly price: true;
    readonly requiresShipping: true;
    readonly selectedOptions: true;
    readonly shopifyCreatedAt: true;
    readonly shopifyUpdatedAt: true;
    readonly sku: true;
    readonly taxCode: true;
    readonly taxable: true;
    readonly title: true;
    readonly updatedAt: true;
    readonly weight: true;
    readonly weightUnit: true;
};
/**
* Produce a type that holds only the selected fields (and nested fields) of "shopifyProductVariant". The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyProductVariantOrDefault<Options extends Selectable<AvailableShopifyProductVariantSelection>> = DeepFilterNever<Select<ShopifyProductVariant, DefaultSelection<AvailableShopifyProductVariantSelection, Options, typeof DefaultShopifyProductVariantSelection>>>;
/** Options that can be passed to the `ShopifyProductVariantManager#findOne` method */
export interface FindOneShopifyProductVariantOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyProductVariantSelection;
}
/** Options that can be passed to the `ShopifyProductVariantManager#maybeFindOne` method */
export interface MaybeFindOneShopifyProductVariantOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyProductVariantSelection;
}
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
}
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
}
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
}
/** All the actions available at the collection level and record level for "shopifyProductVariant" */
export declare class ShopifyProductVariantManager {
    readonly connection: GadgetConnection;
    constructor(connection: GadgetConnection);
    /**
 * Finds one shopifyProductVariant by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
    findOne: {
        <Options extends FindOneShopifyProductVariantOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyProductVariantOptions>): Promise<GadgetRecord<SelectedShopifyProductVariantOrDefault<Options>>>;
        type: "findOne";
        findByVariableName: "id";
        operationName: "shopifyProductVariant";
        modelApiIdentifier: "shopifyProductVariant";
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        selectionType: AvailableShopifyProductVariantSelection;
        optionsType: FindOneShopifyProductVariantOptions;
        schemaType: Query["shopifyProductVariant"];
    };
    /**
 * Finds one shopifyProductVariant by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
    maybeFindOne: {
        <Options extends MaybeFindOneShopifyProductVariantOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyProductVariantOptions>): Promise<GadgetRecord<SelectedShopifyProductVariantOrDefault<Options>> | null>;
        type: "maybeFindOne";
        findByVariableName: "id";
        operationName: "shopifyProductVariant";
        modelApiIdentifier: "shopifyProductVariant";
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        selectionType: AvailableShopifyProductVariantSelection;
        optionsType: MaybeFindOneShopifyProductVariantOptions;
        schemaType: Query["shopifyProductVariant"];
    };
    /**
 * Finds many shopifyProductVariant. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
    findMany: {
        <Options extends FindManyShopifyProductVariantsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyProductVariantsOptions>): Promise<GadgetRecordList<SelectedShopifyProductVariantOrDefault<Options>>>;
        type: "findMany";
        operationName: "shopifyProductVariants";
        modelApiIdentifier: "shopifyProductVariant";
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        selectionType: AvailableShopifyProductVariantSelection;
        optionsType: FindManyShopifyProductVariantsOptions;
        schemaType: Query["shopifyProductVariant"];
    };
    /**
 * Finds the first matching shopifyProductVariant. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
    findFirst: {
        <Options extends FindFirstShopifyProductVariantOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyProductVariantOptions>): Promise<GadgetRecord<SelectedShopifyProductVariantOrDefault<Options>>>;
        type: "findFirst";
        operationName: "shopifyProductVariants";
        modelApiIdentifier: "shopifyProductVariant";
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        selectionType: AvailableShopifyProductVariantSelection;
        optionsType: FindFirstShopifyProductVariantOptions;
        schemaType: Query["shopifyProductVariant"];
    };
    /**
 * Finds the first matching shopifyProductVariant. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
 **/
    maybeFindFirst: {
        <Options extends MaybeFindFirstShopifyProductVariantOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyProductVariantOptions>): Promise<GadgetRecord<SelectedShopifyProductVariantOrDefault<Options>> | null>;
        type: "maybeFindFirst";
        operationName: "shopifyProductVariants";
        modelApiIdentifier: "shopifyProductVariant";
        defaultSelection: typeof DefaultShopifyProductVariantSelection;
        selectionType: AvailableShopifyProductVariantSelection;
        optionsType: MaybeFindFirstShopifyProductVariantOptions;
        schemaType: Query["shopifyProductVariant"];
    };
}
