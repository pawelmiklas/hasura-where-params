[![npm version](https://img.shields.io/npm/v/hasura-where-params.svg?style=flat)](https://www.npmjs.com/package/hasura-where-params)

hasura where params - create complex where structures easily

```javascript
const totalGross = 2000;

const input = whereArgs(
  whereFilter("fiscalNumber._eq", "order"),
  whereFilter("_or.dailyReportNumber._in", ["user1", "user2", "user3"]),
  whereFilter("_or.printoutNumber._ilike", "query"),
  whereFilter("_or._and.systemNumber._ilike", "query"),
  whereFilter("totalGross._gte", totalGross, totalGross > 3000)
);

const output = {
  fiscalNumber: { _eq: "order" },
  _or: [
    { dailyReportNumber: { _in: ["user1", "user2", "user3"] } },
    { printoutNumber: { _ilike: "query" } },
    {
      _and: [
        {
          systemNumber: { _ilike: "query" },
        },
      ],
    },
  ],
};
```
