import { Hono } from "hono";
import { TreeController } from "../controllers/tree_controller";
import { UserController } from "../controllers/user_controller";
import { createModuleLogger } from "../utils/logger";
import { requirePrefix, requirePermission } from '../middleware/token-auth.middleware';
import { some, every, except } from 'hono/combine'

const logger = createModuleLogger('TreeRoutes');
const treeController = new TreeController();
const userController = new UserController();

const treeRoutes = new Hono();

treeRoutes.get('/tree/list', treeController.getList);

treeRoutes.get('/tree/llm-metrics',
    every(
        requirePrefix(['llm']),
        requirePermission('read:all')
    ), async (c) => {
        logger.info('访问 LLM 指标接口');
        return userController.getMyDev(c)
    });

export default treeRoutes;
