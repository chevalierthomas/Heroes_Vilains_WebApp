<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Connexion Héros</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
                v-model="user.login"
                label="Login"
                prepend-icon="mdi-account"
                type="text"
            ></v-text-field>
            <v-text-field
                v-model="user.password"
                label="Mot de passe"
                prepend-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="loginUser">Se connecter</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        login: '',
        password: ''
      },
      showPassword: false,
    };
  },
  methods: {
    ...mapActions("secret", ["signIn"]),
    loginUser() {
      console.log(this.user)
      this.signIn(this.user);
      this.$router.push({ name: 'home' });
    }
  }
};
</script>
