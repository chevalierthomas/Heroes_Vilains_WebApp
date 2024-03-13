<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field label="Nom public" v-model="hero.publicName" clearable></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Nom réel" v-model="hero.realName" clearable></v-text-field>
        </v-col>
        <v-col cols="12" v-for="(power, index) in hero.powers" :key="index">
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
    <v-btn color="green darken-1" text @click="updateHero">Mettre à jour</v-btn>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  data() {
    return {
      hero: {
        publicName: '',
        realName: '',
        powers: []
      },
    };
  },

  created() {
    if (this.getUserInfoHero && Object.keys(this.getUserInfoHero).length > 0) {
      this.hero = this.getUserInfoHero;
    }

  },
  methods: {
    ...mapActions('secret', ["updateAuthHero"]),

    convertPowerTypes() {
      this.hero.powers.forEach((power, index) => {
        const typeIndex = this.type_heroes.findIndex(type => type === power.type);
        if (typeIndex !== -1) {
          this.hero.powers[index].type = parseInt(typeIndex + 1, 10);
        }
      });
    },

    addPower() {
      this.hero.powers.push({ name: '', type: '', level: 0 });
    },

    removePower(index) {
      this.hero.powers.splice(index, 1);
    },

    async updateHero() {
      this.convertPowerTypes(); // Assurez-vous que cela modifie les données correctement maintenant
      console.log('lol' +  this.hero);

      await this.updateAuthHero(this.hero);

    },
  },

  computed: {
    ...mapState('main', ["type_heroes"]),
    ...mapGetters('secret',["getUserInfoHero"]),
    levelRules() {
      return [
        v => !v || (v >= 1 && v <= 100) || 'Le niveau doit être entre 1 et 100',
      ];
    },
  },
};
</script>