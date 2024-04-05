<script setup>
    import AuthBtn from "./components/AuthBtn.vue";
</script>
<template>
    <v-app class="white">
        <v-app-bar color="white" elevation="0" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12) ">
            <v-row class="ma-0">
                <v-btn color="teal" class="text-h5 ml-5" @click="$router.push('/');">
                    <v-icon size="sm" icon="mdi-video-vintage" class="mb-2"></v-icon>
                    Al<b class="text-black">Films</b>
                </v-btn>

                <v-col class="pa-0"></v-col>
                <v-text-field
                    v-model="c_search"
                    color="teal"
                    variant="outlined"
                    placeholder="Rechercher un film"
                    append-inner-icon="mdi-magnify"
                    rounded
                    clearable
                    density="compact"
                    dense
                    hide-details 
                    @input="goHome" 
                    @close="goHome"
                    @click:clear="goHome">
                </v-text-field>
                <v-col class="pa-0"></v-col>
                <v-btn v-if="!isAuthenticated"
                       :loading="isLoading"
                       color="black"
                       class="bg-amber text-black mr-4 mt-1"
                       @click="login">
                    Se connecter
                </v-btn>
                <auth-btn v-else
                          class="mt-3"
                          :name="user.name" 
                          :picture="user.picture" 
                          @logout="logout">
                </auth-btn>
            </v-row>
        </v-app-bar>
        <v-main>
            <v-container :fluid="true" fill-height style="max-width: 1300px">
                <v-scroll-x-transition hide-on-leave>
                    <router-view></router-view>
                </v-scroll-x-transition>
            </v-container>
        </v-main>
        <v-footer class="mt-12" app>
            <div class="text-center w-100">
                <small>Application de Recherche de Films avec Vue 3 et TMDb API</small>
            </div>
        </v-footer>
    </v-app>
</template>

<script>
    import { useAuth0 } from '@auth0/auth0-vue';
    import {useFilmStore} from "@/store/FilmStore";
    import {RouterView} from 'vue-router';
    import {mapState} from "pinia";
    export default {
        name: "App",
        data() {
            const auth0 = useAuth0();
            const filmStore = useFilmStore();
            return {
                s_setFilms: filmStore.setSearch,
                isAuthenticated: auth0.isAuthenticated,
                isLoading: auth0.isLoading,
                user: auth0.user,
                login() {
                    auth0.loginWithRedirect();
                },
                logout() {
                    auth0.logout({
                        logoutParams: {
                            returnTo: window.location.origin
                        }
                    });
                }
            }
        },
        computed:{
            ...mapState(useFilmStore, {
                s_search: (state) => state.search,
            }),
            c_search:{
                get(){
                    return this.s_search;
                },
                set(newSearch){
                    this.s_setFilms(newSearch);
                }
            }
        },
        methods:{
            goHome(){
                if(this.$route.name !== 'films'){
                    this.$router.replace({name: 'films'})
                }
            }
            
        }
    }
</script>
