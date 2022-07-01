/**
 * @typedef {object} Item
 * @property {number} id
 * @property {string} name
 * @property {number} unitPrice
 * @property {string} unit
 *
 * Generates sample database
 * @returns {{ items: { [itemId: number]: Item }}}
 */

import { items } from "./data/item";
import { ItemInterface } from "./data/ItemInterface";
import { testDatas } from "./data/testData";

import { getPriceOfItems } from "./utils/functions";


const database = { items: { ...items } };


function summaryApi(input: { action: string; datas: string }) {
  if (input.action === "calculate")
    return getPriceOfItems(input.datas, database);
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
