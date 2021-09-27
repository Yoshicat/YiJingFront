<template>
  <v-app>
    <v-app-bar app dark dense color="blue">

      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">YiJing</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text :to="{ name: 'About' }" class="ma-2">Что это</v-btn>

      <div v-if="isAuth">
        <v-btn text :to="{ name: 'Profile' }" class="ma-2">Гадать</v-btn>
        <v-btn text @click="logout">Выход</v-btn>
      </div>

      <v-btn text :to="{ name: 'Login' }" v-else>Войти</v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import axios from "axios";

export default {
  name: 'App',
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  methods: {
    logout() {
      axios.get('/auth/logout').then(() => {
        this.$store.state.isAuth = false;
        localStorage.removeItem('AccessToken');
        this.$router.push({name: 'Home'});
      }).catch(() => {

      });
    }
  },
  beforeCreate() {
    if (localStorage.getItem('AccessToken')) {
      this.$store.state.isAuth = true;
    }
    this.$store.dispatch("initState");
  }
};
</script>
