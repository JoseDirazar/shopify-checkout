// All the generated types for the "Shopify Collect" model preconditions, actions, params, etc
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger } from "../types";
import { GadgetRecord, ShopifyCollect } from "@gadget-client/checkout-testing";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultShopifyCollectServerSelection = {
  readonly __typename: true;
      readonly id: true;
      readonly createdAt: true;
      readonly updatedAt: true;
      readonly shopifyCreatedAt: true;
      readonly position: true;
      readonly sortValue: true;
      readonly shopifyUpdatedAt: true;
      readonly customCollectionId: true;
    readonly customCollection: false;
      readonly productId: true;
    readonly product: false;
      readonly shopId: true;
    readonly shop: false;
  };

  
/** Context of the `create` action on the `shopifyCollect` model. */
export interface CreateShopifyCollectActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyCollect` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyCollect, DefaultShopifyCollectServerSelection>>;
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
  params: {

};
  /**
  * @private The context of this action.
  */
  context: CreateShopifyCollectActionContext;
};


    
/** Context of the `update` action on the `shopifyCollect` model. */
export interface UpdateShopifyCollectActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyCollect` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyCollect, DefaultShopifyCollectServerSelection>>;
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
  params: {

};
  /**
  * @private The context of this action.
  */
  context: UpdateShopifyCollectActionContext;
};


    
/** Context of the `delete` action on the `shopifyCollect` model. */
export interface DeleteShopifyCollectActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyCollect` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyCollect, DefaultShopifyCollectServerSelection>>;
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
  params: {

};
  /**
  * @private The context of this action.
  */
  context: DeleteShopifyCollectActionContext;
};


  