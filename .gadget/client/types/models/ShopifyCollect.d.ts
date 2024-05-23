import { GadgetConnection, GadgetRecord, GadgetRecordList, DefaultSelection, LimitToKnownKeys, Selectable } from "@gadgetinc/api-client-core";
import { Query, Select, DeepFilterNever, ShopifyCollect, ShopifyCollectSort, ShopifyCollectFilter, AvailableShopifyCollectSelection } from "../types.js";
export declare const DefaultShopifyCollectSelection: {
    readonly __typename: true;
    readonly createdAt: true;
    readonly id: true;
    readonly position: true;
    readonly shopifyCreatedAt: true;
    readonly shopifyUpdatedAt: true;
    readonly sortValue: true;
    readonly updatedAt: true;
};
/**
* Produce a type that holds only the selected fields (and nested fields) of "shopifyCollect". The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyCollectOrDefault<Options extends Selectable<AvailableShopifyCollectSelection>> = DeepFilterNever<Select<ShopifyCollect, DefaultSelection<AvailableShopifyCollectSelection, Options, typeof DefaultShopifyCollectSelection>>>;
/** Options that can be passed to the `ShopifyCollectManager#findOne` method */
export interface FindOneShopifyCollectOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyCollectSelection;
}
/** Options that can be passed to the `ShopifyCollectManager#maybeFindOne` method */
export interface MaybeFindOneShopifyCollectOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyCollectSelection;
}
/** Options that can be passed to the `ShopifyCollectManager#findMany` method */
export interface FindManyShopifyCollectsOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyCollectSelection;
    /** Return records sorted by these sorts */
    sort?: ShopifyCollectSort | ShopifyCollectSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyCollectFilter | ShopifyCollectFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
}
/** Options that can be passed to the `ShopifyCollectManager#findFirst` method */
export interface FindFirstShopifyCollectOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyCollectSelection;
    /** Return records sorted by these sorts */
    sort?: ShopifyCollectSort | ShopifyCollectSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyCollectFilter | ShopifyCollectFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** Options that can be passed to the `ShopifyCollectManager#maybeFindFirst` method */
export interface MaybeFindFirstShopifyCollectOptions {
    /** Select fields other than the defaults of the record to return */
    select?: AvailableShopifyCollectSelection;
    /** Return records sorted by these sorts */
    sort?: ShopifyCollectSort | ShopifyCollectSort[] | null;
    /** Only return records matching these filters. */
    filter?: ShopifyCollectFilter | ShopifyCollectFilter[] | null;
    /** Only return records matching this freeform search string */
    search?: string | null;
}
/** All the actions available at the collection level and record level for "shopifyCollect" */
export declare class ShopifyCollectManager {
    readonly connection: GadgetConnection;
    constructor(connection: GadgetConnection);
    /**
 * Finds one shopifyCollect by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
    findOne: {
        <Options extends FindOneShopifyCollectOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyCollectOptions>): Promise<GadgetRecord<SelectedShopifyCollectOrDefault<Options>>>;
        type: "findOne";
        findByVariableName: "id";
        operationName: "shopifyCollect";
        modelApiIdentifier: "shopifyCollect";
        defaultSelection: typeof DefaultShopifyCollectSelection;
        selectionType: AvailableShopifyCollectSelection;
        optionsType: FindOneShopifyCollectOptions;
        schemaType: Query["shopifyCollect"];
    };
    /**
 * Finds one shopifyCollect by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
    maybeFindOne: {
        <Options extends MaybeFindOneShopifyCollectOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyCollectOptions>): Promise<GadgetRecord<SelectedShopifyCollectOrDefault<Options>> | null>;
        type: "maybeFindOne";
        findByVariableName: "id";
        operationName: "shopifyCollect";
        modelApiIdentifier: "shopifyCollect";
        defaultSelection: typeof DefaultShopifyCollectSelection;
        selectionType: AvailableShopifyCollectSelection;
        optionsType: MaybeFindOneShopifyCollectOptions;
        schemaType: Query["shopifyCollect"];
    };
    /**
 * Finds many shopifyCollect. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
    findMany: {
        <Options extends FindManyShopifyCollectsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyCollectsOptions>): Promise<GadgetRecordList<SelectedShopifyCollectOrDefault<Options>>>;
        type: "findMany";
        operationName: "shopifyCollects";
        modelApiIdentifier: "shopifyCollect";
        defaultSelection: typeof DefaultShopifyCollectSelection;
        selectionType: AvailableShopifyCollectSelection;
        optionsType: FindManyShopifyCollectsOptions;
        schemaType: Query["shopifyCollect"];
    };
    /**
 * Finds the first matching shopifyCollect. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
    findFirst: {
        <Options extends FindFirstShopifyCollectOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyCollectOptions>): Promise<GadgetRecord<SelectedShopifyCollectOrDefault<Options>>>;
        type: "findFirst";
        operationName: "shopifyCollects";
        modelApiIdentifier: "shopifyCollect";
        defaultSelection: typeof DefaultShopifyCollectSelection;
        selectionType: AvailableShopifyCollectSelection;
        optionsType: FindFirstShopifyCollectOptions;
        schemaType: Query["shopifyCollect"];
    };
    /**
 * Finds the first matching shopifyCollect. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
 **/
    maybeFindFirst: {
        <Options extends MaybeFindFirstShopifyCollectOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyCollectOptions>): Promise<GadgetRecord<SelectedShopifyCollectOrDefault<Options>> | null>;
        type: "maybeFindFirst";
        operationName: "shopifyCollects";
        modelApiIdentifier: "shopifyCollect";
        defaultSelection: typeof DefaultShopifyCollectSelection;
        selectionType: AvailableShopifyCollectSelection;
        optionsType: MaybeFindFirstShopifyCollectOptions;
        schemaType: Query["shopifyCollect"];
    };
}
