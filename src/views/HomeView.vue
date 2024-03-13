<template>
  <v-container>
    <v-col cols="12">
      <h1>Bienvenue sur la Marketplace des Héros</h1>
      <p>Ce site est votre destination ultime pour trouver et engager les héros dont vous avez besoin pour sauver la journée. Que vous cherchiez un super-héros pour une mission de sauvetage ou un champion pour vous aider dans une quête épique, vous êtes au bon endroit.</p>
      <p>Découvrez notre sélection diversifiée de héros, chacun avec ses compétences uniques et spécialités. Utilisez notre plateforme pour rechercher, comparer et engager les héros qui correspondent le mieux à vos besoins.</p>
      <v-btn color="primary" dark :to="{ name: 'hero' }">Explorer les Héros</v-btn>
    </v-col>
    <v-col cols="12">
      <v-img
          :src="heroesImage"
          height="50vh"
      ></v-img>

    </v-col>
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
