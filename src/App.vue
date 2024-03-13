<template>
  <v-app>

    <v-app-bar app>
      <router-link :to="{ name: 'home' }" tag="div">
        <v-toolbar-title>Heroes & Vilains</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer> <!-- Cet élément est utilisé pour pousser le contenu suivant vers la droite -->

      <v-btn text :to="{ name: 'org' }">Organisations</v-btn>
      <v-btn text :to="{ name: 'team' }">Équipes</v-btn>
      <v-btn text :to="{ name: 'hero' }">Héros</v-btn>

      <v-spacer></v-spacer>

      <template v-if="auth">
        <span class="mr-4 subtitle-1">{{ getUserInfoName }}</span>
        <v-btn class="mr-4"  :to="{ name: 'UserAccount' }">espace personnelle</v-btn>
        <v-btn color="red" text @click="logout">Déconnexion</v-btn>
      </template>
      <template v-else>
        <v-btn class="mr-4" color="green"  :to="{ name: 'login' }">Authentification</v-btn>
        <v-btn color="orange" :to="{ name: 'register' }">Inscription</v-btn>
      </template>
    </v-app-bar>

    <v-main>

      <div v-if="currentOrg">
        <v-toolbar color="secondary" dark dense>
          <v-toolbar-title>Organisation</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Organisation courante: {{ currentOrg.name }} (id : {{ currentOrg._id }})
            <v-btn color="red" @click="clearCurrentOrg">Supprimer</v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </div>

      <div v-if="currentTeam">
        <v-toolbar color="secondary" dark dense>
          <v-toolbar-title>Équipe</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Équipe courante: {{ currentTeam.name }} (id : {{ currentTeam._id }})
            <v-btn color="red" @click="clearCurrentTeam">Supprimer</v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </div>

      <div v-if="currentHero">
        <v-toolbar color="secondary" dark dense>
          <v-toolbar-title>Héro</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Héro courant : pseudo, {{ currentHero.publicName }} prénom, {{ currentHero.realName }} (id : {{ currentHero._id }})
            <v-btn color="red" @click="clearCurrentHero">Supprimer</v-btn>
          </v-toolbar-title>
        </v-toolbar>
      </div>

      <router-view/>

      <ErrorDialog title="Erreur" width="600"></ErrorDialog>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions, mapGetters, mapState} from "vuex";
import ErrorDialog from "@/components/ErrorDialog.vue";


export default {
  name: 'App',
  components:{
    ErrorDialog
  },

  methods:{
    ...mapActions("secret",["logoutUser"]),
    ...mapActions("main",["clearCurrentTeam","clearCurrentHero","clearCurrentOrg"]),
    async logout(){
      await this.logoutUser()
    }
  },
  computed: {
    ...mapState("main",['currentOrg','currentTeam','currentHero']),
    ...mapState("secret",["auth"]),
    ...mapGetters("secret",['getUserInfoName']),
  },
};
</script>


