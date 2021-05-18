<template>
  <div class="tasks">
    <h2>Tasks</h2>
    <div class="json" style="text-align: left">
      <pre><code>{{ tasks }}</code></pre>
    </div>
  </div>
</template>

<script>
  import { db } from '../firebase';
  console.log(db);
  export default {
    name: 'Tasks',
    data() {
      return {
        tasks: null,
      };
    },
    methods: {
      getTasks() {
        this.$store.dispatch('setTasks', '716green');
        this.tasks = this.$store.getters.getTasks;
      },
    },
    mounted() {
      this.getTasks();
    },
    // computed: {
    //   tasks() {
    //     return this.$store.getters.getTasks;
    //   },
    // },
  };
</script>

<style scoped></style>
