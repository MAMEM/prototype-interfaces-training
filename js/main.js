// Create stage
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

/*window.addEventListener('resize', resizeCanvas, false);*/

var currentUrl = window.location.href;

var stage = new createjs.Stage("canvas");
var mousePointer = new createjs.Shape();

var RTL = false;
var gameTypeFull = false;
var gameTypeStripped = false;
var gameTypeElems = false;

var advLevelsEnabled = true;

// options
var toggleQuizTranslations = false;

document.getElementById("registerButton").onclick = function() {

    user.firstName = document.getElementById("firstNameInput").value;
    user.nickname = document.getElementById("nicknameInput").value;

    // Capitalize First letter First name
    user.firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
    /*user.nickname = user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1);*/

    user.email = document.getElementById("emailInput").value;
    user.password = document.getElementById("passInput").value;

    if (document.getElementById("maleRadioBtn").checked) {
        user.gender = "m";
    } else {
        user.gender = "f";
    }

    user.age = document.getElementById("ageInput").value;

    if (!user.email || !user.password || !user.firstName || !user.nickname || !user.gender || !user.age) {
        alert('Please fill in all Register fields!');
        return 0;
    }

    if (user.password.length < 6) {
        alert('Password should be longer than 6 chars!');
        return 0;
    }

    document.getElementById("startingInfoArea").style.display = "none";

    // Preload libs
    var queue = new createjs.LoadQueue(true);
    queue.loadFile({src:"https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i", type:createjs.AbstractLoader.CSS});
    queue.on("complete", function(){
        registerUser();
        init();
    });
};


document.getElementById("loginButton").onclick = function() {
    user.email = document.getElementById("emailLoginInput").value;
    user.password = document.getElementById("passLoginInput").value;
    user.firstName = document.getElementById("firstNameInputLogin").value;
    user.firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);

    if (!user.email || !user.password || !user.firstName) {
        alert('Please fill in all Register fields!');
        return 0;
    }

    document.getElementById("startingInfoArea").style.display = "none";

    // Preload libs
    var queue = new createjs.LoadQueue(true);
    queue.loadFile({src:"https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i", type:createjs.AbstractLoader.CSS});
    queue.on("complete", function(){
        loginUser();
        init();
    });
};

function init() {

    // Check if RTL is enabled
    RTL = document.getElementById('rtlCheckbox');
    RTL = RTL.checked;

    gameTypeFull = document.getElementById('persuasiveRadioBtn').checked;
    gameTypeStripped = document.getElementById('bareRadioBtn').checked;
    gameTypeElems = document.getElementById('gameOnlyRadioBtn').checked;

    advLevelsEnabled = document.getElementById('advCheckbox');
    advLevelsEnabled = advLevelsEnabled.checked;

    toggleQuizTranslations = document.getElementById('quizCheckbox');
    toggleQuizTranslations = toggleQuizTranslations.checked;

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

    resizeCanvas();
    renderGame();
}

function renderGame() {
    createjs.Touch.enable(stage);

    stage.addEventListener("stagemousemove", moveHandler);

    loadSplashPage();

    addMousePointer();

    stage.enableMouseOver();

    stage.update();
}

function loadSplashPage() {

    var title = new createjs.Text(genericText.gazeTheWeb, "300 60px Roboto", "rgb(80,185,164)");
    title = alignTextToStageCenter(stage, title);
    title.y = 20;

    var subtitle = new createjs.Text(genericText.subTitle, "32px Roboto", "rgba(0,0,0,0.23)");
    subtitle = alignTextToStageCenter(stage, subtitle);
    subtitle.y = 100;

    var size = [], pos = [];
    size.x = 500;
    size.y = 140;
    pos.x = window.innerWidth/2 - size.x/2;
    pos.y = 550;

    var wizard = new createjs.Bitmap("assets/int/wizard.png");
    wizard.x = (stage.canvas.width/2) -91;
    wizard.y = stage.canvas.height/4;

    if (gameTypeStripped) { wizard.visible = false; pos.y = 300;}

    var playBtn = new Button(color.green, size, pos, genericText.play, loadOverviewPage);

    var splashContainer = new createjs.Container();
    splashContainer.addChild(title, subtitle, playBtn.btn, playBtn.label, wizard);

    stage.addChild(splashContainer);

}


