import { Controller, useActionForm } from "@gadgetinc/react";
import {
  Banner,
  Button,
  Form,
  FormLayout,
  Select,
  SkeletonDisplayText,
} from "@shopify/polaris";
import { api } from "../api";
import { useEffect } from "react";

export const PrePurchaseForm = ({ collections, shop }) => {
  const { submit, control, formState, error, setValue, watch } = useActionForm(
    api.shopifyShop.savePrePurchaseProduct,
    {
      findBy: shop.id,
      select: {
        id: true,
        prePurchaseProduct: true,
      },
      send: ["id", "collectionId"],
    }
  );

  const updateCollectionId = watch("shopifyShop.prePurchaseProduct");

  useEffect(() => {
    setValue("collectionId", updateCollectionId);
  }, [updateCollectionId]);

  return (
    <Form onSubmit={submit}>
      <FormLayout>
        {formState?.isSubmitSuccessful && (
          <Banner title="Pre-purchase collection saved!" tone="success" />
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
              return (
                <Select
                  label="Collection for pre-purchase offer"
                  placeholder="-No collection selected-"
                  options={collections}
                  disabled={formState.isSubmitting}
                  {...fieldProps}
                />
              );
            }}
          />
        )}

        <Button submit disabled={formState.isSubmitting} variant="primary">
          Save
        </Button>
      </FormLayout>
    </Form>
  );
};
