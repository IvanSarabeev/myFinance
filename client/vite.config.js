var _a;
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/app': path.resolve(__dirname, './src/app'),
            '@/components': path.resolve(__dirname, './src/components'),
            '@/features': path.resolve(__dirname, './src/features'),
            '@/hooks': path.resolve(__dirname, './src/hooks'),
            '@/lib': path.resolve(__dirname, './src/lib'),
            '@/stores': path.resolve(__dirname, './src/stores'),
            '@/types': path.resolve(__dirname, './src/types'),
        }
    },
    define: {
        'proccess.env.CLIENT_NODE_ENV': JSON.stringify((_a = process.env.CLIENT_NODE_ENV) !== null && _a !== void 0 ? _a : 'development')
    },
    build: {
        minify: 'esbuild', // Ensure production minification
        sourcemap: false, // Remove sourcemaps in prod
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    if (id.includes('node_modules')) {
                        return id.split('node_modules/')[1].split('/')[0].toString(); // Separate vendor chunks
                    }
                },
            }
        }
    },
});