function loadOverviewPage() {

    // Reset overview every time is is called
    stage.removeAllChildren();
    stage.removeAllEventListeners("mouseover");
    stage.removeAllEventListeners("mouseout");

    var textInput1 = document.getElementById('inputTextFirst');
    textInput1.style.display = "none";
    var textInput2 = document.getElementById('inputTextSecond');
    textInput2.style.display = "none";
    var textElement1 = document.getElementById('caveLatText');
    textElement1.style.display = "none";
    var textElement2 = document.getElementById('caveLngText');
    textElement2.style.display = "none";

    stage.addChild(firebaseUsernameHUD);
    addMousePointer();

    var title = new createjs.Text(genericText.gazeTheWeb, "300 60px Roboto", "rgb(80,185,164)");
    title = alignTextToStageCenter(stage, title);
    title.y = 20;

    var overviewContainer = new createjs.Container();

    var subtitle = new createjs.Text(genericText.levelSelect, "32px Roboto", "rgba(0,0,0,0.23)");
    subtitle = alignTextToStageCenter(stage, subtitle);
    subtitle.y = 100;

    var tileSize = 200;

    var s = [];
    var lock = [];
    var i;
    var padding = 60;
    var width = tileSize;
    var height = tileSize;
    var cols = 4;

    // This is the point of entry of the subgroup (to effectively center contents in variable width scenarios)
    var poe = window.innerWidth/2 - ( ( (width + padding) * cols)/2 - padding/cols);

    // Basic section
    var basicLabel = new createjs.Text(genericText.basic, "700 24px Roboto", "rgba(0,0,0,0.23)");
    basicLabel.x = poe;
    basicLabel.y = 140;

    var trophyAvailable = [];
    var trophyCount = 0;

    // Calculate and render levels (locked or unlocked)
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {


        // BASIC
        var overviewBasicGroupContainer = new createjs.Container();

        // Calculate level unlock for BASIC
        var levelAvailable = [];
        var levelCompleted = 0;

        if (snapshot.val()) {

            for (i=0; i<2; i++) {

                if (!snapshot.val().levels || !snapshot.val().levels.basic) {
                    break;
                }

                if (snapshot.val().levels.basic[Object.keys(snapshot.val().levels.basic)[i]]) {

                    levelCompleted++;
                    levelAvailable[i+1] = true;
                    trophyAvailable[i] = snapshot.val().levels.basic[Object.keys(snapshot.val().levels.basic)[i]].trophyGained;
                    if (trophyAvailable[i]) {trophyCount++;}

                } else {
                    levelAvailable[i+1] = false;
                }
            }
        }
        levelAvailable[0] = true; // First level is always available!

        var basicCompletedLabel = new createjs.Text(levelCompleted +"/2 " + genericText.completed, "700 24px Roboto", "rgba(0,0,0,0.23)");
        basicCompletedLabel.x = window.innerWidth - poe;
        basicCompletedLabel.y = 140;
        basicCompletedLabel.textAlign = "right";

        var basicTrophiesLabel = new createjs.Text(trophyCount +"/2 " + genericText.trophies, "500 20px Roboto", "rgba(0,0,0,0.23)");
        basicTrophiesLabel.x = window.innerWidth - poe;
        basicTrophiesLabel.y = 170;
        basicTrophiesLabel.textAlign = "right";

        var basicTileTitle = [];
        var basicLevelScore = [];
        var basicLevelTime = [];
        var basicLevelTrophy = [];

        for(i=0; i<2; i++) {

            s[i] = new createjs.Shape().set({
                overColor: "rgba(0,0,0,0.23)",
                outColor: "rgba(0,0,0,0.12)",
                regX: width/2,
                regY: height/2,
                x: (width + padding) * (i%cols),
                y: (height + padding) * (i/cols|0),
                entryX: poe + (width/2), // Make the entry point, the center of the tile
                entryY: 180 + (height/2),
                i: i
            });

            // Discard hover if previous level is not completed.
            /*if (levelAvailable[i]) {*/

            if (!gameTypeStripped) {
                if (trophyAvailable[i]) {
                    s[i].graphics.setStrokeStyle(6).beginStroke(color.yellow).beginFill("white").drawRect(s[i].entryX, s[i].entryY, width, height).endFill();
                    basicLevelTrophy[i] = new createjs.Bitmap("assets/trophies/basic-level"+ (i+1) +"-on.png");

                } else {
                    s[i].graphics.setStrokeStyle(6).beginStroke("rgba(0,0,0,0.12)").beginFill("white").drawRect(s[i].entryX, s[i].entryY, width, height).endFill();
                    basicLevelTrophy[i] = new createjs.Bitmap("assets/trophies/basic-level"+ (i+1) +"-off.png");
                }
                basicLevelTrophy[i].x = poe + s[i].x + width/2 - 14;
                basicLevelTrophy[i].y = 310;

                if (levelAvailable[i+1]) {
                    basicLevelScore[i] = new createjs.Text(genericText.score + ": " + snapshot.val().levels.basic[Object.keys(snapshot.val().levels.basic)[i]].score, "500 16px Roboto", "rgba(0,0,0,0.54)");
                    basicLevelScore[i].lineWidth = width;
                    basicLevelScore[i].lineHeight = 22;
                    basicLevelScore[i].x = poe + s[i].x + width/2;
                    basicLevelScore[i].y = 250;
                    basicLevelScore[i].textAlign = "center";

                    basicLevelTime[i] = new createjs.Text(snapshot.val().levels.basic[Object.keys(snapshot.val().levels.basic)[i]].timeLabel, "500 16px Roboto", "rgba(0,0,0,0.54)");
                    basicLevelTime[i].lineWidth = width;
                    basicLevelTime[i].lineHeight = 22;
                    basicLevelTime[i].x = poe + s[i].x + width/2;
                    basicLevelTime[i].y = 280;
                    basicLevelTime[i].textAlign = "center";
                }
            }
            else { s[i].graphics.setStrokeStyle(6).beginStroke("rgba(0,0,0,0.12)").beginFill("white").drawRect(s[i].entryX, s[i].entryY, width, height).endFill(); }

            // Add labels to tiles
            basicTileTitle[i] = new createjs.Text(levelText[i].shortTitle, "700 18px Roboto", "rgba(0,0,0,0.87)");
            basicTileTitle[i].lineWidth = width;
            basicTileTitle[i].lineHeight = 22;
            basicTileTitle[i].x = poe + s[i].x + width/2;
            basicTileTitle[i].y = 210;
            basicTileTitle[i].textAlign = "center";

            s[i].on("mouseover", function() {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_over");
                }

                createjs.Ticker.addEventListener("tick", mouseTick);

                this.hoverFill = new createjs.Shape().set({
                    x: this.x + this.entryX,
                    y: this.y + this.entryY,
                    scaleX: 0,
                    scaleY: 0,
                    regX: this.regX,
                    regY: this.regY
                });

                this.hoverFill.graphics
                    .beginFill(this.overColor)
                    .drawRect(poe, this.entryY, width, height);

                overviewBasicGroupContainer.addChild(this.hoverFill);

                createjs.Tween.get(this.hoverFill)
                    .to({
                        scaleX:1,
                        scaleY:1,
                        x: this.x + this.regX,
                        y: this.y
                    }, interval.normal, createjs.Ease.quadInOut)
                    .call(loadLevel, [0, this.i]);

                changeCursor(true);
            });

            s[i].on("mouseout", function() {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_out");
                }

                createjs.Ticker.removeEventListener("tick", mouseTick);
                createjs.Tween.removeTweens(this.hoverFill);
                overviewBasicGroupContainer.removeChild(this.hoverFill);

                changeCursor(false);
            });
            /*            } else {

             s[i].graphics.beginFill(s[i].outColor).drawRect(s[i].entryX, s[i].entryY, width, height).endFill();

             // Add a lock
             lock[i] = new createjs.Bitmap("assets/ic_lock.png");
             lock[i].x = s[i].entryX + s[i].x - 58;
             lock[i].y = s[i].entryY + s[i].y - 58;

             overviewBasicGroupContainer.addChild(lock[i]);
             }*/

            overviewBasicGroupContainer.addChild(s[i]);

            overviewBasicGroupContainer.addChild(basicTileTitle[i]);

            if (basicLevelScore[i]) {overviewBasicGroupContainer.addChild(basicLevelScore[i], basicLevelTime[i]);}
            if (basicLevelTrophy[i]) {overviewBasicGroupContainer.addChild(basicLevelTrophy[i]);}

        }

        // INTERMEDIATE

        var intLabel = new createjs.Text(genericText.intermediate, "700 24px Roboto", "rgba(0,0,0,0.23)");
        intLabel.x = poe;
        intLabel.y = 420;

        trophyAvailable = [];
        levelCompleted = 0;

        // Calculate level unlock for INT
        i = 0;
        if (levelAvailable[2]) {
            levelAvailable = [];
            levelAvailable[0] = true;
        } else {
            levelAvailable = [];
            levelAvailable[0] = false;
        }

        trophyCount = 0;

        if (snapshot.val()) {
            for (i=0; i<3; i++) {

                if (!snapshot.val().levels) {
                    break;
                }

                if (snapshot.val().levels.int) {

                    if (snapshot.val().levels.int[Object.keys(snapshot.val().levels.int)[i]]) {
                        levelCompleted++;
                        levelAvailable[i+1] = true;
                        trophyAvailable[i] = snapshot.val().levels.int[Object.keys(snapshot.val().levels.int)[i]].trophyGained;

                        if (trophyAvailable[i]) {trophyCount++;}

                    } else {
                        levelAvailable[i+1] = false;
                    }
                }
            }
        }

        lock = [];
        var overviewIntGroupContainer = new createjs.Container();

        var intTileTitle = [];
        var intLevelScore = [];
        var intLevelTime = [];
        var intLevelTrophy = [];

        var intCompletedLabel = new createjs.Text(levelCompleted +"/3 " + genericText.completed, "700 24px Roboto", "rgba(0,0,0,0.23)");
        intCompletedLabel.x = window.innerWidth - poe;
        intCompletedLabel.y = 420;
        intCompletedLabel.textAlign = "right";

        var intTrophiesLabel = new createjs.Text(trophyCount +"/3 " + genericText.trophies, "500 20px Roboto", "rgba(0,0,0,0.23)");
        intTrophiesLabel.x = window.innerWidth - poe;
        intTrophiesLabel.y = 450;
        intTrophiesLabel.textAlign = "right";

        for(i=0; i<3; i++) {

            s[i] = new createjs.Shape().set({
                overColor: "rgba(0,0,0,0.23)",
                outColor: "rgba(0,0,0,0.12)",
                regX: width/2,
                regY: height/2,
                x: (width + padding) * (i%cols),
                y: (height + padding) * (i/cols|0),
                entryX: poe + (width/2), // Make the entry point, the center of the tile
                entryY: 460 + (height/2),
                i: i
            });


            // Discard hover if previous level is not completed.
            /*if (levelAvailable[i]) {*/

            if (!gameTypeStripped) {

                if (trophyAvailable[i]) {
                    s[i].graphics.setStrokeStyle(6).beginStroke(color.yellow).beginFill("white").drawRect(s[i].entryX, s[i].entryY, width, height).endFill();
                    intLevelTrophy[i] = new createjs.Bitmap("assets/trophies/int-level"+ (i+1) +"-on.png");
                } else {
                    s[i].graphics.setStrokeStyle(6).beginStroke("rgba(0,0,0,0.12)").beginFill("white").drawRect(s[i].entryX, s[i].entryY, width, height).endFill();
                    intLevelTrophy[i] = new createjs.Bitmap("assets/trophies/int-level"+ (i+1) +"-off.png");
                }

                intLevelTrophy[i].x = poe + s[i].x + width/2 - 14;
                intLevelTrophy[i].y = 590;

                if (levelAvailable[i+1]) {
                    intLevelScore[i] = new createjs.Text(genericText.score + ": " + snapshot.val().levels.int[Object.keys(snapshot.val().levels.int)[i]].score, "500 16px Roboto", "rgba(0,0,0,0.54)");
                    intLevelScore[i].lineWidth = width;
                    intLevelScore[i].lineHeight = 22;
                    intLevelScore[i].x = poe + s[i].x + width/2;
                    intLevelScore[i].y = 530;
                    intLevelScore[i].textAlign = "center";

                    intLevelTime[i] = new createjs.Text(snapshot.val().levels.int[Object.keys(snapshot.val().levels.int)[i]].timeLabel, "500 16px Roboto", "rgba(0,0,0,0.54)");
                    intLevelTime[i].lineWidth = width;
                    intLevelTime[i].lineHeight = 22;
                    intLevelTime[i].x = poe + s[i].x + width/2;
                    intLevelTime[i].y = 560;
                    intLevelTime[i].textAlign = "center";
                }

            } else { s[i].graphics.setStrokeStyle(6).beginStroke("rgba(0,0,0,0.12)").beginFill("white").drawRect(s[i].entryX, s[i].entryY, width, height).endFill(); }

            // Add labels to tiles
            intTileTitle[i] = new createjs.Text(levelText[i+2].shortTitle, "700 18px Roboto", "rgba(0,0,0,0.87)");
            intTileTitle[i].lineWidth = width;
            intTileTitle[i].lineHeight = 22;
            intTileTitle[i].x = poe + s[i].x + width/2;
            intTileTitle[i].y = 490;
            intTileTitle[i].textAlign = "center";


            s[i].on("mouseover", function () {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_over");
                }

                createjs.Ticker.addEventListener("tick", mouseTick);

                this.hoverFill = new createjs.Shape().set({
                    x: this.x + this.entryX,
                    y: this.y + this.entryY,
                    scaleX: 0,
                    scaleY: 0,
                    regX: this.regX,
                    regY: this.regY
                });

                this.hoverFill.graphics
                    .beginFill(this.overColor)
                    .drawRect(poe, this.entryY, width, height);

                overviewIntGroupContainer.addChild(this.hoverFill);

                createjs.Tween.get(this.hoverFill)
                    .to({
                        scaleX:1,
                        scaleY:1,
                        x: this.x + this.regX,
                        y: this.y
                    }, interval.normal, createjs.Ease.quadInOut)
                    .call(loadLevel, [1, this.i]);

                changeCursor(true);
            });

            s[i].on("mouseout", function () {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_out");
                }

                createjs.Ticker.removeEventListener("tick", mouseTick);
                overviewIntGroupContainer.removeChild(this.hoverFill);
                createjs.Tween.removeTweens(this.hoverFill);

                changeCursor(false);

            });

            /*  } else {

             s[i].graphics.beginFill(s[i].outColor).drawRect(s[i].entryX, s[i].entryY, width, height).endFill();

             // Add a lock
             lock[i] = new createjs.Bitmap("assets/ic_lock.png");
             lock[i].x = s[i].entryX + s[i].x - 58;
             lock[i].y = s[i].entryY + s[i].y - 58;

             overviewIntGroupContainer.addChild(lock[i]);

             }*/
            overviewIntGroupContainer.addChild(s[i]);

            overviewIntGroupContainer.addChild(intTileTitle[i]);
            if (intLevelScore[i]) {overviewIntGroupContainer.addChild(intLevelScore[i], intLevelTime[i]);}
            if (intLevelTrophy[i]) {overviewIntGroupContainer.addChild(intLevelTrophy[i]);}
        }

        // ADVANCED

        var advLabel = new createjs.Text(genericText.advanced, "700 24px Roboto", "rgba(0,0,0,0.23)");
        advLabel.x = poe;
        advLabel.y = 700;

        trophyAvailable = [];
        levelCompleted = 0;

        // Calculate level unlock for INT
        i = 0;
        if (levelAvailable[3]) {
            levelAvailable = [];
            levelAvailable[0] = true;
        } else {
            levelAvailable = [];
            levelAvailable[0] = false;
        }

        trophyCount = 0;

        if (snapshot.val()) {


            for (i=0; i<4; i++) {

                if (!snapshot.val().levels) {
                    break;
                }
                if (snapshot.val().levels.adv) {

                    if (snapshot.val().levels.adv[Object.keys(snapshot.val().levels.adv)[i]]) {
                        levelCompleted++;
                        levelAvailable[i+1] = true;
                        trophyAvailable[i] = snapshot.val().levels.adv[Object.keys(snapshot.val().levels.adv)[i]].trophyGained;

                        if (trophyAvailable[i]) {trophyCount++;}

                    } else {
                        levelAvailable[i+1] = false;
                    }
                }
            }
        }


        lock = [];
        var overviewAdvGroupContainer = new createjs.Container();

        var advTileTitle = [];
        var advLevelScore = [];
        var advLevelTime = [];
        var advLevelTrophy = [];

        var advCompletedLabel = new createjs.Text(levelCompleted +"/4 " + genericText.completed, "700 24px Roboto", "rgba(0,0,0,0.23)");
        advCompletedLabel.x = window.innerWidth - poe;
        advCompletedLabel.y = 700;
        advCompletedLabel.textAlign = "right";

        var advTrophiesLabel = new createjs.Text(trophyCount +"/4 " + genericText.trophies, "500 20px Roboto", "rgba(0,0,0,0.23)");
        advTrophiesLabel.x = window.innerWidth - poe;
        advTrophiesLabel.y = 730;
        advTrophiesLabel.textAlign = "right";

        for(i=0; i<4; i++) {

            s[i] = new createjs.Shape().set({
                overColor: "rgba(0,0,0,0.23)",
                outColor: "rgba(0,0,0,0.12)",
                regX: width/2,
                regY: height/2,
                x: (width + padding) * (i%cols),
                y: (height + padding) * (i/cols|0),
                entryX: poe + (width/2), // Make the entry point, the center of the tile
                entryY: 760 + (height/2),
                i: i
            });

            // Discard hover if previous level is not completed.
            /*if (levelAvailable[i]) {*/

            if (!gameTypeStripped) {

                if (trophyAvailable[i]) {
                    s[i].graphics.setStrokeStyle(6).beginStroke(color.yellow).beginFill("white").drawRect(s[i].entryX, s[i].entryY, width, height).endFill();
                    advLevelTrophy[i] = new createjs.Bitmap("assets/trophies/adv-level"+ (i+1) +"-on.png");
                } else {
                    s[i].graphics.setStrokeStyle(6).beginStroke("rgba(0,0,0,0.12)").beginFill("white").drawRect(s[i].entryX, s[i].entryY, width, height).endFill();
                    advLevelTrophy[i] = new createjs.Bitmap("assets/trophies/adv-level"+ (i+1) +"-off.png");
                }

                if (levelAvailable[i+1]) {
                    advLevelScore[i] = new createjs.Text(genericText.score + ": " + snapshot.val().levels.adv[Object.keys(snapshot.val().levels.adv)[i]].score, "500 16px Roboto", "rgba(0,0,0,0.54)");
                    advLevelScore[i].lineWidth = width;
                    advLevelScore[i].lineHeight = 22;
                    advLevelScore[i].x = poe + s[i].x + width/2;
                    advLevelScore[i].y = 830;
                    advLevelScore[i].textAlign = "center";

                    advLevelTime[i] = new createjs.Text(snapshot.val().levels.adv[Object.keys(snapshot.val().levels.adv)[i]].timeLabel, "500 16px Roboto", "rgba(0,0,0,0.54)");
                    advLevelTime[i].lineWidth = width;
                    advLevelTime[i].lineHeight = 22;
                    advLevelTime[i].x = poe + s[i].x + width/2;
                    advLevelTime[i].y = 860;
                    advLevelTime[i].textAlign = "center";
                }

                advLevelTrophy[i].x = poe + s[i].x + width/2 - 14;
                advLevelTrophy[i].y = 890;

            } else { s[i].graphics.setStrokeStyle(6).beginStroke("rgba(0,0,0,0.12)").beginFill("white").drawRect(s[i].entryX, s[i].entryY, width, height).endFill(); }


            // Add labels to tiles
            advTileTitle[i] = new createjs.Text(levelText[i+5].shortTitle, "700 18px Roboto", "rgba(0,0,0,0.87)");
            advTileTitle[i].lineWidth = width;
            advTileTitle[i].lineHeight = 22;
            advTileTitle[i].x = poe + s[i].x + width/2;
            advTileTitle[i].y = 790;
            advTileTitle[i].textAlign = "center";



            s[i].on("mouseover", function () {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_over");
                }

                createjs.Ticker.addEventListener("tick", mouseTick);

                this.hoverFill = new createjs.Shape().set({
                    x: this.x + this.entryX,
                    y: this.y + this.entryY,
                    scaleX: 0,
                    scaleY: 0,
                    regX: this.regX,
                    regY: this.regY
                });

                this.hoverFill.graphics
                    .beginFill(this.overColor)
                    .drawRect(poe, this.entryY, width, height);

                overviewAdvGroupContainer.addChild(this.hoverFill);

                createjs.Tween.get(this.hoverFill)
                    .to({
                        scaleX:1,
                        scaleY:1,
                        x: this.x + this.regX,
                        y: this.y
                    }, interval.normal, createjs.Ease.quadInOut)
                    .call(loadLevel, [2, this.i]);

                changeCursor(true);
            });

            s[i].on("mouseout", function () {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_out");
                }

                createjs.Ticker.removeEventListener("tick", mouseTick);
                overviewAdvGroupContainer.removeChild(this.hoverFill);
                createjs.Tween.removeTweens(this.hoverFill);

                changeCursor(false);
            });

            /*} else {

             s[i].graphics.beginFill(s[i].outColor).drawRect(s[i].entryX, s[i].entryY, width, height).endFill();

             // Add a lock
             lock[i] = new createjs.Bitmap("assets/ic_lock.png");
             lock[i].x = s[i].entryX + s[i].x - 58;
             lock[i].y = s[i].entryY + s[i].y - 58;

             overviewAdvGroupContainer.addChild(lock[i]);

             }*/

            overviewAdvGroupContainer.addChild(s[i]);

            overviewAdvGroupContainer.addChild(advTileTitle[i]);
            if (advLevelScore[i]) {overviewAdvGroupContainer.addChild(advLevelScore[i], advLevelTime[i]);}
            if (advLevelTrophy[i]) {overviewAdvGroupContainer.addChild(advLevelTrophy[i]);}
        }

        if (!advLevelsEnabled) {
            advCompletedLabel.text = "";
            advLabel.text = "";
            advTrophiesLabel.text = "";
        }


        if (!gameTypeStripped) {
            overviewContainer.addChild(title, subtitle, basicLabel, basicCompletedLabel, basicTrophiesLabel, intLabel, intCompletedLabel, intTrophiesLabel, advLabel, advCompletedLabel, advTrophiesLabel);
        }
        else {
            overviewContainer.addChild(title, subtitle, basicLabel, basicCompletedLabel, intLabel, intCompletedLabel, advLabel, advCompletedLabel);
        }

        if (advLevelsEnabled) {
            stage.addChild(overviewContainer, overviewBasicGroupContainer, overviewIntGroupContainer, overviewAdvGroupContainer);
        } else {
            stage.addChild(overviewContainer, overviewBasicGroupContainer, overviewIntGroupContainer);
        }

        // Set height manually in every stage (except splash)
        canvas.width = canvas.width - 10;
        canvas.height = 1100;

        // Send LSL Message
        if (window.loggingMediator) {
            SendLSLMessage("page_load__overview");
        }

    });
}