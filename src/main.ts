import { createApp, h, provide } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './apollo/client';

const app=createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(createPinia());
app.use(vuetify);

app.mount('#app');
