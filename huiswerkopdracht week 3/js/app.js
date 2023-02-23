


const label = document.getElementById("label");
const image = document.getElementById('output')
const fileButton = document.querySelector("#file")
var score = 0
var bunnybird = 0
var startgame = 0

document.getElementById("score").innerHTML = `score:${score}`;

let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }}



const labelThreeBtn = document.querySelector("#what");


const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
featureExtractor.load('./model.json');


fileButton.addEventListener("change", (event)=>{
  image.src = URL.createObjectURL(event.target.files[0])
})

image.addEventListener('load', () => userImageUploaded())

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');

    labelThreeBtn.addEventListener("click", () => what());
    
}

// Create a new classifier using those features and with a image element
const classifier = featureExtractor.classification(image, imageReady);

// Triggers when the image is ready
function imageReady() {
  console.log('The image is ready!');
}

function addbunny () {
    classifier.addImage(image, 'bunny');
    console.log('bunny')

};

function addbird () {
    classifier.addImage(image, 'bird');
    console.log('bird')
};

function save () {
  featureExtractor.save();
};

function what(){
// Get a prediction for that image
classifier.classify(image, (err, results) => {
    console.log(results); 
    var x = document.getElementById("prediction");
    x.innerHTML = `I think it is a ${results[0].label} `
    if(startgame == 1){
    if(bunnybird == 1 && results[0].label == 'bunny'){
      speak(`I think it is a ${results[0].label} `)
      score += 1;
      document.getElementById("score").innerHTML = `score:${score}`;
      return;
    } 
    if (bunnybird == 2 && results[0].label == 'bird'){
      speak(`I think it is a ${results[0].label} `)
      score += 1;
      document.getElementById("score").innerHTML = `score:${score}`;
      return;
     } else {
      speak(`That is not a ${results[0].label} `)
      x.innerHTML = `I do not think that is a ${results[1].label} `
    }
    console.log(score)
  }});
}

function train (){
classifier.train((lossValue) => {
  console.log('Loss is', lossValue);
});
}


function userImageUploaded(){
    console.log("The image is now visible in the DOM")
}

function getassignment() {
  var x = document.getElementById("assignmentdiv");
  startgame = 1
  if (x.innerHTML === "Make a picture of a bunny") {
    x.innerHTML = "Make a picture of a bird";
    speak(`Make a picture of a bird`)
    bunnybird = 2
  } else {
    x.innerHTML = "Make a picture of a bunny";
    speak(`Make a picture of a bunny`)
    bunnybird = 1
  }
}



