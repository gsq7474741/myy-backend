// src/services/RbacService.ts
import { Repository, DataSource } from 'typeorm';
import { Role, Permission, RolePermission } from '../entity';
import RBAC from 'rbac';

export class RbacService {
    private roleRepository: Repository<Role>;
    private permissionRepository: Repository<Permission>;
    private rolePermissionRepository: Repository<RolePermission>;
    private rbac: RBAC | null = null;

    constructor(private dataSource: DataSource) {
        this.roleRepository = dataSource.getRepository(Role);
        this.permissionRepository = dataSource.getRepository(Permission);
        this.rolePermissionRepository = dataSource.getRepository(RolePermission);
    }

    async initialize(): Promise<RBAC> {
        // 从数据库加载角色和权限配置
        const rbacConfig = await this.buildRbacConfig();
        this.rbac = new RBAC(rbacConfig);
        await this.rbac.init();
        return this.rbac;
    }

    async buildRbacConfig(): Promise<{ roles: string[], permissions: Record<string, string[]> }> {
        // 获取所有角色
        const roles = await this.roleRepository.find();

        // 获取所有角色-权限关系
        const rolePermissions = await this.dataSource
            .createQueryBuilder()
            .select('r.name as roleName, p.name as permissionName')
            .from(RolePermission, 'rp')
            .innerJoin(Role, 'r', 'rp.role_id = r.id')
            .innerJoin(Permission, 'p', 'rp.permission_id = p.id')
            .getRawMany();

        // 构建权限映射
        const permissions: Record<string, string[]> = {};

        rolePermissions.forEach(rp => {
            if (!permissions[rp.permissionName]) {
                permissions[rp.permissionName] = [];
            }
            permissions[rp.permissionName].push(rp.roleName);
        });

        return {
            roles: roles.map(r => r.name),
            permissions
        };
    }

    async hasPermission(roleName: string, permission: string): Promise<boolean> {
        if (!this.rbac) {
            throw new Error('RBAC not initialized');
        }
        return await this.rbac.can(roleName, permission);
    }

    async getRolePermissions(roleName: string): Promise<string[]> {
        if (!this.rbac) {
            throw new Error('RBAC not initialized');
        }

        const allPermissions = Object.keys(this.rbac.getPermissions());
        const rolePermissions: string[] = [];

        for (const permission of allPermissions) {
            if (await this.rbac.can(roleName, permission)) {
                rolePermissions.push(permission);
            }
        }

        return rolePermissions;
    }

    async createRole(name: string, description?: string): Promise<Role> {
        const role = this.roleRepository.create({
            name,
            description
        });

        const savedRole = await this.roleRepository.save(role);

        // 重新初始化 RBAC
        await this.initialize();

        return savedRole;
    }

    async createPermission(name: string, description?: string): Promise<Permission> {
        const permission = this.permissionRepository.create({
            name,
            description
        });

        const savedPermission = await this.permissionRepository.save(permission);

        // 重新初始化 RBAC
        await this.initialize();

        return savedPermission;
    }

    async assignPermissionToRole(roleName: string, permissionName: string): Promise<void> {
        const role = await this.roleRepository.findOne({ where: { name: roleName } });
        const permission = await this.permissionRepository.findOne({ where: { name: permissionName } });

        if (!role || !permission) {
            throw new Error(`Role ${roleName} or permission ${permissionName} not found`);
        }

        // 检查是否已经存在关系
        const exists = await this.rolePermissionRepository.findOne({
            where: {
                role: { id: role.id },
                permission: { id: permission.id }
            }
        });

        if (!exists) {
            await this.rolePermissionRepository.save({
                role,
                permission
            });

            // 重新初始化 RBAC
            await this.initialize();
        }
    }

    async removePermissionFromRole(roleName: string, permissionName: string): Promise<void> {
        const role = await this.roleRepository.findOne({ where: { name: roleName } });
        const permission = await this.permissionRepository.findOne({ where: { name: permissionName } });

        if (!role || !permission) {
            throw new Error(`Role ${roleName} or permission ${permissionName} not found`);
        }

        await this.rolePermissionRepository.delete({
            role: { id: role.id },
            permission: { id: permission.id }
        });

        // 重新初始化 RBAC
        await this.initialize();
    }

    getRbac(): RBAC {
        if (!this.rbac) {
            throw new Error('RBAC not initialized');
        }
        return this.rbac;
    }
}
