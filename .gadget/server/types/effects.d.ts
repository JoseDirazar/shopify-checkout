import { GadgetRecord } from "@gadgetinc/api-client-core";
import type { AnyParams } from "./types";
export declare function createGadgetRecord<Shape>(apiIdentifier: string, data: Shape): GadgetRecord<Shape & {
    __typename: string;
}>;
/**
 * Applies incoming API params (your model’s fields) to a record
 *
 * @param params - data passed from API calls, webhook events, or direct user inputs.
 * @param record - object used to pass params to
 */
export declare function applyParams(params: AnyParams, record: GadgetRecord<any>): void;
/**
 * Saves record to the database:
 * 1. Checks field validations of a given record, then saves the record to the database.
 * 2. Uses your apps Internal API to persist data. This API quickly interacts with data without running any business logic.
 *
 * @param record - object saved to the database
 */
export declare function save(record: GadgetRecord<any>): Promise<void>;
/**
 * Deletes record from the database.
 *
 * @param record - object deleted from the database
 */
export declare function deleteRecord(record: GadgetRecord<any>): Promise<void>;
export declare const ShopifyShopState: {
    Installed: {
        created: string;
    };
    Uninstalled: {
        created: string;
    };
};
export declare const ShopifySyncState: {
    Created: string;
    Running: string;
    Completed: string;
    Errored: string;
};
export declare const ShopifyBulkOperationState: {
    Created: string;
    Completed: string;
    Canceled: string;
    Failed: string;
    Expired: string;
};
export declare const ShopifySellingPlanGroupProductVariantState: {
    Started: string;
    Created: string;
    Deleted: string;
};
export declare const ShopifySellingPlanGroupProductState: {
    Started: string;
    Created: string;
    Deleted: string;
};
export declare function transitionState(record: GadgetRecord<any>, transition: {
    from?: string | Record<string, string>;
    to: string | Record<string, string>;
}): void;
/**
 * The following is used to power shopifySync model.
 * Learn more about syncing visit our docs: https://docs.gadget.dev/guides/plugins/shopify/syncing-shopify-data#syncing
 */
export declare function shopifySync(params: AnyParams, record: GadgetRecord<any>): Promise<void>;
export declare function abortSync(params: AnyParams, record: GadgetRecord<any>): Promise<void>;
/**
 * Applicable for multi-tenant Shopify apps(public apps), or Shopify Customer Extension apps
 * Enforces that the given record is only accessible by the current shop or customer
 *
 * For new records: sets the the current session's `shopId` to the record. If the tenant is a customer then will set the current sessions' customerId to the record.
 * For existing records: Verifies the record objects `shopId` and/or `customerId` matches the one from the current session.
 *
 * *
 * @param params - incoming data validated against the current `shopId`
 * @param record - record used to validate or set the `shopId` on
 * @param {Object} options - Additional options for cross-shop or cross-customer validation
 * @param {string} options.shopBelongsToField - Specifies which related model is used for cross-shop validation.
 * @param {string} options.customerBelongsToField - Specifies which related model is used for cross-customer validation.
 * @param {boolean} options.enforceCustomerTenancy - Whether or not to enforce customer tenacy. Defaults to true.
 */
export declare function preventCrossShopDataAccess(params: AnyParams, record: GadgetRecord<any>, options?: {
    shopBelongsToField?: string;
    customerBelongsToField?: string;
    enforceCustomerTenancy?: boolean;
}): Promise<void>;
/**
 * Updates the state of a `bulkOperation` record from Shopify when the operation completes.
 *
 * @param record - the `bulkOperation` record updated
 */
export declare function finishBulkOperation(record: GadgetRecord<any>): Promise<void>;
/**
 * Syncs Shopify models across all models
 *
 * @param params - list of Shopify app credentials to sync data from
 * @param syncSince - starting point for data sync (default: all time)
 * @param models - list of model names to sync data from
 * @param force - enforces syncswithout checking if they're up to date
 * @param startReason - a string reason stored on the created 'shopifySync' records
 */
export declare function globalShopifySync(params: {
    apiKeys: string[];
    syncSince: string;
    models: string[];
    force: boolean;
    startReason: string;
}): Promise<void>;
export declare function legacySetUser(): void;
export declare function legacyUnsetUser(): void;
export declare function legacySuccessfulAuthentication(params: AnyParams): Promise<void>;
export declare enum FieldType {
    ID = "ID",
    Number = "Number",
    String = "String",
    Enum = "Enum",
    RichText = "RichText",
    DateTime = "DateTime",
    Email = "Email",
    URL = "URL",
    Money = "Money",
    File = "File",
    Color = "Color",
    Password = "Password",
    Computed = "Computed",
    HasManyThrough = "HasManyThrough",
    BelongsTo = "BelongsTo",
    HasMany = "HasMany",
    HasOne = "HasOne",
    Boolean = "Boolean",
    Model = "Model",
    Object = "Object",
    Array = "Array",
    JSON = "JSON",
    Code = "Code",
    EncryptedString = "EncryptedString",
    Vector = "Vector",
    /**
     * Any value at all.
     * Prefer FieldType.JSON where possible, it's more descriptive.
     */
    Any = "Any",
    Null = "Null",
    RecordState = "RecordState",
    RoleAssignments = "RoleAssignments"
}
