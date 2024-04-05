<template>
    <h2 class="mb-5 cursor-pointer" @click="$router.go(-1)">
        <v-btn sizes="sm" icon class="mr-2" elevation="0">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        {{title}}
    </h2>
</template>

<script>
    export default {
        props:{
            title: String
        }
    }
</script>

<style scoped>
    .cursor-pointer{
        cursor: pointer;
    }
</style>