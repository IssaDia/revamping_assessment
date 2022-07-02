import { items } from "./data/item";
import { ItemInterface } from "./interface/ItemInterface";
import { testDatas } from "./data/testData";

import { getPriceOfItems, getPriceQuery } from "./utils/mainFunctions";


function summaryApi(input: { action: string; datas: string }) {
  if (input.action === "calculate") return getPriceOfItems(input.datas, items as ItemInterface[]);
  if (input.action === "query") return getPriceQuery(input.datas, items as ItemInterface[]);
  return;

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
