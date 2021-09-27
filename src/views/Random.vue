<template>

  <v-container fill-height fluid @click="clickSomeWhere" class="justify-center">

    <v-row justify="center">
      <v-col cols="12" lg="2" md="2" class="text-center">

        <h3>Кликате в белой части экрана!</h3>

        <v-card shaped class="d-flex flex-column justify-center align-center" v-if="binaryCode.length > 0">
          <v-list>
            <v-list-item v-for="(image,index) in images" :key="index" dense>
              <v-img :src="require('@/assets/'+image)" width="164" height="30" contain/>
            </v-list-item>
          </v-list>
        </v-card>

        <v-btn dark class="mt-2" v-if="isGenerated" @click="saveResult">Толкование</v-btn>

      </v-col>
    </v-row>

  </v-container>

</template>

<script>
export default {
  name: "Random",
  data() {
    return {
      binaryCode: ""
    }
  },
  computed: {
    newQuestion: {
      get() {
        return this.$store.state.newQuestion;
      }
    },
    isGenerated() {
      return this.binaryCode.length == 6 ? true : false;
    },
    hexagram() {
      return parseInt(this.binaryCode, 2);
    },
    images() {
      return this.binaryCode.split("").map((char) => {
        return char.replace("1", "d").replace("0", "k") + ".png";
      })
    }
  },
  beforeMount() {
    if (!this.newQuestion) {
      this.$router.push({name: 'Profile'});
    }
  },
  methods: {
    clickSomeWhere() {
      if (!this.isGenerated) {
        this.binaryCode += Math.round(Math.random()).toString();
      }
    },
    saveResult() {
      this.$store.dispatch("saveResult", {code: this.hexagram}).then(response => {
        this.$router.push({name: 'Result', params: {id: response.data.id}});
      }).catch(() => {

      });
    }
  }
}
</script>

<style scoped>

</style>