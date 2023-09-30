const textArea = document.getElementById("text_to_speech");
const playButton = document.getElementById("bouton_trancription");

playButton.addEventListener("click", function () {
    const textToRead = textArea.value;
    
    if (textToRead) {
        const utterance = new SpeechSynthesisUtterance(textToRead);
        speechSynthesis.speak(utterance);
    } else {
        alert("Veuillez entrer du texte dans le textarea avant de le lire.");
    }
});
