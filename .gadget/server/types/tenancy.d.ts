export declare const AppTenancyKey: unique symbol;
export type AppTenant = Partial<{
    shopify: Pick<ShopifyTenant, "shopId" | "customerId">;
}>;
export type AppTenancy = Partial<{
    shopify: ShopifyTenant;
}>;
type ShopifyTenant = {
    shopId: bigint;
    domain: string;
    accessToken: string;
    apiVersion: string;
    customerId?: string;
};
export {};
