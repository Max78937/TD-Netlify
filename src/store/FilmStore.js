import {defineStore} from 'pinia';
import client from "@/client/api.client";
export const useFilmStore = defineStore('filmStore', {
    state: () => ({
        search: "",
        status: "loading",
        films: [],
        favoriteFilms: [],
        selectedFilm: null
    }),
    actions: {
        async getFilmDetails(id){
            return await client.getFilmDetails(id);
        },
        async getFilms2(){
            if(this.films.length > 0){
                return new Promise(resolve => resolve());
            }
            try {
                this.status = "loading";
                this.films = [];
                this.favoriteFilms = await client.getFavoriteFilms();
                const filmBrut = await client.getFilms2();
                filmBrut.forEach((f) => {
                    this.films.push({
                        id:f.id, 
                        note:f.vote_average,
                        duration: "2h45",
                        picture: "https://image.tmdb.org/t/p/w500/" + f.poster_path,
                        date: f.release_date,
                        title: f.title,
                        voteCount: f.vote_count,
                        castings: ["Brad Pitt", "Angelina Jolie"],
                        isFavorite: this.favoriteFilms.some((ff) => ff+'' === f.id+'')
                    });
                });
                this.status = "loaded";
            }catch(e){
                console.error(e);
                this.status = "error";
            }
        },
        setFavoriteFilm(filmId, isFavorite) {
            if(isFavorite){
                this.favoriteFilms.push(filmId);
            }else{
                this.favoriteFilms = this.favoriteFilms.filter(ff=>ff !== filmId);
            }
            client.setFavorite(this.favoriteFilms);
            this.films.find(f=>f.id+'' === filmId+'').isFavorite = isFavorite;
        },
        setSearch(newSearch){
            this.search = newSearch;
        }
    }
});