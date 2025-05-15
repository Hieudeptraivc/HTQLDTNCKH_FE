import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    allowedHosts: [
      'abd7-171-251-7-227.ngrok-free.app', // <--- thêm domain ngrok của bạn ở đây
    ],
  },
});
