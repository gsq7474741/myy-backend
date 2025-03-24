import { Hono } from "hono";
import { createModuleLogger } from "../utils/logger";
import { ApiTokenController } from "../controllers/api-token.controller";
import { TokenService } from "../services/apiToken.service";
import { createTokenAuthMiddleware } from "../middleware/token-auth.middleware";
import { requirePermission } from "../middleware/token-auth.middleware";
import { AppDataSource } from "../services/dataSource";
import { ApiToken } from "../entity/ApiToken";

const logger = createModuleLogger('ApiTokenRoutes');
const apiTokenController = new ApiTokenController();

const tokenRoutes = new Hono();
const tokenRepository = AppDataSource.getRepository(ApiToken);
const tokenService = new TokenService(tokenRepository);
const tokenAuth = createTokenAuthMiddleware(tokenService);

// 获取所有令牌
// 创建新token (需要管理员权限)
tokenRoutes.post('/token',
    tokenAuth,
    requirePermission('admin:access'),
    async (c) => {
        const body = await c.req.json();
        const { prefix, description, expiresInDays } = body;

        try {
            const token = await tokenService.createToken(prefix, description, expiresInDays);
            return c.json({
                message: 'Token created successfully',
                token: token.tokenValue,
                permissions: token.permissions,
                expiresAt: token.expiresAt
            }, 201);
        } catch (error: unknown) {
            return c.json({ error: error instanceof Error ? error.message : 'Unknown error occurred' }, 400);
        }
    }
);

// 撤销token
tokenRoutes.delete('/token/:id',
    tokenAuth,
    requirePermission('admin:access'),
    async (c) => {
        const id = c.req.param('id');
        const success = await tokenService.revokeToken(id);

        if (success) {
            return c.json({ message: 'Token revoked successfully' });
        } else {
            return c.json({ error: 'Token not found or already revoked' }, 404);
        }
    }
);

export default tokenRoutes;
