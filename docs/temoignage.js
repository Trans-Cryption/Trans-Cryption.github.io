const DATA_URL = 'assets/temoignage.json';
const PODCAST_URL = "assets/podcast/"
let nb=0;
let taille;
const NB_CHARG = 10;
const STORE_T = "t";
test = true;

async function LoadTem(){
    try {
        const tem = await fetchtem();
        rendertem(tem);
    } catch (error) {
        handleerror(error);
    }
}

async function fetchtem(){
    const response = await fetch(DATA_URL);
    const data = await response.json();
    taille=data.length;
    return data;
}

function rendertem(tem){
    const text = document.getElementById(STORE_T);
    text.innerHTML = ''; //clear tem
    for(let i=nb;i<min(nb+NB_CHARG,tem.length);i+=1){
        let donnee = "<p><strong>"+tem[i]["titre"]+" : </strong>";
        donnee += tem[i]["date"];
        if(tem[i]["podcast"]=="no"){
            donnee += ", texte</p>";
        }else{
            donnee += ", podcast</p>";
        }
        createbutton(text,donnee,i)
    }
}

function createbutton(text,donnee,i){
    button = document.createElement('button');
    button.innerHTML = donnee;
    button.classList.add('tem');
    button.id = i;
    button.addEventListener("click", () =>tem(i));
    text.appendChild(button);
}

async function tem(i){
    try {
        const tem = await fetchtem();
        createtem(tem,i)
        test = false;

    } catch (error) {
        handleerror(error);
    }
}

function createtem(tem,i){
    const text = document.getElementById(STORE_T);
    text.innerHTML = "";
    titre = document.createElement('h2');
    titre.innerHTML = tem[i]["titre"];
    text.appendChild(titre);
    if(tem[i]["podcast"]=="no"){
        createtext(text,tem,i);
    }
    else{
        createpodcast(text,tem,i);
    }
    date = document.createElement('p');
    date.innerHTML = tem[i]["date"];
    text.appendChild(date);
}

function createtext(text,tem,i){
    contenu = document.createElement('p');
    contenu.innerHTML = tem[i]["texte"];
    text.appendChild(contenu);
}

function createpodcast(text,tem,i){
    audio = document.createElement('audio');
    audio.classList.add('audio');
    audio.controls = 'controls';
    audio.src = PODCAST_URL+tem[i]["texte"];
    audio.type = 'audio/mpeg';
    text.appendChild(audio);
}

function min(a,b){
    if(a>b){
        return b;
    } else {
        return a;
    }
}

function down(){
    if(nb>0 && test){
        nb-=NB_CHARG;    
        console.log(nb);
        LoadTem();

    }
}
function up(){
    if(nb+NB_CHARG<=taille && test){
        nb+=NB_CHARG;
        console.log(nb);
        LoadTem();
    }
}

function retour(){
    test = true;
    LoadTem();
}

function handleerror(error){
    console.error('Error loading products:', error);
    document.getElementById(STORE_T).innerHTML = `
      <p class="error-message">Échec du chargement des témoignages. Veuillez réessayer plus tard.</p>
    `;
}

/* Initialization */
document.addEventListener('DOMContentLoaded', LoadTem);

// pour le format des données :
// {
//     "date":"19/04/2025",
//     "titre":"Lost on you",
//     "texte":"LP.mp3",
//     "podcast":"yes"
// }