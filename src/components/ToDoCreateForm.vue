<template>
  <button class="btn btn-primary sticky-bottom" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
    Neues ToDo erstellen
  </button>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <form>
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Neues ToDo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div class="mb-3">
          <label for="ToDoInput" class="form-label">Aufgabe</label>
          <input type="text" class="form-control" id="ToDoInput" placeholder="ToDo..." v-model="task">
        </div>
        <div class="mb-3">
          <label for="DueToInput" class="form-label">Fertig bis</label>
          <input type="text" class="form-control" id="DueToInput" placeholder="DD-MM-YYYY" v-model="dueTo">
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" v-model="isDone">
            <label class="form-check-label" for="gridCheck">
              erledigt
            </label>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <button type="submit" class="btn btn-primary" @click="createToDo">erstellen</button>
          </div>
          <div class="col">
            <button type="reset" class="btn btn-danger">löschen</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ToDoCreateForm',
  data() {
    return {
      task: '',
      dueTo: '',
      isDone: false
    }
  },
  methods: {
    createToDo(){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "task": this.task,
        "created": this.getDateToday(),
        "dueTo": this.aggregateDueToDate(this.dueTo),
        "done": this.isDone
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8080/api/v1/toDos", requestOptions)
        .catch(error => console.log('error', error));
    },
    getDateToday(){
      let today = new Date()
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      return today = yyyy + '-' + mm + '-' + dd;
    },
    aggregateDueToDate(dueTo){
      let day = dueTo.substr(0,2);
      let month = dueTo.substr(3,2);
      let year = dueTo.substr(6,10);

      return year + "-" + month + "-" + day;
    }
  }
}
</script>

<style scoped>
.sticky-bottom{
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  border-radius: 30px;
}

</style>
