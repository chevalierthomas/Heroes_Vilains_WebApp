<template>
  <div>
    <v-btn color="primary" @click="dialog = true">Créer un nouveau héros</v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          Créer un héros
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nom public" v-model="newHero.publicName" clearable></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nom réel" v-model="newHero.realName" clearable></v-text-field>
              </v-col>

              <v-col cols="12" v-for="(power, index) in newHero.powers" :key="index">
                <v-row align="center">
                  <v-col cols="4">
                    <v-text-field label="Nom du pouvoir" v-model="power.name" clearable></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                        :items="type_heroes"
                        label="Type"
                        v-model="power.type"
                    ></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-text-field label="Niveau" v-model="power.level" type="number" :rules="[levelRules]" clearable></v-text-field>
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
          <v-btn color="green darken-1" text @click="createHero">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      dialog: false,
      newHero: {
        publicName: '',
        realName: '',
        powers: []
      },
    };
  },

  methods: {
    ...mapActions('main',["createHeroAndAddHeroesToCurrentTeam"]),
    convertPowerTypes() {
      this.newHero.powers.forEach((power, index) => {
        const typeIndex = this.type_heroes.findIndex(type => type === power.type);
        if (typeIndex !== -1) {
          // Ajustez l'index pour commencer à partir de 1 au lieu de 0 et assurez-vous que c'est un entier
          this.newHero.powers[index].type = parseInt(typeIndex + 1, 10); // Le second argument 10 spécifie la base (décimale dans ce cas)
        }
      });
    },

    addPower() {
      this.newHero.powers.push({ name: '', type: '', level: 0 });
    },
    removePower(index) {
      this.newHero.powers.splice(index, 1);
    },
    async createHero() {
      this.convertPowerTypes();
      await this.createHeroAndAddHeroesToCurrentTeam(this.newHero)
      this.resetForm();
      this.dialog = false; // Ferme le dialogue
    },

    resetForm() {
      this.newHero = { publicName: '', realName: '', powers: [] };
    },
  },
  computed: {
    ...mapState('main',["type_heroes"]),
    levelRules() {
      return [
        v => !v || (v >= 0 && v <= 100) || 'Le niveau doit être entre 0 et 100',
      ];
    },
  },
};
</script>


<style scoped>
</style>
