import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  define: {
    'proccess.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development')
  },
  build: { // Ensure React is build in production via Docker
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
  preview: {
    port: 8080,
    strictPort: true
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080"
  }
})
