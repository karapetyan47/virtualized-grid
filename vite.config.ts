import * as path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const srcPath = path.resolve(__dirname, 'src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: srcPath }],
  },
});
