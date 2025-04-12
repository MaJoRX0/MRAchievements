import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react']
  },
  base: "/MRAchievements",
  
  build: {
    minify: "esbuild", // Uses esbuild (faster than terser)
  }
});
