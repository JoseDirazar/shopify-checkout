import {
  applyParams,
  preventCrossShopDataAccess,
  ActionOptions,
  SaveBannerTitleShopifyShopActionContext,
} from "gadget-server";

/**
 * @param { SaveBannerTitleShopifyShopActionContext } context
 */
export async function run({ params, record, logger, connections }) {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);

  // get the banner data passed in as custom params
  const { bannerTitle /* bannerMessage */ } = params;

  // save the banner data in a SHOP-owned metafield
  const responseTitle = await connections.shopify.current?.metafield.create({
    key: "banner_title",
    namespace: "banner_namespace",
    owner_id: record.id,
    type: "single_line_text_field",
    value: bannerTitle,
  });

  /*   const responseMessage = await connections.shopify.current?.metafield.create({
    key: "banner_message",
    namespace: "banner_message",
    owner_id: record.id,
    type: "single_line_text_field",
    value: bannerMessage,
  });
 */
  // print to the Gadget Logs
  logger.info(
    { responseTitle /* responseMessage */ },
    "add metafields response"
  );
}

// define the banner data custom params for this action
export const params = {
  bannerTitle: { type: "string" },
  /* bannerMessage: { type: "string" }, */
};

/** @type { ActionOptions } */
export const options = {
  actionType: "custom",
  triggers: { api: true },
};
