<template>
  <div>
    <!-- Barre de navigation locale pour OrgView -->
    <v-toolbar color="secondary" dark dense>
      <v-toolbar-title>Organisations</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="currentOrg">
        Organisation courante: {{ currentOrg.name }} (id : {{ currentOrg._id }})
      </v-toolbar-title>
      <v-toolbar-title v-else>
        Pas d'organisation courante
      </v-toolbar-title>
    </v-toolbar>

    <!-- Contenu principal du composant OrgView -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OrgView',
  computed: {
    ...mapState(['currentOrg']), // Récupère currentOrg de l'état global Vuex
  },
};
</script>

<style scoped>
/* Styles supplémentaires si nécessaire */
</style>
