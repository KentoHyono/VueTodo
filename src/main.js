import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
// Vuetify Installation
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify';

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#1976D2',
              secondary: '#424242',
              accent: '#82B1FF',
            },
          },
        }
    }
})

app.use(pinia).use(vuetify).mount('#app');