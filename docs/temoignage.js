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
        createbutton(text,donnee,i,tem[i])
    }
}

function createbutton(text,donnee,i,uni_tem){
    button = document.createElement('button');
    button.innerHTML = donnee;
    button.classList.add('tem');
    button.id = i;
    button.addEventListener("click", () =>createtem(uni_tem));
    text.appendChild(button);
}

function createtem(uni_tem){
    test=false
    const text = document.getElementById(STORE_T);
    text.innerHTML = "";
    titre = document.createElement('h2');
    titre.innerHTML = uni_tem["titre"];
    text.appendChild(titre);
    if(uni_tem["podcast"]=="yes"){
        createpodcast(text,uni_tem);
    }
    createtext(text,uni_tem);
    date = document.createElement('p');
    date.innerHTML = uni_tem["date"];
    text.appendChild(date);
}

function createtext(text,uni_tem){
    contenu = document.createElement('p');
    contenu.innerHTML = uni_tem["texte"];
    text.appendChild(contenu);
}

function createpodcast(text,uni_tem){
    audio = document.createElement('audio');
    audio.classList.add('audio');
    audio.controls = 'controls';
    audio.src = PODCAST_URL+uni_tem["url"];
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