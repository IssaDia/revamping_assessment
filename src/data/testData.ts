export const testDatas = [
  {
    testNo: 1,
    input: {
      action: "calculate",
      datas: "1,1,kg;2,2,kg;3,0.15,kg;4,4,kg",
    },
    expectedOutput: 374.65,
  },
  {
    testNo: 2,
    input: {
      action: "calculate",
      datas: "9,10,kg;12,1,kg;16,400,g",
    },
    expectedOutput: 805.65,
  },
  {
    testNo: 3,
    input: {
      action: "query",
      datas: "1",
    },
    expectedOutput: [{ itemId: 1, kgPrice: 1.45 }],
  },
  {
    testNo: 4,
    input: {
      action: "query",
      datas: "1,2,3,4",
    },
    expectedOutput: [
      { itemId: 1, kgPrice: 1.45 },
      { itemId: 2, kgPrice: 1.23 },
      { itemId: 3, kgPrice: 2350 },
      { itemId: 4, kgPrice: 4.56 },
    ],
  },
];
