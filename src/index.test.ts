import { whereClause, whereFilter } from ".";

describe("whereClause with whereFilter", () => {
  it("should return correct structure", () => {
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

    expect(input).toEqual(outputResult);
  });
});
