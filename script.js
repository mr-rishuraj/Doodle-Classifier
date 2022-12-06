let canvas, clearButton;
let doodleClassifier, resultsDiv;

function setup() {
  canvas = createCanvas(400,400);
  background(255);
  clearButton = createButton('clear');
  clearButton.mousePressed(clearCanvas);
  clearButton.position(10, 410);

  clearButton.style('font-size', '25px');
  clearButton.style('border-radius', '8px');
  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  resultsDiv = createDiv('Model Loading!');
}

function modelReady() {
  console.log('Model Loaded!');
  doodleClassifier.classify(canvas, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results);
  let content = `${results[0].label} 
                 ${nf(100 * results[0].confidence, 2, 1)}%<br/>
                 ${results[1].label} 
                 ${nf(100 * results[1].confidence, 2, 1)}%`

  resultsDiv.html(content);     
  resultsDiv.style('font-size', '25px');  
  resultsDiv.position(100, 410);        
  doodleClassifier.classify(canvas, gotResults);
}

function clearCanvas() {
  background(255);
}

function draw() {
  if (mouseIsPressed) {
    strokeWeight(16);
    line(mouseX, mouseY, pmouseX, pmouseY); 
  }
}


