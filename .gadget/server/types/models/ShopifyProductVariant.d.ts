import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ActionTrigger } from "../types";
import { GadgetRecord, ShopifyProductVariant } from "@gadget-client/checkout-testing";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultShopifyProductVariantServerSelection = {
    readonly __typename: true;
    readonly id: true;
    readonly createdAt: true;
    readonly updatedAt: true;
    readonly selectedOptions: true;
    readonly barcode: true;
    readonly compareAtPrice: true;
    readonly shopifyCreatedAt: true;
    readonly fulfillmentService: true;
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
    readonly sku: true;
    readonly taxCode: true;
    readonly taxable: true;
    readonly title: true;
    readonly shopifyUpdatedAt: true;
    readonly weight: true;
    readonly weightUnit: true;
    readonly productId: true;
    readonly product: false;
    readonly shopId: true;
    readonly shop: false;
    readonly productImageId: true;
    readonly productImage: false;
};
/** Context of the `create` action on the `shopifyProductVariant` model. */
export interface CreateShopifyProductVariantActionContext extends AmbientContext {
    /**
    * The model this action is operating on
    */
    model: NotYetTyped;
    /**
    * An object specifying the `shopifyProductVariant` record this action is operating on.
    */
    record: GadgetRecord<Select<ShopifyProductVariant, DefaultShopifyProductVariantServerSelection>>;
    /**
    * @deprecated Use 'return' instead.
    */
    scope: ActionExecutionScope;
    /**
    * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
    */
    trigger: ActionTrigger;
    /**
    * An object containing the incoming data(this models fields) passed by triggers or user inputs.
    */
    params: {};
    /**
    * @private The context of this action.
    */
    context: CreateShopifyProductVariantActionContext;
}
/** Context of the `update` action on the `shopifyProductVariant` model. */
export interface UpdateShopifyProductVariantActionContext extends AmbientContext {
    /**
    * The model this action is operating on
    */
    model: NotYetTyped;
    /**
    * An object specifying the `shopifyProductVariant` record this action is operating on.
    */
    record: GadgetRecord<Select<ShopifyProductVariant, DefaultShopifyProductVariantServerSelection>>;
    /**
    * @deprecated Use 'return' instead.
    */
    scope: ActionExecutionScope;
    /**
    * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
    */
    trigger: ActionTrigger;
    /**
    * An object containing the incoming data(this models fields) passed by triggers or user inputs.
    */
    params: {};
    /**
    * @private The context of this action.
    */
    context: UpdateShopifyProductVariantActionContext;
}
/** Context of the `delete` action on the `shopifyProductVariant` model. */
export interface DeleteShopifyProductVariantActionContext extends AmbientContext {
    /**
    * The model this action is operating on
    */
    model: NotYetTyped;
    /**
    * An object specifying the `shopifyProductVariant` record this action is operating on.
    */
    record: GadgetRecord<Select<ShopifyProductVariant, DefaultShopifyProductVariantServerSelection>>;
    /**
    * @deprecated Use 'return' instead.
    */
    scope: ActionExecutionScope;
    /**
    * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
    */
    trigger: ActionTrigger;
    /**
    * An object containing the incoming data(this models fields) passed by triggers or user inputs.
    */
    params: {};
    /**
    * @private The context of this action.
    */
    context: DeleteShopifyProductVariantActionContext;
}
