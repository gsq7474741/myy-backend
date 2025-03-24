import { Repository } from 'typeorm';
import { ApiToken, User } from '../entity';
import * as crypto from 'crypto';

export class TokenService {
    constructor(
        private tokenRepository: Repository<ApiToken>,
        private userRepository: Repository<User>
    ) { }
    async validateToken(tokenValue: string): Promise<ApiToken | null> {
        if (!tokenValue) {
            return null;
        }

        const token = await this.tokenRepository.findOne({
            where: { token: tokenValue, isActive: true },
            relations: ['user']
        });
        if (!token || !token.user || !token.user.isActive) {
            return null;
        }
        // 检查过期时间
        if (token.expiresAt && token.expiresAt < new Date()) {
            return null;
        }
        // 更新最后使用时间
        token.lastUsedAt = new Date();
        await this.tokenRepository.save(token);
        return token;
    }
    async createToken(userId: string, description?: string, expiresInDays = 90): Promise<ApiToken> {
        const user = await this.userRepository.findOne({ where: { id: userId, isActive: true } });

        if (!user) {
            throw new Error(`User not found with ID: ${userId}`);
        }
        // 生成随机 token
        const tokenValue = crypto.randomBytes(32).toString('hex');

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + expiresInDays);
        const token = this.tokenRepository.create({
            token: tokenValue,
            user,
            userId: user.id,
            description,
            expiresAt,
            isActive: true
        });
        return await this.tokenRepository.save(token);
    }
    async revokeToken(tokenId: string): Promise<boolean> {
        const result = await this.tokenRepository.update(tokenId, { isActive: false });
        return result.affected ? result.affected > 0 : false;
    }
    async getUserTokens(userId: string): Promise<ApiToken[]> {
        return this.tokenRepository.find({
            where: { userId, isActive: true },
            order: { createdAt: 'DESC' }
        });
    }
}