<template>
  <v-container>
    <h3 class="mt-6">Détails de l'organisation</h3>

    <v-card class="mt-4">
      <v-card-title>{{ currentOrg.name }}</v-card-title>
      <v-card-text>
        <p>ID: {{ currentOrg._id }}</p>
        <p>Secret: {{ currentOrg.secret }}</p>
        <v-divider class="mt-4"></v-divider>

        <h3 class="mt-4">Équipes</h3>
        <AddTeamToOrg class="mt-4 mb-6"></AddTeamToOrg>

        <v-data-table
            :headers="teamHeaders"
            :items="currentOrg.teams"
            class="elevation-1 mt-4"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn text color="primary" @click="selectTeam(item)">Sélectionner</v-btn>
            <v-btn text color="red" @click="prepareToDelete(item)">Supprimer</v-btn>
          </template>
        </v-data-table>

        <DeleteTeamToOrg :team="selectedTeam"/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import AddTeamToOrg from "@/components/Orgs/OrgManagment/AddTeamToOrg.vue";
import DeleteTeamToOrg from "@/components/Orgs/OrgManagment/DeleteTeamToOrg.vue";

export default {
  components: {DeleteTeamToOrg, AddTeamToOrg},

  computed: {
    ...mapState('main', ['currentOrg'])
  },

  data() {
    return {
      selectedTeam: null,
      teamHeaders: [
        {text: 'ID', value: '_id', sortable: false},
        {text: 'Nom de l’équipe', value: 'name'},
        {text: 'Actions', value: 'actions', sortable: false}
      ]
    }
  },

  methods: {
    ...mapActions('main', ['setCurrentTeam']),

    async selectTeam(team) {
      await this.setCurrentTeam(team);
      this.$router.push({name: 'teamDetails'});
    },

    prepareToDelete(team) {
      this.selectedTeam = team;
    }
  }
};
</script>

<style scoped>
</style>
