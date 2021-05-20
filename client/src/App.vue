<template>
  <div style="padding: 20px; margin: 50px;">
    <section>
      <!-- <pre style="text-align: left">
        <code>
      {{ $store.getters.getState.tasks.userTasks }}

        </code>
      </pre> -->
      <Menu :show="showMenu" style="z-index: 2" @hideMenu="showMenu = false">
        <a @click="toggleMenu" :class="showMenu ? 'hb small' : 'hb'">
          <strong>
            {{ showMenu ? '°' : '≣' }}
          </strong>
        </a>
      </Menu>
      <Main style="z-index: 1" />
      <Alert
        v-if="alertPopup.active"
        class="alert"
        :message="alertPopup.message"
      />
    </section>
    <div
      v-if="showMenu"
      style="z-index: 0; position: fixed; top: 0; left: 0; width: 100%; height: 100vh;"
      @click="closeMenu"
    ></div>
  </div>
</template>

<script>
  import Main from './components/Main.vue';
  import Menu from './components/Menu.vue';
  import Alert from './components/Alert.vue';

  export default {
    name: 'App',
    data() {
      return {
        showMenu: false,
      };
    },
    methods: {
      closeMenu() {
        if (this.showMenu === true) {
          this.showMenu = false;
        }
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      outsideCloseMenu() {
        if (this.showMenu) {
          this.showMenu = false;
        }
      },
    },
    computed: {
      alertPopup() {
        return this.$store.getters.getAlert;
      },
    },
    components: {
      Main,
      Menu,
      Alert,
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
  }

  .alert {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 10px;
    padding: 10px;
    z-index: 2;
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
