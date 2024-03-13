<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        Modifier le héros
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nom public" v-model="editHero.publicName" clearable></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Nom réel" v-model="editHero.realName" clearable></v-text-field>
            </v-col>

            <!-- Section pour éditer les pouvoirs -->
            <v-col cols="12" v-for="(power, index) in editHero.powers" :key="index">
              <v-row align="center">
                <v-col cols="4">
                  <v-text-field label="Nom du pouvoir" v-model="power.name" clearable></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select
                      :items="type_heroes"
                      item-text="type"
                      item-value="type"
                      label="Type"
                      v-model="power.type"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                      label="Niveau"
                      v-model="power.level"
                      type="number"
                      :rules="levelRules"
                      clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-btn icon @click="removePower(index)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-btn text @click="addPower">Ajouter un pouvoir</v-btn>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="updateHero">Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  props: ['hero'],
  data() {
    return {
      dialog: false,
      editHero: null,
    };
  },
  computed: {
    ...mapState('main',["type_heroes"]),
    levelRules() {
      return [
        v => (v >= 0 && v <= 100) || 'Le niveau doit être compris entre 0 et 100',
      ];
    },
  },
  methods: {
    ...mapActions('main',["updateCurrentHero"]),
    openDialog() {
      this.editHero = JSON.parse(JSON.stringify(this.hero));
      this.dialog = true;
    },

    convertPowerTypes() {
      this.editHero.powers.forEach((power, index) => {
        const typeIndex = this.type_heroes.findIndex(type => type === power.type);
        if (typeIndex !== -1) {
          // Ajustez l'index pour commencer à partir de 1 au lieu de 0 et assurez-vous que c'est un entier
          this.editHero.powers[index].type = parseInt(typeIndex + 1, 10); // Le second argument 10 spécifie la base (décimale dans ce cas)
        }
      });
    },

    closeDialog() {
      this.dialog = false;
    },

    async updateHero() {
      this.convertPowerTypes();
      console.log(this.editHero);
      await this.updateCurrentHero(this.editHero);
      this.closeDialog();
      this.$emit('reloadMembers'); // Cela déclenchera la recharge des membres dans le composant parent
    },
    addPower() {
      this.editHero.powers.push({ name: '', type: this.type_heroes[0], level: 0 });
    },
    removePower(index) {
      this.editHero.powers.splice(index, 1);
    }
  },
  watch: {
    hero: {
      immediate: true,
      handler(newValue) {
        this.editHero = JSON.parse(JSON.stringify(newValue));
      }
    }
  }
};
</script>
