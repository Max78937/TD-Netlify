<script setup>
    import FavoriteBtn from "./FavoriteBtn.vue";
</script>
<template>
    <v-card rounded border elevation="0">
        <v-img
            :src="picture"
            :lazy-src="picture"
            min-height="300"
            max-height="300"
            class="bg-grey-lighten-2">
        </v-img>

        <v-card-title>
            <span v-html="showSearch(title)"></span>
        </v-card-title>
        
        <v-card-subtitle>
            {{ date }} | {{duration}}
        </v-card-subtitle>

        <v-card-text>
            <v-row
                align="center"
                class="mx-0 mt-n1"
            >
                <v-rating
                    :model-value="note"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                ></v-rating>

                <div class="text-grey ms-4">
                    {{note}} ({{voteCount}} avis)
                </div>
            </v-row>
        </v-card-text>


        <v-divider class="mx-4 mt-4"></v-divider>

        <v-card-subtitle class="mt-3">Castings</v-card-subtitle>

        <v-card-text style="min-height: 100px">
            <v-chip-group>
                <v-chip v-for="(actor, index) in castings"
                        size="sm"
                        class="px-3 pb-1"
                        :key="'al-card-film'+index"
                        @click="$emit('open-actor-dialog', actor)">
                    {{ actor }}
                </v-chip>
            </v-chip-group>
        </v-card-text>

        <v-card-actions>
            
            <favorite-btn :id="id" 
                          :small="true" 
                          :is-favorite="isFavorite">
            </favorite-btn>     
            
            <v-spacer></v-spacer>

            <v-tooltip text="Voir le détail" location="top">
                <template v-slot:activator="{ props }">
                    <v-btn icon
                           size="sm"
                           color="accent"
                           @click="$router.push({name: 'detailFilm', params: {title : title, id: id}})">
                        <v-icon size="sm"
                                color="teal"
                                class="my-2"
                                v-bind="props"
                                icon="mdi-arrow-right">
                        </v-icon>
                    </v-btn>
                </template>
            </v-tooltip>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapState} from "pinia";
    import {useFilmStore} from "@/store/FilmStore";
    import {useAuth0} from "@auth0/auth0-vue";

    export default {
        props: {
            id: Number,
            note: Number,
            title: String,
            voteCount: Number,
            duration: String,
            date: String,
            castings: Array,
            picture: String,
            isFavorite: Boolean
        },
        computed: {
            ...mapState(useFilmStore, {
                s_search: (state) => state.search,
            })
        },
        methods: {
            showSearch(val) {
                if (!val)
                    return "";
                let reg = new RegExp("(" + this.s_search + ")", "ig");
                val = val.replace(reg, "<span style='background-color:yellow'>$1</span>");
                return val.toString();
            }
        }
    }
</script>
