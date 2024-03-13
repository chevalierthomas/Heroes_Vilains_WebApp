<template>
  <v-dialog v-model="dialog" persistent max-width="300px">
    <v-card>
      <v-card-title>Confirmer la suppression</v-card-title>
      <v-card-text>Êtes-vous sûr de vouloir supprimer cette équipe ?</v-card-text>
      <v-card-text>{{team.name}}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">Annuler</v-btn>
        <v-btn color="red darken-1" text @click="confirmDelete">Supprimer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: {
    team: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions('main',['removeTeamToCurrentOrg']),
    confirmDelete() {
      this.removeTeamToCurrentOrg(this.team)
      this.dialog = false;
    }
  },
  watch: {
    team(newVal) {
      if (newVal) {
        this.dialog = true;
      }
    }
  }
};
</script>

