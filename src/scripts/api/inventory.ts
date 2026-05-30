import { API_URL, USER_ID } from "../shared/config/config";
import type { RentItem } from "../types/inventory";

export const getInventory = async (): Promise<RentItem[]> => {
  try {
    const response = await fetch(`${API_URL}/api/inventory?user_id=${USER_ID}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const { data } = (await response.json()) as { data: RentItem[] };

    if (!Array.isArray(data)) {
      throw new Error("Неверный формат данных от сервера");
    }

    return data;
  } catch (error) {
    console.error("[API] Ошибка загрузки инвентаря:", error);
    throw new Error("Не удалось загрузить список инструментов");
  }
};
