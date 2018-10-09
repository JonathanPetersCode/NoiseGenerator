let selectNoise;
let playButton, stopButton, chooseNoise, setVolume, toggleOnOff; // dom element
let fft;

function setup() {
  createCanvas(400, 200)
  // Assigns & init our p5 sound object
  selectNoise = new p5.Noise();
  selectNoise.amp(0);
  
  fft = new p5.FFT();

// Button to start/stop noise
  toggleOnOff = createButton('play').style('font-family', "courier");
  toggleOnOff.position(10, 10);
  toggleOnOff.mousePressed(function() {
    if (selectNoise.started) {
      selectNoise.stop();
      toggleOnOff.html('Play')
    } else {
      selectNoise.start();
      toggleOnOff.html('Stop')
    }
  });
//Allows user to choose type of noise 
  chooseNoise = createSelect();
  chooseNoise.position(60, 10).style('font-family', "courier");
  chooseNoise.option('white');
  chooseNoise.option('pink');
  chooseNoise.option('brown');
  chooseNoise.changed(function() {
    selectNoise.setType(chooseNoise.value());
  fill (chooseNoise.value());
  });
// Sets Voume
  setVolume = createSlider(-60, 0, -60, 1)//60db -60db -> 0db
  setVolume.position(130, 10);
  setVolume.changed(function() {
    if (setVolume.value() > -56)
    //amplitude = 10^ (decibels/20)
    //pow(base, exponent);
    //pow(10, setVolume.value()/20)
    selectNoise.amp(pow(10, setVolume.value()/20, 0.01));
 else{
    selectNoise.amp(map(setVolume.value(),-60, -56, 0, 0.0016), 0.1);
 }
 });

  fill('white');
  noStroke();
}

function draw() {
  background(80);
  let spectrum = fft.analyze();
  beginShape();
  vertex(0, height); 

  for (let i = 0; i < spectrum.length; i++) {
    vertex(map(log(i), 0, log(spectrum.length), 0, width), map(spectrum[i], 0 , 255, height, 0))
  }
  vertex(width, height);
  endShape();
}

function touchstarted() {
  if (getAudioContext.state !== 'running') 
getAudioContext().resume();
}

