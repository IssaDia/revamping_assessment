import { ItemInterface } from "../data/ItemInterface";

export function getNumberWithChoosenNumberOfDecimals(
  number: number,
  decimalAfterDot: number
) {
  return number.toFixed(decimalAfterDot);
}

export function getRoundedNumberWithTwoDecimals(price: number): Number {
  const numberWithTwoDecimals = getNumberWithChoosenNumberOfDecimals(price, 2);

  const StringOfNumberWithTwoDecimals = numberWithTwoDecimals.toString();

  const regex = /[0-9]{1}$/;
  const lastDigitOfStringWithTwoDecimals = Number(
    StringOfNumberWithTwoDecimals.match(regex)
  );

  if (
    lastDigitOfStringWithTwoDecimals !== 5 &&
    lastDigitOfStringWithTwoDecimals !== 0
  ) {
    price = Number(StringOfNumberWithTwoDecimals.replace(regex, "5"));

    return Number(getNumberWithChoosenNumberOfDecimals(price, 2));
  }

  return Number(getNumberWithChoosenNumberOfDecimals(price, 2));
}

export function getSerializedInputData(input: string) {
  let serializedInputData: [] = [];
  if (input.includes(";")) {
    let inputDataStringArrays: string[] = input.split(";");

    inputDataStringArrays.map((data) => {
      let splitedString = data.split(",");
      serializedInputData.push(splitedString);
    });

    return serializedInputData;
  }
  return
}

export function getPriceOfItems(data, items: ItemInterface[]) {
  const arrayWithEachItemPrice = getArrayWithEachItemPrice(data, items);

  const sum: number = arrayWithEachItemPrice?.reduce(
    (prev, curr) => prev + curr
  );

  return getRoundedNumberWithTwoDecimals(sum);
}

function getArrayWithEachItemPrice(
  data: { datas: string },
  items: { items: any[] }
) {
  const arraysOfResultsExpected = getSerializedInputData(data);
  let arrayWithEachItemPrice = [];

  for (let resultExpected of arraysOfResultsExpected) {
    let [id, quantity] = resultExpected as string[];

    const numberedId = Number(id);

    const item = items[Number(numberedId) - 1] as ItemInterface;

    let itemPrice = Number(item.unitPrice);

    if (Number(quantity) < 1) quantity *= 1000;

    const itemTotalPrice = Number(quantity) * itemPrice;

    arrayWithEachItemPrice.push(itemTotalPrice);
  }
  return arrayWithEachItemPrice;
}

export function getPriceQuery(data:string, items : ItemInterface[]) {
  let serializedInputData: [] = [];
  for (let singleData of data) {
    if (!singleData.includes(",")) {
      serializedInputData.push(singleData);
    }
  }
  let arrayOfQueryPriceItems: [] = [];

  for (let id of serializedInputData) {
    const numberedId = Number(id);

    const item = items[numberedId - 1];

    if (item.unit === "g") item.unitPrice *= 1000;

    arrayOfQueryPriceItems.push({ itemId: item.id, kgPrice: item.unitPrice });
   
  }

  return arrayOfQueryPriceItems;
}
