export const getQueryKey = (
  queryName: string,
  variables: string | undefined,
) => (variables ? [queryName, variables] : [queryName]);
