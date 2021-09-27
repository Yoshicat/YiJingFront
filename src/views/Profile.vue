<template>
  <div>

    <v-card>
      <v-card-title>
        Новый вопрос
      </v-card-title>
      <v-text-field v-model="newQuestion" label="Вопрос" :rules="questionRule" class="pa-4"></v-text-field>
      <v-card-actions class="justify-space-around" v-if="canMagick">
        <v-btn :to="{name: 'Random'}" dark>Случайная гексаграмма</v-btn>
        <v-btn :to="{name: 'Select'}" dark>Выбрать гексаграмму</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="mt-3">
      <v-card-title>
        Предыдущие вопросы
      </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
          <tr v-for="item in questions" :key="item.id">
            <td>{{ item.created_at }}</td>
            <td>{{ item.question }}</td>
            <td class="text-right">
              <v-btn text :to="{name: 'Result',params: {id: item.id}}">Результат</v-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-card-subtitle v-if="questions.length > 11">
        <v-pagination :value="pagination.current" :length="pagination.total" v-on:input="changePage"></v-pagination>
      </v-card-subtitle>

      <v-card-subtitle v-if="questions.length == 0">
        У вас не сохранено ни одного вопрос.
      </v-card-subtitle>

    </v-card>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      questions: [],
      pagination: {
        current: 1,
        total: 0
      },
      questionRule: [
        value => !!value || 'Это обязательное поле',
        value => (value && value.length >= 5) || 'Минимум 5 символов',
        value => (value && value.length <= 255) || 'Максимум 255 символов',
      ],
    }
  },
  computed: {
    newQuestion: {
      get() {
        return this.$store.state.newQuestion;
      },
      set(value) {
        this.$store.commit("updateNewQuestion", value)
      }
    },
    canMagick() {
      return this.newQuestion.toString().length >= 5 && this.newQuestion.toString().length <= 255;
    }
  },
  mounted() {
    this.loadQuestions(1);
  },
  methods: {
    loadQuestions(page) {
      axios.get('/question?page=' + page).then(response => {
        this.questions = response.data.data;
        this.pagination.current = response.data.current_page;
        this.pagination.total = response.data.last_page;
      }).catch(() => {
      });
    },
    changePage(page) {
      this.loadQuestions(page);
    }
  }
}
</script>

<style scoped>

</style>