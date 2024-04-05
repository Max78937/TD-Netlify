<template>
    <div>
        <!-- Chargement -->
        <v-skeleton-loader v-if="s_status === 'loading'" 
                           type="list-item-two-line">
        </v-skeleton-loader>

        <!-- Aucun Acteur -->
        <v-scroll-x-transition hide-on-leave>
            <v-alert v-if="s_status === 'loaded' && s_actorDetails === null">
                Aucun acteur trouvé :(
            </v-alert>
        </v-scroll-x-transition>

        <!-- Acteur -->
        <v-scroll-x-transition hide-on-leave>
            <v-list v-if="s_status === 'loaded' && s_actorDetails">
                <v-list-item>
                    <v-list-item-title>{{ s_actorDetails.name }}</v-list-item-title>
                    <v-list-item-subtitle>Prénom</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>{{ s_actorDetails.surname }}</v-list-item-title>
                    <v-list-item-subtitle>Nom</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>{{ s_actorDetails.age }} ans</v-list-item-title>
                    <v-list-item-subtitle>Age</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                    <v-list-item-title>{{ s_actorDetails.films.join(", ") }}</v-list-item-title>
                    <v-list-item-subtitle>Films</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-scroll-x-transition>
    </div>
</template>
<script setup>
import {VSkeletonLoader} from "vuetify/labs/VSkeletonLoader";
</script>

<script>
    import {useActorStore} from "@/store/ActorStore";
    import {mapState} from "pinia";
    export default {
        props:{
            id: String
        },
        data() {
            const actorStore = useActorStore();
            return {
                s_getActorDetails: actorStore.getActorDetails(),
            }
        },
        computed: {
            ...mapState(useActorStore, {
                s_actorDetails: (state) => state.actorDetails,
                s_status: (state) => state.status,
            })
        }
    }
</script>