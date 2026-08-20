import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
//
// 빌드가 두 종류입니다.
//  - npm run build   : 일반 배포용 (dist/)        — Vercel · GitHub Pages
//  - npm run build:file : 단일 HTML (dist-single/) — 더블클릭으로 열리는 파일 하나
//
// 단일 HTML은 JS/CSS를 전부 인라인으로 넣습니다. 인라인 스크립트는 CORS를 타지 않아서
// file:// 로 열어도 동작합니다. (외부 파일을 참조하는 일반 빌드는 file:// 에서 차단됩니다)
export default defineConfig(({ mode }) => {
  const single = mode === 'singlefile'
  return {
    // 상대 경로로 빌드합니다. Vercel(루트)과 GitHub Pages(/저장소명/) 양쪽에서
    // 저장소 이름을 몰라도 그대로 동작합니다.
    base: './',
    plugins: [react(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
    build: single
      ? { outDir: 'dist-single', cssCodeSplit: false, assetsInlineLimit: 100_000_000 }
      : {},
  }
})
