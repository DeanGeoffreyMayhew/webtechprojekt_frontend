<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Aufgabe</th>
      <th scope="col">Fertig bis</th>
      <th scope="col">Status</th>
      <th scope="col">Bearbeiten</th>
      <th scope="col">Löschen</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="ToDo in ToDos" :key="ToDo.id">
      <th scope="row">{{ToDo.id}}</th>
      <td>{{ToDo.task}}</td>
      <td>{{ displayDate(ToDo.dueTo) }}</td>
      <td>{{displayDoneState(ToDo.done)}}</td>
      <td><button type="button" class="btn btn-warning" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" @click="setActiveToDo(ToDo.id)">Bearbeiten</button></td>
      <td><button type="button" class="btn btn-danger" @click="deleteToDo(ToDo.id)">Löschen</button></td>
    </tr>
    </tbody>
  </table>

  <div class="offcanvas offcanvas-bottom h-auto" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">ToDo bearbeiten</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form class="needs-validation" novalidate>
        <div class="row mb-3">
          <label for="ToDoInput" class="col-form-label">Aufgabe:</label>
          <input type="text" class="form-control" id="ToDoInput" placeholder="ToDo..." v-model="task" required>
          <div class="invalid-feedback">
            Bitte ein ToDo eingeben.
          </div>
        </div>
        <div class="row mb-3">
          <label for="DueToInput" class="col-form-label">Fertig bis:</label>
          <input type="text" class="form-control" id="DueToInput" placeholder="DD-MM-YYYY" v-model="dueTo" required>
          <div class="invalid-feedback">
            Bitte ein Datum im richtigen Format angeben.
          </div>
        </div>
        <div class="row mb-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="isDoneInput" v-model="isDone">
            <label class="form-check-label" for="isDoneInput">erledigt</label>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <button type="submit" class="btn btn-warning" @click="updateToDo">Bearbeiten</button>
          </div>
          <div class="col">
            <button type="reset" class="btn btn-danger">Leeren</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDosTable',
  data() {
    return {
      activeToDoId: null,
      created: null,
      task: '',
      dueTo: '',
      isDone: false
    }
  },
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
    displayDate(date){
      let year;
      let month;
      let day;
      date.forEach((x, index) => {
        if(index == 0){
          year = "-"+x;
        } else if(index == 1){
          if(x >= 1 && x <= 9){
            month = "-0"+x
          } else {
            month = "-"+x
          }
        } else {
          if(x >= 1 && x <= 9){
            day = "0" + x;
          } else {
            day = "" + x;
          }

        }
      })
      return day+month+year;
    },
    aggregateDate(date){
      let day = date.substr(0,2);
      let month = date.substr(3,2);
      let year = date.substr(6,10);

      return year + "-" + month + "-" + day;
    },
    deleteToDo(id){
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }

      fetch("http://localhost:8080/api/v1/toDos/" + id, requestOptions)
        .catch(error => console.log('error', error));

      window.location.reload();
    },
    setActiveToDo(id){
      this.activeToDoId = id;

      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }

      fetch("http://localhost:8080/api/v1/toDos/" + this.activeToDoId, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.task = result.task
          this.dueTo = this.displayDate(result.dueTo)
          this.created = this.displayDate(result.created)
          this.isDone = result.done
        }).catch(error => console.log('error', error));
    },
    updateToDo(){
      const valid = this.validate();
      if(valid){
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          'task': this.task,
          'created': this.aggregateDate(this.created),
          'dueTo': this.aggregateDate(this.dueTo),
          'done': this.isDone
        })

        const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        }

        fetch("http://localhost:8080/api/v1/toDos/" + this.activeToDoId, requestOptions)
          .catch(error => console.log('error', error));
      }
    },
    validate(){
      let valid = true;
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            valid = false;
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })

      return valid;
    }
  }
}
</script>

<style scoped>

</style>
