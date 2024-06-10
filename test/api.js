import { Client } from "@gadget-client/checkout-testing";
console.log(process.env["GADGET_ENV"]);

export const api = new Client({
  environment: process.env["GADGET_ENV"] || "development",
  authenticationMode: {
    apiKey: process.env["GADGET_TEST_API_KEY"],
  },
});
