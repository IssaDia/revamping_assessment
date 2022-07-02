import { ItemInterface } from "../interface/ItemInterface";
import { ItemOutputResultInterface } from "../interface/ItemOutputResultInterface";

export function getNumberWithChoosenNumberOfDecimals(
  number: number,
  decimalAfterDot: number
) {
  return number.toFixed(decimalAfterDot);
}

export function getRoundedNumberWithTwoDecimals(input: number): Number {
  const inputStringified = input.toString();

  const regexThatTargetLastDecimal = /[0-9]{1}$/;
  const lastDecimal = Number(
    inputStringified.match(regexThatTargetLastDecimal)
  );

  if (lastDecimal !== 5 && lastDecimal !== 0) {
    input = Number(inputStringified.replace(regexThatTargetLastDecimal, "5"));

    return Number(getNumberWithChoosenNumberOfDecimals(input, 2));
  }

  return Number(getNumberWithChoosenNumberOfDecimals(input, 2));
}

export function getSerializedData(input: string) {
  let serializedMultidimensionalArray: string[][] = [];
  let serializedBasicArray: string[] = [];

  if (input.includes(";")) {
    let inputDataStringArrays: string[] = input.split(";");

    inputDataStringArrays.map((data) => {
      let splitedString: string[] = data.split(",");

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
}

export function getArrayWithEachItemPrice(
  input: string,
  items: ItemInterface[]
) {
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

export function getSum(input : number[]): number {
  return input?.reduce((prev, curr) => prev + curr);
}


