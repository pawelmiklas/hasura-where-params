hasura where params - create where clause easy

```javascript
const input = whereClause(
  whereFilter("_or.fiscalNumber._ilike", "query"),
  whereFilter("_or.dailyReportNumber._ilike", "query"),
  whereFilter("_or.printoutNumber._ilike", "query"),
  whereFilter("_or.systemNumber._ilike", "query")
);

const outputResult = {
  _or: {
    fiscalNumber: {
      _ilike: "query",
    },
    dailyReportNumber: {
      _ilike: "query",
    },
    printoutNumber: {
      _ilike: "query",
    },
    systemNumber: {
      _ilike: "query",
    },
  },
};
```
