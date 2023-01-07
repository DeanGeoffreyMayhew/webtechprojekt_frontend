<template>
  <ToDoCreateForm></ToDoCreateForm>
  <ToDosTable :ToDos="this.ToDos"></ToDosTable>
</template>

<script>
import ToDoCreateForm from '@/components/ToDoCreateForm'
import ToDosTable from '@/components/ToDosTable'

export default {
  name: 'ToDosView',
  components: {
    ToDoCreateForm,
    ToDosTable
  },
  data() {
    return {
      ToDos: [],
      claims: []
    }
  },
  async created(){
    await this.setup()
    this.getToDos()
  },
  methods:{
    async setup(){
      if(this.$root.authState.isAuthenticated){
        this.claims = await this.$auth.getUser()
      } else {
        this.claims.email = "kein Nutzer"
      }
    },
    getToDos () {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://localhost:8080/api/v1/toDos?owner="+this.claims.email, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(todo => {
          this.ToDos.push(todo)
        }))
        .catch(error => console.log('error', error));
    }
  }
}
</script>

<style scoped>
</style>
