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
      _or: [
        {
          dailyReportNumber: {
            _in: ["user1", "user2", "user3"],
          },
        },
        {
          printoutNumber: {
            _ilike: "query",
          },
        },
        {
          _and: [
            {
              systemNumber: {
                _ilike: "query",
              },
            },
          ],
        },
      ],
    };

    expect(input).toEqual(outputResult);
  });

  it("_or test", () => {
    const name = "FooBar";

    const input = whereClause(
      whereFilter("_or.name._ilike", name),
      whereFilter("_or.taxNumber._ilike", name),
      whereFilter("deletedAt._eq", 0, true),
      whereFilter("isMasterCompany._eq", false, true)
    );

    const outputResult = {
      _or: [
        {
          name: {
            _ilike: name,
          },
        },
        {
          taxNumber: {
            _ilike: name,
          },
        },
      ],
      deletedAt: { _eq: 0 },
      isMasterCompany: { _eq: false },
    };

    expect(input).toEqual(outputResult);
  });

  it("empty value", () => {
    const input = whereClause(
      whereFilter("name._ilike", ""),
      whereFilter("surname._ilike", null),
      whereFilter("lastName._ilike", undefined)
    );

    const outputResult = {};

    expect(input).toEqual(outputResult);
  });
});
