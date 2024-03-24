<template>
  <v-container style="margin-top: 8%">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-5 text-center">
          <div class="d-flex justify-center mb-4">
            <v-img src="@/assets/error_404.gif" alt="Page non trouvée" width="300"></v-img>
          </div>
          <h1 class="display-1">404</h1>
          <h2 class="headline">Page non trouvée</h2>
          <p class="body-1">La page que vous recherchez a peut-être été supprimée, son nom a été modifié ou elle est temporairement indisponible.</p>
          <v-btn color="primary" to="/">Aller à l'accueil</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
/* Ajoutez vos styles CSS personnalisés ici */
</style>
