import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import daisyui from "daisyui";

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
				sans: ['Inter', 'sans-serif'], // Setting Inter as the main sans-serif font
			},
    },
  },

  plugins: [typography, forms, daisyui],

  daisyui: {
    themes: [
      {
        app: {
          "primary": "#327032",
          "primary-content": "#FFFFFF",

          "secondary": "#333333",
          "secondary-content": "#FFFFFF",

          "accent": "#4C2A4C",
          "accent-content": "#FFFFFF",

          "neutral": "#E0E0E0",
          "neutral-content": "#333333",

          "base-100": "#FFFFFF",
          "base-200": "#F5F5F5",
          "base-300": "#E0E0E0",
          "base-content": "#101010",

          "info": "#265B72",
          "info-content": "#FFFFFF",

          "success": "#2E5A2F",
          "success-content": "#FFFFFF",

          "warning": "#8A6D0B",
          "warning-content": "#FFFFFF",

          "error": "#7A2E2C",
          "error-content": "#FFFFFF",

          // Component variables remain unchanged
          "--rounded-box": "0.4rem",
          "--rounded-btn": "0.2rem",
          "--rounded-badge": "0.8rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
} as Config;
