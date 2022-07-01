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
import { testDatas } from "./data/testData";

// function buildDatabase() {
//   const outputDatabase = { items: { ...items } };
//   // items.forEach((item) => {
//   //   console.log(item);
//   //   outputDatabase.items[item.id] = item;

//   // });
//   return outputDatabase;
//   console.log(outputDatabase);
// }

const database = { items: { ...items } };

// const database = buildDatabase();


function summaryApi(largeData: { action: string; datas: string; }) {
  var output = {
    answer: undefined,
    isProcessed: false,
  };

  switch (largeData.action) {
    case "calculate":
      var allDatas = largeData.datas.split(";");
      var toSumDatas = [];
      for (var i = 0; i < allDatas.length; i++) {
        toSumDatas[i] = allDatas[i].split(",");
      }

      let regex = /\d/g;
      let datas = largeData.datas.split(regex);

      console.log(datas);
      

      var sum;
      for (var sumData of toSumDatas) {
        var id = sumData[0];
        var num = sumData[1];
        var unit = sumData[2];
        var price = database.items[id].unitPrice;

        if (database.items[id].unit == "g") {
          price = price * 1000;
        }

        if (unit == "g") {
          num = num * 1000;
        }

        if (sum) {
          sum = sum + price * num;
        } else {
          sum = price * num;
        }
      }

      if (sum) {
        var five = sum * 100 - Math.floor(sum * 10) * 10;
        if (five >= 1 && five <= 2) {
          sum = sum - five / 100;
        }
        if (five >= 3 && five <= 4) {
          sum = sum + (5 - five) / 100;
        }
        if (five >= 6 && five <= 7) {
          sum = sum - (five - 5) / 100;
        }
        if (five >= 8 && five <= 9) {
          sum = sum + (10 - five) / 100;
        }
        output.answer = Math.round(sum * 100) / 100;
      } else {
        output.answer = 0;
      }

      output.isProcessed = true;
      break;
    case "query":
      var allDatas = largeData.datas.split(",");
      var idDatas = [];
      for (var i = 0; i < allDatas.length; i++) {
        idDatas[i] = allDatas[i];
      }

      var outputItems = [];
      for (var id in idDatas) {
        var realId = idDatas[id];
        var outputItem = { itemId: realId * 1, kgPrice: 0 };

        if (database.items[realId].unit === "g") {
          outputItem.unitPrice = database.items[realId].unitPrice * 1000;
        } else {
          outputItem.kgPrice = database.items[realId].unitPrice * 1;
        }

        outputItems.push(outputItem);
      }

      if (outputItems.length > 0) {
        output.answer = outputItems;
      } else {
        output.answer = [];
      }

      output.isProcessed = true;
      break;
    default:
      output.answer = undefined;
      output.isProcessed = false;
  }

  if (output.isProcessed) {
    return output.answer;
  } else {
    return undefined;
  }
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
