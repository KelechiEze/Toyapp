import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Vite Configuration
export default defineConfig({
  plugins: [react()],

  // 🛠️ Ensure tslib (used by Radix UI & other libs) is properly bundled
  optimizeDeps: {
    include: ['tslib'],
  },

  // 🧩 Optional but recommended for smoother debugging
  resolve: {
    alias: {
      '@': '/src', // Allows you to use "@/components/..." imports
    },
  },

  // ⚙️ Optional: tweak server overlay if that red Vite error overlay annoys you
  server: {
    hmr: {
      overlay: true, // set to false if you want to disable the overlay
    },
  },
})
