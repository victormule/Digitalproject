import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'src/sketch.js', dest: 'src' },
        { src: 'src/style.css', dest: 'src' }
      ]
    })
  ]
});
