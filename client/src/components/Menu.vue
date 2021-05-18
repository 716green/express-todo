<template>
  <div :class="show ? 'menu' : ''">
    <slot></slot>
    <aside v-show="show">
      <h2>Menu</h2>
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
</style>
