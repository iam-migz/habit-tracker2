import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // https://stackoverflow.com/questions/68595151/unable-to-dockerize-vite-react-typescript-project/68595302#68595302
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [react()],
});
