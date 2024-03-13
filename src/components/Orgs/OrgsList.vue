<template>
  <div>
    <h2>Liste des Organisations</h2>
    <v-data-table
        :headers="tableHeaders"
        :items="flattenedData"
        @click:row="selectOrg"
        class="elevation-1"
    >
    </v-data-table>
    <v-btn @click="dialog = true">Ajouter Organisation</v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Nouvelle Organisation</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nom" v-model="newOrg.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Mot de passe" v-model="newOrg.password" type="password"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="createOrg">Créer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      tableHeaders: [
        {text: 'ID', value: '_id'},
        {text: 'Nom', value: 'name'}
      ],
      flattenedData: [],
      dialog: false,
      newOrg: {
        name: '',
        password: ''
      }
    }
  },

  async mounted() {
    await this.loadData();
    this.flattenedData = this.orgs.flat();
  },
  computed: {
    ...mapState(['orgs']),
  },
  methods: {
    ...mapActions(['getAllOrgs', 'createOrg', 'getOrgById']),
    async loadData() {
      if (this.orgs.length === 0) {
        await this.getAllOrgs();
      }
    },
    async createOrg() {
      await this.createOrg(this.newOrg);
      this.dialog = false;
      this.newOrg = {name: '', password: ''}; // Réinitialiser le formulaire
      await this.loadData(); // Recharger la liste après création
    },
    selectOrg(org) {
      this.getOrgById(org._id);
      this.$router.push({name: 'OrgDetails', params: {orgId: org._id}}); // Remplacez 'OrgDetails' par le nom de votre route
    }
  }
}
</script>

<style scoped>
</style>
