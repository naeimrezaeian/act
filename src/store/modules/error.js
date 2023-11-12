// store/modules/error.js

const state = {
    message: null,
    timeoutId: null,
};

const mutations = {
    SET_MESSAGE(state, message) {
        state.message = message;
    },
    SET_TIMEOUT_ID(state, timeoutId) {
        state.timeoutId = timeoutId;
    },
};

const actions = {
    displayErrorMessage({ commit, dispatch }, message) {
        commit('SET_MESSAGE', message);
        const timeoutId = setTimeout(() => {
            dispatch('hideErrorMessage');
        }, 10000);
        commit('SET_TIMEOUT_ID', timeoutId);
    },
    hideErrorMessage({ commit, state }) {
        if (state.timeoutId) {
            clearTimeout(state.timeoutId);
            commit('SET_TIMEOUT_ID', null);
        }
        commit('SET_MESSAGE', null);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};