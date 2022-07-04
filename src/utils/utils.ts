import { ItemInterface } from "../interface/ItemInterface";

export const getNumberWithChoosenNumberOfDecimals = (
  input: number,
  decimalAfterDot: number
) => {
  return Number(input.toFixed(decimalAfterDot));
};

export const getRoundedNumberWithTwoDecimals = (input: number): Number => {
  const inputWithTwoDecimals = getNumberWithChoosenNumberOfDecimals(input, 2);
  const inputStringified = inputWithTwoDecimals.toString();

  const LastDecimal = /[0-9]{1}$/;

  if (!inputStringified.endsWith("5")) {
    input = Number(inputStringified.replace(LastDecimal, "5"));

    return getNumberWithChoosenNumberOfDecimals(input, 2);
  }

  return getNumberWithChoosenNumberOfDecimals(input, 2);
};

export const getSerializedData = (input: string) => {
  let serializedMultidimensionalArray: string[][] = [];
  let serializedBasicArray: string[] = [];

  if (input.includes(";")) {
    const inputDataStringArrays: string[] = input.split(";");

    inputDataStringArrays.map((data) => {
      const splitedString: string[] = data.split(",");

      serializedMultidimensionalArray.push(splitedString);
    });

    return serializedMultidimensionalArray;
  } else {
    for (let singleData of input) {
      if (!singleData.includes(",")) {
        serializedBasicArray.push(singleData);
      }
    }

    return serializedBasicArray;
  }
};

export const getArrayWithEachItemPrice = (
  input: string,
  items: ItemInterface[]
): number[] => {
  const serializedInputs = getSerializedData(input);
  let arrayWithEachItemPrice = [];

  for (let serializedInput of serializedInputs) {
    const [id, quantity] = serializedInput;

    const item: ItemInterface = items[Number(Number(id)) - 1];

    const itemPrice = Number(item.unitPrice);
    let inputQuantity = Number(quantity);

    if (inputQuantity < 1) inputQuantity *= 1000;

    const itemTotalPrice = inputQuantity * itemPrice;

    arrayWithEachItemPrice.push(itemTotalPrice);
  }
  return arrayWithEachItemPrice;
};

export const getSum = (input: number[]): number =>
  input?.reduce((prev, curr) => prev + curr);
