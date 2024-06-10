import {
  Banner,
  BlockStack,
  Button,
  Divider,
  Heading,
  Image,
  InlineLayout,
  Select,
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

  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState({});
  const [showError, setShowError] = useState(false);
  const [selectedVariantIds, setSelectedVariantIds] = useState({});

  useEffect(() => {
    const id = prePurchaseProduct?.metafield?.value;
    if (id) {
      setLoading(true);
      query(
        `query collectionInfo {
          collection(id: "${id}") {
            id
            title
            products (first: 3) {
              nodes {
                id
                images (first: 1) {
                  nodes {
                    url
                  }
                }
                title
                variants (first: 10) {
                  nodes {
                    id
                    title
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }`
      )
        .then(({ data }) => {
          const collection = data.collection;
          console.log("collection", collection);
          setCollection(collection);

          const defaultVariantIds = {};
          collection.products.nodes.forEach((product) => {
            defaultVariantIds[product.id] = product.variants.nodes[0].id;
          });
          setSelectedVariantIds(defaultVariantIds);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [prePurchaseProduct, query]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const lines = useCartLines();

  if (loading) {
    return <Loader />;
  }

  if (!loading && !collection) {
    return null;
  }

  const cartLineProductVariantIds = lines.map((item) => item.merchandise.id);

  const handleVariantChange = (productId, variantId) => {
    setSelectedVariantIds((prev) => ({ ...prev, [productId]: variantId }));
  };

  const handleAddToCart = async (productId) => {
    const variantId = selectedVariantIds[productId];
    setAdding((prev) => ({ ...prev, [productId]: true }));
    const result = await applyCartLinesChange({
      type: "addCartLine",
      merchandiseId: variantId,
      quantity: 1,
    });
    setAdding((prev) => ({ ...prev, [productId]: false }));
    if (result.type === "error") {
      setShowError(true);
      console.error(result.message);
    }
  };

  return (
    <BlockStack spacing="loose">
      <Divider />
      <Heading level={2}>{collection.title}</Heading>
      {collection.products.nodes.map((product) => {
        const { id, images, title, variants } = product;
        const imageUrl =
          images.nodes[0]?.url ??
          "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_medium.png?format=webp&v=1530129081";
        const productInCart = variants.nodes.some(({ id }) =>
          cartLineProductVariantIds.includes(id)
        );

        if (productInCart) {
          return null;
        }

        const variantOptions = variants.nodes.map((variant) => ({
          label: `${variant.title} - ${i18n.formatCurrency(
            variant.price.amount
          )}`,
          value: variant.id,
        }));

        const selectedVariantId =
          selectedVariantIds[id] || variantOptions[0].value;

        return (
          <InlineLayout
            key={id}
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
            <BlockStack spacing="extraTight">
              <Select
                label={title ? title : select}
                options={variantOptions}
                value={selectedVariantId}
                onChange={(value) => handleVariantChange(id, value)}
                labelInLine
              />
            </BlockStack>
            <Button
              appearance="monochrome"
              loading={adding[id]}
              accessibilityLabel={`Add ${title} to cart`}
              onPress={() => handleAddToCart(id)}
            >
              Add
            </Button>
          </InlineLayout>
        );
      })}
      {showError && (
        <Banner status="critical">
          There was an issue adding this product. Please try again.
        </Banner>
      )}
    </BlockStack>
  );
}

function Loader() {
  return (
    <BlockStack spacing="loose">
      <Divider />
      <Heading level={2}>You might also like</Heading>
      {[...Array(3)].map((_, index) => (
        <InlineLayout
          key={index}
          spacing="base"
          columns={[34, "fill", "auto"]}
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
      ))}
    </BlockStack>
  );
}
