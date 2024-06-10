import { useFindFirst, useFindMany } from "@gadgetinc/react";
import { Layout, Page, Spinner } from "@shopify/polaris";
import { api } from "../api";
import { useEffect, useState } from "react";
import { PrePurchaseForm } from "../components/PrePurchaseForm";
import { BannerForm } from "../components/BannerForm";

export default function PrePurchasePage() {
  const [collectionOptions, setCollectionOptions] = useState([]);

  const [
    {
      data: collections,
      fetching: collectionsFetching,
      error: collectionsFetchError,
    },
  ] = useFindMany(api.shopifyCollection);
  const [{ data: shopData, fetching: shopFetching, error: shopFetchError }] =
    useFindFirst(api.shopifyShop, {
      select: {
        id: true,
        bannerTitle: true,
        bannerMessage: true,
      },
    });

  useEffect(() => {
    if (collections) {
      const options = collections.map((collection) => ({
        value: `gid://shopify/Collection/${collection.id}`,
        label: collection.title,
      }));
      setCollectionOptions(options);
    }
  }, [collections]);

  return (
    <Page title="Configure Pre-Purchase Banner">
      {collectionsFetching || shopFetching || collectionOptions.length === 0 ? (
        <Spinner size="large" />
      ) : (
        <Layout>
          {(collectionsFetchError || shopFetchError) && (
            <Layout.Section>
              <Banner title="Error loading data" tone="critical">
                {collectionsFetchError?.message || shopFetchError?.message}
              </Banner>
            </Layout.Section>
          )}
          <Layout.Section>
            <PrePurchaseForm shop={shopData} collections={collectionOptions} />
            <BannerForm shop={shopData} />
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
}
