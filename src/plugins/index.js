/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import pinia from '@/stores'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

pinia.use(piniaPluginPersistedstate)
pinia.use(({ store }) => {
  store.$router = router
});

export function registerPlugins(app) {
  app
  .use(vuetify)
  .use(router)
  .use(pinia)
}
