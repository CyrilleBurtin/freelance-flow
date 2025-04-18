import { describe, expect, it, vi } from 'vitest';

import checkFormData from './checkFormData';

describe('checkFormData', () => {
  it('should log FormData content as an object', async () => {
    // Spy on console.log
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Create test FormData
    const formData = new FormData();
    formData.append('name', 'John');
    formData.append('email', 'john@example.com');

    // Call the function
    await checkFormData(formData);

    // Expected object
    const expectedObj = { name: 'John', email: 'john@example.com' };

    // Assert console.log was called with the correct object
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'FormData content:',
      expectedObj,
    );

    // Clean up
    consoleLogSpy.mockRestore();
  });

  it('should handle empty FormData', async () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const formData = new FormData();

    await checkFormData(formData);

    expect(consoleLogSpy).toHaveBeenCalledWith('FormData content:', {});

    consoleLogSpy.mockRestore();
  });
});
