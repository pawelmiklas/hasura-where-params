import { whereClause, whereFilter } from ".";

describe("whereClause with whereFilter", () => {
  it("should return correct structure", () => {
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

    expect(input).toEqual(outputResult);
  });
});
