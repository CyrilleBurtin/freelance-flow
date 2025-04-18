import { describe, expect, it } from 'vitest';

import { formatDeadline } from './formatDate';

describe('formatDate', () => {
  const date = new Date('2025-04-27T19:35:00.000Z');
  it('Should return a valid date', () => {
    const result = formatDeadline(date);

    expect(result).toEqual('27 avril 2025 à 21:35');
  });
});
