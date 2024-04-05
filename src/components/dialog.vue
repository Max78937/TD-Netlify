<template>
    <v-dialog
        v-model="c_dialogModel"
        width="350"
        transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar
                dark
                color="white">
                <v-btn
                    icon
                    dark
                    @click="$emit('close-dialog')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{title}}</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="mb-10">
                <slot></slot>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props:{
            dialogModel: Boolean,
            title: String
        },
        computed:{
            c_dialogModel:{
                get(){
                    return this.dialogModel;
                },
                set(newValue){
                    if(!newValue){
                        this.$emit('close-dialog');
                    }
                }
            }
        }
    }
</script>