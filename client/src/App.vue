<template>
  <section>
    <Main title="Databass Task Manager" @click="outsideCloseMenu" />
    <Menu :show="showMenu">
      <a @click="toggleMenu" :class="showMenu ? 'hb small' : 'hb'">
        <strong>
          {{ showMenu ? '°' : '≣' }}
        </strong>
      </a>
    </Menu>
  </section>
</template>

<script>
  import Main from './components/Main.vue';
  import Menu from './components/Menu.vue';

  export default {
    name: 'App',
    data() {
      return {
        showMenu: false,
      };
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      outsideCloseMenu() {
        if (this.showMenu) {
          this.showMenu = false;
        }
      },
    },
    components: {
      Main,
      Menu,
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
    margin-top: 60px;
  }

  .hb {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 5rem;
    cursor: pointer;
    text-decoration: none;
    color: #2c3e50;
    position: fixed;
  }
  .hb:hover {
    text-decoration: none;
    color: lightslategray;
  }

  .small {
    font-size: 2.5rem;
    padding-left: 10px;
    padding-top: 10px;
  }
</style>
