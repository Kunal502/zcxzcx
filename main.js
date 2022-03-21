music_1 = "";
music_2 = "";

left_wrist_x = 0;
left_wrist_y = 0;

right_wrist_x = 0;
right_wrist_y = 0;

scoreleftwrist = 0;

status1 = "";
status2 = "";

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on("pose", gotPoses)
}

function preload() {
    music_1 = loadSound("music.mp3");
    music_2 = loadSound("music2.mp3")
}

function draw() {
    image(video, 0, 0, 500, 500);
    status1 =  music_1.isPlaying();
    status2 = music_2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist > 0.2){
        circle(left_wrist_x , left_wrist_y , 20);
        music_2.stop();
        if(status2 == false){
            music_2.play();
            document.getElementById("song_name").innerHTML = "playing herry potter theme song";
        }
    }
}

function modalLoaded() {
    console.log("modal is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {

        console.log(results);

        scoreleftwrist = results[0].pose.keypoints[9].score;

        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;

        console.log("left wrist x = " + left_wrist_x + "left wrist y = " + left_wrist_y + "right wrist x = " + right_wrist_x + "right wrist y = " + right_wrist_y)
    }
}