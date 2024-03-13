<template>
  <div>
    <h3>Détails de l'organisation</h3>
    <v-card>
      <v-card-title>{{ currentOrg.name }}</v-card-title>
      <v-card-text>
        <p>ID: {{ currentOrg._id }}</p>
        <p>Secret: {{ currentOrg.secret }}</p>
        <v-divider></v-divider>
        <h3>Équipes</h3>
        <v-data-table
            :headers="teamHeaders"
            :items="currentOrg.teams"
            class="elevation-1"
        >
        </v-data-table>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['currentOrg'])
  },
  data() {
    return {
      teamHeaders: [
        { text: 'ID', value: '_id', sortable: false },
        { text: 'Nom de l’équipe', value: 'name' },
        { text: 'Affiliations', value: 'nbAffiliations' }
      ]
    };
  }
};
</script>

<style scoped>
</style>
