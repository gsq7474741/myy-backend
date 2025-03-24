// src/middlewares/auth.ts
import { Context, Next } from 'hono';
import { TokenService } from '../services/apiToken.service';
import { ApiToken } from '../entity/ApiToken';

export const createTokenAuthMiddleware = (tokenService: TokenService) => {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized - Missing or invalid authorization header' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const tokenRecord = await tokenService.validateToken(token);

    if (!tokenRecord) {
      return c.json({ error: 'Unauthorized - Invalid or expired token' }, 401);
    }

    // 将token信息添加到请求上下文
    c.set('tokenInfo', {
      id: tokenRecord.id,
      tokenValue: tokenRecord.tokenValue,
      tokenPrefix: tokenRecord.tokenPrefix,
      permissions: tokenRecord.permissions,
      isActive: tokenRecord.isActive,
      expiresAt: tokenRecord.expiresAt
    });

    await next();
  };
};

// 权限检查中间件
export const requirePermission = (permission: string) => {
  return async (c: Context, next: Next) => {
    const tokenInfo = c.get('tokenInfo');

    if (!tokenInfo) {
      return c.json({ error: 'Unauthorized - Token information missing' }, 401);
    }

    if (!tokenInfo.permissions.includes(permission)) {
      return c.json({
        error: 'Forbidden - Insufficient permissions',
        required: permission,
        available: tokenInfo.permissions
      }, 403);
    }

    await next();
  };
};

// 前缀检查中间件
export const requirePrefix = (allowedPrefixes: string[]) => {
  return async (c: Context, next: Next) => {
    const tokenInfo = c.get('tokenInfo');

    if (!tokenInfo) {
      return c.json({ error: 'Unauthorized - Token information missing' }, 401);
    }

    if (!allowedPrefixes.includes(tokenInfo.tokenPrefix)) {
      return c.json({
        error: 'Forbidden - Token prefix not allowed',
        required: allowedPrefixes,
        provided: tokenInfo.tokenPrefix
      }, 403);
    }

    await next();
  };
};
