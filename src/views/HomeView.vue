<template>
  <v-container fluid fill-height>
    <!-- Utilisez la grille Vuetify pour organiser vos éléments -->
    <v-row align="center" justify="center" class="align-center">
      <v-col cols="12" md="6">
        <!-- Utilisez le composant Vuetify `v-card` pour encadrer votre contenu -->
        <v-card class="pa-6 custom-card-width">
          <h1>Bienvenue sur la Marketplace des Héros</h1>
          <p>Ce site est votre destination ultime pour trouver et engager les héros dont vous avez besoin pour sauver la journée. Que vous cherchiez un super-héros pour une mission de sauvetage ou un champion pour vous aider dans une quête épique, vous êtes au bon endroit.</p>
          <p>Découvrez notre sélection diversifiée de héros, chacun avec ses compétences uniques et spécialités. Utilisez notre plateforme pour rechercher, comparer et engager les héros qui correspondent le mieux à vos besoins.</p>
          <!-- Utilisez le composant Vuetify `v-btn` pour ajouter un bouton -->
          <v-btn color="primary" dark :to="{ name: 'hero' }">Explorer les Héros</v-btn>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <!-- Utilisez le composant Vuetify `v-img` pour afficher une image -->
        <v-img
            :src="heroesImage"
            height="50vh"
            contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Importez l'image depuis le dossier assets
import heroesImage from '@/assets/heroes.png';

export default {
  data() {
    return {
      // Référencez l'image importée ici pour l'utiliser dans votre template
      heroesImage,
    };
  },
};
</script>

<style scoped>
/* Ajoutez des styles CSS personnalisés ici si nécessaire */
.custom-card-width {
   max-width: 600px; /* Réglez la largeur maximale souhaitée */
}
</style>
