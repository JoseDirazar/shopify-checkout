import { describe, expect, test } from "vitest";
import { api } from "../../api";

describe("test the post.create action", () => {
  test("should create a new post record", async () => {
    const result = await api.shopifyProduct.findOne("8787832406248");
    expect(result.id).toBeDefined();
  });
});
