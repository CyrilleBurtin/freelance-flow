export const getQueryKey = (queryName: string, variables?: string) =>
  variables ? [queryName, variables] : [queryName];
