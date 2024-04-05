<template>
    <div>
        <back-title-btn :title="$route.params.title"></back-title-btn>
        <v-card elevation="0" border>

            <!-- Chargement -->
            <v-row v-if="status === 'loading'">
                <v-card rounded border elevation="0">
                    Chargement...
                </v-card>
            </v-row>

            <!-- Aucun Acteur -->
            <v-scroll-x-transition hide-on-leave>
                <v-alert v-if="status === 'error'">
                    Aucune donnée disponible :(
                </v-alert>
            </v-scroll-x-transition>
            
            <v-row v-if="status === 'loaded'"
                   class="ma-0">
                <v-avatar class="mt-10 ml-5"
                          color="grey"
                          rounded="0"
                          size="200">
                    <v-img cover :src="'https://image.tmdb.org/t/p/w500/'+film.backdrop_path"></v-img>
                </v-avatar>                
                <v-col>
                    <v-col>
                        <v-list>
                            <v-list-item>
                                <span>{{ film.title }}</span>
                                <v-list-item-subtitle>Titre du film</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <span>{{ film.overview }}</span>
                                <v-list-item-subtitle>Description</v-list-item-subtitle>
                            </v-list-item>                            
                            <v-list-item>
                                <span>{{ film.release_date }}</span>
                                <v-list-item-subtitle>Date de sortie</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <span>${{ film.budget }}</span>
                                <v-list-item-subtitle>Bugdet du film</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <span>${{ film.genres.map(p=>p.name).join(', ') }}</span>
                                <v-list-item-subtitle>Genres</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                                <span>${{ film.production_companies.map(p=>p.name).join(', ') }}</span>
                                <v-list-item-subtitle>Production</v-list-item-subtitle>
                            </v-list-item>
                        </v-list>

                        <favorite-btn :id="$route.params.id"
                                      :small="false"
                                      :is-favorite="film.isFavorite"
                                      @set-favorite="film.isFavorite = !film.isFavorite">
                        </favorite-btn>
                    </v-col>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
    import {mapState} from "pinia";
    import {useFilmStore} from "@/store/FilmStore";
    import BackTitleBtn from "@/components/BackTitleBtn.vue";
    import {useAuth0} from "@auth0/auth0-vue";
    import FavoriteBtn from "@/components/FavoriteBtn.vue";

    export default {
        components: {FavoriteBtn, BackTitleBtn},
        data(){
            const auth0 = useAuth0();
            const filmStore = useFilmStore();
            return {
                status: "loading",
                film: null,
                isAuthenticated: auth0.isAuthenticated,
                s_favoriteFilms: filmStore.favoriteFilms,
                s_setFavoriteFilm: filmStore.setFavoriteFilm,
                s_getFilmDetails: filmStore.getFilmDetails,
            };
        },
        computed:{
            ...mapState(useFilmStore, {
                s_films: (state) => state.films,
            }),
            c_isFavorite:{
                get(){
                    return this.film.isFavorite;
                },
                set(isFavorite){
                    this.film.isFavorite = !this.film.isFavorite;
                    this.s_setFavoriteFilm(this.$route.params.id, isFavorite);
                }
            }
        },
        async mounted(){
            this.status = "loading";
            try{
                this.film = await this.s_getFilmDetails(this.$route.params.id);
                this.film.isFavorite = this.s_favoriteFilms.some((ff) => ff+'' === this.$route.params.id+'');
                this.status = "loaded";
            }catch(e){
                console.error(e);
                this.status = "error";
            }            
        }
    }
</script>