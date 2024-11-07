import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'src/LeJeu.js', dest: 'src' },
        { src: 'src/style.css', dest: 'src' }
      ]
    })
  ]
});
