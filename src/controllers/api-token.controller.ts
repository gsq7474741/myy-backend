import { Context } from 'hono';
import { ApiTokenService } from '../services/apiToken.service';
import { createModuleLogger } from '../utils/logger';

const logger = createModuleLogger('ApiTokenController');
const apiTokenService = new ApiTokenService();

export class ApiTokenController {
    /**
     * 获取所有 API 令牌
     */
    async getAllTokens(c: Context) {
        try {
            const tokens = await apiTokenService.getAllActiveTokens();
            return c.json({ success: true, data: tokens });
        } catch (error) {
            logger.error('获取所有令牌失败', error);
            return c.json({ success: false, message: '获取令牌失败' }, 500);
        }
    }

    /**
     * 创建新的 API 令牌
     */
    async createToken(c: Context) {
        try {
            const body = await c.req.json();

            if (!body.token || !body.name) {
                return c.json({ success: false, message: '令牌和名称是必填项' }, 400);
            }

            const token = await apiTokenService.createToken({
                token: body.token,
                name: body.name,
                description: body.description,
                isActive: body.isActive !== false // 默认为 true
            });

            return c.json({ success: true, data: token }, 201);
        } catch (error) {
            logger.error('创建令牌失败', error);
            return c.json({ success: false, message: '创建令牌失败' }, 500);
        }
    }

    /**
     * 更新 API 令牌
     */
    async updateToken(c: Context) {
        try {
            const id = Number(c.req.param('id'));
            const body = await c.req.json();

            if (isNaN(id)) {
                return c.json({ success: false, message: '无效的令牌 ID' }, 400);
            }

            const token = await apiTokenService.updateToken(id, {
                name: body.name,
                description: body.description,
                isActive: body.isActive
            });

            if (!token) {
                return c.json({ success: false, message: '令牌不存在' }, 404);
            }

            return c.json({ success: true, data: token });
        } catch (error) {
            logger.error('更新令牌失败', error);
            return c.json({ success: false, message: '更新令牌失败' }, 500);
        }
    }

    /**
     * 删除 API 令牌
     */
    async deleteToken(c: Context) {
        try {
            const id = Number(c.req.param('id'));

            if (isNaN(id)) {
                return c.json({ success: false, message: '无效的令牌 ID' }, 400);
            }

            await apiTokenService.deleteToken(id);
            return c.json({ success: true, message: '令牌已删除' });
        } catch (error) {
            logger.error('删除令牌失败', error);
            return c.json({ success: false, message: '删除令牌失败' }, 500);
        }
    }
}
