import './assets/main.css';
import { createApp } from 'vue';
import authConfig from "../auth_config.json";
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { createAuth0 } from "@auth0/auth0-vue";
import { createPinia } from "pinia";
import axios from 'axios';

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(createPinia());
app.use(createAuth0({
    domain: authConfig.domain,
    clientId: authConfig.clientId,
    authorizationParams: {
    redirect_uri: window.location.origin,
    }
}));

app.mount('#app')
