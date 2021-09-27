<template>
  <v-container fill-height fluid class="justify-center" v-if="loaded">


    <v-row justify="center">
      <v-col cols="12" lg="12" md="12" class="text-center">
        <h1>{{ question }}</h1>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" lg="2" md="2" class="text-center">
        <v-card shaped class="d-flex flex-column justify-center align-center">
          <h4 class="mt-2 blue--text">{{ hexagram.name }}</h4>
          <v-list>
            <v-list-item v-for="(image,index) in images" :key="index" dense>
              <v-img :src="require('@/assets/'+image)" width="164" height="30" contain/>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" lg="12" md="12" class="text-center">
        <h3>{{ hexagram.description }}</h3>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Result",
  data() {
    return {
      question: "",
      code: 0,
      loaded: false
    }
  },
  beforeCreate() {
    axios.get('/question/' + this.$route.params.id).then(response => {
      this.question = response.data.question;
      this.code = response.data.code;
      this.loaded = true;
    }).catch(() => {
      this.$router.push({name: 'Profile'});
    })
  },
  computed: {
    images() {
      return Number(this.code - 1).toString(2).padStart(6, '0').split("").map((char) => {
        return char.replace("1", "d").replace("0", "k") + ".png";
      })
    },
    hexagram() {
      return this.loaded ? this.$store.state.hexagrams.find(i => i.id == this.code - 1) : null;
    }
  }
}
</script>

<style scoped>

</style>