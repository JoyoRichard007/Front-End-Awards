const camera = document.getElementById("camera");
const startRecordingButton = document.getElementById("startRecording");
const stopRecordingButton = document.getElementById("stopRecording");
const audio = document.getElementById("audio");
const toggleVideoReconnaitreButton = document.getElementById("toggleVideoReconnaitre");
const toggleVideoRetrouverButton = document.getElementById("toggleVideoRetrouver");
const cameraReconnaitre = document.getElementById("reconnaitre");
const cameraRetrouver = document.getElementById("retrouver");

let mediaRecorder;
let recordedChunks = [];

toggleVideoReconnaitreButton.addEventListener("click", function () {
    cameraReconnaitre.style.display = "block"; 
    cameraRetrouver.style.display = "none";
});
toggleVideoRetrouverButton.addEventListener("click", function () {
    cameraRetrouver.style.display = "block"; 
    cameraReconnaitre.style.display = "none"; 
});


function toggleVideoRetrouver() {
    if (isVideoVisible) {
        cameraContainer.style.display = "none";
        isVideoVisible = false;
    } else {
        cameraContainer.style.display = "block";
        isVideoVisible = true;
    }
}

// Demarrer la capture vidéo depuis la caméra
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function (stream) {
        camera.srcObject = stream;
    })
    .catch(function (error) {
        console.error("Erreur lors de l'accès à la caméra : ", error);
    });

// Démarrer l'enregistrement vocal
startRecordingButton.addEventListener("click", function () {
    mediaRecorder = new MediaRecorder(camera.srcObject);

    mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }
    };

    mediaRecorder.onstop = function () {
        const blob = new Blob(recordedChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(blob);
        audio.src = audioUrl;
    };

    mediaRecorder.start();
    startRecordingButton.disabled = true;
    stopRecordingButton.disabled = false;
});

// Arrêter l'enregistrement vocal
stopRecordingButton.addEventListener("click", function () {
    mediaRecorder.stop();
    startRecordingButton.disabled = false;
    stopRecordingButton.disabled = true;
});
