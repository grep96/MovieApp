const btn_ricerca = document.getElementById('btn_ricerca');
//const btn_delete = document.getElementById('btn_delete');
const container = document.getElementById('card-container');
const pageTitle = document.getElementById('pageTitle');

btn_ricerca.onclick = function(){
    const p = 1;
    const query = document.getElementById("search").value;
    searchAPI(query, p);

    if (container.hasChildNodes()) {
        for(i=2; i<10; i++){
            const p = i;
            searchAPI(query, p)
        }
    }

    //btn_delete.style.cssText = 'display: inline-block;';
}

/*btn_delete.onclick = function(){
    btn_delete.style.cssText = 'display: none;';
    document.getElementById('search').value = "";
    document.getElementById('search').select();

    while(container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }

    //location.reload();
    console.log(container);
}*/

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
        
        let title = aDisplayMovies[i].title;
        let year = aDisplayMovies[i].year;

        cardContainer.appendChild(card);
        card.appendChild(cardBody);
        //cardBody.appendChild(title);
        cardBody.appendChild(img);
        //cardBody.appendChild(text);

        document.getElementById('card-container').replaceWith(cardContainer);

        //deleteMovies(aDisplayMovies);
        displayDetails(card, img, title, year);
    }
}

/*
function deleteMovies(aDisplayMovies){
        pageTitle.onclick = function(){
        for(let i=0; i<aDisplayMovies.length; i++) {
            aDisplayMovies.pop();
        }
        //location.reload();
        console.log(aDisplayMovies);
    }
    
}*/

function displayDetails(card, img, title, year){
    card.onclick = function(){
        let cardDetails;

        cardDetails = document.getElementById('card-details');
        cardDetails.style.cssText = 'display: block;';
        let modalDialog = document.createElement('div');
        modalDialog.className = 'modal-dialog modal-dialog-centered modal-lg';
        let modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = 'height: 650px;';

        //Body
        let modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalBody.style.cssText = '';

        let modalContainer = document.createElement('div');
        modalContainer.className = 'row';

        //Close
        let close = document.createElement('i');
        close.className = 'fa fa-times-circle';
        close.style.cssText = 'color: black; cursor: pointer; padding: 1px; position: fixed; margin-top: 42%; margin-left: 26.5%;';

        hideDetails(cardDetails, close);

        //Gestione del poster
        let modalColImg= document.createElement('div');
        modalColImg.className = 'col-md-6';
        let modalContainerImg= document.createElement('div');
        modalContainerImg.style.cssText = 'margin: 0 auto; height: 100%; width: 80%;';
        let modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = 'height: 450px; width: 300px';

        //Gestione del testo (informazioni del film)
        let modalColText = document.createElement('div');
        modalColText.className = 'col-md-6';
        let modalText = document.createElement('div');
        let textP = document.createElement('p');
        textP.style.cssText = 'font-size: 18px; font-weight: bold; text-align: center;';
        textP.textContent = title + ' [' + year + ']';

        //Gestione della trama
        let modalContainerTrama = document.createElement('div');
        modalContainerTrama.style.cssText = 'width: 100%';
        let modalTitleTrama = document.createElement('p');
        modalTitleTrama.style.cssText = 'font-size: 16px; font-weight: bold; margin-bottom: 0px; margin-top: 9px; text-align: center;';
        modalTitleTrama.textContent = 'Trama';
        let modalTrama = document.createElement('p');
        modalTrama.style.cssText = 'margin-left: 10px; margin-right: 10px; text-align: justify;';
        modalTrama.textContent = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni odit et necessitatibus earum vel minima libero, ab inventore tempora repudiandae nihil optio enim ullam minus facere officiis pariatur nesciunt deserunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo neque numquam culpa! Officiis, sunt excepturi! Illo vitae nesciunt ipsam quas! Ipsa modi ab fugiat maxime delectus, deserunt recusandae voluptas eius! Lorem ipsum, dolor sit amet. Lorem ipsum inventore tempora repudiandae nihil optio enim ullam minus facere officiis pariatur.';

        //DOM
        cardDetails.appendChild(modalDialog);
        modalDialog.appendChild(modalContent);
        //modalContent.appendChild(modalHeader);
        //modalHeader.appendChild(close);
        modalContent.appendChild(modalBody);
        modalBody.appendChild(close);
        modalBody.appendChild(modalContainer);

        modalContainer.appendChild(modalColImg);
        modalColImg.appendChild(modalContainerImg);
        modalContainerImg.appendChild(modalImg);

        modalContainer.appendChild(modalColText);
        modalColText.appendChild(modalText);
        modalText.appendChild(textP);

        modalContainer.appendChild(modalContainerTrama);
        modalContainerTrama.appendChild(modalTitleTrama);
        modalContainerTrama.appendChild(modalTrama);

        document.getElementById('card-details').replaceWith(cardDetails);
    }
}

function hideDetails(cardDetails, close){
    close.onclick = function(){
        cardDetails.style.cssText = 'display: none;';
        cardDetails.removeChild(cardDetails.lastChild);
    }
}