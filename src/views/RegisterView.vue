<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
          v-model="userData.login"
          :rules="loginRules"
          label="Login"
          required
      ></v-text-field>
      <v-text-field
          v-model="userData.password"
          :rules="passwordRules"
          label="Password"
          type="password"
          required
      ></v-text-field>
      <v-select
          v-model="userData.hero"
          :items="heroesName"
          label="Select a Hero"
          :rules="[v => !!v || 'Hero is required']"
          required
      ></v-select>

      <VueRecaptcha
          sitekey="6LdzWJkkAAAAAOG1QjA_LmULztIgSqmGokocysOx"
          :loadRecaptchaScript="true"
          ref="recaptcha"
          @verify="onCaptchaVerify"
          @expired="onCaptchaExpired"
      ></VueRecaptcha>

      <v-btn :disabled="!valid" @click="submitForm">Register</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import VueRecaptcha from 'vue-recaptcha';

export default {
  components: {
    VueRecaptcha
  },
  computed: {
    ...mapState("main", ["heroes"]),
    // Déplacez heroesName ici pour qu'il soit réactif aux changements de "heroes"
    heroesName() {
      return this.heroes.map(hero => hero.publicName);
    }
  },
  mounted() {
    if (this.heroes.length === 0) {
      this.getAllHeroes();
    }
  },
  data() {

    return {
      valid: false,
      userData: {
        login: '',
        password: '',
        hero: '',
        captchaToken: ''
      },
      loginRules: [
        v => !!v || 'Login is required',
        v => (v && v.length >= 3) || 'Login must be at least 3 characters'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters'
      ],
    };
  },
  methods: {
    ...mapActions("main", ["getAllHeroes"]),
    ...mapActions("secret",["registerUser"]),

    onCaptchaVerify: function (response) {
      this.userData.captchaToken = response;
    },

    onCaptchaExpired: function () {
      console.log('Expired')
    },

    async submitForm() {
      if (this.$refs.form.validate()) {
        console.log("Submitted data:", this.userData);
        await this.registerUser(this.userData)
        this.$router.push({ name: 'home' });

      }
    }
  }
};
</script>
