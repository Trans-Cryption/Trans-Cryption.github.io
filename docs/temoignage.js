const DATA_URL = 'assets/temoignage.json';
let nb=0;
let taille;
const NB_CHARG = 3;
const STORE_T = "t";

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
        let donnee = tem[i]["date"];
        donnee += "<br>";
        donnee += tem[i]["texte"];
        donnee += "<br><br>";
        text.insertAdjacentHTML("beforeend",donnee);
    }
}

function min(a,b){
    if(a>b){
        return b;
    } else {
        return a;
    }
}

function down(){
    if(nb>0){
        nb-=NB_CHARG;    
        console.log(nb);
        LoadTem();

    }
};
function up(){
    if(nb-taille<NB_CHARG){
        nb+=NB_CHARG;
        console.log(nb);
        LoadTem();
    }
}

function handleerror(error){
    console.error('Error loading products:', error);
    document.getElementById(STORE_T).innerHTML = `
      <p class="error-message">Échec du chargement des témoignages. Veuillez réessayer plus tard.</p>
    `;
}

/* Initialization */
document.addEventListener('DOMContentLoaded', LoadTem());