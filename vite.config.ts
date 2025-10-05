import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { compression } from 'vite-plugin-compression2';

export default defineConfig(({ command }) => {
  const isProd = command === 'build';

  return {
    plugins: [
      react(),
      isProd &&
        compression({
          algorithms: ['gzip', 'brotli'],
          threshold: 10_240,
          deleteOriginalAssets: false,
          filename: file => `${file}.compressed`,
        }),
    ].filter(Boolean),

    server: {
      port: 11080,
      strictPort: true,
      host: true,
    },

    preview: {
      port: 11080,
      strictPort: true,
      host: true,
    },

    build: {
      target: 'es2020',
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor-react';
              if (id.includes('@mui')) return 'vendor-mui';
              if (id.includes('react-router')) return 'vendor-router';
              if (id.includes('lucide-react')) return 'vendor-icons';
              return 'vendor';
            }
          },
        },
      },
      minify: 'esbuild',
      assetsInlineLimit: 4096,
    },

    esbuild: isProd ? { drop: ['console', 'debugger'] } : undefined,
  };
});
