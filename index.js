Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90,
});
camera=document.getElementById("camera");
Webcam.attach("#camera")

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">'
        })
}

console.log("ml5version="+ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/UumZubmjj/model.json",modelloaded)

prediction1="";
prediction2="";
function modelloaded(){
    console.log(modelloaded)
}

function speak(){
    var synth=window.speechSynthesis;
    speak1="The First Prediction is "+prediction1;
    speak2="The Second Prediction is "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak1+speak2)
    synth.speak(utterThis)
}

function Check(){
    img=document.getElementById("captured_image")
    classifier.classify(img, gotresult)
}

function gotresult(error, results) {
    if(error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label
        document.getElementById("result_emotion_name2").innerHTML = results[1].label
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();

        if(results[0].label=="Amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076;"
        }
        if(results[0].label=="great"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(results[0].label=="peace"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(results[1].label=="Amazing"){
            document.getElementById("update_emoji2").innerHTML="&#128076;"
        }
        if(results[1].label=="great"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }
        if(results[1].label=="peace"){
            document.getElementById("update_emoji2").innerHTML="&#9996";
        }
    }
}

