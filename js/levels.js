function loadLevel(group, level) {

    /*if ( group > 1 && !window.loggingMediator) {
     alert('The advanced levels support only the GTW browser');
     return;
     }*/

    stage.removeAllChildren();
    stage.removeAllEventListeners("mouseover");
    stage.removeAllEventListeners("mouseout");

    stage.addChild(firebaseUsernameHUD);
    addMousePointer();

    var levelStructure;
    var levelIntro;

    var textPointer = 0;
    // Add tutorials
    var tutorialContainer = null;

    switch(group) {
        case 0:
            // No need to add tutorials, for the basic levels. There is no interface involved!
            if (level === 1) { textPointer = 1; }

            canvas.height = window.innerHeight - 20;
            break;
        case 1:

            canvas.height = window.innerHeight - 20;

            if (level === 0) {
                textPointer = 2;
                tutorialContainer = addTutorials(textPointer);
                canvas.height = 1400;
            }
            else if (level === 1) {
                textPointer = 3;
                tutorialContainer = addTutorials(textPointer);
            }
            else if (level === 2) {
                textPointer = 4;
                tutorialContainer = addTutorials(textPointer);
            }

            break;
        case 2:

            if (level === 0) { textPointer = 5; }
            else if (level === 1) { textPointer = 6; }
            else if (level === 2) { textPointer = 7; }
            else if (level === 3) { textPointer = 8; }

            canvas.height = window.innerHeight - 20;
            break;
    }

    levelStructure = loadLvlStructure(levelText[textPointer].fullTitle, levelText[textPointer].shortTitle, levelText[textPointer].description);
    levelIntro = loadLvlIntroStory(levelText[textPointer].story);

    var speechBubble = levelIntro.getChildAt(0);

    var btnSize = [], btnPos = [];
    btnSize.x = speechBubble.drawWidth - 200;
    btnPos.x = speechBubble.x + 100;
    btnSize.y = 140;
    btnPos.y = speechBubble.y + speechBubble.drawHeight;

    var nextButton = [];
    nextButton.shape = new createjs.Shape();
    nextButton.shape.graphics.beginFill(color.green).drawRect(10, 0, btnSize.x -20, btnSize.y);
    nextButton.shape.x = btnPos.x;
    nextButton.shape.y = btnPos.y;
    nextButton.shape.outColor = color.green;
    nextButton.shape.overColor = '';
    nextButton.label = new createjs.Text(genericText.start, "500 48px Roboto", color.whitePimary);
    nextButton.label = centerElement(btnSize, btnPos, nextButton.label);

    var timeout;
    nextButton.shape.addEventListener("mouseover", function() {
        changeCursor(true);
        createjs.Ticker.addEventListener("tick", mouseTick);
        timeout = setTimeout( startLevel, interval.normal);
    });
    nextButton.shape.addEventListener("mouseout", function() {
        changeCursor(false);
        createjs.Ticker.removeEventListener("tick", mouseTick);
        window.clearTimeout(timeout);

    });

    stage.addChild(nextButton.shape, nextButton.label);

    if (tutorialContainer) {
        stage.addChild(tutorialContainer);

    }


    function startLevel() {

        // Remove previous containers
        stage.removeChild(introStoryContainer);
        stage.removeChild(nextButton.shape);
        stage.removeChild(nextButton.label);

        // Remove tutorial layers if any
        if (tutorialContainer) {
            stage.removeChild(tutorialContainer);
        }


        // Set height manually in every stage (except splash)
        canvas.width = window.innerWidth - 20;
        canvas.height = window.innerHeight - 20;

        var startingLabel = new createjs.Text(genericText.startingIn, "700 20px Roboto", color.gray);
        startingLabel = alignTextToStageCenter(stage, startingLabel);
        startingLabel.y = 220 + 80;
        stage.addChild(startingLabel);

        var startingTimer = new createjs.Text("5", "700 24px Roboto", color.darkGray);
        startingTimer = alignTextToStageCenter(stage, startingTimer);
        startingTimer.y = 220 + 110;
        stage.addChild(startingTimer);

        var i = 0;

        var timerInterval = setInterval(refreshIntroTimer, 1000);

        function refreshIntroTimer() {

            i++;
            startingTimer.text = 5 - i;

            if (i > 5) {
                clearInterval(timerInterval);

                stage.removeChild(startingTimer);
                stage.removeChild(startingLabel);

                var title = levelStructure.getChildAt(5);
                var line = levelStructure.getChildAt(6);
                var desc = levelStructure.getChildAt(7);
                levelStructure.removeChild(title);
                levelStructure.removeChild(line);
                levelStructure.removeChild(desc);

                InitiateLevel(group, level, levelStructure);
            }
        }
    }


}

