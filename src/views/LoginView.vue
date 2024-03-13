<template>
  <div>
    <h2>Connexion Héros</h2>
    <input v-model="login" placeholder="Login">
    <input v-model="password" type="password" placeholder="Mot de passe">
    <button @click="loginUser">Se connecter</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      user:{
        login: '',
        password: ''
      }

    };
  },
  methods: {

    ...mapActions("secret",["signIn"]),
    async loginUser() {
      await this.signIn(this.user)
      
    }
  }
};
</script>
