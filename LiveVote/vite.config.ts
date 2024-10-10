import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import ViteComponents from 'unplugin-react-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [
    react(),
    ViteComponents({
      dts: true, // Enables TypeScript declaration file generation
    }),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      autoInstall: true, // This option allows automatic installation of missing icons.
      customCollections: {
        s: FileSystemIconLoader('./src/assets/icons', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        ),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
