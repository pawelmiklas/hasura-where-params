hasura where params - create where clause easy

```javascript
const input = whereClause(
  whereFilter("fiscalNumber._ilike", "query"),
  whereFilter("_or.dailyReportNumber._ilike", "query"),
  whereFilter("_or.printoutNumber._ilike", "query"),
  whereFilter("_or._and.systemNumber._ilike", "query")
);

const outputResult = {
  fiscalNumber: "query",
  _or: {
    dailyReportNumber: {
      _ilike: "query",
    },
    printoutNumber: {
      _ilike: "query",
    },
    _and: {
      systemNumber: {
        _ilike: "query",
      },
    },
  },
};
```
