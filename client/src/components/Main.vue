<template>
  <div class="main">
    <h1 style="padding: 0; margin: 0; margin-bottom: 50px;">Task Management</h1>
    <img
      v-if="user && user.photoURL !== null"
      style="border-radius: 50%; width: 100px"
      :src="user.photoURL"
    />
    <div class="buttons">
      <button class="primary" v-if="!user" @click="userLogin">Login</button>
      <!-- <button class="secondary" v-else @click="userLogout">Logout</button> -->
    </div>
    <section v-if="user && user.uid !== null">
      <Tasks />
    </section>
  </div>
</template>

<script>
  import { auth } from '../firebase';
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import Tasks from './Tasks.vue';

  export default {
    name: 'Main',
    methods: {
      // userLogout() {
      //   auth.signOut();
      // },
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
    },
    computed: {
      user() {
        return this.$store.getters.getUser;
      },
      token() {
        return this.$store.getters.getToken;
      },
    },
    components: {
      Tasks,
    },
  };
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }

  .primary {
    background-color: #275a90;
    color: #fff;
  }

  .secondary {
    background-color: #f44336;
    color: #fff;
  }
</style>
