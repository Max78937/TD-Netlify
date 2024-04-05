import {defineStore} from 'pinia';
import client from "@/client/api.client";
export const useActorStore = defineStore('actorStore', {
    state: () => ({
        actorDetails: null,
        status: "loading"
    }),
    actions: {
        async getActorDetails(id){
            this.actorDetails = null;
            this.status = "loading";
            try {
                this.actorDetails = await client.getActorDetails(id);
                this.status = "loaded";
            }catch(e){
                console.error(e);
                this.status = "error";
            }
        }
    }
});