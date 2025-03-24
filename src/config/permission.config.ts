// src/config/permissions.config.ts
import RBAC from 'rbac';
export const PREFIX_PERMISSIONS: Record<string, string[]> = {
    'dify': ['read:all',],
    'frontend': ['read:public', 'write:user_data', 'user:read'],
    'mobile': ['read:public', 'user:basic']
};

export const PERMISSIONS = Object.values(PREFIX_PERMISSIONS).flat();
