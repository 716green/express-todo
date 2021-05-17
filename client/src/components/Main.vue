<template>
  <div class="main">
    <h1>{{ title }}</h1>
    <button @click="login">Login</button>
  </div>
</template>

<script>
  import { auth } from '../auth/index';
  export default {
    name: 'Main',
    props: ['title'],
    methods: {
      login() {},
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  a {
    color: #42b983;
  }
</style>
