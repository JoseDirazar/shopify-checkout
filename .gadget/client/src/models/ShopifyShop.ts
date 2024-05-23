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
      ShopifyShop,
      ShopifyShopSort,
      ShopifyShopFilter,
      AvailableShopifyShopSelection,
      Scalars,
  
} from "../types.js";

import { disambiguateActionParams } from "../support.js";

export const DefaultShopifyShopSelection = {
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
} as const;

/**
* Produce a type that holds only the selected fields (and nested fields) of "shopifyShop". The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyShopOrDefault<Options extends Selectable<AvailableShopifyShopSelection>> = DeepFilterNever<
  Select<
    ShopifyShop,
    DefaultSelection<
      AvailableShopifyShopSelection,
      Options,
      typeof DefaultShopifyShopSelection
    >
  >>;

/** Options that can be passed to the `ShopifyShopManager#findOne` method */
export interface FindOneShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
};

/** Options that can be passed to the `ShopifyShopManager#maybeFindOne` method */
export interface MaybeFindOneShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
};

/** Options that can be passed to the `ShopifyShopManager#findMany` method */
export interface FindManyShopifyShopsOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
  /** Return records sorted by these sorts */
  sort?: ShopifyShopSort | ShopifyShopSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyShopFilter | ShopifyShopFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};

/** Options that can be passed to the `ShopifyShopManager#findFirst` method */
export interface FindFirstShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
  /** Return records sorted by these sorts */
  sort?: ShopifyShopSort | ShopifyShopSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyShopFilter | ShopifyShopFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};

/** Options that can be passed to the `ShopifyShopManager#maybeFindFirst` method */
export interface MaybeFindFirstShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
  /** Return records sorted by these sorts */
  sort?: ShopifyShopSort | ShopifyShopSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyShopFilter | ShopifyShopFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};


export interface SavePrePurchaseProductShopifyShopOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyShopSelection;
};


const apiIdentifier = "shopifyShop";
const pluralApiIdentifier = "shopifyShops";


    
  /**
   * The fully-qualified, expanded form of the inputs for executing this action.
   * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
   **/
  export type FullyQualifiedSavePrePurchaseProductShopifyShopVariables = {
          productId?: (Scalars['String'] | null) | null,
      }

  /**
   * The inputs for executing savePrePurchaseProduct on shopifyShop.
   * This is the flattened style of inputs, suitable for general use, and should be preferred.
   **/

    export type SavePrePurchaseProductShopifyShopVariables = FullyQualifiedSavePrePurchaseProductShopifyShopVariables;



/**
 * The return value from executing savePrePurchaseProduct on shopifyShop.
 * "Is a GadgetRecord of the model's type."
 **/
export type SavePrePurchaseProductShopifyShopResult<Options extends SavePrePurchaseProductShopifyShopOptions> =
  SelectedShopifyShopOrDefault<Options> extends void ? void : GadgetRecord<SelectedShopifyShopOrDefault<Options>>
;


/**
  * Executes the savePrePurchaseProduct action on one record specified by `id`. Runs the action and returns a Promise for the updated record.
  */

// Flat style overload
async function savePrePurchaseProductShopifyShop<Options extends SavePrePurchaseProductShopifyShopOptions>(
  id: string,
    variables: SavePrePurchaseProductShopifyShopVariables,

  options?: LimitToKnownKeys<Options, SavePrePurchaseProductShopifyShopOptions>
): Promise<SavePrePurchaseProductShopifyShopResult<Options>>;

// Fully qualified, nested api identifier overload
async function savePrePurchaseProductShopifyShop<Options extends SavePrePurchaseProductShopifyShopOptions>(
  id: string,
      variables: FullyQualifiedSavePrePurchaseProductShopifyShopVariables,
  
  options?: LimitToKnownKeys<Options, SavePrePurchaseProductShopifyShopOptions>
): Promise<SavePrePurchaseProductShopifyShopResult<Options>>;

// Function implementation
async function savePrePurchaseProductShopifyShop<Options extends SavePrePurchaseProductShopifyShopOptions>(
  this: ShopifyShopManager,
  id: string,
      variables: SavePrePurchaseProductShopifyShopVariables | FullyQualifiedSavePrePurchaseProductShopifyShopVariables,
  
  options?: LimitToKnownKeys<Options, SavePrePurchaseProductShopifyShopOptions>
): Promise<SavePrePurchaseProductShopifyShopResult<Options>> {
    const newVariables = disambiguateActionParams(
      this["savePrePurchaseProduct"],
       id,
      variables
    );

    
  return (await actionRunner<SelectedShopifyShopOrDefault<Options>>(
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
          type: "GadgetID",
        },
                    "productId": {
          value: newVariables.productId,
          required: false,
          type: "String",
        },
          },
    options,
    null,
    false
  ));
}

  



