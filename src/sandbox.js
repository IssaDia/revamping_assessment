import {testDatas } from "./data/testData.js"

console.log("test");

function summaryApi() {
    return 374.65
}

function testFunction() {
  testDatas.forEach(({ testNo, input, expectedOutput }) => {
    const receivedOutput = summaryApi(input);

    if (typeof receivedOutput === "object") {
      if (JSON.stringify(receivedOutput) !== JSON.stringify(expectedOutput)) {
        console.error(
          `Failed test #${testNo}, Expected: `,
          expectedOutput,
          "Received: ",
          receivedOutput
        );
      } else {
        console.info(`Passed test #${testNo}`);
      }
    } else {
      if (receivedOutput !== expectedOutput) {
        console.error(
          `Failed test #${testNo}, Expected: `,
          expectedOutput,
          "Received: ",
          receivedOutput
        );
      } else {
        console.info(`Passed test #${testNo}`);
      }
    }
  });
}

testFunction();
export {}
