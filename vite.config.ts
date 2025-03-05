/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
server: {
proxy: {
    '/v1': {
      target: 'http://go-recipes:8080',
      changeOrigin: true,
    }
  }
},	
  plugins: [react()],
  test: {
   environment: 'happy-dom',
   setupFiles: './testSetUp.ts'
}
})
