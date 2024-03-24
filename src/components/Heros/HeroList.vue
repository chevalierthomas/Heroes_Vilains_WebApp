<template>
  <v-container>
    <h3 class="mt-6 mb-4">Liste des Héros</h3>

    <!-- Tableau des héros -->
    <v-data-table
        :headers="tableHeaders"
        :items="heroes"
        class="elevation-1 mt-4"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},

  data() {
    return {
      tableHeaders: [
        { text: 'ID', value: '_id' },
        { text: 'Nom Public', value: 'publicName' }
      ],
    };
  },

  async mounted() {
    await this.loadHeroes();
  },

  computed: {
    ...mapState("main", ['heroes']),
  },

  methods: {
    ...mapActions("main", ['getAllHeroes']), // Ajustez les noms d'actions selon vos besoins
    async loadHeroes() {
      if (this.heroes.length === 0) {
        await this.getAllHeroes();
      }
    },
  }
}
</script>

<style scoped>
</style>
