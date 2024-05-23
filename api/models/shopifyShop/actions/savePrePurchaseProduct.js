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

  // get the collectionIds passed in as custom params
  const { collectionIds } = params;
  console.log(collectionIds);
  // save each selected pre-purchase collection in a SHOP-owned metafield
  const responses = await Promise.all(
    collectionIds.map((collectionId) =>
      connections.shopify.current?.metafield.create({
        key: `pre-purchase-collection-${collectionId}`,
        namespace: "gadget-tutorial",
        owner_id: record.id,
        type: "collection_reference",
        value: collectionId,
      })
    )
  );

  console.log(responses);
  logger.info({ responses }, "add metafields responses");
}

// define a collectionIds custom param for this action
export const params = {
  collectionIds: { type: "array", items: { type: "string" } },
};

/** @type { ActionOptions } */
export const options = {
  actionType: "custom",
  triggers: { api: true },
};
