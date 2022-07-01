export function getNumberWithChoosenNumberOfDecimals(
  number: number,
  decimalAfterDot: number
) {
  return number.toFixed(decimalAfterDot);
}

export function getRoundedNumberWithTwoDecimals(price: number) {
  const priceWithTwoDecimals = getNumberWithChoosenNumberOfDecimals(price, 2);

  const StringOfNumberWithTwoDecimals = priceWithTwoDecimals.toString();

  const regex = /[0-9]{1}$/;
  const lastDigitOfStringWithTwoDecimals = Number(
    StringOfNumberWithTwoDecimals.match(regex)
  );
  if (Number.isInteger(price)) {
    return price;
  }

  if (lastDigitOfStringWithTwoDecimals !== 5) {
    const result = StringOfNumberWithTwoDecimals.replace(regex, "5");
    return Number(result);
  }
  return price;
}

export function getSerializedInputData(input: string): [] {
  let inputDataStringArrays: string[] = input.split(";");

  let serializedInputData: [] = [];
  inputDataStringArrays.map((data) => {
    let splitedString = data.split(",");
    serializedInputData.push(splitedString);
  });

  return serializedInputData;
}

export function getPriceOfItems(data, items) {
  const arrayWithEachItemPrice = getArrayWithEachItemPrice(data, items);

  console.log(arrayWithEachItemPrice);

  const sum: number = arrayWithEachItemPrice?.reduce(
    (prev, curr) => prev + curr
  );

  console.log(sum);
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

    const item = items.items[Number(numberedId) - 1] as ItemInterface;

    let itemPrice = getRoundedNumberWithTwoDecimals(Number(item.unitPrice));

    if (Number(quantity) < 1) quantity *= 1000;

    const itemTotalPrice = Number(quantity) * itemPrice;

    arrayWithEachItemPrice.push(itemTotalPrice);
  }
  return arrayWithEachItemPrice;
}
