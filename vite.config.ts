import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        // babel({
        //     babelConfig: {
        //         plugins: [
        //             'effector/babel-plugin',
        //             { factories: ['@withease/factories'] },
        //         ],
        //     },
        // }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src/', import.meta.url)),
            shared: fileURLToPath(
                new URL('./src/shared', import.meta.url),
            ),
            entities: fileURLToPath(
                new URL('./src/entities', import.meta.url),
            ),
            app: fileURLToPath(new URL('./src/app', import.meta.url)),
            pages: fileURLToPath(
                new URL('./src/pages', import.meta.url),
            ),
            widgets: fileURLToPath(
                new URL('./src/widgets', import.meta.url),
            ),
        },
    },
});
