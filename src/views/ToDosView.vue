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
        <td>{{ToDo.dueTo}}</td>
        <td>{{test(ToDo.done)}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ToDosView',
  data() {
    return {
      ToDos: []
    }
  },
  methods:{
    test(done){
      if(done){
        return "fertig";
      } else {
        return "nicht fertig";
      }
    }
  },
  mounted () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:8080/api/v1/toDos", requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(todo => {
        this.ToDos.push(todo)
      }))
      .catch(error => console.log('error', error));
  }
}
</script>

<style scoped>
</style>
