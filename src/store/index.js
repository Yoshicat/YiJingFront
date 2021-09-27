import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isAuth: false,
        newQuestion: "",
        hexagrams: []
    },
    mutations: {
        updateNewQuestion(state, value) {
            state.newQuestion = value;
        }
    },
    getters: {
        isAuth: state => state.isAuth,
        newQuestion: state => state.newQuestion
    },
    actions: {
        saveResult(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios.post('question', {question: ctx.state.newQuestion, code: payload.code + 1}).then(response => {
                    ctx.state.newQuestion = "";
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        initState(ctx) {
            axios.get('hexagram').then(response => {
                ctx.state.hexagrams = response.data;
            }).catch(() => {
            });
        }
    },
    modules: {}
})
