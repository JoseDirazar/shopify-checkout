import { Controller } from "@gadgetinc/react";
import { Select } from "@shopify/polaris";
import {
  Banner,
  BlockStack,
  Button,
  Divider,
  Heading,
  Image,
  InlineLayout,
  SkeletonImage,
  SkeletonText,
  Text,
  reactExtension,
  useApi,
  useAppMetafields,
  useApplyCartLinesChange,
  useCartLines,
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const { query, i18n } = useApi();
  const applyCartLinesChange = useApplyCartLinesChange();
  const [prePurchaseProduct] = useAppMetafields();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showError, setShowError] = useState(false);
  console.log(prePurchaseProduct);
  useEffect(() => {
    if (prePurchaseProduct) {
      setLoading(true);
      query(
        `query ($id: ID!) {
          product(id: $id) {
            id
            title
            images(first: 1) {
              nodes {
                url
              }
            }
            variants(first: 250) {
              nodes {
                id
                title
                price {
                  amount
                }
              }
            }
          }
        }`,
        {
          variables: { id: prePurchaseProduct.metafield.value },
        }
      )
        .then(({ data }) => {
          console.log(data);
          setProduct(data.product);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [prePurchaseProduct]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const lines = useCartLines();

  if (loading) {
    return (
      <BlockStack spacing="loose">
        <Divider />
        <Heading level={2}>You might also like</Heading>
        <BlockStack spacing="loose">
          <InlineLayout
            spacing="base"
            columns={[64, "fill", "auto"]}
            blockAlignment="center"
          >
            <SkeletonImage aspectRatio={1} />
            <BlockStack spacing="none">
              <SkeletonText inlineSize="large" />
              <SkeletonText inlineSize="small" />
            </BlockStack>
            <Button kind="secondary" disabled={true}>
              Add
            </Button>
          </InlineLayout>
        </BlockStack>
      </BlockStack>
    );
  }

  if (!loading && !product) {
    return null;
  }

  const cartLineProductVariantIds = lines.map((item) => item.merchandise.id);
  const productInCart = !!product.variants.nodes.some(({ id }) =>
    cartLineProductVariantIds.includes(id)
  );

  if (productInCart) {
    return null;
  }

  const { images, title, variants } = product;
  console.log("variants", variants);
  const renderPrice = i18n.formatCurrency(variants.nodes[0].price.amount);
  const imageUrl =
    images.nodes[0]?.url ??
    "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_medium.png?format=webp&v=1530129081";

  return (
    <BlockStack spacing="loose">
      <Divider />
      <Heading level={2}>You might also like</Heading>
      <BlockStack spacing="loose">
        <InlineLayout
          spacing="base"
          columns={[64, "fill", "auto"]}
          blockAlignment="center"
        >
          <Image
            border="base"
            borderWidth="base"
            borderRadius="loose"
            source={imageUrl}
            description={title}
            aspectRatio={1}
          />
          <BlockStack spacing="none">
            <Text size="medium" emphasis="strong">
              {title}
            </Text>
            <Text appearance="subdued">{renderPrice}</Text>
          </BlockStack>
          {/* <Select
            label="variants"
            options={variants.nodes.map((variant) => ({
              label: `${variant.title} ${variant.price.amount}`,
              value: variant.id,
            }))}
          /> */}
          <Button
            kind="secondary"
            loading={adding}
            accessibilityLabel={`Add ${title} to cart`}
            onPress={async () => {
              setAdding(true);
              const result = await applyCartLinesChange({
                type: "addCartLine",
                merchandiseId: variants.nodes[0].id,
                quantity: 1,
              });
              setAdding(false);
              if (result.type === "error") {
                setShowError(true);
                console.error(result.message);
              }
            }}
          >
            Add
          </Button>
        </InlineLayout>
      </BlockStack>
      {showError && (
        <Banner status="critical">
          There was an issue adding this product. Please try again.
        </Banner>
      )}
    </BlockStack>
  );
}
