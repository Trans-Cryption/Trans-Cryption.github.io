const DATA_URL = 'assets/temoignage.json';
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
        let donnee = tem[i]["titre"];
        donnee += "<br>";
        donnee += tem[i]["date"];
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
    contenu = document.createElement('p');
    contenu.innerHTML = tem[i]["date"]+"<br><br>"+tem[i]["texte"];
    text.appendChild(titre);
    text.appendChild(contenu);
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