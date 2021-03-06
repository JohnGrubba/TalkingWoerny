var talking = false;
 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var high = 0;
var low = 1000;
 
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  })
    .then(function(stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
   
      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 512;
   
      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      scriptProcessor.onaudioprocess = function() {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        //console.log(average);
        stop_loader();
        if (Math.round(average) < 15){
            if (talking){
              talking = false;
              change();
            }
        }
        if (Math.round(average) > 30){
            if (!talking){
              talking = true;
              document.getElementById("woerny").src = "woernylistening.png"
            }
        }
      };
    })
    .catch(function(err) {
      //alert("Audio Device couldn't be loaded! Get another browser or allow me access.")
    });