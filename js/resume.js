$(document).ready(function(){

    gameStart = false;
    MAX_SPEED = 1
    START_SPEED = 3
    INTERVAL_SPEED = 0.5
    speed = 3
    score = 0

    $("#start-button").click (function() {
        gameStart = true;
        speed = START_SPEED;
        score = 0;
        $("#block").css ('animation', 'block {speed}s 5 linear'.replace("{speed}", speed));
        $("#start-button").hide();
        $("#score").text("Score: " + score);
        $("#guide").show();
    });

    $(document).keypress(function(event) {
        // Check if the pressed key is the space key
        if ((event.keyCode === 32) && gameStart) {
            $("#guide").hide();
            if ($("#character").hasClass("character-jump")) {
                return
            }
            $("#character").attr('src', 'images/dino_jump.png');
            $("#character").addClass("character-jump");
            setTimeout(function() {
                $("#character").removeClass("character-jump");
                $("#character").attr('src', 'images/dino_still.png');
            }, 600);
        }
    });

    var isGameOver = setInterval(function() {
        if (gameStart){
            let blockLeft = parseInt($("#block").css('left'));
            let characterBottom = parseInt($("#character").css('bottom'));
        
            if ((blockLeft > 0) && (blockLeft < 60)) {
                if (characterBottom < 40) {
                    $("#block").stop(true, true);
                    $("#block").css ('animation', 'none');
                    alert ("Game Over!")
                    gameStart = false;
                    $("#start-button").show();
                    score = 0;
                } 
            }
        }
    }, 10);

    $('#block').on("animationend", function(){
        score += 1;
        $("#score").text("Score: " + score);
        $("#block").css ('animation', 'none');
        $('#block').width();
        if (speed - INTERVAL_SPEED >= MAX_SPEED) {
            speed -= INTERVAL_SPEED;
            $("#block").css ('animation', 'block {speed}s 5 linear'.replace("{speed}", speed));
        } else {
            $("#block").css ('animation', 'block {speed}s infinite linear'.replace("{speed}", speed));
        }
    });

    $("#block").on("animationiteration", function() {
        score += 1;
        $("#score").text("Score: " + score);
      });
  
  });