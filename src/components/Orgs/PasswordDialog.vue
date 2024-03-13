<template>
  <v-dialog v-model="show" persistent max-width="300px">
    <v-card>
      <v-card-title class="headline">Mot de passe requis</v-card-title>
      <v-card-text>
        <v-text-field
            label="Mot de passe"
            v-model="password"
            type="password"
            autocomplete="off"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="savePassword">Confirmer</v-btn>
        <v-btn color="red darken-1" text @click="close">Annuler</v-btn>
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
  watch: {
    dialog(newVal) {
      this.show = newVal;
    }
  },
  data() {
    return {
      show: this.dialog,
      password: '',
      showPassword: false
    };
  },
  methods: {
    ...mapActions('secret',['setPasswordOrg']),
    close() {
      this.$emit('update:dialog', false);    },
    async savePassword() {
      if (this.password) {
        await this.setPasswordOrg(this.password);
        this.close();
        this.password = '';
      }
    }
  }
};
</script>
