import { createStore } from 'vuex';
import { db } from '../firebase';

import 'firebase/app';
import 'firebase/auth';

export const store = createStore({
  state: {
    user: null,
    token: null,
    tasks: null,
    showArchived: true,
    alert: {
      message: '',
      active: false,
    },
  },
  getters: {
    getState(state) {
      return state;
    },
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      return state.token;
    },
    getTasks(state) {
      return state.tasks;
    },
    getActiveTasks(state) {
      // console.log({ stateTasks: state.tasks });
      return state?.tasks?.userTasks?.filter((task) => {
        // console.log({ task });
        return task?.status === 'active' || task?.status === 'complete';
      });
    },
    getArchivedTasks(state) {
      return state?.tasks?.userTasks?.filter((task) => {
        return task?.status === 'archived';
      });
    },
    // getArchivedTasks(state) {
    //   return state?.tasks?.archived?.sort((a, b) => a.urgency - b.urgency);
    // },
    getShowArchived(state) {
      return state.showArchived;
    },
    getAlert(state) {
      return state.alert;
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
      // console.log(state.tasks);
    },
    TOGGLE_SHOW_ARCHIVED(state, value) {
      state.showArchived = value;
    },
    SET_ALERT(state, payload) {
      const { message, active } = payload;
      state.alert.message = message;
      state.alert.active = active;
      if (active) {
        store.dispatch('resetAlert');
      }
    },
    UPDATE_STATUS_BY_INDEX(state, value) {
      state.activeTasks = value;
    },
  },
  actions: {
    toggleShowArchived({ commit, state }) {
      commit('TOGGLE_SHOW_ARCHIVED', !state.showArchived);
    },
    setUser({ commit }, user) {
      let userInfo = null;
      if (user) {
        // console.log({ user });
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
    setTasks({ commit, getters }) {
      let email = getters.getUser['email'];
      const docRef = db.collection('tasks').doc(email);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log('Document data:', doc.data());
            commit('SET_TASKS', doc.data());
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    },
    updateTasks({ commit, getters }, payload) {
      const { newActiveTasks } = payload;
      let email = getters.getUser['email'];
      const docRef = db.collection('tasks').doc(email);
      docRef
        .set({ userTasks: newActiveTasks }, { merge: true })
        .then((doc) => {
          console.log('set', doc.data());
        })
        .catch((error) => {
          console.log('Error setting document:', error);
        });
      commit('SET_TASKS', getters.getTasks);
    },
    setAlert({ commit }, payload) {
      const { message, active } = payload;
      commit('SET_ALERT', { message: message, active: active });
    },
    resetAlert({ commit }) {
      setTimeout(() => {
        commit('SET_ALERT', { message: '', active: false });
      }, 2000);
    },
    updateStatusByIndex({ commit, getters }, payload) {
      let tasks = getters.getTasks;
      const { status, index } = payload;
      let email = getters.getUser['email'];
      tasks.userTasks[index]['status'] = status;
      const docRef = db.collection('tasks').doc(email);
      console.log({ userTasks: tasks.userTasks });
      docRef
        .set({ userTasks: [...tasks.userTasks] }, { merge: true })
        .then(() => {
          console.log('activeTasks updated', tasks);
        })
        .catch((error) => {
          console.log('Error setting document:', error);
        });
      commit('UPDATE_STATUS_BY_INDEX', tasks.userTasks);
    },
  },
});
