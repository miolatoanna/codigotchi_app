const screen = document.getElementById('screen');
const mic = document.getElementById('mic');
const panelData = document.getElementById('panel-data');

const commands = ['mangia', 'balla', 'dormi'];

//Vado ad utilizzare la nuova Speech Recognition API 
const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recog = new speechRecognition();

function onStart() {
    panelData.classList.add('listening');
    recog.start();
};

function onResult(e) {
    const testo = e.results[0][0].transcript;
    console.log(testo);

    //controllare se ci sono comandi nella trascrizione
    const action = commands.find(function(cmd) {
        return testo.toLowerCase().includes(cmd);
    });


    //mostrare la gif corretta
    const actionClassname = 'codigotchi-screen_' +  action ;
    screen.classList.add(actionClassname);

    //tornare allo stato normale
    panelData.classList.remove('listening');

    setTimeout(function() {
        screen.classList.remove(actionClassname);
    }, 2000);
}

mic.addEventListener('click', onStart);
recog.addEventListener('result', onResult);

