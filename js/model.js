const btn_ricerca = document.getElementById('btn_ricerca');
const btn_delete = document.getElementById('btn_delete');
const container = document.getElementById('card-container');

btn_ricerca.onclick = function(){
    const p = 1;
    const query = document.getElementById("search").value;
    searchAPI(query, p);

    for(i=2; i<10; i++){
        if (container.hasChildNodes()) {
            console.log("Prova");
            const p = i;
            searchAPI(query, p);
        }
    }

    btn_delete.style.cssText = 'display: inline-block;';
}

btn_delete.onclick = function(){
    btn_delete.style.cssText = 'display: none;';
    document.getElementById('search').value = "";
    document.getElementById('search').select();

    while(container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
}

class Movie{
    constructor(title, year, imdbID, type, poster){
        this.title = title;
        this.year = year;
        this.imdbID = imdbID;
        this.type = type;
        this.poster = poster;
    }

    validate(){
        if(this.title == '' || this.title == null || !this.title){
            return false;
        }
        else if(this.year == '' || this.year == null || !this.year){
            return false;
        }
        else if(this.imdbID == '' || this.imdbID == null || !this.imdbID){
            return false;
        }
        else if(this.type == '' || this.type == null || !this.type){
            return false;
        }
        else if(this.poster == '' || this.poster == null || !this.poster || this.poster == 'N/A'){
            return false;
        }
        else{
            return true;
        }
    }
}

function searchAPI(query, p){
    const baseURL = 'http://www.omdbapi.com/?';
    const apiKey = '2e7fd0e1';
    const aDisplayMovies = [];

    //const completeURL = baseURL + 'apikey=' + apiKey + '&s=' + query + '&type=movie' + '&page=' + page;
    //const completeURL = ${baseURL}apikey=${apiKey}&s=${query}; -> literals

    const completeURL = baseURL + 'apikey=' + apiKey + '&s=' + query + '&type=movie' + '&page=' + p;
    fetch(completeURL)
    .then(response => response.json())
    .then((response) => {
        if(response.Response == 'False'){
                console.log("Errore");
        }
        else{
        const arrMovie = response.Search;
            console.log(arrMovie);
            for(let i=0; i<arrMovie.length; i++){
            const element = arrMovie[i];
            const film = new Movie(element.Title, element.Year, element.imdbID, element.Type, element.Poster);
            //Validare sempre prima tutti i dati che vanno esposti!
            if(film.validate()){
                aDisplayMovies.push(film);
            }
        }
        getMovies(aDisplayMovies);
        //forEach(...)   
        }    
    })
}

function getMovies(aDisplayMovies){
    for(let i=0; aDisplayMovies.length; i++){
        let cardContainer;

        cardContainer = document.getElementById('card-container');
        let card = document.createElement('div');
        card.className = 'card';
        card.style.cssText = 'height: 500px; width: 350px;';
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        /*let title = document.createElement('p');
        title.className = 'card-title';
        title.innerText = "TitoloFilm";
        title.style.cssText = 'font-size: 20px; font-weight: bold; margin: 0; margin-top: -5%; text-align: center;';*/
        let img = document.createElement('img');
        img.src = aDisplayMovies[i].poster;
        //img.src = "img/Film.jpg"; //495px*345px
        img.style.cssText = 'cursor: pointer; height: 100%; width: 100%';
        /*let text= document.createElement('p');
        text.className = 'card-text';*/
        

        cardContainer.appendChild(card);
        card.appendChild(cardBody);
        //cardBody.appendChild(title);
        cardBody.appendChild(img);
        //cardBody.appendChild(text);

        document.getElementById('card-container').replaceWith(cardContainer);

        card.onclick = function(){
            console.log("Dettagli...");
        } 
    }
}