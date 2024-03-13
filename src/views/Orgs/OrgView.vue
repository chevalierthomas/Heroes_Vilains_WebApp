<template>
  <div class="org-view">
    <!-- Vous pouvez ajouter une en-tête, une barre latérale ou tout autre élément de layout global ici -->
    <header>
      <!-- Contenu de l'en-tête, comme le logo, le titre, la navigation, etc. -->
    </header>

    <!-- Le composant <router-view> affichera le composant de la route enfant correspondante (OrganisationView ou OrgDetailsView) -->
    <router-view></router-view>

    <!-- Ajoutez ici d'autres éléments globaux, comme un pied de page -->
    <footer>
      <!-- Contenu du pied de page -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'OrgView',
  // Vous pouvez ajouter ici des options de composant, comme des données, des méthodes, etc.
};
</script>

<style scoped>
/* Styles pour votre layout OrgView */
.org-view {
  /* Styles généraux du layout */
}
header {
  /* Styles de l'en-tête */
}
footer {
  /* Styles du pied de page */
}
</style>
