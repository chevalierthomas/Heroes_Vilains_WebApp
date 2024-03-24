<template>
  <v-container>
    <h3 class="mt-6">Détails de l'équipe</h3>
    <v-card class="mt-4">
      <v-card-title>{{ currentTeam.name }}</v-card-title>
      <v-card-text>
        <p>ID: {{ currentTeam._id }}</p>
        <v-divider> class="mt-4</v-divider>
        <h3 class="mt-4">Héros</h3>

        <div class="d-flex row mt-4 mb-6 ml-1">
          <AddHeroesToTeam></AddHeroesToTeam>
          <CreateHeroToTeam></CreateHeroToTeam>
          <!-- Bouton pour activer le mode de sélection -->
          <v-btn  color="red"   @click="toggleSelectionMode">Supprimer des héros</v-btn>
        </div>

        <v-data-table
            :headers="heroHeaders"
            :items="teamMembersDetails"
            item-key="_id"
            class="elevation-1"
            show-expand
            :show-select="isSelectionMode"
            v-model="selectedHeroes"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn text color="primary" @click="selectHero(item)">Modifier</v-btn>
          </template>

          <template v-slot:expanded-item="{ item }">
            <v-card flat>
              <v-card-title>Pouvoirs</v-card-title>
              <v-data-table
                  :headers="powerHeaders"
                  :items="item.powers"
                  hide-default-footer
                  class="mx-4"
              ></v-data-table>
            </v-card>
          </template>
        </v-data-table>

        <!-- Barre d'outils de sélection avec boutons Valider et Annuler -->
        <v-toolbar v-if="isSelectionMode" flat>
          <v-btn color="red" @click="deleteSelectedHeroes">Valider</v-btn>
          <v-btn @click="cancelSelection">Annuler</v-btn>
        </v-toolbar>
      </v-card-text>
    </v-card>

    <editHeroesToTeam :hero="selectedHero" @reloadMembers="loadTeamMembers" ref="editHeroDialog"/>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import AddHeroesToTeam from "@/components/Teams/AddHeroesToTeam.vue";
import CreateHeroToTeam from "@/components/Teams/CreateHeroToTeam.vue";
import editHeroesToTeam from "@/components/Teams/EditHeroesToTeam.vue";
import {getHeroById} from "@/services/hero.services";

export default {
  components: {
    AddHeroesToTeam,
    CreateHeroToTeam,
    editHeroesToTeam

  },
  computed: {
    ...mapState('main',['currentTeam',]),
    ...mapState('secret',[ 'passwordOrg'])
  },
  data() {
    return {
      selectedHero: null,

      teamMembersDetails: [],

      selectedHeroes: [],

      isSelectionMode: false,

      heroHeaders: [
        { text: 'ID', value: '_id', sortable: false },
        { text: 'Nom du Héros', value: 'publicName' },
        { text: 'Prénom réel', value: 'realName' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      powerHeaders: [
        { text: 'Nom du Pouvoir', value: 'name' },
        { text: 'Niveau', value: 'level' },
        // Ajoutez d'autres colonnes si nécessaire
      ],
    };
  },
  mounted() {
    this.loadTeamMembers();
    console.log(this.teamMembersDetails)
  },
  watch: {
    // Watcher pour 'currentTeam' du store Vuex
    'currentTeam': {
      // Utilisez une fonction handler pour réagir aux changements
      handler() {
        this.loadTeamMembers();
      },
      deep: true, // Pour observer les changements profonds dans l'objet 'currentTeam'
    }
  },

  methods: {
    ...mapActions('main',['removeHeroesFromCurrentTeam','setCurrentHero']),
    async loadTeamMembers() {
      if (this.currentTeam.members && this.currentTeam.members.length > 0) {
        // Initialisation du tableau pour les détails des membres
        this.teamMembersDetails = [];

        // Boucle sur chaque ID de membre de l'équipe
        for (const memberId of this.currentTeam.members) {
          try {
            // Tentative de récupération des détails du héros
            const heroDetails = await getHeroById(memberId, this.passwordOrg);
            // Si la récupération réussit, ajout des détails au tableau
            this.teamMembersDetails.push(heroDetails.data[0]);
          } catch (error) {
            // Gestion des erreurs (par exemple, si un héros spécifique ne peut pas être chargé)
            console.error(`Erreur lors du chargement du héros ${memberId}:`, error);
            // Vous pouvez décider d'ajouter une valeur par défaut ou de continuer sans ce membre
            // Exemple : this.teamMembersDetails.push({ id: memberId, error: true });
          }
        }
      }
    },

    toggleSelectionMode() {
      this.isSelectionMode = !this.isSelectionMode;
    },
    deleteSelectedHeroes() {
      console.log(this.selectedHeroes)
      this.isSelectionMode = false;
      this.removeHeroesFromCurrentTeam(this.selectedHeroes.map(hero => hero._id));
      this.selectedHeroes = [];
    },
    cancelSelection() {
      this.isSelectionMode = false;
      this.selectedHeroes = [];
    },
    selectHero(hero) {
      this.selectedHero = hero; // Définissez le héros sélectionné
      this.setCurrentHero(hero);
      this.$refs.editHeroDialog.openDialog(); // Ouvrez le dialogue d'édition
    },
  }
};
</script>
