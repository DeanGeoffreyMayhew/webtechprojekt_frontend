<template>
  <nav class="navbar navbar-expand-lg bg-dark bg-opacity-25 mb-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ToDo List</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/todos">ToDos</router-link>
          <router-link class="nav-link" to="/profile" v-if="authState && authState.isAuthenticated">Okta Profil</router-link>
        </div>
      </div>
      <p class="nav-link m-auto" v-if="loaded"><strong>angemeldet:</strong> {{this.claims.email}}</p>
      <button class="btn btn-secondary m-2" v-if="authState && !authState.isAuthenticated">
        <router-link class="nav-link" to="/login">Login</router-link>
      </button>
      <button class="btn btn-secondary m-2" v-if="authState && authState.isAuthenticated" v-on:click="logout()">Logout</button>
    </div>
  </nav>
</template>

<script>
//<router-link class="nav-link" to="/login" v-if="authState && !authState.isAuthenticated">Login</router-link>
import { delay } from '@okta/okta-auth-js'

export default {
  name: 'NavbarComponent',
  data() {
    return {
      ToDos: [],
      claims: [],
      loaded: false
    }
  },
  async created(){
    await delay(5)
    this.loaded = false
    await this.setup()
  },
  methods: {
    async logout () {
      await this.$auth.signOut()
    },
    async setup(){
      if(this.$root.authState.isAuthenticated){
        this.claims = await this.$auth.getUser()
      } else {
        this.claims.email = "kein Nutzer"
      }
      this.loaded = true
    }
  }
}
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: black;
}
</style>
