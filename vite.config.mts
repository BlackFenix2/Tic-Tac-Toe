import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoName = 'Tic-Tac-Toe';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? `/${repoName}/` : '/',
  
});
