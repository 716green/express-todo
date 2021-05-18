import { createStore } from 'vuex';
import { db } from '../firebase';

import 'firebase/app';
import 'firebase/auth';

export const store = createStore({
  state: {
    user: null,
    token: null,
    tasks: null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    },
    getTasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    setUser({ commit }, user) {
      let userInfo = null;
      if (user) {
        const { uid, displayName, photoURL, email } = user;
        userInfo = {
          uid,
          displayName,
          photoURL,
          email,
        };
      }
      commit('SET_USER', userInfo);
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
      sessionStorage.setItem('token', token);
    },
    setTasks({ commit }, username) {
      const docRef = db.collection('tasks').doc(username);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            commit('SET_TASKS', doc.data());
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    },
  },
});
