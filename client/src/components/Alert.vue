<template>
  <div class="alert">{{ message }}</div>
</template>

<script>
  export default {
    name: 'Alert',
    props: ['message'],
  };
</script>

<style scoped>
  .alert {
    background-color: #fff;
    border: dashed lightblue 2px;
    border-radius: 0.75rem;
    /* width: 100%; */
    height: 60px;
    text-align: center;
  }
</style>
