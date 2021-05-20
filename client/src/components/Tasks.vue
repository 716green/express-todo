<template>
  <div>
    <section>
      <!-- {{ tasks }} -->
      <div class="info">
        <p
          v-if="activeTasksLength && newTaskNameLength && !newTaskUrgency"
          style="padding: 0; margin: 0;"
        >
          Urgency (0 - Lowest, 100 - Highest)
        </p>
        <p
          v-show="activeTasksLength && newDueDate === ''"
          style="padding: 0; margin: 0;"
        >
          Due Date
        </p>
      </div>
      <input
        autofocus
        ref="input"
        type="text"
        placeholder="Task"
        v-model="newTaskName"
      />
      <input
        v-show="newTaskNameLength"
        type="number"
        :class="validNumber ? 'num number-valid' : 'num number-invalid'"
        placeholder="0-100"
        min="0"
        max="100"
        step="5"
        aria-controls="hidden"
        v-model="newTaskUrgency"
      />
      <input v-show="newTaskNameLength" type="date" v-model="newDueDate" />
      <button v-show="newTaskNameLength" @click="addNewTask" class="primary">
        Add
      </button>
    </section>
    <!-- {{ existingCurrentTasks }} -->
    <h2>{{ tasksLength ? 'Tasks' : 'Add a Task' }}</h2>
    <section style="width: 100%;">
      <Task
        v-for="(task, i) in activeTasks"
        :key="i"
        :taskIndex="i"
        :created="ymd(task.created['seconds'])"
        :name="task.name"
        :urgency="task.urgency"
        :status="task.status"
        :dueDate="ymd(task.dueDate['seconds'])"
        @getTasks="getTasks"
      />
    </section>

    <section v-show="showArchived" class="category">
      <h2>Archived</h2>
      <Task
        v-for="(task, i) in archivedTasks"
        :key="i"
        :taskIndex="i"
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
  import { ymd } from '../filters/filters';
  export default {
    name: 'Tasks',
    data() {
      return {
        ymd,
        showTasks: true,
        newTaskName: null,
        newTaskUrgency: null,
        newDueDate: this.newDate,
        showAddTask: false,
        description: null,
        updateTasks: [],
      };
    },
    watch: {
      // activeTasks() {
      //   if (this.updateTasks === []) {
      //     this.activeTasks.forEach((task) => {
      //       console.log({ at: this.activeTasks }, { ut: this.updateTasks });
      //       this.updateTasks.push(task);
      //     });
      //   }
      // },
      newTaskName() {
        // if (this.newTaskName?.length >= 1) {
        //   this.existingCurrentTasks = this.activeTasks;
        // }
        if (!this.newDueDate) {
          this.newDueDate = this.newDate;
        }
      },
    },
    methods: {
      listenForEnter(e) {
        if (e.keyCode === 13) {
          alert('enterWasPressed');
        }
      },
      clearInputs() {
        this.newTaskName = null;
        this.newTaskUrgency = null;
        this.newDueDate = this.newDate;
        this.description = null;
      },
      createAlert(message) {
        this.$store.dispatch('setAlert', { message: message, active: true });
      },
      addNewTask() {
        // if (!this.updateTasks) {
        //   this.updateTasks = [];
        // }
        let tasks = this.tasks.userTasks || [];
        // if (!this.activeTasks) {
        //   activeTasks = [];
        // }
        this.updateTasks = tasks.concat(this.newTaskObject);
        this.$store.dispatch('updateTasks', {
          newActiveTasks: this.updateTasks,
        });
        setTimeout(() => {
          this.getTasks();
        }, 200);
        this.clearInputs();
        this.createAlert('Updated Tasks');
      },
      getTasks() {
        console.log('GET TASKS');
        this.$store.dispatch('setTasks');
      },
    },
    mounted() {
      this.getTasks();
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && this.newTaskName?.length > 0) {
          this.addNewTask();
        }
      });
    },
    computed: {
      existingCurrentTasks() {
        return this.tasks?.userTasks;
      },
      newDate() {
        return ymd(
          Date.now()
            .toString()
            .substr(0, 10)
        );
      },
      newTaskNameLength() {
        return this.newTaskName?.length;
      },
      showArchived() {
        return this.$store.getters.getShowArchived;
      },
      validNumber() {
        return this.newTaskUrgency <= 100 && this.newTaskUrgency >= 0;
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
        return this.$store?.getters?.getTasks;
      },
      activeTasks() {
        return this.$store?.getters?.getActiveTasks;
      },
      tasksLength() {
        return this.tasks?.length;
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
