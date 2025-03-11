import { build } from 'esbuild';
import esbuildPluginPino from 'esbuild-plugin-pino';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

build({
    entryPoints: ['./src/index.ts'],
    outdir: 'dist',
    bundle: true,
    platform: 'node',
    target: 'node20',
    packages: 'external', // 这意味着不会将 node_modules 打包进去
    plugins: [
        esbuildPluginPino({ transports: ['pino-pretty'] }),
        esbuildPluginTsc({
            force: true,
        }),
    ],
}).catch(() => process.exit(1));