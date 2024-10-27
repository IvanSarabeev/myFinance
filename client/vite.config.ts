import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

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
    'proccess.env.CLIENT_NODE_ENV': JSON.stringify(process.env.CLIENT_NODE_ENV ?? 'development')
  },
  build: {
    minify: 'esbuild', // Ensure production minification
    sourcemap: false, // Remove sourcemaps in prod
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0].toString(); // Separate vendor chunks
          }
        },
      }
    }
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080"
  }
})
