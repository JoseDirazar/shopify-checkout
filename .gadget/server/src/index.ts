/**
* This is the Gadget server side types library for:
*
*        _               _               _        _            _   _             
*    ___| |__   ___  ___| | _____  _   _| |_     | |_ ___  ___| |_(_)_ __   __ _ 
*   / __| '_ \ / _ \/ __| |/ / _ \| | | | __|____| __/ _ \/ __| __| | '_ \ / _` |
*  | (__| | | |  __/ (__|   < (_) | |_| | ||_____| ||  __/\__ \ |_| | | | | (_| |
*   \___|_| |_|\___|\___|_|\_\___/ \__,_|\__|     \__\___||___/\__|_|_| |_|\__, |
*                                                                          |___/ 
*
* Built for environment `Development` at version 137
* Framework version: ^1.0.0
* Edit this app here: https://checkout-testing.gadget.dev/edit
*/
import type { Client } from "@gadget-client/checkout-testing";
import { Logger } from "./AmbientContext";

export * from "./metadataFileTypes";
export * from "./AmbientContext";
export * from "./AppConfigs";
export * from "./AppConfiguration";
export * from "./AppConnections";
export * from "./auth";
export * from "./effects";
export * as DefaultEmailTemplates from "./email-templates";
export * from "./emails";
export { InvalidStateTransitionError } from "./errors";
export * from "./global-actions";
export * from "./routes";
export * from "./state-chart";
export * from "./types";
export * from "./ActionOptions";
/**
 * @internal
 */
import { Globals, actionContextLocalStorage } from "./globals";
export * from "./models/Session";
export * from "./models/ShopifyGdprRequest";
export * from "./models/ShopifyProduct";
export * from "./models/ShopifyShop";
export * from "./models/ShopifySync";
export * from "./models/ShopifyCollection";
export * from "./models/ShopifyProductVariant";

/**
 * An instance of the Gadget logger
 */
let logger: Logger;
/**
 * An instance of the Gadget API client that has admin permissions
 */
let api: Client;

/**
 * This is used internally to set the rootLogger.
 * @internal
 */
export const setLogger = (rootLogger: Logger) => {
  Globals.logger = rootLogger;
  logger = rootLogger;
};

/**
 * This is used internally to set the client Instance
 * @internal
 */
export const setApiClient = (client: Client) => {
  api = client;
}

export {
  api, logger
};

/**
 * @internal
 */
  export {
    Globals,
    actionContextLocalStorage
  };
