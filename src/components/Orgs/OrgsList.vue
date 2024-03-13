<template>
  <div>
    <h3>Liste des Organisations</h3>

    <v-btn @click="addOrgDialog = true">Ajouter Organisation</v-btn>
    <v-btn color="green" @click="defineSecretDialog = true">Définir Secret</v-btn>

    <!-- Dialogues -->
    <PasswordDialog :dialog="defineSecretDialog" @update:dialog="defineSecretDialog = $event"></PasswordDialog>
    <AddOrgDialog :dialog="addOrgDialog" @update:dialog="addOrgDialog = $event"></AddOrgDialog>

    <!-- Tableau des organisations -->
    <v-data-table
        :headers="tableHeaders"
        :items="orgs"
        @click:row="selectOrg"
        class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PasswordDialog from "@/components/Orgs/PasswordDialog.vue";
import AddOrgDialog from "@/components/Orgs/AddOrgDialog.vue"; // Assurez-vous que le chemin est correct

export default {
  components: {
    PasswordDialog,
    AddOrgDialog
  },

  data() {
    return {
      tableHeaders: [
        { text: 'ID', value: '_id' },
        { text: 'Nom', value: 'name' }
      ],
      defineSecretDialog: false,
      addOrgDialog: false
    };
  },

  async mounted() {
    await this.loadData();
  },

  computed: {
    ...mapState("main",['orgs']),
  },

  methods: {
    ...mapActions("main",['getAllOrgs', 'appendOrg', 'setCurrentOrg']),
    async loadData() {
      if (this.orgs.length === 0) {
        await this.getAllOrgs();
      }
    },
    async selectOrg(org) {
      await this.setCurrentOrg(org._id);
      // Redirection vers la page orgDetails après avoir défini l'organisation courante
      this.$router.push({ name: 'orgDetails' });
    }
  }
}
</script>

<style scoped>
</style>
