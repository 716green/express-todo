<template>
  <div :class="show ? 'menu' : ''">
    <slot></slot>
    <aside v-show="show">
      <h2>Menu</h2>
      <button
        :disabled="alertIsActive"
        :class="!alertIsActive ? 'alternate' : ''"
        @click="toggleArchived"
      >
        {{ !showArchived ? 'Show Archived' : 'Hide Archived' }}
      </button>
      <div class="buttons">
        <button class="primary" v-if="!user" @click="userLogin">Login</button>
        <button class="secondary" v-else @click="userLogout">Logout</button>
      </div>
    </aside>
  </div>
</template>

<script>
  import { auth } from '../firebase';
  import firebase from 'firebase/app';
  import 'firebase/auth';
  export default {
    name: 'Menu',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      userLogout() {
        auth.signOut().then(() => {
          this.$emit('hideMenu');
        });
      },
      userLogin() {
        const provider = new firebase.auth.GithubAuthProvider();
        auth
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential;
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const token = credential.accessToken;
            const user = result.user; // The signed-in user info.
            console.info(user, token);
            this.$store.dispatch('setUser', user);
            this.$store.dispatch('setToken', token);
          })
          .finally(() => {
            this.$emit('hideMenu');
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
            alert(`${errorCode} ${errorMessage} ${email} ${credential}`);
          });
      },

      toggleArchived() {
        if (!this.$store.getters.getAlert.active) {
          this.$store.dispatch('toggleShowArchived');
          this.createAlert('Toggled Archived');
        }
      },
      createAlert(message) {
        this.$store.dispatch('setAlert', { message: message, active: true });
      },
    },
    computed: {
      user() {
        return this.$store.getters.getUser;
      },
      token() {
        return this.$store.getters.getToken;
      },
      showArchived() {
        return this.$store.getters.getShowArchived;
      },
      alertIsActive() {
        return this.$store.getters.getAlert.active;
      },
    },
  };
</script>

<style scoped>
  h2 {
    margin-top: 1rem;
  }
  button {
    width: 200px;
  }
  .menu {
    top: 0;
    left: 0;
    width: 250px;
    height: 250px;
    border-radius: 0 0.75rem 0.75rem 0.75rem;
    box-shadow: 5px 5px #888888;
    position: fixed;
    background-color: white;
  }
  .primary {
    background-color: #275a90;
    color: #fff;
  }
  .alternate {
    background-color: #279089;
    color: #fff;
  }

  .secondary {
    background-color: #f44336;
    color: #fff;
  }
</style>
