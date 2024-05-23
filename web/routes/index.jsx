import {
  useFindFirst,
  useFindMany,
  useActionForm,
  Controller,
} from "@gadgetinc/react";
import {
  Banner,
  FooterHelp,
  Layout,
  Link,
  Page,
  Select,
  Spinner,
  Form,
  Button,
  FormLayout,
  SkeletonDisplayText,
  Card,
} from "@shopify/polaris";
import { api } from "../api";
import { useEffect, useState } from "react";

const PrePurchaseForm = ({ collections, shop }) => {
  // useActionForm used to handle form state and submission
  const { submit, control, formState, error, setValue, watch } = useActionForm(
    api.shopifyShop.savePrePurchaseProduct,
    {
      findBy: shop.id,
      select: {
        id: true,
        prePurchaseProduct: true,
      },
      // send collectionIds as custom params
      send: ["id", "collectionIds"],
    }
  );

  // use watch to listen for updates to the form state
  const updateCollectionIds = watch("shopifyShop.prePurchaseProduct") || [];
  console.log(updateCollectionIds);
  // save as collectionIds value in form state to send custom params
  useEffect(() => {
    setValue("collectionIds", updateCollectionIds);
  }, [updateCollectionIds]);

  return (
    <Form onSubmit={submit}>
      <FormLayout>
        {formState?.isSubmitSuccessful && (
          <Banner title="Pre-purchase collections saved!" tone="success" />
        )}
        {error && (
          <Banner title="Error saving selection" tone="critical">
            {error.message}
          </Banner>
        )}
        {formState?.isLoading ? (
          <SkeletonDisplayText size="large" />
        ) : (
          <Controller
            name="shopifyShop.prePurchaseProduct"
            control={control}
            required
            render={({ field }) => {
              const { ref, ...fieldProps } = field;
              console.log("field", field);
              return (
                <Select
                  label="Collections for pre-purchase offer"
                  placeholder="-No collection selected-"
                  options={collections}
                  disabled={formState.isSubmitting}
                  {...fieldProps}
                  onChange={(value) => field.onChange([...new Set(value)])}
                  multiple
                />
              );
            }}
          />
        )}

        <Button submit disabled={formState.isSubmitting} variant="primary">
          Save
        </Button>

        {/* {updateCollectionIds.length > 0 && (
          <Card title="Selected Collections" sectioned>
            {updateCollectionIds.map((collectionId, index) => {
              const collection = collections.find(
                (col) => col.value === collectionId
              );
              return (
                <Card key={crypto.randomUUID()}>
                  <p>{collection?.label}</p>
                </Card>
              );
            })}
          </Card>
        )} */}
      </FormLayout>
    </Form>
  );
};

export default function () {
  const [collectionOptions, setCollectionOptions] = useState([]);

  // use the Gadget React hooks to fetch collections as options for Select component
  const [
    {
      data: collections,
      fetching: collectionsFetching,
      error: collectionsFetchError,
    },
  ] = useFindMany(api.shopifyCollection, {
    select: {
      id: true,
      title: true,
    },
  });

  // get the current shop id (shop tenancy applied automatically, only one shop available)
  const [{ data: shopData, fetching: shopFetching, error: shopFetchError }] =
    useFindFirst(api.shopifyShop, {
      select: {
        id: true,
      },
    });

  // a React useEffect hook to build collection options for the Select component
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
    <Page title="Select collections for pre-purchase offer">
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
          </Layout.Section>
          <Layout.Section>
            <FooterHelp>
              <p>
                Powered by{" "}
                <Link url="https://gadget.dev" external>
                  gadget.dev
                </Link>
              </p>
            </FooterHelp>
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
}
