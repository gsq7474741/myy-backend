import { AppDataSource } from '../services/dataSource';
import { ApiToken } from '../entity/ApiToken';
import { createModuleLogger } from '../utils/logger';

const logger = createModuleLogger('InitApiTokens');

/**
 * 初始化 API 令牌
 */
export async function initApiTokens() {
    try {
        // 检查数据源是否已初始化，避免重复初始化
        if (!AppDataSource.isInitialized) {
            logger.info('Initializing data source...');
            await AppDataSource.initialize();
            logger.info('Data source initialization completed');
        }
        
        const apiTokenRepository = AppDataSource.getRepository(ApiToken);
        
        // 检查是否已有令牌
        const existingTokens = await apiTokenRepository.find();
        
        if (existingTokens.length === 0) {
            logger.info('No API tokens found, creating default tokens...');
            
            // 创建默认令牌
            const defaultTokens = [
                {
                    name: 'Default API Token',
                    token: process.env.API_ACCESS_TOKEN || 'testtoken',
                    isActive: true,
                    description: 'System default API token (imported from environment variable)'
                },
                {
                    name: 'Development Token',
                    token: 'dev-token-12345',
                    isActive: true,
                    description: 'Development environment test token'
                }
            ];
            
            for (const tokenData of defaultTokens) {
                const token = apiTokenRepository.create(tokenData);
                await apiTokenRepository.save(token);
                logger.info(`Token created: ${tokenData.name}`);
            }
            
            logger.info('Default API tokens initialization completed');
        } else {
            logger.info(`${existingTokens.length} API tokens already exist in database, skipping initialization`);
        }
    } catch (error) {
        logger.error('Failed to initialize API tokens', error);
        throw error; // 重新抛出错误以便调用者可以处理
    } finally {
        // 如果是直接运行此脚本，不要在这里关闭连接
        // 如果是作为模块导入，也不要关闭连接，让调用者决定何时关闭
    }
}

// 检查是否为主模块的函数
const isMainModule = async () => {
    try {
      // 在 ESM 中，import.meta.url 包含当前模块的 URL
      const modulePath = new URL(import.meta.url).pathname;
      
      // 对于 Node.js 中的 ESM，process.argv[1] 是入口文件的路径
      const mainPath = process.argv[1];
      
      return modulePath === mainPath;
    } catch (e) {
      return false;
    }
  };
  

(async () => {
    if (await isMainModule()) {
      console.log('Running as main module');
      initApiTokens()
        .then(() => {
            logger.info('API token initialization script completed successfully');
            // 如果是直接运行脚本，完成后关闭连接并退出
            if (AppDataSource.isInitialized) {
                AppDataSource.destroy().then(() => {
                    logger.info('Database connection closed');
                    process.exit(0);
                });
            } else {
                process.exit(0);
            }
        })
        .catch(error => {
            logger.error('API token initialization script failed', error);
            // 发生错误时也要确保关闭连接
            if (AppDataSource.isInitialized) {
                AppDataSource.destroy().then(() => {
                    logger.error('Database connection closed');
                    process.exit(1);
                });
            } else {
                process.exit(1);
            }
        });
    }
})();
  

// // 如果直接运行此脚本，则执行初始化
// if (require.main === module) {
//     initApiTokens()
//         .then(() => {
//             logger.info('API token initialization script completed successfully');
//             process.exit(0);
//         })
//         .catch(error => {
//             logger.error('API token initialization script failed', error);
//             process.exit(1);
//         });
// }
