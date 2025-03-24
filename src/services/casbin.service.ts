// src/services/CasbinService.ts
import { newEnforcer, Enforcer } from 'casbin';
import { join } from 'path';
import * as fs from 'fs';

export class CasbinService {
    private enforcer: Enforcer | null = null;
    private policyPath: string;

    constructor(modelPath: string, policyPath: string) {
        this.policyPath = policyPath;
    }

    async initialize(): Promise<Enforcer> {
        if (!this.enforcer) {
            this.enforcer = await newEnforcer(
                join(__dirname, '../config/rbac_model.conf'),
                join(__dirname, '../config/rbac_policy.csv')
            );
        }
        return this.enforcer;
    }

    async addPolicy(role: string, resource: string, action: string): Promise<boolean> {
        if (!this.enforcer) {
            throw new Error('Enforcer not initialized');
        }

        const added = await this.enforcer.addPolicy(role, resource, action);

        if (added) {
            // 将策略保存到文件
            await this.savePolicy();
        }

        return added;
    }

    async addRoleForUser(user: string, role: string): Promise<boolean> {
        if (!this.enforcer) {
            throw new Error('Enforcer not initialized');
        }

        const added = await this.enforcer.addGroupingPolicy(user, role);

        if (added) {
            // 将策略保存到文件
            await this.savePolicy();
        }

        return added;
    }

    async removeRoleForUser(user: string, role: string): Promise<boolean> {
        if (!this.enforcer) {
            throw new Error('Enforcer not initialized');
        }

        const removed = await this.enforcer.removeGroupingPolicy(user, role);

        if (removed) {
            // 将策略保存到文件
            await this.savePolicy();
        }

        return removed;
    }

    async removePolicy(role: string, resource: string, action: string): Promise<boolean> {
        if (!this.enforcer) {
            throw new Error('Enforcer not initialized');
        }

        const removed = await this.enforcer.removePolicy(role, resource, action);

        if (removed) {
            // 将策略保存到文件
            await this.savePolicy();
        }

        return removed;
    }

    async savePolicy(): Promise<void> {
        if (!this.enforcer) {
            throw new Error('Enforcer not initialized');
        }

        // 获取角色定义 (g)
        const roleDefinitions = await this.enforcer.getGroupingPolicy();

        // 获取策略规则 (p)
        const policyRules = await this.enforcer.getPolicy();

        let policyContent = '';

        // 先写入角色定义
        for (const rule of roleDefinitions) {
            policyContent += `g, ${rule.join(', ')}\n`;
        }

        // 空行分隔
        if (roleDefinitions.length > 0 && policyRules.length > 0) {
            policyContent += '\n';
        }

        // 再写入策略规则
        for (const rule of policyRules) {
            policyContent += `p, ${rule.join(', ')}\n`;
        }

        fs.writeFileSync(this.policyPath, policyContent);
    }

    async checkPermission(user: string, resource: string, action: string): Promise<boolean> {
        if (!this.enforcer) {
            throw new Error('Enforcer not initialized');
        }

        return await this.enforcer.enforce(user, resource, action);
    }

    async getRolesForUser(user: string): Promise<string[]> {
        if (!this.enforcer) {
            throw new Error('Enforcer not initialized');
        }

        return await this.enforcer.getRolesForUser(user);
    }

    getEnforcer(): Enforcer {
        if (!this.enforcer) {
            throw new Error('Enforcer not initialized');
        }
        return this.enforcer;
    }
}
