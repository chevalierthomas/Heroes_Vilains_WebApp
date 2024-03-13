<template>
  <div>
    <v-btn  color="primary" v-if="!isAddingHeroes" @click="isAddingHeroes = true">Recruter de nouveaux héros</v-btn>

    <div v-if="isAddingHeroes">
      <v-select
          v-model="selectedHeroes"
          :items="filteredHeroes"
          item-text="publicName"
          item-value="_id"
          label="Sélectionnez des héros à ajouter"
          multiple
          return-object
          @change="enableAddButton"
          class="flex-grow-1"
      >
        <template v-slot:item="{ item }">
          <v-list-item-content>
            <v-list-item-title v-html="item.publicName"></v-list-item-title>
          </v-list-item-content>
        </template>
      </v-select>

      <v-btn
          :disabled="!isAddButtonActive"
          color="success"
          @click="addHeroesToTeam"
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
      selectedHeroes: [],
      isAddButtonActive: false,
      isAddingHeroes: false,
    };
  },

  computed: {
    ...mapState('main',['heroes', 'currentTeam']),

    filteredHeroes() {
      if (!this.heroes.length) {
        this.getAllHeroes(); // Charge les héros si 'heroes' est vide
      }

      // Filtre les héros qui ne sont pas déjà dans l'équipe courante en utilisant les identifiants
      return this.heroes.filter(hero => !this.currentTeam.members.includes(hero._id));
    },
  },

  methods: {
    ...mapActions('main',['getAllHeroes', 'addHeroesToCurrentTeam']),

    enableAddButton() {
      this.isAddButtonActive = this.selectedHeroes.length > 0;
    },

    async addHeroesToTeam() {
      if (this.selectedHeroes.length) {

        const heroIds = this.selectedHeroes.map(hero => hero._id);

        await this.addHeroesToCurrentTeam(heroIds);

        this.resetSelection();
      }
    },

    resetSelection() {
      this.selectedHeroes = [];
      this.isAddButtonActive = false;
      this.isAddingHeroes = false; // Réinitialise également l'état d'ajout de héros
    },
  },
};
</script>

<style scoped>

</style>
