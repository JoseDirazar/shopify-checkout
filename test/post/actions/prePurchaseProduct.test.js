import { describe, expect, test } from "vitest";
import { api } from "../../api";

describe("test the savePrePurchaseProduct action", () => {
  test("should get a collection for pre purchase upsell", async () => {
    const result = await api.shopifyShop.savePrePurchaseProduct("69204050152");
    expect(result.prePurchaseProduct).toBeDefined();
  });
});