/** All the actions available at the collection level and record level for "shopifyShop" */
export class ShopifyShopManager {
  constructor(readonly connection: GadgetConnection) {}

  
    /**
 * Finds one shopifyShop by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
findOne: {
  <Options extends FindOneShopifyShopOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyShopOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyShopOrDefault<Options>
      >
    >;
  type: "findOne",
  findByVariableName: "id";
  operationName: "shopifyShop";
  modelApiIdentifier: "shopifyShop";
  defaultSelection: typeof DefaultShopifyShopSelection;
  selectionType: AvailableShopifyShopSelection;
  optionsType: FindOneShopifyShopOptions;
  schemaType: Query["shopifyShop"];
} = Object.assign(
  async <Options extends FindOneShopifyShopOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyShopOptions>): Promise<
  GadgetRecord<
    SelectedShopifyShopOrDefault<Options>
  >
> => {
    return await findOneRunner<SelectedShopifyShopOrDefault<Options>>(
      this,
      "shopifyShop",
      id,
      DefaultShopifyShopSelection,
      apiIdentifier,
      options
    ) as any;
  },
  {
    type: "findOne",
    findByVariableName: "id",
    operationName: "shopifyShop",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultShopifyShopSelection,
  } as any
)

  
    /**
 * Finds one shopifyShop by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
maybeFindOne: {
  <Options extends MaybeFindOneShopifyShopOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyShopOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyShopOrDefault<Options>
      > | null
    >;
  type: "maybeFindOne";
  findByVariableName: "id";
  operationName: "shopifyShop";
  modelApiIdentifier: "shopifyShop";
  defaultSelection: typeof DefaultShopifyShopSelection;
  selectionType: AvailableShopifyShopSelection;
  optionsType: MaybeFindOneShopifyShopOptions;
  schemaType: Query["shopifyShop"];
} = Object.assign(
  async <Options extends MaybeFindOneShopifyShopOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyShopOptions>) => {
    const record = await findOneRunner<SelectedShopifyShopOrDefault<Options>>(
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
    defaultSelection: DefaultShopifyShopSelection,
  } as any
)

  
    /**
 * Finds many shopifyShop. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findMany: {
  <Options extends FindManyShopifyShopsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyShopsOptions>):
    Promise<
      GadgetRecordList<
        SelectedShopifyShopOrDefault<Options>
      >
    >;
  type: "findMany";
  operationName: "shopifyShops";
  modelApiIdentifier: "shopifyShop";
  defaultSelection: typeof DefaultShopifyShopSelection;
  selectionType: AvailableShopifyShopSelection;
  optionsType: FindManyShopifyShopsOptions;
  schemaType: Query["shopifyShop"];
} = Object.assign(
  async <Options extends FindManyShopifyShopsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyShopsOptions>):
    Promise<
      GadgetRecordList<
        SelectedShopifyShopOrDefault<Options>
      >
    > =>
  {
    return await findManyRunner<SelectedShopifyShopOrDefault<Options>>(
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
    defaultSelection: DefaultShopifyShopSelection,
  } as any
);

  
    /**
 * Finds the first matching shopifyShop. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findFirst: {
  <Options extends FindFirstShopifyShopOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyShopOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyShopOrDefault<Options>
      >
    >;
  type: "findFirst";
  operationName: "shopifyShops";
  modelApiIdentifier: "shopifyShop";
  defaultSelection: typeof DefaultShopifyShopSelection;
  selectionType: AvailableShopifyShopSelection;
  optionsType: FindFirstShopifyShopOptions;
  schemaType: Query["shopifyShop"];
} = Object.assign(
  async <Options extends FindFirstShopifyShopOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyShopOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyShopOrDefault<Options>
      >
    > =>
  {
    const list = await findManyRunner<SelectedShopifyShopOrDefault<Options>>(
      this,
      "shopifyShops",
      DefaultShopifyShopSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      true
    );
    return list[0];
  },
  {
    type: "findFirst",
    operationName: "shopifyShops",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultShopifyShopSelection,
  } as any
);

  
    /**
 * Finds the first matching shopifyShop. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
 **/
maybeFindFirst: {
  <Options extends MaybeFindFirstShopifyShopOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyShopOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyShopOrDefault<Options>
      > | null
    >;
  type: "maybeFindFirst";
  operationName: "shopifyShops";
  modelApiIdentifier: "shopifyShop";
  defaultSelection: typeof DefaultShopifyShopSelection;
  selectionType: AvailableShopifyShopSelection;
  optionsType: MaybeFindFirstShopifyShopOptions;
  schemaType: Query["shopifyShop"];
} = Object.assign(
  async <Options extends MaybeFindFirstShopifyShopOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyShopOptions>):
    Promise<
      GadgetRecord<
        SelectedShopifyShopOrDefault<Options>
      > | null
    > =>
  {
    const list = await findManyRunner<SelectedShopifyShopOrDefault<Options>>(
      this,
      "shopifyShops",
      DefaultShopifyShopSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      false
    );
    return list?.[0] ?? null;
  },
  {
    type: "maybeFindFirst",
    operationName: "shopifyShops",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultShopifyShopSelection,
  } as any
);

  
    savePrePurchaseProduct = Object.assign(savePrePurchaseProductShopifyShop,
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
        type: "GadgetID",
      },
      "productId": {
        required: false,
        type: "String",
      },
    },
    hasAmbiguousIdentifier: false,
    /** @deprecated -- effects are dead, long live AAC */
    hasCreateOrUpdateEffect: false,
    paramOnlyVariables: ["productId"],
    hasReturnType: false,
    acceptsModelInput: false,
  } as unknown as {
    type: "action";
    operationName: "savePrePurchaseProductShopifyShop";
    namespace: null;
    modelApiIdentifier: "shopifyShop";
    modelSelectionField: "shopifyShop";
    isBulk: false;
    defaultSelection: typeof DefaultShopifyShopSelection;
    selectionType: AvailableShopifyShopSelection;
    optionsType: SavePrePurchaseProductShopifyShopOptions;
    schemaType:  Query["shopifyShop"];

    variablesType: (
        { id: string } &

      (
        FullyQualifiedSavePrePurchaseProductShopifyShopVariables          | SavePrePurchaseProductShopifyShopVariables      )
    )
    ;
    variables: {
              id: {
          required: true;
          type: "GadgetID";
        };
                    "productId": {
          required: false;
          type: "String";
        };
          };
    hasAmbiguousIdentifier: false;
    /** @deprecated -- effects are dead, long live AAC */
    hasCreateOrUpdateEffect: false;
    paramOnlyVariables: ["productId"];
    hasReturnType: false;
    acceptsModelInput: false;
  }
)

  
      /**
  * Executes the bulkSavePrePurchaseProduct action with the given inputs.
  */
  bulkSavePrePurchaseProduct: {
    <Options extends SavePrePurchaseProductShopifyShopOptions>(
        inputs: (FullyQualifiedSavePrePurchaseProductShopifyShopVariables | SavePrePurchaseProductShopifyShopVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, SavePrePurchaseProductShopifyShopOptions>
    ): Promise<SavePrePurchaseProductShopifyShopResult<Options>[]>;
    type: "action";
    operationName: "bulkSavePrePurchaseProductShopifyShops";
    namespace: null;
    modelApiIdentifier: "shopifyShop";
    modelSelectionField: "shopifyShops";
    isBulk: true;
    defaultSelection: typeof DefaultShopifyShopSelection;
    selectionType: AvailableShopifyShopSelection;
    optionsType: SavePrePurchaseProductShopifyShopOptions;
    schemaType: Query["shopifyShop"];
    variablesType: (FullyQualifiedSavePrePurchaseProductShopifyShopVariables | SavePrePurchaseProductShopifyShopVariables & { id: string })[];
    variables: {
        inputs: {
          required: true;
          type: "[BulkSavePrePurchaseProductShopifyShopsInput!]";
        };
      };
    hasReturnType: boolean;
    acceptsModelInput: boolean;
  } = Object.assign(
    async <Options extends SavePrePurchaseProductShopifyShopOptions>(
        inputs: (FullyQualifiedSavePrePurchaseProductShopifyShopVariables | SavePrePurchaseProductShopifyShopVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, SavePrePurchaseProductShopifyShopOptions>
    ) => {
        const fullyQualifiedInputs = inputs.map(input =>
          disambiguateActionParams(
            this["savePrePurchaseProduct"],
            undefined,
            input
          )
        );
      
      return (await actionRunner<any>(
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
          }
,
        options,
        null,
        false
      )) as any[];
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
          type: "[BulkSavePrePurchaseProductShopifyShopsInput!]",
        },
      },
      hasReturnType: false,
      acceptsModelInput: false,
    } as any
  );

  
}
