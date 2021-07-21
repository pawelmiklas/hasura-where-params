import { whereArgs, whereFilter } from '.';

describe('general', () => {
  it('should return correct structure', () => {
    const totalGross = 2000;

    const input = whereArgs(
      whereFilter('fiscalNumber._eq', 'order'),
      whereFilter('_or[].dailyReportNumber._in', ['user1', 'user2', 'user3']),
      whereFilter('_or[].printoutNumber._ilike', 'query'),
      whereFilter('_or[]._and[].systemNumber._ilike', 'query'),
      whereFilter('totalGross._gte', totalGross, totalGross > 3000)
    );

    const outputResult = {
      fiscalNumber: { _eq: 'order' },
      _or: [
        { dailyReportNumber: { _in: ['user1', 'user2', 'user3'] } },
        { printoutNumber: { _ilike: 'query' } },
        { _and: [{ systemNumber: { _ilike: 'query' } }] },
      ],
    };

    expect(input).toEqual(outputResult);
  });

  it('empty value', () => {
    const input = whereArgs(
      whereFilter('name._ilike', ''),
      whereFilter('surname._ilike', null),
      whereFilter('lastName._ilike', undefined)
    );

    const outputResult = {};

    expect(input).toEqual(outputResult);
  });
});

describe('_or filter field', () => {
  it('_or with default behaviour', () => {
    const name = 'FooBar';

    const input = whereArgs(
      whereFilter('_or.name._ilike', name),
      whereFilter('_or.taxNumber._ilike', name),
      whereFilter('deletedAt._eq', 0, true),
      whereFilter('isMasterCompany._eq', false, true)
    );

    const outputResult = {
      _or: [{ name: { _ilike: name } }, { taxNumber: { _ilike: name } }],
      deletedAt: { _eq: 0 },
      isMasterCompany: { _eq: false },
    };

    expect(input).toEqual(outputResult);
  });

  it('_or[]', () => {
    const name = 'FooBar';

    const input = whereArgs(
      whereFilter('_or[].name._ilike', name),
      whereFilter('_or[].taxNumber._ilike', name),
      whereFilter('deletedAt._eq', 0, true),
      whereFilter('isMasterCompany._eq', false, true)
    );

    const outputResult = {
      _or: [{ name: { _ilike: name } }, { taxNumber: { _ilike: name } }],
      deletedAt: { _eq: 0 },
      isMasterCompany: { _eq: false },
    };

    expect(input).toEqual(outputResult);
  });
});

describe('_and filter field', () => {
  it('_and with default behaviour', () => {
    const input = whereArgs(
      whereFilter('_and.documentStatus._eq', 'status'),
      whereFilter('_and.documentStatus._neq', 'created')
    );

    const outputResult = {
      _and: [
        { documentStatus: { _eq: 'status' } },
        { documentStatus: { _neq: 'created' } },
      ],
    };

    expect(input).toEqual(outputResult);
  });

  it('_and[]', () => {
    const input = whereArgs(
      whereFilter('_and[].documentStatus._eq', 'status'),
      whereFilter('_and[].documentStatus._neq', 'created')
    );

    const outputResult = {
      _and: [
        { documentStatus: { _eq: 'status' } },
        { documentStatus: { _neq: 'created' } },
      ],
    };

    expect(input).toEqual(outputResult);
  });
});

describe('combine _and with _or filter field', () => {
  it('_or[] and _and{}', () => {
    const input = whereArgs(
      whereFilter('_or[]._and{}.documentStatus._eq', 'status'),
      whereFilter('_or[]._and{}.documentStatus._neq', 'created')
    );

    const outputResult = {
      _or: [
        { _and: { documentStatus: { _eq: 'status' } } },
        { _and: { documentStatus: { _neq: 'created' } } },
      ],
    };

    expect(input).toEqual(outputResult);
  });

  it('_or and _and{}', () => {
    const input = whereArgs(
      whereFilter('_or._and{}.documentStatus._eq', 'status'),
      whereFilter('_or._and{}.documentStatus._neq', 'created')
    );

    const outputResult = {
      _or: [
        { _and: { documentStatus: { _eq: 'status' } } },
        { _and: { documentStatus: { _neq: 'created' } } },
      ],
    };

    expect(input).toEqual(outputResult);
  });

  it('_or and _and', () => {
    const input = whereArgs(
      whereFilter('_or._and.documentStatus._eq', 'status'),
      whereFilter('_or._and.documentStatus._neq', 'created')
    );

    const outputResult = {
      _or: [
        { _and: [{ documentStatus: { _eq: 'status' } }] },
        { _and: [{ documentStatus: { _neq: 'created' } }] },
      ],
    };

    expect(input).toEqual(outputResult);
  });

  it('_or{} and _and{}', () => {
    const input = whereArgs(
      whereFilter('_or{}._and{}.documentStatus._eq', 'status'),
      whereFilter('_or{}._and{}.documentStatus._neq', 'created')
    );

    const outputResult = {
      _or: { _and: { documentStatus: { _eq: 'status', _neq: 'created' } } },
    };

    expect(input).toEqual(outputResult);
  });

  it('_or{} and _and{}', () => {
    const input = {
      ...whereFilter('_or{}._and{}.documentStatus._eq', 'status'),
      ...whereFilter('_or{}._and{}.documentStatus._neq', 'created'),
    };

    const outputResult = {
      _or: {
        _and: {
          documentStatus: { _eq: 'status' },
        },
        // @ts-ignore
        _and: {
          documentStatus: { _neq: 'created' },
        },
      },
    };

    expect(input).toEqual(outputResult);
  });
});
