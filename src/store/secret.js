import Vue from 'vue'
import Vuex from 'vuex'

import {getUserInfo, registerUser, signIn, updateHeroWithAuth} from "@/services/auth.services";

Vue.use(Vuex);

export default{
    namespaced: true,
    state: ({
        passwordOrg: "baba",
        auth: false,
        jwtToken: null,
        xsrfToken: null,
        refreshToken: null,
        userInfo: null,
    }),
    getters: {
        getUserInfoName: state => state.userInfo.login,
        getUserInfoHero: state => state.userInfo.hero,
    },
    mutations: {
        SET_PASSWORD_ORG(state, password) {
            state.passwordOrg = password;
        },
        SET_AUTH(state, status) {
            state.auth = status;
        },
        SET_JWT_TOKEN(state, token) {
            state.jwtToken = token;
        },
        SET_XSRF_TOKEN(state, token) {
            state.xsrfToken = token;
        },
        SET_REFRESH_TOKEN(state, token) {
            state.refreshToken = token;
        },
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        async setPasswordOrg({ commit }, password) {
            try {
                commit('SET_PASSWORD_ORG', password);
            } catch (error) {
                console.error('Error fetching orgs:', error);
            }
        },

        async signIn({ commit }, userData) {
            try {
                console.log('store')
                console.log(userData)
                const response = await signIn(userData);

                console.log(response)
                if (response.error === 0) {
                    commit('SET_JWT_TOKEN', response.data.jwtToken);
                    commit('SET_XSRF_TOKEN', response.data.xsrfToken);
                    commit('SET_REFRESH_TOKEN', response.data.refreshToken);
                    const response_user = await getUserInfo(userData.login);

                    console.log(response_user.data)
                    if (response_user.error === 0) {
                        commit('SET_USER_INFO', response_user.data);
                    } else {
                        console.error('Erreur lors de la récupération des informations utilisateur:', response_user.data.data);
                    }

                    commit('SET_AUTH', true);
                } else {
                    commit('errors/pushError', response.data.data, { root: true });

                }
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
            }
        },


        logoutUser({ commit }) {
            commit('SET_AUTH', false);
            commit('SET_JWT_TOKEN', null);
            commit('SET_XSRF_TOKEN', null);
            commit('SET_USER_INFO', null);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('xsrfToken');
        },


        async updateAuthHero({commit, state}, hero) {
            hero._id = state.userInfo.hero._id;
            
            console.log("store");
            await console.log(hero);
            const response = await updateHeroWithAuth(hero);

            console.log(response);
            if (response.error === 0) {
                commit('SET_USER_INFO', response.data);
            } else {
                console.error('Erreur lors de la récupération des informations utilisateur:', response.data.data);
            }
        },

        async registerUser({commit}, hero){
            const response = await registerUser(hero)
            console.log(response)

            if (response.error === 0) {
                commit('SET_USER_INFO', response.data);
            } else {
                console.error('Erreur lors de la récupération des informations utilisateur:', response.data.data);
            }
        }

    },

    modules: {
    }
}
