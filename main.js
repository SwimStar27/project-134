coco = "";
status = "";
objects = [];
song = "";

function preload(){
song=loadSound("sound.mp3");
}

function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600,400);
    video.hide();
    objectd = objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status:  Detecting Person" ;
}

function draw(){
    image(video,0,0, 600,400);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Person Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " "+ percent + "%", objects[i].x, objects[i].y-12);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label=="person"){
                document.getElementById("blank").innerHTML = "Baby Found";
                song.stop();
            }
            else{
                document.getElementById("blank").innerHTML = "Baby Not Found";
                song.play();
            }
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded !");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}