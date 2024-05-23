import type { AmbientContext } from "./AmbientContext";
import type { ActionTrigger, ActionExecutionScope } from "./types";

/** Context of the `scheduledShopifySync` action. */
export interface ScheduledShopifySyncGlobalActionContext extends AmbientContext {
  /**
  * @deprecated Use 'returnType' instead.
  * Useful for returning data from this action by setting `scope.result`.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, custom params).
  */
  params: {

};
  /**
  * An object specifying the trigger to this action (e.g. api call, scheduler etc.)
  */
  trigger: ActionTrigger;
  /**
  * @private The context of this action.
  */
  context: ScheduledShopifySyncGlobalActionContext;
};


