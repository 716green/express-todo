<template>
  <div>
    <label for="New Task"></label>
    <input type="text" placeholder="Task" v-model="newTaskName" />
    <input
      type="number"
      :class="validNumber ? 'num number-valid' : 'num number-invalid'"
      placeholder="1-100"
      min="0"
      max="100"
      step="5"
      aria-controls="hidden"
      v-model="newTaskUrgency"
    />
    <input type="date" v-model="newDueDate" />
    <button @click="addNewTask" class="primary">Add</button>
    <section v-show="showTasks" style="width: 100%;">
      <h2>Tasks</h2>
      <Task
        v-for="(task, i) in existingCurrentTasks"
        :key="i"
        :created="ymd(task.created['seconds'])"
        :name="task.name"
        :urgency="task.urgency"
        :status="task.status"
        :dueDate="ymd(task.dueDate['seconds'])"
      />
    </section>

    <section v-show="showArchived" class="category">
      <h2>Archived</h2>
      <Task
        v-for="(task, i) in archivedTasks"
        :key="i"
        :created="ymd(task.created['seconds'])"
        :name="task.name"
        :urgency="task.urgency"
        :status="task.status"
        :dueDate="ymd(task.dueDate['seconds'])"
      />
    </section>
  </div>
</template>

<script>
  import Task from './Task.vue';
  import { db } from '../firebase';
  import { ymd } from '../filters/filters';
  console.log(db);
  export default {
    name: 'Tasks',
    data() {
      return {
        ymd,
        showTasks: true,
        newTaskName: null,
        newTaskUrgency: null,
        newDueDate: null,
        description: null,
        existingCurrentTasks: this.activeTasks,
      };
    },
    watch: {
      activeTasks(newValue) {
        if (newValue !== null) {
          this.existingCurrentTasks = this.activeTasks;
        }
      },
    },
    methods: {
      clearInputs() {
        this.newTaskName = null;
        this.newTaskUrgency = null;
        this.newDueDate = null;
        this.description = null;
      },
      createAlert(message) {
        this.$store.dispatch('setAlert', { message: message, active: true });
      },
      addNewTask() {
        if (this.newTaskName.length > 0) {
          this.existingCurrentTasks.unshift(this.newTaskObject);
          this.$store.dispatch('updateTasks', {
            username: '716green',
            newActiveTasks: this.activeTasks,
          });
          this.getTasks();
          this.clearInputs();
          this.createAlert('Updated Tasks');
        }
      },
      getTasks() {
        this.$store.dispatch('setTasks', '716green');
      },
    },
    mounted() {
      this.getTasks();
    },
    computed: {
      showArchived() {
        return this.$store.getters.getShowArchived;
      },
      validNumber() {
        return this.newTaskUrgency <= 100 && this.newTaskUrgency > 0;
      },
      newTaskObject() {
        return {
          created: new Date(),
          description: this.description,
          dueDate: new Date(this.newDueDateTime),
          name: this.newTaskName,
          status: 'active',
          urgency: this.newTaskUrgency,
        };
      },
      tasks() {
        return this.$store.getters.getTasks;
      },
      activeTasks() {
        return this.$store.getters.getActiveTasks;
      },
      archivedTasks() {
        return this.$store.getters.getArchivedTasks;
      },
      newDueDateTime() {
        let d = new Date(this.newDueDate);
        return d.getTime();
      },
    },
    components: {
      Task,
    },
  };
</script>

<style scoped>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
    /* Firefox */
  }

  .primary {
    background-color: #275a90;
    color: #fff;
  }
  .num {
    width: 70px;
  }
  .number-valid {
    color: black;
  }
  .number-invalid {
    color: red;
  }
</style>
