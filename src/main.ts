import { createApp, h, provide } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './styles/global.scss';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './apollo/client';
import { createPiniaThemeSync } from './plugins/pinia-theme-sync';

const pinia=createPinia();
pinia.use(piniaPluginPersistedstate);
pinia.use(createPiniaThemeSync(vuetify.theme));

const app=createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app');
