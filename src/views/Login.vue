<template>

  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col align="center">

        <v-btn dark large @click="login">Войти с Google</v-btn>

      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  methods: {
    login() {
      axios.get('/auth/google').then(response => {
        if (response.data.redirect) {
          window.location.href = response.data.redirect;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>