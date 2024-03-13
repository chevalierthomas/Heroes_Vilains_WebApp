<template>
  <div>
    <h3>Liste des Équipes</h3>

    <v-btn color="primary" @click="addTeamDialog = true">Ajouter Équipe</v-btn>

    <AddTeamDialog :dialog="addTeamDialog" @update:dialog="addTeamDialog = $event"></AddTeamDialog>

    <!-- Tableau des équipes -->
    <v-data-table
        :headers="tableHeaders"
        :items="teams"
        @click:row="selectTeam"
        class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddTeamDialog from "@/components/Teams/AddTeamDialog.vue"; // Assurez-vous que le chemin vers le composant est correct

export default {
  components: {
    AddTeamDialog
  },

  data() {
    return {
      tableHeaders: [
        {text: 'ID', value: '_id'},
        {text: 'Nom de l’équipe', value: 'name'},
        {text: 'Affiliations', value: 'nbAffiliations'}
      ],
      addTeamDialog: false // Contrôle l'affichage du dialogue pour ajouter une équipe
    };
  },

  async mounted() {
    await this.loadTeams();
  },

  computed: {
    ...mapState('main',['teams']), // Récupère les données des équipes depuis le store Vuex
  },

  methods: {
    ...mapActions('main',['getAllTeams']), // Lie l'action Vuex pour récupérer toutes les équipes
    async loadTeams() {
      await this.getAllTeams();
    }
  }
}
</script>

<style scoped>
</style>

