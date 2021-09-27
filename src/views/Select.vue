<template>
  <v-container class="d-flex justify-center flex-wrap">


    <v-card elevation="1" width="150" height="165" v-for="(h,i) in list" :key="i" class="ma-2 text-center"
            @click="getHexa(h.id)" :dark="selected == h.id">
      <div class="blue--text text-caption">
        {{ h.name }}
      </div>
      <div style="position: absolute; bottom: 5px; right: 35px;">
        <div v-for="(image,index) in images(h.id)" :key="index" class="m-0 p-0 text-center" style="line-height: 10px;">
          <img :src="require('@/assets/'+image)" width="80" height="20"/>
        </div>
      </div>
    </v-card>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Уже выбрали?
        </v-card-title>
        <v-card-text class="mt-4">
          Сохранить вопрос и перейти к толковани?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="saveResult">Перейти к толкованию</v-btn>
          <v-btn color="red" text @click="dialog = false">Нет, выберу снова</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>

</template>

<script>
export default {
  name: "Select",
  data() {
    return {
      list: this.$store.state.hexagrams,
      selected: null,
      dialog: false
    }
  },
  beforeCreate() {
    if (!this.$store.state.newQuestion) {
      this.$router.push({name: 'Profile'});
    }
  },
  methods: {
    images(id) {
      return Number(id).toString(2).padStart(6, '0').split("").map((char) => {
        return char.replace("1", "d").replace("0", "k") + ".png";
      })
    },
    getHexa(id) {
      this.selected = id;
      this.dialog = true;
    },
    saveResult() {
      this.$store.dispatch("saveResult", {code: this.selected}).then(response => {
        this.$router.push({name: 'Result', params: {id: response.data.id}});
      }).catch(() => {

      });
    }
  }
}
</script>

<style scoped>

</style>