import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  useAppMetafields,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const params = useAppMetafields();
  console.log("PARAMS:: ", params);
  return (
    <Banner title="custom-banner">
      {translate("welcome", { target: extension.target })}
    </Banner>
  );
}
