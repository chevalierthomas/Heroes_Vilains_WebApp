<template>
  <div>
    <h3>Liste des Héros</h3>
    <v-data-table
        :headers="tableHeaders"
        :items="heroes"
        class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {
  },

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