function InitiateLevel(group, level, levelStructure) {

    // Start timer to track level completion
    var levelTimerInterval = setInterval(startLevelTimer, 1);

    var timer = levelStructure.getChildAt(4);

    var stopwatch = new Stopwatch();
    stopwatch.start();

    var progressBarInterval;
    var progressBar = [];

    function startLevelTimer() {
        timer.text = stopwatch.update();
    }

    var results;

    switch(group) {
        case 0:
            if (level === 0) {
                results = loadLevel1();
            } else if (level === 1) {
                loadLevel2();
            }

            break;
        case 1:
            if (level === 0) {
                results = loadLevel3();
            } else if (level === 1) {
                results = loadLevel4();
            } else {
                results = loadLevel5();
            }

            break;
        case 2:
            if (level === 0) {
                results = loadLevel6();
            } else if (level === 1) {
                results = loadLevel7();
            } else if (level === 2) {
                results = loadLevel8();
            } else {
                results = loadLevel9();
            }
            break;
    }

    function loadLevel1() {

        var idx = 0;

        // create metrics
        var metrics = [];
        metrics.countOn = 0;
        metrics.countOff = 0;
        metrics.points = 5;

        var marker = [];
        var markerTimeout;
        addMarker(idx);

        function addMarker(idx) {

            marker[idx] = new createjs.Bitmap("assets/marker.png");
            marker[idx].x = getRandomInt(idx, 100, stage.canvas.width - 100);
            marker[idx].y = getRandomInt(idx, 100, stage.canvas.height - 100);
            stage.addChild(marker[idx]);

            marker[idx].on("mouseover", function() {
                changeCursor(true);
                metrics.countOn++;
                createjs.Ticker.addEventListener("tick", mouseTick);
                markerTimeout = setTimeout( loadNewMarker, interval.markerHover);

                progressBarInterval = setInterval(refreshProgressBar, 10);
                progressBar.foreground = new createjs.Shape();
                progressBar.background = new createjs.Shape();
                progressBar.foreground.graphics.beginFill(color.green).drawRect(0, 0, 1, 8).endFill();
                progressBar.background.graphics.beginFill(color.gray).drawRect(0, 0, 100, 8).endFill();
                progressBar.foreground.x = mousePointer.x - 50;
                progressBar.foreground.y = mousePointer.y + 60;
                progressBar.background.x = mousePointer.x - 50;
                progressBar.background.y = mousePointer.y + 60;

                stage.addChild(progressBar.foreground, progressBar.background);

                function refreshProgressBar() {
                    if (progressBar) {
                        progressBar.foreground.scaleX = progressBar.foreground.scaleX + 0.33;
                        progressBar.foreground.x = mousePointer.x - 50;
                        progressBar.foreground.y = mousePointer.y + 60;
                        progressBar.background.x = mousePointer.x - 50;
                        progressBar.background.y = mousePointer.y + 60;
                    }
                }
            });

            marker[idx].on("mouseout", function() {
                changeCursor(false);
                metrics.countOff++;
                createjs.Ticker.removeEventListener("tick", mouseTick);
                window.clearTimeout(markerTimeout);

                progressBar.foreground.scaleX = 0;
                stage.removeChild(progressBar.foreground, progressBar.background);
                clearInterval(progressBarInterval);
            });

        }

        function loadNewMarker() {

            changeCursor(false);
            createjs.Ticker.removeEventListener("tick", mouseTick);
            window.clearTimeout(markerTimeout);

            progressBar.foreground.scaleX = 0;
            stage.removeChild(progressBar.foreground, progressBar.background);
            clearInterval(progressBarInterval);

            stage.removeChild(marker[idx]);

            idx++;

            if (idx > metrics.points-1) {

                results =  [marker, metrics];
                endLevel();

            } else {

                addMarker(idx);
            }
        }

    }


    function loadLevel2() {

        var i, j;
        var width = 80;
        var height = 80;
        var cols = 3;
        var rows = 2;

        var metrics = [];
        metrics.countOn = 0;
        metrics.countOff = 0;
        metrics.hit = 0;
        metrics.miss = 0;
        metrics.moles = 12;

        var col = [];
        col.x = 60;
        col.width = (window.innerWidth - 90)/cols;
        var poe = 2 * (window.innerWidth - (col.width * 3));

        var marker;
        var markersContainer = new createjs.Container();

        // Set markers on the stage
        for(i=0; i < cols; i++) {
            for (j=0; j < rows; j++) {

                marker = new createjs.Bitmap("assets/marker_disabled.png");
                marker.x = poe + col.x + (col.width * i) - 48;
                marker.y = (window.innerHeight/2 - height/2) - 150 + (300 * j);
                marker.regX = width/2;
                marker.regY = height/2;
                markersContainer.addChild(marker);
            }
        }

        stage.addChild(markersContainer);

        var currentMarker = [];
        var idx = 0;
        for (i=0; i < metrics.moles; i++) {
            // Pick one at random

            idx = getRandomInt(idx, 0,5);

            currentMarker[i] = markersContainer.getChildAt(idx);
            createjs.Tween.get(currentMarker[i])
                .wait(interval.markerDuration * i)
                .call(activateMole, [currentMarker[i], i]);
        }

        function activateMole(elem, i) {

            elem.image.src = "assets/marker.png";
            elem.on("mouseover", function() {

                changeCursor(true);
                metrics.countOn++;
                createjs.Ticker.addEventListener("tick", mouseTick);

                elem.markerTimeout = setTimeout( hit, interval.markerFocus);

                elem.progressBar = [];
                elem.progressBarInterval = setInterval(refreshProgressBar, 10);
                elem.progressBar.foreground = new createjs.Shape();
                elem.progressBar.background = new createjs.Shape();
                elem.progressBar.foreground.graphics.beginFill(color.green).drawRect(0, 0, 1, 8).endFill();
                elem.progressBar.background.graphics.beginFill(color.gray).drawRect(0, 0, 100, 8).endFill();
                elem.progressBar.foreground.x = mousePointer.x - 50;
                elem.progressBar.foreground.y = mousePointer.y + 60;
                elem.progressBar.background.x = mousePointer.x - 50;
                elem.progressBar.background.y = mousePointer.y + 60;

                elem.progressBar.text = new createjs.Text(genericText.hit, "700 32px Roboto", color.green);
                stage.addChild(elem.progressBar.text);
                elem.progressBar.text.visible = false;

                stage.addChild(elem.progressBar.foreground, elem.progressBar.background);

                function refreshProgressBar() {
                    if (elem.progressBar) {
                        elem.progressBar.foreground.x = mousePointer.x - 50;
                        elem.progressBar.foreground.y = mousePointer.y + 60;
                        elem.progressBar.background.x = mousePointer.x - 50;
                        elem.progressBar.background.y = mousePointer.y + 60;

                        if (elem.progressBar.foreground.scaleX < 101) {
                            elem.progressBar.text.visible = false;
                            elem.progressBar.foreground.scaleX = elem.progressBar.foreground.scaleX + 0.5;
                        } else {

                            elem.progressBar.text.x = mousePointer.x - 25;
                            elem.progressBar.text.y = mousePointer.y + 80;
                            elem.progressBar.text.visible = true;

                        }
                    }
                }
            });

            elem.on("mouseout", function() {
                changeCursor(false);
                metrics.countOff++;
                createjs.Ticker.removeEventListener("tick", mouseTick);
                window.clearTimeout(elem.markerTimeout);

                stage.removeChild(elem.progressBar.foreground, elem.progressBar.background, elem.progressBar.text);
                clearInterval(elem.progressBarInterval);
            });

            createjs.Tween.get(elem, i)
                .wait(interval.markerDuration)
                .call(disableMole, [elem, i]);

        }

        function disableMole(elem, i) {
            window.clearTimeout(elem.markerTimeout);

            elem.image.src = "assets/marker_disabled.png";
            createjs.Ticker.removeEventListener("tick", mouseTick);

            if (elem.progressBar) {
                stage.removeChild(elem.progressBar.foreground, elem.progressBar.background, elem.progressBar.text);
            }
            clearInterval(elem.progressBarInterval);

            elem.removeAllEventListeners();
            changeCursor(false);

            // When all moles have popped, end the level
            if (metrics.moles === (i+1)) {
                results = [markersContainer, metrics];
                endLevel();
            }

        }
        function hit() {
            metrics.hit++;
        }
    }

    function loadLevel3() {

        // Set height manually in every stage (except splash)
        canvas.height = 2000;

        var levelContainer = new createjs.Container();
        var towerContainer =  new createjs.Container();

        var metrics = [];
        metrics.countOn = 0;
        metrics.countOff = 0;
        metrics.hit = 0;
        metrics.clicks = 0;

        var backgroundColor = new createjs.Shape();
        backgroundColor.graphics.beginFill(color.brown).drawRect(0, 0, stage.canvas.width, canvas.height);

        var villageTextA = new createjs.Text(genericText.lvl3ScrollDownA, "700 24px Roboto", color.whitePimary);
        villageTextA.x = 300;
        villageTextA.y = 130;
        villageTextA.textAlign = "center";

        var villageTextB = new createjs.Text(genericText.lvl3ScrollDownB, "700 24px Roboto", color.whitePimary);
        villageTextB.x = 300;
        villageTextB.y = 160;
        villageTextB.textAlign = "center";

        var village = new createjs.Bitmap("assets/int/village.png");
        village.x = 80;
        village.y = 130;

        var villageTitle = new createjs.Text(genericText.lvl3Village, "700 32px Roboto", color.whitePimary);
        villageTitle.x = 300;
        villageTitle.y = 430;
        villageTitle.textAlign = "center";

        var tower = new createjs.Bitmap("assets/int/tower.png");
        tower.x = stage.canvas.width - 480;
        tower.y = 800;

        var towerTitle = new createjs.Text(genericText.lvl3Tower, "700 32px Roboto", color.whitePimary);
        towerTitle.x = stage.canvas.width - 300;
        towerTitle.y = 1160;
        towerTitle.textAlign = "center";

        var towerSelect = new createjs.Text(genericText.lvl3Select + " ", "700 24px Roboto", color.whitePimary);
        towerSelect.x = stage.canvas.width - 340;
        towerSelect.y = 1210;
        towerSelect.textAlign = "center";

        var towerSelectIcon = new createjs.Bitmap("assets/ic_hand.png");
        towerSelectIcon.x = stage.canvas.width - 250;
        towerSelectIcon.y = 1210;

        var cave = new createjs.Bitmap("assets/int/cave.png");
        cave.x = 80;
        cave.y = stage.canvas.height - 400;

        var caveTitle = new createjs.Text(genericText.lvl3Cave, "700 32px Roboto", color.whitePimary);
        caveTitle.x = 340;
        caveTitle.y = stage.canvas.height - 100;
        caveTitle.textAlign = "center";

        var caveSelect = new createjs.Text(genericText.lvl3Select + " ", "700 24px Roboto", color.whitePimary);
        caveSelect.x = 300;
        caveSelect.y = stage.canvas.height - 70;
        caveSelect.textAlign = "center";

        var caveSelectIcon = new createjs.Bitmap("assets/ic_hand.png");
        caveSelectIcon.x = 400;
        caveSelectIcon.y = stage.canvas.height - 80;

        var river = new createjs.Bitmap("assets/int/river.png");
        river.x = (stage.canvas.width/2) + 50;
        river.y = 0;

        var forest = new createjs.Bitmap("assets/int/forest.png");
        forest.x = (stage.canvas.width) - 400;
        forest.y = 300;

        var bush1 = new createjs.Bitmap("assets/int/bush1.png");
        bush1.x = 150;
        bush1.y = 900;
        var bush2 = new createjs.Bitmap("assets/int/bush2.png");
        bush2.x = 200;
        bush2.y = 1200;
        var bush3 = new createjs.Bitmap("assets/int/bush2.png");
        bush3.x = stage.canvas.width - 300;
        bush3.y = 1500;
        var bush4 = new createjs.Bitmap("assets/int/bush3.png");
        bush4.x = (stage.canvas.width) - 400;
        bush4.y = stage.canvas.height - 200;


        tower.on("mousedown", function() {
            // Create browser state so as to use the back button!
            history.pushState(null, null, 'tower');
            stage.removeChild(levelContainer);

            resizeCanvas();

            var towerFloor = new createjs.Shape();
            towerFloor.graphics.beginFill(color.brown).drawRect(0, 0, stage.canvas.width, parseInt(2*(canvas.height/3),10));
            var towerWall = new createjs.Shape();
            towerWall.graphics.beginFill("#3E2723").drawRect(0, parseInt(2*(canvas.height/3),10), stage.canvas.width, canvas.height);

            var fireplace = new createjs.Bitmap("assets/int/fireplace.png");
            fireplace.x = stage.canvas.width - 500;
            fireplace.y = parseInt((canvas.height/3),10) - 239;

            var frame = new createjs.Bitmap("assets/int/frame.png");
            frame.x = 200;
            frame.y = 50;

            var table = new createjs.Bitmap("assets/int/table.png");
            table.x = 250;
            table.y = canvas.height - 350;

            var brb = new createjs.Text(genericText.lvl3BRB, "500 20px Roboto", color.whitePimary);
            brb.x = fireplace.x + 190;
            brb.y = fireplace.y + 210;
            brb.textAlign = "center";
            brb.rotation = -8;

            towerContainer.addChild(towerFloor, towerWall, fireplace, frame, table, brb);

            stage.addChild(towerContainer);

        });

        // Listener for the back button, to get user out of tower!
        window.onpopstate = function(event) {

            canvas.height = 2000;

            stage.removeChild(towerContainer);
            stage.addChild(levelContainer);
            stage.setChildIndex(levelContainer, 0);

            stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
        };


        cave.on("mousedown", function() {
            metrics.hit++;
            results = [levelContainer, metrics];
            endLevel();
        });

        levelContainer.addChild(backgroundColor, river, village, villageTextA, villageTextB, villageTitle, tower, towerTitle, towerSelect, towerSelectIcon, cave, caveTitle, caveSelect, caveSelectIcon,
            forest, bush1, bush2, bush3, bush4);
        stage.addChild(levelContainer);
        stage.setChildIndex(levelContainer, 0);

        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);

        document.addEventListener("mousedown", function(){
            metrics.clicks++;
        });

    }

    function loadLevel4() {

        var levelContainer = new createjs.Container();

        var textInput = document.getElementById('caveInputText');
        textInput.style.display = "none";

        var metrics = [];
        metrics.click = 0;
        metrics.submit = 0;
        metrics.pass = 0;
        metrics.fail = 0;

        var questions = 5;

        var backgroundColor = new createjs.Shape();
        backgroundColor.graphics.beginFill(color.darkBrown).drawRect(0, 0, stage.canvas.width, canvas.height);

        var caveFloor = new createjs.Bitmap("assets/int/cave-floor.png");
        caveFloor.x = (stage.canvas.width/2) - 550;
        caveFloor.y = stage.canvas.height - 300;

        var rocksL = new createjs.Bitmap("assets/int/stones-l.png");
        rocksL.x = (stage.canvas.width/2) - 500;
        rocksL.y = stage.canvas.height - 120;

        var rocksR = new createjs.Bitmap("assets/int/stones-r.png");
        rocksR.x = (stage.canvas.width/2) + 100;
        rocksR.y = stage.canvas.height - 120;

        var torchL = new createjs.Bitmap("assets/int/torch-l.png");
        torchL.x = -23;
        torchL.y = 110;

        var torchR = new createjs.Bitmap("assets/int/torch-r.png");
        torchR.x = stage.canvas.width - 98;
        torchR.y = 110;

        var fire = new createjs.Bitmap("assets/int/fire.png");
        fire.x = (stage.canvas.width/2) - 200;
        fire.y = stage.canvas.height - 350;

        var wizard = new createjs.Bitmap("assets/int/wizard.png");
        wizard.x = stage.canvas.width/2;
        wizard.y = stage.canvas.height - 500;

        var congratTextA = new createjs.Text(genericText.lvl4CongrTextA, "700 28px Roboto", color.whitePimary);
        congratTextA = alignTextToStageCenter(stage, congratTextA);
        congratTextA.y = 100;

        var congratTextB = new createjs.Text(genericText.lvl4CongrTextB, "700 28px Roboto", color.whitePimary);
        congratTextB = alignTextToStageCenter(stage, congratTextB);
        congratTextB.y = 140;


        var questionLabel = new createjs.Text(" ", "700 28px Roboto", color.whitePimary);
        questionLabel = alignTextToStageCenter(stage, questionLabel);
        questionLabel.y = 100;
        questionLabel.alpha = 0;

        var papyrus = new createjs.Bitmap("assets/int/papyrus.png");
        papyrus.x = (stage.canvas.width/2) - 364;
        papyrus.y = stage.canvas.height - 440;
        papyrus.alpha = 0;

        createjs.Tween.get(papyrus)
            .wait(5000)
            .to({alpha:1}, 1000)
            .call(launchTrivia);

        createjs.Tween.get(congratTextA)
            .wait(5000)
            .to({alpha: 0, visible:false}, 500)
            .call(function(){
                levelContainer.removeChild(congratTextA);
                createjs.Tween.get(questionLabel)
                    .to({alpha: 1}, 500)

            });

        createjs.Tween.get(congratTextB)
            .wait(5000)
            .to({alpha: 0, visible:false}, 500)
            .call(function(){
                levelContainer.removeChild(congratTextB);
            });

        function launchTrivia() {

            var pointer;
            var barContainer = new createjs.Container();

            var prevElem;

            var hint = new createjs.Text(genericText.lvl4ScrollDesc, "400 14px Roboto", color.darkBrown);
            hint = alignTextToStageCenter(stage, hint);
            hint.y = papyrus.y + 220;

            textInput.style.display = "block";
            textInput.style.position = "absolute";
            textInput.style.width = "150px";
            textInput.style.left = (stage.canvas.width/2) - 220 + "px";
            textInput.style.top = (stage.canvas.height - 175)  + "px";
            textInput.style.border = "5px solid white";
            textInput.style.padding = "15px";
            textInput.style.background = "rgba(255,255,255,0.5)";

            var inputDomElement = new createjs.DOMElement('caveInputText');
            inputDomElement.visible = true;


            var submitBtn = new createjs.Bitmap("assets/int/btn-go.png");
            submitBtn.x = stage.canvas.width/2;
            submitBtn.y = stage.canvas.height - 190;

            var submitLabel = new createjs.Text(genericText.clickMe, "700 24px Roboto", color.darkBrown);
            submitLabel.x = stage.canvas.width/2 + 70;
            submitLabel.y = stage.canvas.height - 170;

            var idx = 0;

            var question = new createjs.Text(" ", "700 28px Roboto", color.darkBrown);
            var answerA = new createjs.Text(" ", "400 10px Roboto", color.darkBrown);
            var answerB = new createjs.Text(" ", "400 10px Roboto", color.darkBrown);
            var answerC = new createjs.Text(" ", "400 10px Roboto", color.darkBrown);
            var answerD = new createjs.Text(" ", "400 10px Roboto", color.darkBrown);

            ask(idx);

            function ask(idx) {

                var barElement = new createjs.Shape();

                if (idx < 2) {
                    pointer = getRandomInt(idx, 0, 4);
                    barElement.graphics.beginFill(color.barGreen).drawRect(0, 0, 60, 12).endFill();

                    if (idx === 0) {

                        barElement.x = stage.canvas.width/2 - 304/2;
                    } else {
                        prevElem = barContainer.getChildAt(idx-1);
                        barElement.x = prevElem.x + 61;
                    }

                } else if (idx < 4) {
                    pointer = getRandomInt(idx, 5, 9);
                    barElement.graphics.beginFill(color.barYellow).drawRect(0, 0, 60, 12).endFill();
                    prevElem = barContainer.getChildAt(idx-1);
                    barElement.x = prevElem.x + 61;
                } else {
                    pointer = getRandomInt(idx, 10, 14);
                    barElement.graphics.beginFill(color.barRed).drawRect(0, 0, 60, 12).endFill();
                    prevElem = barContainer.getChildAt(idx-1);
                    barElement.x = prevElem.x + 61;
                }
                barElement.y = 160;

                barContainer.addChild(barElement);

                questionLabel.text = genericText.question + " " + (idx+1) + " / " + questions;
                questionLabel = alignTextToStageCenter(stage, questionLabel);
                questionLabel.y = 100;
                question.text = quizText[pointer].question;
                question = alignTextToStageCenter(stage, question);
                question.y = papyrus.y + 100;
                answerA.text = quizText[pointer].answer1;
                answerA.x = (stage.canvas.width/2) - 100;
                answerA.y = papyrus.y + 150;
                answerB.text = quizText[pointer].answer2;
                answerB.x = (stage.canvas.width/2) - 100;
                answerB.y = papyrus.y + 180;
                answerC.text = quizText[pointer].answer3;
                answerC.x = (stage.canvas.width/2) + 60;
                answerC.y = papyrus.y + 150;
                answerD.text = quizText[pointer].answer4;
                answerD.x = (stage.canvas.width/2) + 60;
                answerD.y = papyrus.y + 180;

                stage.addChild(barContainer);

            }
            submitBtn.addEventListener("mousedown", function (e) {

                // Check GAZETHEWEB INPUT TYPE
                metrics.submit++;

                console.log(pointer);

                if (textInput.value === quizText[pointer].correct) {

                    textInput.value = '';

                    metrics.pass++;
                    idx++;

                    if (idx === questions) {
                        textInput.style.display = "none";
                        results = [levelContainer, metrics];
                        endLevel();

                    } else {
                        ask(idx);
                    }

                } else {
                    metrics.fail++;
                }
            });

            levelContainer.addChild(question, answerA, answerB, answerC, answerD, hint, submitBtn, submitLabel);
        }


        levelContainer.addChild(backgroundColor, caveFloor, rocksL, rocksR, torchL, torchR, fire, wizard, congratTextA, congratTextB, papyrus, questionLabel);
        levelContainer.alpha = 0;

        stage.addChild(levelContainer);
        stage.setChildIndex(levelContainer, 0);

        createjs.Tween.get(levelContainer).to({alpha:1}, 1000);

        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    }

    function loadLevel5() {

        var levelContainer = new createjs.Container();

        var textInput1 = document.getElementById('caveInputText');
        textInput1.placeholder = genericText.latitude;
        textInput1.style.display = "none";

        var textInput2 = document.getElementById('caveInputText2');
        textInput1.placeholder = genericText.longitude;
        textInput2.style.display = "none";

        var textElement1 = document.getElementById('caveLatText');
        textElement1.style.display = "none";

        var textElement2 = document.getElementById('caveLngText');
        textElement2.style.display = "none";

        var metrics = [];
        metrics.copy = 0;
        metrics.paste = 0;
        metrics.click = 0;

        var backgroundColor = new createjs.Shape();
        backgroundColor.graphics.beginFill(color.darkBrown).drawRect(0, 0, stage.canvas.width, canvas.height);

        var caveFloor = new createjs.Bitmap("assets/int/cave-floor.png");
        caveFloor.x = (stage.canvas.width/2) - 550;
        caveFloor.y = stage.canvas.height - 300;

        var rocksL = new createjs.Bitmap("assets/int/stones-l.png");
        rocksL.x = (stage.canvas.width/2) - 500;
        rocksL.y = stage.canvas.height - 120;

        var rocksR = new createjs.Bitmap("assets/int/stones-r.png");
        rocksR.x = (stage.canvas.width/2) + 100;
        rocksR.y = stage.canvas.height - 120;

        var torchL = new createjs.Bitmap("assets/int/torch-l.png");
        torchL.x = -23;
        torchL.y = 110;

        var torchR = new createjs.Bitmap("assets/int/torch-r.png");
        torchR.x = stage.canvas.width - 98;
        torchR.y = 110;

        var fire = new createjs.Bitmap("assets/int/fire.png");
        fire.x = (stage.canvas.width/2) - 200;
        fire.y = stage.canvas.height - 350;

        var wizard = new createjs.Bitmap("assets/int/wizard.png");
        wizard.x = stage.canvas.width/2;
        wizard.y = stage.canvas.height - 500;

        var congratulatoryText = new createjs.Text(genericText.lvl5CongrText, "700 28px Roboto", color.whitePimary);
        congratulatoryText = alignTextToStageCenter(stage, congratulatoryText);
        congratulatoryText.y = 100;

        var scroll = new createjs.Bitmap("assets/int/scroll.png");
        scroll.x = 80;
        scroll.y = stage.canvas.height - 400;

        var scrollTitle = new createjs.Text(genericText.coordinates, "700 28px Roboto", color.darkBrown);
        scrollTitle.x = 310;
        scrollTitle.y = stage.canvas.height - 310;
        scrollTitle.textAlign = "center";

        var scrollDesc = new createjs.Text(genericText.lvl5ScrollDesc + " ", "500 20px Roboto", color.brown);
        scrollDesc.x = 280;
        scrollDesc.y = stage.canvas.height - 270;
        scrollDesc.textAlign = "center";

        var cpIcon = new createjs.Bitmap("assets/ic_cp.png");
        cpIcon.x = 330;
        cpIcon.y = scrollDesc.y;

        textElement1.style.position = "absolute";
        textElement1.style.left ="250px";
        textElement1.style.top = stage.canvas.height - 230  + "px";
        textElement1.style.fontSize = "20px";
        textElement1.style.fontStyle = "Italic";
        textElement1.style.fontWeight = "500";
        textElement1.style.lineHeight = "30px";
        textElement1.style.padding = "12px";
        textElement1.style.color = color.darkBrown;

        textElement2.style.position = "absolute";
        textElement2.style.left ="250px";
        textElement2.style.top = stage.canvas.height - 180  + "px";
        textElement2.style.fontSize = "20px";
        textElement2.style.fontStyle = "Italic";
        textElement2.style.fontWeight = "500";
        textElement2.style.lineHeight = "30px";
        textElement2.style.padding = "12px";
        textElement2.style.color = color.darkBrown;


        var globe = new createjs.Bitmap("assets/int/globe.png");
        globe.x = stage.canvas.width - 400 < stage.canvas.width/2 ? stage.canvas.width - 400 : stage.canvas.width/2 + 200;
        globe.y = stage.canvas.height - 300;

        var map = new createjs.Bitmap("assets/int/map.png");
        map.x = stage.canvas.width - 300 < stage.canvas.width/2 ? stage.canvas.width - 300 : stage.canvas.width/2 + 100;
        map.y = stage.canvas.height - 400;
        map.alpha = 0;

        textInput1.style.position = "absolute";
        textInput1.style.left = stage.canvas.width - 400 < stage.canvas.width/2 ? stage.canvas.width - 400 + "px": stage.canvas.width/2 + 200 + "px";
        textInput1.style.top = stage.canvas.height - 320  + "px";
        textInput1.style.border = "5px solid white";
        textInput1.style.padding = "15px";
        textInput1.style.background = "rgba(255,255,255,0.5)";

        textInput2.style.position = "absolute";
        textInput2.style.left = stage.canvas.width - 400 < stage.canvas.width/2 ? stage.canvas.width - 400 + "px": stage.canvas.width/2 + 200 + "px";
        textInput2.style.top = stage.canvas.height - 230  + "px";
        textInput2.style.border = "5px solid white";
        textInput2.style.padding = "15px";
        textInput2.style.background = "rgba(255,255,255,0.5)";

        var submitBtn = new createjs.Bitmap("assets/int/btn-go.png");
        submitBtn.x = stage.canvas.width - 410 < stage.canvas.width/2 ? stage.canvas.width - 410 : stage.canvas.width/2 + 190 ;
        submitBtn.y = stage.canvas.height - 150;
        submitBtn.alpha = 0;

        var submitLabel = new createjs.Text(genericText.clickMe, "700 28px Roboto", color.darkBrown);
        submitLabel.x = submitBtn.x + 60;
        submitLabel.y = submitBtn.y + 20;
        submitLabel.alpha = 0;


        globe.on("mousedown", function() {

            createjs.Tween.get(submitBtn).to({
                alpha:1
            }, 600);

            createjs.Tween.get(submitLabel).to({
                alpha:1
            }, 600);

            createjs.Tween.get(map).to({
                alpha:1
            }, 600).call(function () {
                textInput1.style.display = "block";
                textInput2.style.display = "block";
            });
        });

        submitBtn.on("mousedown", function() {

            if (textInput1.value === textElement1.innerHTML && textInput2.value === textElement2.innerHTML){
                textElement1.style.display = "none";
                textElement2.style.display = "none";
                textInput1.style.display = "none";
                textInput2.style.display = "none";
                results = [levelContainer, metrics];
                endLevel();
            }

        });

        document.addEventListener("copy", function() {
            metrics.copy++;
        });

        document.addEventListener("paste", function() {
            metrics.paste++;
        });

        document.addEventListener("mousedown", function() {
            metrics.click++;
        });


        levelContainer.addChild(backgroundColor, caveFloor, rocksL, rocksR, torchL, torchR, fire, wizard, congratulatoryText, scroll, scrollTitle, scrollDesc, cpIcon, globe, map, submitBtn, submitLabel);
        levelContainer.alpha = 0;

        stage.addChild(levelContainer);
        stage.setChildIndex(levelContainer, 0);

        createjs.Tween.get(levelContainer).to({alpha:1}, 1000).call(function () {
            textElement1.style.display = "block";
            textElement2.style.display = "block";
        });

        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    }

    function loadLevel6() {

        var metrics = [];
        var i;

        var backgroundColor = new createjs.Shape();
        backgroundColor.graphics.beginFill(color.blue).drawRect(0, 0, stage.canvas.width, canvas.height);

        var levelContainer = loadAdvancedLevelsIntroMap(1);
        var level = levelContainer.getChildAt(0);

        // Create task list. All must be set to true to finish level
        var taskList = [];
        taskList.settings = false;
        taskList.general = false;
        taskList.gaze_on = false;
        taskList.close = false;
        taskList.gaze_off = false;
        taskList.end = false;

        level.on("mousedown", function() {

            stage.removeChild(levelContainer);

            var taskContainer = new createjs.Container();

            var tasksLabel = new createjs.Text(genericText.tasks, "700 34px Roboto", color.whitePimary);
            tasksLabel = alignTextToStageCenter(stage, tasksLabel);
            tasksLabel.y = 80;

            taskContainer.addChild(tasksLabel);

            var taskLabel = [];
            var checkmark = [];
            var idx = 0;
            for (i in advFirstInstructions) {
                console.log(advFirstInstructions[i]);
                taskLabel[idx] = new createjs.Text(advFirstInstructions[i], "400 28px Roboto", color.whitePimary);
                taskLabel[idx] = alignTextToStageCenter(stage, taskLabel[idx]);
                taskLabel[idx].y = (idx === 0) ? 160 : taskLabel[idx-1].y + 60;
                taskLabel[idx].alpha = 0.54;

                checkmark[idx] = new createjs.Bitmap("assets/adv/checkmark.png");
                checkmark[idx].x = taskLabel[idx].x - 50;
                checkmark[idx].y = taskLabel[idx].y - 10;
                checkmark[idx].alpha = 0;

                taskContainer.addChild(taskLabel[idx], checkmark[idx]);
                idx++;
            }

            stage.addChild(taskContainer);

            // Start communication with GTW
            if (window.loggingMediator) {

                window.loggingMediator.registerFunction(function(string) {

                    if (string === 'settings') {
                        taskList.settings = true;
                        taskLabel[0].alpha = 1;
                        checkmark[0].alpha = 1;
                    }

                    if (string === 'general') {
                        taskList.general = true;
                        taskLabel[1].alpha = 1;
                        checkmark[1].alpha = 1;
                    }

                    if (string === 'gaze_on') {
                        taskList.gaze_on = true;
                        taskLabel[2].alpha = 1;
                        checkmark[2].alpha = 1;
                    }

                    if (string === 'close') { taskList.close = true; }

                    if (string === 'general' && taskList.gaze_on) {
                        taskLabel[3].alpha = 1;
                        checkmark[3].alpha = 1;
                    }

                    if (string === 'gaze_off' && taskList.close) {
                        taskList.gaze_off = true;
                        taskLabel[4].alpha = 1;
                        checkmark[4].alpha = 1;
                    }

                    if (string === 'close' && taskList.gaze_off) {
                        taskList.end = true;
                        taskLabel[5].alpha = 1;
                        checkmark[5].alpha = 1;
                    }

                    if (taskList.end) {
                        results = [levelContainer, metrics];

                        createjs.Tween.get(level)
                            .wait(1000)
                            .call(endLevel);

                    }
                });
            }
        });

        stage.addChild(levelContainer);
        stage.addChild(backgroundColor);
        stage.setChildIndex(backgroundColor, 0);
        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    }

    function endLevel() {

        if (progressBar) {
            stage.removeChild(progressBar);
            clearInterval(progressBarInterval);
        }

        stopwatch.stop();
        timer.text = stopwatch.update();
        clearInterval(levelTimerInterval);

        var outroStoryContainer;
        var scoreInfoContainer = new createjs.Container();

        var score = [];
        var time = [];
        var trophy = [];

        var poe = [];
        poe.x = 40;
        poe.y = 70;

        var metrics;
        var levelComplete = false;
        trophy.current = false;

        console.log(group, level);

        switch(group) {
            case 0:
                if (level === 0) {

                    var marker = results[0];
                    metrics = results[1];

                    console.log(metrics);

                    stage.removeChild(marker); // remove marker
                    score.current = parseInt(scoreBounds.level11 - ((stopwatch.time()/2) + (metrics.countOff * 50)), 10); // metrics

                    // Reward scenario for level1
                    if (metrics.countOff < 5) {
                        trophy.current = true;
                    }

                    if (score.current > scoreThreshold.level11 ) {
                        levelComplete = true;
                    }


                } else if (level === 1) {
                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];

                    metrics.multiplier = metrics.countOff > metrics.moles ? metrics.countOff - metrics.moles : 0;

                    if (metrics.hit === metrics.moles) {
                        trophy.current = true;
                    }

                    var multiplier = parseInt(scoreBounds.level12 / metrics.moles, 10);
                    score.current = parseInt(((metrics.hit) * multiplier) - (metrics.multiplier * 5), 10); // metrics

                    // Hit half of them & have a good score!
                    if (metrics.hit >= (metrics.moles/2)-1 && score.current > scoreThreshold.level12) {
                        levelComplete = true;
                    }

                }

                break;
            case 1:
                if (level === 0) {

                    canvas.height = window.innerHeight - 20;

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];

                    console.log(metrics);

                    if (metrics.clicks < 2) {
                        trophy.current = true;
                    }

                    score.current = parseInt(scoreBounds.level21 - (stopwatch.time()/2 + (metrics.clicks * 50)), 10);

                    if (score.current > scoreThreshold.level21 ) {
                        levelComplete = true;
                    }

                } else if (level === 1) {

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];


                    if (metrics.submit === metrics.pass) {
                        trophy.current = true;
                    }

                    score.current = parseInt(scoreBounds.level22 - (stopwatch.time()/3 + (metrics.fail * 200)), 10);

                    // Have a good score!
                    if (score.current > scoreThreshold.level22) {
                        levelComplete = true;
                    }

                }
                else if (level === 2) {

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];

                    console.log(metrics, stopwatch.time());

                    if (metrics.paste < 3) {
                        trophy.current = true;
                    }

                    score.current = parseInt(scoreBounds.level23 - (stopwatch.time()/4), 10);

                    if (score.current > scoreThreshold.level23) {
                        levelComplete = true;
                    }
                }

                break;
            case 2:

                if (level === 0) {

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];


                    if (metrics.submit === metrics.pass) {
                        trophy.current = true;
                    }

                    score.current = parseInt(scoreBounds.level22 - (stopwatch.time()/3 + (metrics.fail * 200)), 10);

                    // Have a good score!
                    if (score.current > scoreThreshold.level22) {
                        levelComplete = true;
                    }

                }

                break;
        }


        // Run update to firebase only if threshold is reached
        if (levelComplete) {

            // Create results screen
            var resultsPopup = new createjs.Shape();
            resultsPopup.height = window.innerHeight - 200 - poe.y;
            resultsPopup.width = window.innerWidth - 100;
            resultsPopup.graphics.beginFill(color.blue).drawRect(poe.x, poe.y + 100, resultsPopup.width, resultsPopup.height);
            resultsPopup.shadow = new createjs.Shadow(color.gray, 0, 2, 4);
            stage.addChild(resultsPopup);

            var col = [];
            var label = [];
            var separator = [];

            col.x = poe.x + 20;
            col.y = poe.y + 140;
            col.width = (window.innerWidth - 90)/3;



            var initVals = initializeResultsValues(group, level, stopwatch, score, time, trophy);
            trophy = initVals[0];
            score = initVals[1];
            time = initVals[2];

            if (trophy.current) { trophy.hasIt = true; }
            if (trophy.hasIt) {
                trophy.img = new createjs.Bitmap("assets/trophies/" + trophy.info.group +"-"+trophy.info.level+"-on.png");
                trophy.title = new createjs.Text(trophy.info.title, "Italic 20px Roboto", color.yellow);
            }

            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {

                if (snapshot.val()) {
                    var levelInformation = [];

                    if (group === 0) {

                        if (snapshot.val().levels.basic) {
                            levelInformation = snapshot.val().levels.basic[Object.keys(snapshot.val().levels.basic)[level]];
                        }
                    } else if (group === 1) {
                        if (snapshot.val().levels.int) {
                            levelInformation = snapshot.val().levels.int[Object.keys(snapshot.val().levels.int)[level]];
                        }
                    }

                    if (!levelInformation || levelInformation.length === 0) {
                        levelInformation = [];
                        levelInformation.score = 0;
                        levelInformation.ms = 999999999999;
                        levelInformation.trophyGained = trophy.hasIt;
                        levelInformation.countOn = 999999999999;
                        levelInformation.countOff = 999999999999;
                    }

                    score = calculateNewScore(score, levelInformation.score);
                    time = calculateNewTime(time, levelInformation, stopwatch);
                    trophy = calculateNewTrophy(trophy, levelInformation.trophyGained);
                    metrics = calculateNewMetrics(metrics, levelInformation);
                }


                var positionedResults = positionResultsElements(score, time, trophy, col, label, separator);
                score = positionedResults[0];
                time = positionedResults[1];
                trophy = positionedResults[2];
                label = positionedResults[3];
                separator = positionedResults[4];


                updateUserData(group, level, userId, score, time, trophy, metrics);

                // Add Rankings
                createScoreboard(group, level, col);

                // Footer navigation buttons
                var button = positionResultsFooterElements(col, resultsPopup, poe);

                var overviewTimeout;
                button.overview.addEventListener("mouseover", function() {
                    changeCursor(true);
                    createjs.Ticker.addEventListener("tick", mouseTick);
                    overviewTimeout = setTimeout( loadOverviewPage, interval.normal);
                });
                button.overview.addEventListener("mouseout", function() {
                    changeCursor(false);
                    createjs.Ticker.removeEventListener("tick", mouseTick);
                    window.clearTimeout(overviewTimeout);
                });

                var replayTimeout;
                button.replay.addEventListener("mouseover", function() {
                    changeCursor(true);
                    createjs.Ticker.addEventListener("tick", mouseTick);
                    replayTimeout = setTimeout( replayCurrentLevel, interval.normal);
                });
                button.replay.addEventListener("mouseout", function() {
                    changeCursor(false);
                    createjs.Ticker.removeEventListener("tick", mouseTick);
                    window.clearTimeout(replayTimeout);
                });

                var nextTimeout;
                button.next.addEventListener("mouseover", function() {
                    changeCursor(true);
                    createjs.Ticker.addEventListener("tick", mouseTick);
                    nextTimeout = setTimeout( advanceToNextLevel, interval.normal);
                });
                button.next.addEventListener("mouseout", function() {
                    changeCursor(false);
                    createjs.Ticker.removeEventListener("tick", mouseTick);
                    window.clearTimeout(nextTimeout);
                });

                scoreInfoContainer.addChild(resultsPopup, label.score, separator.score, label.currentScore, label.previousScore, label.time, separator.time, label.currentTime, label.previousTime, label.rewards, separator.rewards, score.currentValue, score.previousValue, time.currentValue, time.previousValue, trophy.title, trophy.img, trophy.desc, button.overview, button.overview.icon, button.overview.label, button.replay, button.replay.icon, button.replay.label, button.next, button.next.icon, button.next.label);

                stage.addChild( scoreInfoContainer );
                stage.setChildIndex( outroStoryContainer, stage.getNumChildren()-1);

                // Add timer label to next level (optional)

            });


            // Load Outro Story
            if (trophy.current || trophy.hasIt) {
                outroStoryContainer = loadLvlOutroStory(poe, 'trophy');
            } else {
                outroStoryContainer = loadLvlOutroStory(poe, true);
            }

        }
        else {

            // Load Outro Story
            outroStoryContainer = loadLvlOutroStory(poe, null);

            var speechBubble = outroStoryContainer.getChildAt(0);

            var btnSize = [], btnPos = [];
            btnSize.x = speechBubble.drawWidth - 200;
            btnPos.x = speechBubble.x + 100;
            btnSize.y = 120;
            btnPos.y = speechBubble.y + speechBubble.drawHeight + 80;

            var button = [];
            button.replay = new createjs.Shape();
            button.replay.graphics.beginFill(color.green).drawRect(btnPos.x, btnPos.y, btnSize.x -20, btnSize.y);

            button.replay.icon = new createjs.Bitmap("assets/ic_replay.png");
            button.replay.icon.x = window.innerWidth/2 - 80;
            button.replay.icon.y = btnPos.y + btnSize.y/2 - 27;

            button.replay.label = new createjs.Text(genericText.replay, "700 32px Roboto", color.whitePimary);
            button.replay.label.x = window.innerWidth/2 - 17;
            button.replay.label.y = btnPos.y + btnSize.y/2 - 23;


            var replayTimeout;
            button.replay.addEventListener("mouseover", function() {
                changeCursor(true);
                createjs.Ticker.addEventListener("tick", mouseTick);
                replayTimeout = setTimeout( replayCurrentLevel, interval.normal);
            });
            button.replay.addEventListener("mouseout", function() {
                changeCursor(false);
                createjs.Ticker.removeEventListener("tick", mouseTick);
                window.clearTimeout(replayTimeout);
            });

            stage.addChild(button.replay, button.replay.icon, button.replay.label);


        }


        stage.addChild(outroStoryContainer);
    }

    function replayCurrentLevel() {
        loadLevel(group, level);
    }

    // Increment levels! (to load next)
    function advanceToNextLevel() {

        switch(group) {
            case 0:
                if (level === 0) {
                    loadLevel(0, 1);
                } else {
                    loadLevel(1, 0);
                }

                break;
            case 1:

                if (level === 0) {
                    loadLevel(1, 1);
                } else if (level === 1) {
                    loadLevel(1, 2);
                } else {
                    loadLevel(2, 0);
                }

                break;
            case 2:

                if (level === 0) {
                    loadLevel(2, 1);
                } else if (level === 1) {
                    loadLevel(2, 2);
                } else if (level === 2) {
                    loadLevel(2, 3);
                } else if (level === 3) {
                    // disable it!
                    break;
                }

                break;
        }
    }
}