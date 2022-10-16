song1_status = "";
song2_status = "";
song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;


function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("poseNet is Initiallised");
}

function preload(){
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");

   
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate()
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(" leftWristX " + leftWristX + " leftWristY " + leftWristY)
        leftWristScore = results[0].pose.keypoints[9].score;
 
        
 
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log(" RightWristX " + RightWristX + " RightWristY " + RightWristY)
        rightWristScore = results[0].pose.keypoints[10].score;
    
}
}

function draw(){

   image(video,0,0,600,500);
   fill("red");
   stroke("red");

    song1_status = song_1.isPlaying();
    song2_status = song_2.isPlaying();

    
    if(leftWristScore > 0.2){
        circle(leftWristX,leftWristY,20);
        song_1.stop();
       
        if(song2_status == false){
            song_2.play();
            document.getElementById("song").innerHTML = "Peter pan song";
            
        }
    }

    if(rightWristScore > 0.2){
        circle(rightWristX,rightWristY,20);
        song_2.stop();
       
        if(song1_status == false){
            song_1.play();
            document.getElementById("song").innerHTML = "Harry Potter song";
            
        }
    }
    
}
