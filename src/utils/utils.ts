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
  let serializedInput: string[] = [];
  if (input.includes(";")) {
    let inputDataStringArrays: string[] = input.split(";");

    inputDataStringArrays.map((data) => {
      let splitedString = data.split(",");

      serializedInput.push(splitedString);
    });
    return serializedInput;
  } else {
    for (let singleData of input) {
      if (!singleData.includes(",")) {
        serializedInput.push(singleData);
      }
    }
    return serializedInput;
  }
}
