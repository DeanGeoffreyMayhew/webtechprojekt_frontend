<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Aufgabe</th>
      <th scope="col">Fertig bis</th>
      <th scope="col">Status</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="ToDo in ToDos" :key="ToDo.id">
      <th scope="row">{{ToDo.id}}</th>
      <td>{{ToDo.task}}</td>
      <td>{{displayDueToDate(ToDo.dueTo)}}</td>
      <td>{{displayDoneState(ToDo.done)}}</td>
      <td><button type="submit" class="btn btn-danger" @click="deleteToDo(ToDo.id)">löschen</button></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ToDosTable',
  props:{
    ToDos:{
      type: Array,
      required: true
    }
  },
  methods:{
    displayDoneState(done) {
      if(done){
        return "fertig";
      } else {
        return "nicht fertig";
      }
    },
    displayDueToDate(dueTo){
      let year;
      let month;
      let day;
      dueTo.forEach((x, index) => {
        if(index == 0){
          year = "-"+x;
        } else if(index == 1){
          month = "-"+x
        } else {
          day = x + "";
        }
      })
      return day+month+year;
    },
    deleteToDo(id){
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }

      fetch("http://localhost:8080/api/v1/toDos/" + id, requestOptions)
        .catch(error => console.log('error', error));

      window.location.reload();
    }
  }
}
</script>

<style scoped>

</style>
