/** @type {import('tailwindcss').Config} */
import formsPlugin from '@tailwindcss/forms'
import aspectRatioPlugin from '@tailwindcss/aspect-ratio'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [formsPlugin, aspectRatioPlugin]
}
