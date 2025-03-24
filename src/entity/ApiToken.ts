// src/entities/ApiToken.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('api_tokens')
export class ApiToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    @Index()
    token: string;

    @Column()
    role: string;  // 用于 Casbin 的 subject (sub)

    @Column({ nullable: true })
    description: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    expiresAt: Date;

    @Column({ nullable: true, type: 'timestamp' })
    lastUsedAt: Date;

    @Column({ nullable: true })
    createdBy: string;
}
