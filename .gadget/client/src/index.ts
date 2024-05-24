/**
* This is the Gadget API client library for:
*
*        _               _               _        _            _   _             
*    ___| |__   ___  ___| | _____  _   _| |_     | |_ ___  ___| |_(_)_ __   __ _ 
*   / __| '_ \ / _ \/ __| |/ / _ \| | | | __|____| __/ _ \/ __| __| | '_ \ / _` |
*  | (__| | | |  __/ (__|   < (_) | |_| | ||_____| ||  __/\__ \ |_| | | | | (_| |
*   \___|_| |_|\___|\___|_|\_\___/ \__,_|\__|     \__\___||___/\__|_|_| |_|\__, |
*                                                                          |___/ 
*
* Built for environment "Development" at version 421
* API docs: https://docs.gadget.dev/api/checkout-testing
* Edit this app here: https://checkout-testing.gadget.app/edit
*/
export {
  BrowserSessionStorageType, GadgetClientError, GadgetConnection, GadgetInternalError, GadgetOperationError, GadgetRecord,
  GadgetRecordList, GadgetValidationError, InvalidRecordError
} from "@gadgetinc/api-client-core";

export type { AuthenticationModeOptions, BrowserSessionAuthenticationModeOptions, ClientOptions, InvalidFieldError, Select } from "@gadgetinc/api-client-core";

export * from "./Client.js";
export * from "./types.js";

declare global {
  interface Window {
    gadgetConfig: {
      apiKeys: {
        shopify: string;
      };
      environment: string;
      env: Record<string, any>;
      authentication?: {
        signInPath: string;
        redirectOnSuccessfulSignInPath: string;
      }
    };
  }
}
