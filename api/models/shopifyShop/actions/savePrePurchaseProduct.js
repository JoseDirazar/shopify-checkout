import {
  applyParams,
  preventCrossShopDataAccess,
  ActionOptions,
  SavePrePurchaseProductShopifyShopActionContext,
} from "gadget-server";

/**
 * @param { SavePrePurchaseProductShopifyShopActionContext } context
 */
export async function run({ params, record, logger, connections }) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);

  // get the collection id passed in as a custom param
  const { collectionId } = params;

  // save the selected pre-purchase collection in a SHOP-owned metafield
  // https://www.npmjs.com/package/shopify-api-node#metafields
  const response = await connections.shopify.current?.metafield.create({
    key: "pre-purchase-product",
    namespace: "gadget-tutorial",
    owner_id: record.id,
    type: "collection_reference",
    value: collectionId,
  });
  //console.log(response);
  // print to the Gadget Logs
  logger.info({ response }, "add metafields response");
}

// define a collectionId custom param for this action
export const params = {
  collectionId: { type: "string" },
};

/** @type { ActionOptions } */
export const options = {
  actionType: "custom",
  triggers: { api: true },
};
