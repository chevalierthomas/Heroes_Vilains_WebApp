<template>
  <div>
    <!-- Barre de navigation locale pour OrgView -->



    <!-- Contenu principal du composant OrgView -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OrgView',
  computed: {
    ...mapState(['currentOrg']), // Récupère currentOrg de l'état global Vuex
  },
};
</script>

<style scoped>
/* Styles supplémentaires si nécessaire */
</style>
