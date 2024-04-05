<template>
    <v-tooltip text="Ajouter au favoris" location="top">
        <template v-slot:activator="{ props }">
            <v-btn v-if="isAuthenticated" 
                   icon
                   elevation="0"
                   :size="small ? 'sm' : 'default'" 
                   @click="c_isFavorite = !c_isFavorite">
                <v-icon :size="small ? 'sm' : 'default'"
                        class="my-2"
                        color="red"
                        v-bind="props"
                        :icon="c_isFavorite ? 'mdi-heart' : 'mdi-heart-outline'">
                </v-icon>
            </v-btn>
        </template>
    </v-tooltip>
</template>

<script>
    import {useFilmStore} from "@/store/FilmStore";
    import {useAuth0} from "@auth0/auth0-vue";
    export default {
        props:{
            small: Boolean,
            isFavorite: Boolean,
            id: Number | String
        },
        data(){
            const auth0 = useAuth0();
            const filmStore = useFilmStore();
            return {
                isAuthenticated: auth0.isAuthenticated,
                s_setFavoriteFilm: filmStore.setFavoriteFilm
            };
        },
        computed: {
            c_isFavorite:{
                get(){
                    return this.isFavorite;
                },
                set(isFavorite){
                    this.$emit('set-favorite');
                    this.s_setFavoriteFilm(this.id, isFavorite);
                }
            }
        },
    }
</script>