<template>
  <div class="task">
    <table class="table">
      <tr>
        <th class="color">
          {{ percentCircle(urgency) }}
        </th>
        <th class="thname">
          {{ name }}
        </th>
        <th class="thdt" @click="rotateDate" v-if="showCreatedDate">
          🗓 {{ new Date(created).toDateString() }} [created]
        </th>
        <th class="thdt" @click="rotateDate" v-if="showDueDate">
          🗓 {{ new Date(dueDate).toDateString() }} [due]
        </th>
        <th class="thdt" @click="rotateDate" v-if="showCalendarIcon">
          🗓 [show]
        </th>
        <!-- <th class="thdt" @click="rotateDate"></th> -->
        <!-- <th class="thdt">🗓{{ new Date(dueDate).toDateString() }}</th> -->
        <th class="thcode">
          <code
            @click="rotateStatus"
            class="code"
            :style="
              status === 'active'
                ? 'background-color: lightskyblue; color: black'
                : ''
            "
            >{{ status }}</code
          >
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
  import { percentCircle } from '../filters/filters';
  export default {
    name: 'Task',
    props: ['created', 'name', 'urgency', 'status', 'dueDate', 'taskIndex'],
    data() {
      return {
        percentCircle,
        showDates: true,
        showCreatedDate: false,
        showDueDate: false,
        showCalendarIcon: true,
      };
    },
    methods: {
      rotateDate() {
        if (this.showCreatedDate) {
          this.showCreatedDate = false;
          this.showDueDate = true;
          this.showCalendarIcon = false;
        } else if (this.showDueDate) {
          this.showDueDate = false;
          this.showCreatedDate = false;
          this.showCalendarIcon = true;
        } else if (this.showCalendarIcon) {
          this.showCalendarIcon = false;
          this.showCreatedDate = true;
          this.showDueDate = false;
        }
      },
      rotateStatus() {
        if (this.status === 'complete') {
          this.setStatus('active');
        } else if (this.status === 'active') {
          this.setStatus('complete');
        }
      },
      setStatus(newStatus) {
        this.$store.dispatch('updateStatusByIndex', {
          status: newStatus,
          index: this.taskIndex,
        });
      },
    },
  };
</script>

<style scoped>
  table {
    margin: 0;
  }
  th {
    text-align: left;
  }

  tr {
    border: 1px dashed lightblue;
  }
  .th {
    width: 20%;
  }

  .thdt {
    width: 200px;
    font-size: 0.8rem;
    margin: 0;
    cursor: pointer;
  }

  .thname {
    width: 150px;
    margin-right: 0;
    font-size: 0.8rem;
  }

  .thcode {
    width: 100px;
    text-align: end;
  }
  .code {
    width: 150px;
    text-align: center;
    cursor: pointer;
  }

  .color {
    width: 35px;
  }

  .card {
    border: dashed 1px lightblue;
  }

  .title {
    display: flex;
    justify-content: space-between;
    padding: 0;
  }
</style>
