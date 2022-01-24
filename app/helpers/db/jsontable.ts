type DefMethods = {
  column(path: string, alias: string, mysqlDataType: string): string;
  nested(path: string, def: Definer): string;
};

type Definer = (method: DefMethods) => string[];

function column(path: string, alias: string, dbDataType: string) {
  return `${alias} ${dbDataType} path "${path}"`;
}

function nested(path: string, definer: Definer) {
  const definerResult: string = definer({ column, nested }).join(', ');
  return `nested path "${path}" COLUMNS(${definerResult})`;
}

export function jsontable(
  dbDableColumn: string,
  alias: string,
  entryPath: string,
  definer: (args: DefMethods) => string[]
) {
  const definerResult = definer({ column, nested }).join(', ');
  return `JSON_TABLE(${dbDableColumn}, "${entryPath}" COLUMNS (${definerResult})) as ${alias}`;
}
