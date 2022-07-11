import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import firebase from "firebase";

Vue.config.productionTip = false


const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "commitment-3dfb6.firebaseapp.com",
  projectId: "commitment-3dfb6",
  storageBucket: "commitment-3dfb6.appspot.com",
  messagingSenderId: "528162827844",
  appId: "1:528162827844:web:d9f258a0c1720af69d9611"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
