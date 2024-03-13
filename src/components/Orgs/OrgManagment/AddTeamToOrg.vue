<template>
  <div class="add-team-to-org">
    <v-btn v-if="!isAddingTeam" @click="isAddingTeam = true">Recruter une nouvelle équipe</v-btn>

    <div v-if="isAddingTeam">
      <v-select
          v-model="selectedTeam"
          :items="filteredTeams"
          item-text="name"
          item-value="_id"
          label="Sélectionnez une équipe à ajouter"
          return-object
          @change="enableAddButton"
          class="flex-grow-1"
      >
        <template v-slot:item="{ item }">
          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-select>

      <v-btn
          :disabled="!isAddButtonActive"
          color="success"
          @click="addTeamToOrg"
          class="ml-2"
      >
        <v-icon left>mdi-check</v-icon>
        Valider
      </v-btn>

      <v-btn color="error" @click="resetSelection" class="ml-2">
        <v-icon left>mdi-cancel</v-icon>
        Annuler
      </v-btn>
    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      selectedTeam: null,
      isAddButtonActive: false,
      isAddingTeam: false, // Ajout de cette nouvelle variable
    };
  },

  computed: {
    ...mapState('main',['teams', 'currentOrg']),

    filteredTeams() {
      if (!this.teams.length) {
        this.getAllTeams();
      }

      return this.teams.filter(team => !this.currentOrg.teams.some(orgTeam => orgTeam._id === team._id));
    },
  },

  methods: {
    ...mapActions('main',['getAllTeams','addTeamToCurrentOrg']),

    enableAddButton() {
      this.isAddButtonActive = !!this.selectedTeam;
    },

    async addTeamToOrg() {
      if (this.selectedTeam) {
        console.log(this.selectedTeam._id)
        await this.addTeamToCurrentOrg(this.selectedTeam);
        this.resetSelection();
      }
    },

    resetSelection() {
      this.selectedTeam = null;
      this.isAddButtonActive = false;
      this.isAddingTeam = false; // Réinitialise également l'état d'ajout d'équipe
    },
  },
};
</script>

<style scoped>
.add-team-to-org {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>