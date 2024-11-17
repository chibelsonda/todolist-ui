/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  defaults: {
    VTextField:{
      variant: 'underlined',
      style: "border-radius: 2px;",
    },
    VSelect:{
      color: "primary", 
      variant: 'underlined'
    },
  },
  components,
  directives,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#0090E2',
          secondary: '#1867C0',
          subdued: '#666666',
          error: '#D92550',
          info: '#2791F7',
          success: '#1DBC60',
          warning: '#FFCA16',
          "primary-bg": '#E7F2FC',
          "error-bg": '#FFEBEE',
          "success-bg": '#D9FDE8',
          "warning-bg": '#FFFDE7',
          "info-bg": '#DBEEFF',
        },
      },
    },
  },
})