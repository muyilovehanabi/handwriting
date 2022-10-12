import Vue from 'vue'
import vuex from 'vuex';


const actions = {

}

const mutations = {

}

const state = {
    IndexOne: null,
    IndexTwo: null,
    IndexThree: null,
    newArtist: [],
    id: null
}

Vue.use(vuex);
const store = new vuex.Store({
    actions,
    mutations,
    state
})

export default store;