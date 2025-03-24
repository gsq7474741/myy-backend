// src/types/token.ts
export interface TokenInfo {
    id: string;
    tokenValue: string;
    tokenPrefix: string;
    permissions: string[];
    isActive: boolean;
    expiresAt: Date | null;
}

declare global {
    interface HonoEnv {
        Variables: {
            tokenInfo?: TokenInfo;
        };
    }
}
