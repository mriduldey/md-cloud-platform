// 🔐 In-memory mock user store
export const users = new Map<string, { passwordHash: string }>();