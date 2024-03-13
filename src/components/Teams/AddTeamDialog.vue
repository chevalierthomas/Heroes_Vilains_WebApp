<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Nouvelle Équipe</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nom de l'équipe" v-model="newTeam.name"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
        <v-btn color="blue darken-1" text @click="createTeam">Créer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.dialog,
      newTeam: {
        name: '',
      }
    };
  },
  watch: {
    dialog(newVal) {
      this.show = newVal;
    }
  },
  methods: {
    ...mapActions('main',['appendTeam']), // Supposons que 'appendTeams' est l'action pour ajouter une nouvelle équipe
    close() {
      this.$emit('update:dialog', false);
    },
    async createTeam() {
      if (this.newTeam.name) {
        console.log(this.newTeam)
        await this.appendTeam(this.newTeam);
        this.close();
        this.newTeam = { name: '' }; // Réinitialiser le formulaire
      }
    }
  }
};
</script>
