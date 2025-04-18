import { auth } from '@/auth/auth';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import getUser from './getUser';

// Mock PrismaClient
vi.mock('@prisma/client', () => {
  const userFindUnique = vi.fn();
  return {
    PrismaClient: vi.fn(() => ({
      user: { findUnique: userFindUnique },
    })),
  };
});

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(),
}));

// Mock auth
vi.mock('@/auth/auth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}));

describe('getUser server action', () => {
  let prismaMock;
  let userFindUniqueMock;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Initialize Prisma mock
    prismaMock = new PrismaClient();
    userFindUniqueMock = prismaMock.user.findUnique;

    // Mock headers implementation
    headers.mockReturnValue(new Map());
  });

  it('should return user data with tasks and clients when session exists', async () => {
    // Arrange
    const mockSession = {
      user: { id: 'user-123' },
    };
    const mockUser = {
      id: 'user-123',
      name: 'Test User',
      tasks: [{ id: 'task-1', title: 'Task 1' }],
      clients: [{ id: 'client-1', name: 'Client 1' }],
    };

    auth.api.getSession.mockResolvedValue(mockSession);
    userFindUniqueMock.mockResolvedValue(mockUser);

    // Act
    const result = await getUser();

    // Assert
    expect(auth.api.getSession).toHaveBeenCalledWith({
      headers: expect.any(Map),
    });
    expect(userFindUniqueMock).toHaveBeenCalledWith({
      where: { id: 'user-123' },
      include: { tasks: true, clients: true },
    });
    expect(result).toEqual(mockUser);
  });

  it('should return undefined when no session exists', async () => {
    // Arrange
    auth.api.getSession.mockResolvedValue(null);

    // Act
    const result = await getUser();

    // Assert
    expect(auth.api.getSession).toHaveBeenCalledWith({
      headers: expect.any(Map),
    });
    expect(userFindUniqueMock).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should handle errors gracefully', async () => {
    // Arrange
    const mockSession = {
      user: { id: 'user-123' },
    };
    auth.api.getSession.mockResolvedValue(mockSession);
    userFindUniqueMock.mockRejectedValue(new Error('Database error'));

    // Act & Assert
    await expect(getUser()).resolves.toBeUndefined(); // Assuming graceful error handling
    expect(auth.api.getSession).toHaveBeenCalledWith({
      headers: expect.any(Map),
    });
    expect(userFindUniqueMock).toHaveBeenCalledWith({
      where: { id: 'user-123' },
      include: { tasks: true, clients: true },
    });
  });
});
