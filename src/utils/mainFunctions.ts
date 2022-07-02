import { ItemInterface } from "../interface/ItemInterface";
import { ItemOutputResultInterface } from "../interface/ItemOutputResultInterface";
import {
  getArrayWithEachItemPrice,
  getRoundedNumberWithTwoDecimals,
  getSerializedData,
  getSum,
} from "./utils";

export const getPriceOfItems = (input: string, items: ItemInterface[]) => {
  const arrayWithEachItemPrice = getArrayWithEachItemPrice(input, items);

  const sum: number = getSum(arrayWithEachItemPrice);

  return getRoundedNumberWithTwoDecimals(sum);
};

export const getPriceQuery = (input: string, items: ItemInterface[]) => {
  const serializedInput = getSerializedData(input);

  let results: ItemOutputResultInterface[] = [];

  for (let id of serializedInput) {
    const item = items[Number(id) - 1];

    if (item.unit === "g") item.unitPrice *= 1000;

    results.push({ itemId: item.id, kgPrice: item.unitPrice });
  }

  return results;
};
