<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col align="center">

        <v-main>
          <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </v-main>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginWait",
  created() {
    axios.get('/auth/' + this.$route.params.provider + '/callback', {
      params: {
        code: this.$route.query.code
      }
    }).then(response => {
      if (response.data.token) {
        this.$store.state.isAuth = true;
        localStorage.setItem('AccessToken', response.data.token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        this.$router.push({name: 'Profile'});
      }
    }).catch(() => {
      this.$router.push({name: 'Login'});
    });
  }
}
</script>

<style scoped>

</style>