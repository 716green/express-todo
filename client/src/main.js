import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from './firebase';

let app = createApp(App).use(store);
app.mount('#app');

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('setUser', { ...user });
  } else {
    store.dispatch('setUser', null);
  }

  // let token;

  const thisUser = store.getters.getUser;
  const thisUserToken = store.getters.getToken;
  if (sessionStorage.getItem('token')) {
    let sessionToken = sessionStorage.getItem('token');
    store.dispatch('setToken', sessionToken);
  } else if (thisUser && !thisUserToken && !sessionStorage.getItem('token')) {
    let token = firebase
      .auth()
      .currentUser.getIdToken()
      .then((idToken) => {
        console.log(idToken);
        token = idToken;
        store.dispatch('setToken', token);
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
