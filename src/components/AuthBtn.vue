<template>
    <v-tooltip :text="name" location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn icon
                   size="small"
                   v-bind="props"
                   @click="$router.push('/profile')">
                <v-icon color="teal" icon="mdi-account"></v-icon>
            </v-btn>
        </template>
    </v-tooltip>
    <v-tooltip text="Mes films favoris" location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn icon
                   size="small"
                   v-bind="props"
                   @click="$router.push('/favorite')">
                <v-icon color="red" :icon="c_favoriteNumber === 0 ? 'mdi-heart-outline' : 'mdi-heart'"></v-icon>
            </v-btn>
        </template>
    </v-tooltip>
    <v-tooltip text="Se déconnecter" location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn icon
                   size="small"
                   v-bind="props"
                   href="#" class="mr-3" @click.prevent="logout">
                <v-icon icon="mdi-logout"></v-icon>
            </v-btn>
        </template>
    </v-tooltip>
</template>

<script>
    import {mapState} from "pinia";
    import {useFilmStore} from "@/store/FilmStore";

    export default {   
        props: {
            picture: String,
            name: String
        },

        computed: {
            ...mapState(useFilmStore, {
                s_favorite: (state) => state.favoriteFilms,
            }),
            c_favoriteNumber(){
                return this.s_favorite.length;
            },
        },
        methods:{
            logout(){
                this.$emit("logout");
            }
        }
    };
</script>


