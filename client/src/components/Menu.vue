<template>
  <div :class="show ? 'menu' : ''">
    <slot></slot>
    <aside v-show="show">
      <h2>Menu</h2>
      <button
        :class="showArchived ? 'primary' : 'secondary'"
        @click="toggleArchived"
      >
        Toggle Archived
      </button>
    </aside>
  </div>
</template>

<script>
  export default {
    name: 'Menu',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
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
      showArchived() {
        return this.$store.getters.getShowArchived;
      },
    },
  };
</script>

<style scoped>
  h2 {
    margin-top: 1rem;
  }
  .menu {
    top: 0;
    left: 0;
    width: 250px;
    height: 250px;
    border-radius: 0 0.75rem 0.75rem 0.75rem;
    box-shadow: 5px 5px #888888;
    position: fixed;
  }
  .primary {
    background-color: #275a90;
    color: #fff;
  }
  .secondary {
    background-color: #275a9090;
    color: #fff;
  }
</style>
