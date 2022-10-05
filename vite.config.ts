import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const abs = (...paths: string[]) => path.join(__dirname, ...paths);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: abs('src/components'),
    },
  },
});
