<template>
  <button class="btn btn-success sticky-bottom" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
    Neues ToDo erstellen
  </button>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Neues ToDo</h5>
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
              <button type="submit" class="btn btn-primary" @click="createToDo">Erstellen</button>
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
      const valid = this.validate();
      if(valid){
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          'task': this.task,
          'created': this.getDateToday(),
          'dueTo': this.aggregateDueToDate(this.dueTo),
          'done': this.isDone,
          'owner': 'AUSTAUSCHEN'
        })

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        }

        fetch("http://localhost:8080/api/v1/toDos", requestOptions)
          .catch(error => console.log('error', error));
      }
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
.sticky-bottom{
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  border-radius: 30px;
}
</style>
