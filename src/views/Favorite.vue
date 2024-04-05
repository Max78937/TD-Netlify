<script setup>
    import FilmCard from "@/components/FilmCard.vue";
    import BackTitleBtn from "@/components/BackTitleBtn.vue";
</script>

<template>
    <back-title-btn title="Mes films favoris"></back-title-btn>

    <!-- Aucun Film -->
    <v-scroll-x-transition hide-on-leave>
        <v-alert v-if="c_favoriteFilms.length === 0">
            Aucun film favoris 
        </v-alert>
    </v-scroll-x-transition>
    
    <v-row>
        <v-col v-for="(film, index) in c_favoriteFilms"
               :key="'al-film-'+index" :cols="responsive">
            <film-card :castings="film.castings"
                       :description="film.description"
                       :id="film.id"
                       :note="film.note"
                       :duration="film.duration"
                       :picture="film.picture"
                       :date="film.date"
                       :is-favorite="film.isFavorite"
                       :title="film.title">
            </film-card>
        </v-col>
    </v-row>
</template>

<script>
    import {mapState} from "pinia";
    import {useFilmStore} from "@/store/FilmStore";

    export default {
        data() {
            const filmStore = useFilmStore();
            return {
                s_getFilms: filmStore.getFilms2
            }
        },
        computed: {
            ...mapState(useFilmStore, {
                s_films: (state) => state.films,
                s_favorite: (state) => state.favoriteFilms,
            }),
            c_favoriteFilms(){
                return this.s_films.filter(f=> this.s_favorite.some((ff) => ff+'' === f.id+''));
            },
            responsive() {
                if (this.$vuetify.display.lgAndUp) {
                    return 3;
                }
                if (this.$vuetify.display.mdAndUp) {
                    return 4;
                }
                if (this.$vuetify.display.xs) {
                    return 12;
                }
                return 6;
            }
        },
        mounted(){
            if(this.s_films.length === 0){
                this.s_getFilms();
            }
        }
    }
</script>