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
        <th class="thdt">🗓{{ new Date(created).toDateString() }}</th>
        <th class="thdt">🗓{{ new Date(dueDate).toDateString() }}</th>
        <th class="thcode">
          <code class="code">{{ status }}</code>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
  import { percentCircle } from '../filters/filters';
  export default {
    name: 'Task',
    props: ['created', 'name', 'urgency', 'status', 'dueDate'],
    data() {
      return {
        percentCircle,
        showDates: true,
      };
    },
  };
</script>

<style scoped>
  table {
    margin: 0;
  }

  .th {
    width: 20%;
  }

  .thdt {
    width: 200px;
    font-size: 0.8rem;
    margin: 0;
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
    width: 100%;
    text-align: end;
    cursor: pointer;
  }

  .color {
    width: 15px;
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
