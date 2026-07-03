import { expect, vi, describe, it, beforeEach } from "vitest";
import { getInventory } from "./inventory";

vi.mock("../shared/config/config", () => ({
  API_URL: "http://test",
  USER_ID: "1",
}));

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

const mockSuccess = (data: any) =>
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ data }),
  });

const mockError = () =>
  mockFetch.mockResolvedValue({
    ok: false,
    status: 500,
    json: async () => ({ data: [] }),
  });

beforeEach(() => {
  mockFetch.mockReset();
});

describe("getInventory", () => {
  it("Проверка успешного ответа от сервера", async () => {
    mockSuccess([{ id: 1 }]);

    const result = await getInventory();
    expect(result).toEqual([{ id: 1 }]);
  });

  it("Сервер вернул ошибку", async () => {
    mockError();

    await expect(getInventory()).rejects.toThrow();
  });

  it("Проверка URL", async () => {
    mockSuccess([]);

    await getInventory();
    expect(globalThis.fetch).toHaveBeenLastCalledWith(
      "http://test/api/inventory?user_id=1",
    );
  });
});
