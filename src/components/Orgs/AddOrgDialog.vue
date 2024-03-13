<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Nouvelle Organisation</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nom" v-model="newOrg.name"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Mot de passe" v-model="newOrg.secret" type="password"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Annuler</v-btn>
        <v-btn color="blue darken-1" text @click="createOrg">Créer</v-btn>
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
      newOrg: {
        name: '',
        secret: ''
      }
    };
  },
  watch: {
    dialog(newVal) {
      this.show = newVal;
    }
  },
  methods: {
    ...mapActions('main',['appendOrg']),
    close() {
      this.$emit('update:dialog', false);
    },
    async createOrg() {
      if (this.newOrg.name && this.newOrg.secret) {
        await this.appendOrg(this.newOrg);
        this.close();
        this.newOrg = { name: '', secret: '' }; // Réinitialiser le formulaire
      }
    }
  }
};
</script>
