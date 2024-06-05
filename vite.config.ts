import uni from "@dcloudio/vite-plugin-uni"
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      dts: 'types/auto-imports.d.ts',
      imports: ['vue']
    })
  ],
})
