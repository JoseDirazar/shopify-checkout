import { Client } from "@gadget-client/checkout-testing";

export const api = new Client({ environment: window.gadgetConfig.environment });
