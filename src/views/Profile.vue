<script setup>
    import BackTitleBtn from "@/components/BackTitleBtn.vue";
</script>

<template>
    <div>
        <back-title-btn title="Mon profil"></back-title-btn>
        <v-card border elevation="0">
            <v-card-text>
                <v-row class="ma-0">
                    <v-avatar class="mt-5"
                        color="grey"
                        size="75">
                        <v-img cover :src="user.picture"></v-img>
                    </v-avatar>
                    <v-col>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>{{ user.name }}</v-list-item-title>
                                <v-list-item-subtitle>Adresse email</v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>{{ user.nickname }}</v-list-item-title>
                                <v-list-item-subtitle>Pseudo</v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-title>{{ new Date(user.updated_at).toLocaleDateString('fr-FR', {}) }}</v-list-item-title>
                                <v-list-item-subtitle>Dernière connexion</v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import {useAuth0} from "@auth0/auth0-vue";
    import {useMyStore} from "@/store/MyStore";
    import {mapState} from "pinia";

    export default {
        data() {
            const auth0 = useAuth0();
            const myStore = useMyStore();

            return {
                isAuthenticated: auth0.isAuthenticated,
                isLoading: auth0.isLoading,
                user: auth0.user,
                count: myStore.count,
                increment: myStore.increment,
            }
        },
        computed: {
            ...mapState(useMyStore, {
                c_count: (state) => state.count
            })
        }
    }
</script>

<style scoped>

</style>