<template>
  <div>
    <v-btn color="primary" @click="dialog = true">Modifier le héros</v-btn>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          Modifier le héros
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
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

              <v-col cols="12" v-for="(power, index) in editHero.powers" :key="index">
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
          <v-btn color="green darken-1" text @click="updateHero">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapActions, mapState, mapGetters} from "vuex";

export default {
  data() {
    return {
      dialog: false,
      editHero: {
        publicName: '',
        realName: '',
        powers: []
      },
    };
  },

  mounted() {
    this.loadCurrentHero();
  },

  methods: {
    ...mapActions(["updateHeroAndCurrentTeam"]),

    loadCurrentHero() {
      if (this.currentHero._id) {
        this.editHero = JSON.parse(JSON.stringify(this.currentHero)); // Clonage profond pour éviter la mutation directe du store
      }
    },

    addPower() {
      this.editHero.powers.push({ name: '', type: '', level: 0 });
    },

    removePower(index) {
      this.editHero.powers.splice(index, 1);
    },

    async updateHero() {
      await this.updateHeroAndCurrentTeam(this.editHero);
      this.dialog = false; // Ferme le dialogue
    },
  },

  computed: {
    ...mapState(["type_heroes"]),
    ...mapState(["currentHero"]), // Assurez-vous que ce getter est défini dans votre store Vuex

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
