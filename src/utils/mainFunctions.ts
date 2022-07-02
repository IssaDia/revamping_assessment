import { ItemInterface } from "../interface/ItemInterface";
import { ItemOutputResultInterface } from "../interface/ItemOutputResultInterface";
import { getArrayWithEachItemPrice, getRoundedNumberWithTwoDecimals, getSerializedData } from "./utils";

export function getPriceOfItems(input: string, items: ItemInterface[]) {
  const arrayWithEachItemPrice = getArrayWithEachItemPrice(input, items);

  const sum: number = arrayWithEachItemPrice?.reduce(
    (prev, curr) => prev + curr
  );

  return getRoundedNumberWithTwoDecimals(sum);
}



export function getPriceQuery(input: string, items: ItemInterface[]) {
  const serializedInput = getSerializedData(input);

  let arrayOfQueryPriceItems: ItemOutputResultInterface[] = [];

  for (let id of serializedInput) {
    const item = items[Number(id) - 1];

    if (item.unit === "g") item.unitPrice *= 1000;

    arrayOfQueryPriceItems.push({ itemId: item.id, kgPrice: item.unitPrice });
  }

  return arrayOfQueryPriceItems;
}
