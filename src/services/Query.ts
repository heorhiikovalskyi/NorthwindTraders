class QueryService {
  constructor() {}
  queryToString = (query: { sql: string; params: unknown[] }): string => {
    query.params.forEach((param) => {
      query.sql = query.sql.replace('?', String(param));
    });
    query.sql = query.sql.replace('\\', ' ');
    return query.sql;
  };
}

export const queryService = new QueryService();
