import type { Category, Status } from "../../types/inventory";

export const categoryLabels: Record<Category, string> = {
  gas_tools: "Бензоинструмент",
  electric_tools: "Электроинтсрумент",
};

export const statusLabels: Record<Status, string> = {
  available: "Доступен",
  rented: "Арендован",
  maintenance: "На обслуживании",
};
