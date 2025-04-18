import { describe, expect, it } from 'vitest';

import { getQueryKey } from './getQueryKey';

describe('getQueryKey', () => {
  it('should return an array with queryName when no variables are provided', () => {
    const queryName = 'userQuery';
    const result = getQueryKey(queryName);
    expect(result).toEqual(['userQuery']);
  });

  it('should return an array with queryName and variables when variables are provided', () => {
    const queryName = 'userQuery';
    const variables = 'id:123';
    const result = getQueryKey(queryName, variables);
    expect(result).toEqual(['userQuery', 'id:123']);
  });

  it('should handle empty variables string', () => {
    const queryName = 'userQuery';
    const variables = '';
    const result = getQueryKey(queryName, variables);
    expect(result).toEqual(['userQuery']);
  });

  it('should handle undefined variables', () => {
    const queryName = 'userQuery';
    const result = getQueryKey(queryName, undefined);
    expect(result).toEqual(['userQuery']);
  });
});
