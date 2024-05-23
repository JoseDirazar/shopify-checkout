import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ActionTrigger } from "../types";
import { GadgetRecord, ShopifyCollection } from "@gadget-client/checkout-testing";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultShopifyCollectionServerSelection = {
    readonly __typename: true;
    readonly id: true;
    readonly createdAt: true;
    readonly updatedAt: true;
    readonly body: true;
    readonly disjunctive: true;
    readonly handle: true;
    readonly image: true;
    readonly publishedAt: true;
    readonly publishedScope: true;
    readonly rules: true;
    readonly sortOrder: true;
    readonly templateSuffix: true;
    readonly title: true;
    readonly shopifyUpdatedAt: true;
    readonly shopId: true;
    readonly shop: false;
    readonly collectionType: true;
    readonly products: false;
};
/** Context of the `create` action on the `shopifyCollection` model. */
export interface CreateShopifyCollectionActionContext extends AmbientContext {
    /**
    * The model this action is operating on
    */
    model: NotYetTyped;
    /**
    * An object specifying the `shopifyCollection` record this action is operating on.
    */
    record: GadgetRecord<Select<ShopifyCollection, DefaultShopifyCollectionServerSelection>>;
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
    context: CreateShopifyCollectionActionContext;
}
/** Context of the `update` action on the `shopifyCollection` model. */
export interface UpdateShopifyCollectionActionContext extends AmbientContext {
    /**
    * The model this action is operating on
    */
    model: NotYetTyped;
    /**
    * An object specifying the `shopifyCollection` record this action is operating on.
    */
    record: GadgetRecord<Select<ShopifyCollection, DefaultShopifyCollectionServerSelection>>;
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
    context: UpdateShopifyCollectionActionContext;
}
/** Context of the `delete` action on the `shopifyCollection` model. */
export interface DeleteShopifyCollectionActionContext extends AmbientContext {
    /**
    * The model this action is operating on
    */
    model: NotYetTyped;
    /**
    * An object specifying the `shopifyCollection` record this action is operating on.
    */
    record: GadgetRecord<Select<ShopifyCollection, DefaultShopifyCollectionServerSelection>>;
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
    context: DeleteShopifyCollectionActionContext;
}
