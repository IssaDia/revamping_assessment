import { ItemInterface } from "../interface/ItemInterface";
import { ItemOutputResultInterface } from "../interface/ItemOutputResultInterface";
import { getRoundedNumberWithTwoDecimals, getSerializedData } from "./utils";

export function getPriceOfItems(input: string, items: ItemInterface[]) {
  const arrayWithEachItemPrice = getArrayWithEachItemPrice(input, items);

  const sum: number = arrayWithEachItemPrice?.reduce(
    (prev, curr) => prev + curr
  );

  return getRoundedNumberWithTwoDecimals(sum);
}

function getArrayWithEachItemPrice(input: string, items: ItemInterface[]) {
  const serializedInputs = getSerializedData(input);
  let arrayWithEachItemPrice = [];

  for (let serializedInput of serializedInputs) {
    let [id, quantity] = serializedInput;

    const item: ItemInterface = items[Number(Number(id)) - 1];

    let itemPrice = Number(item.unitPrice);
    let inputQuantity = Number(quantity);

    if (inputQuantity < 1) inputQuantity *= 1000;

    const itemTotalPrice = inputQuantity * itemPrice;

    arrayWithEachItemPrice.push(itemTotalPrice);
  }
  return arrayWithEachItemPrice;
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
