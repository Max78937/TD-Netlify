import axios from 'axios';

const __APIKEY__ = "c7366482f67d11c65d13e9edc08ba987";
const __TOKEN__ = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzM2NjQ4MmY2N2QxMWM2NWQxM2U5ZWRjMDhiYTk4NyIsInN1YiI6IjY1MjNkY2EzYWI1ZTM0MDBlMWQ0OGQ3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KaSFEkg-YIMxh95PyXcWPd2opp7AITsdUj_r8daUMN4";
export default{
    getFilmDetails(id) {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${__APIKEY__}&language=fr-FR`;
        return axios.get(url, {}).then(response => response.data);
    },
    getFilms2(){
        const apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1';
        return axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${__TOKEN__}`, // Add the Bearer token here
            },
        })
            .then(response => {
                // Gérez la réponse de l'API ici
                return response.data.results;
            });  
    },
    setFavorite(newList){
        localStorage['favoriteFilms'] = JSON.stringify(newList);
    },
    getFavoriteFilms(){
        return _fakeData(_getLocalStorageFavoriteFilms());
    },
    getActorDetails(id){
        const fakeData = {
            name: "Brad",
            surname: "Pitt",
            age: "34",
            films: ["Titanic", "Harry Potter"]
        };
        return _fakeData(fakeData);
    }
}

function _getLocalStorageFavoriteFilms(){
    const localStorageFavoriteFilm = localStorage.getItem('favoriteFilms');
    return localStorageFavoriteFilm && JSON.parse(localStorageFavoriteFilm) || [] ;
}

function _fakeData(fakeDate){
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve(fakeDate);
        }, 1000);
    });
}

const _films = [
    {
        title: "Forrest Gump",
        duration: "2h20",
        description: "Quelques décennies d'histoire américaine, des années 1940 à la fin du XXème siècle, à travers le regard et l'étrange odyssée d'un homme simple et pur, Forrest Gump.",
        note: 4.6,
        date: "28 octobre 2015",
        picture : `https://picsum.photos/500/300?image=11`,
        castings: ["Tom Hanks", "Gary Sinise"]
    },
    {
        title: "La Liste de Schindler",
        duration: "3h15",
        description: "Evocation des années de guerre d'Oskar Schindler, industriel autrichien rentré à Cracovie en 1939 avec les troupes allemandes. Il va, tout au long de la guerre, protéger des juifs en les faisant travailler dans sa fabrique.",
        note: 4.7,
        date: "13 mars 2019",
        picture : `https://picsum.photos/500/300?image=12`,
        castings: ["Liam Neeson", "Ben Kingsley", "Ralph Fiennes"]
    },
    {
        title: "La Ligne verte",
        duration: "3h09",
        description: "Paul Edgecomb, Gardien-chef du pénitencier de Cold Mountain en 1935, était chargé de veiller au bon déroulement des exécutions capitales. Parmi les prisonniers se trouvait un colosse du nom de John Coffey...",
        note: 4.5,
        date: "12 juin 1997",
        picture : `https://picsum.photos/500/300?image=13`,
        castings: ["Tom Hanks", "Michael Clarke Duncan"]
    },
    {
        title: "12 hommes en colère",
        duration: "1h35",
        description: "Lors d'un procès, un juré émet l'hypothèse que l'homme qu'il doit juger n'est peut-être pas coupable. Il va tenter de convaincre les onze autres jurés.",
        note: 4.6,
        date: "12 juillet 2007",
        picture : `https://picsum.photos/500/300?image=14`,
        castings: [" Henry Fonda", "Martin Balsam", "John Fiedler"]
    },
    {
        title: "Le Parrain",
        duration: "1h35",
        description: "En 1945, à New York, les Corleone sont une des cinq familles de la mafia. Don Vito Corleone marie sa fille à un bookmaker. Sollozzo, \"parrain\" de la famille Tattaglia, propose à Don Vito une association dans le trafic de drogue....",
        note: 4.5,
        date: "12 juillet 1978",
        picture : `https://picsum.photos/500/300?image=15`,
        castings: ["Marlon Brando", "Al Pacino", "James Caan"]
    },
    {
        title: "Les Evadés",
        duration: "2h22",
        description: "Condamné à perpétuité pour le meurtre de sa femme et de son amant, un banquier s'accroche à l'espoir et se lie d'amitié avec un autre détenu pour survivre en prison.",
        note: 3.2,
        date: "12 juillet 1988",
        picture : `https://picsum.photos/500/300?image=16`,
        castings: ["Tim Robbins", "Morgan Freeman", "Bob"]
    },
    {
        title: "Le Seigneur des anneaux : le retour du roi",
        duration: "3h22",
        description: "Tandis que les ténèbres se répandent sur la Terre du Milieu, Aragorn se révèle être l'héritier caché des rois antiques. Quant à Frodon, toujours tenté par l'Anneau, il voyage à travers les contrées ennemies, se reposant sur Sam et Gollum...",
        note: 4.5,
        date: "12 juillet 2005",
        picture : `https://picsum.photos/500/300?image=17`,
        castings: ["Sean Astin", "Elijah Wood", "Viggo Mortensen"]
    }
]