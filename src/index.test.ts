import { whereClause, whereFilter } from ".";

describe("whereClause with whereFilter", () => {
  it("should return correct structure", () => {
    const totalGross = 2000;

    const input = whereClause(
      whereFilter("fiscalNumber._eq", "order"),
      whereFilter("_or.dailyReportNumber._in", ["user1", "user2", "user3"]),
      whereFilter("_or.printoutNumber._ilike", "query"),
      whereFilter("_or._and.systemNumber._ilike", "query"),
      whereFilter("totalGross._gte", totalGross, totalGross > 3000)
    );

    const outputResult = {
      fiscalNumber: {
        _eq: "order",
      },
      _or: {
        dailyReportNumber: {
          _in: ["user1", "user2", "user3"],
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
