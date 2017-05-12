function loadLevel(group, level) {

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

            canvas.height = window.innerHeight;

            if (level === 1) {
                textPointer = 1;
            }
            break;
        case 1:

            canvas.height = window.innerHeight;

            if (level === 0) {
                textPointer = 2;
                tutorialContainer = addTutorials(textPointer);
                canvas.height = 1400;
                window.scrollTo(0,0);
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

            canvas.height = window.innerHeight;

            if (level === 0) { textPointer = 5; }
            else if (level === 1) { textPointer = 6; }
            else if (level === 2) { textPointer = 7; }
            else if (level === 3) { textPointer = 8; }

            break;
    }

    levelStructure = loadLvlStructure(levelText[textPointer].fullTitle, levelText[textPointer].shortTitle);

    if (gameTypeStripped) {
        levelIntro = loadLvlIntroStory(levelText[textPointer].storyNeutral);
    } else {
        levelIntro = loadLvlIntroStory(levelText[textPointer].story);
    }


    var speechBubble = levelIntro.getChildAt(0);

    var btnSize = [], btnPos = [];
    btnSize.x = speechBubble.drawWidth - 200;
    btnPos.x = speechBubble.x + 100;
    btnSize.y = 140;
    btnPos.y = stage.canvas.height/2;

    var nextButton = new Button(color.green, btnSize, btnPos, genericText.start, startLevel);

    stage.addChild(nextButton.btn, nextButton.label);

    if (tutorialContainer) {
        stage.addChild(tutorialContainer);
    }

    // Send LSL Message
    if (window.loggingMediator) {

        if (tutorialContainer) {
            SendLSLMessage("page_load__level_intro_w_tutorials");
        } else {
            SendLSLMessage("page_load__level_intro");
        }
    }

    function startLevel() {

        // Remove previous containers
        stage.removeChild(introStoryContainer);
        stage.removeChild(nextButton.btn);
        stage.removeChild(nextButton.label);

        // Remove tutorial layers if any
        if (tutorialContainer) {
            stage.removeChild(tutorialContainer);
        }


        // Set height manually in every stage (except splash)
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var startingLabel = new createjs.Text(genericText.startingIn, "700 20px Roboto", color.gray);
        startingLabel = alignTextToStageCenter(stage, startingLabel);
        startingLabel.y = 220 + 80;
        stage.addChild(startingLabel);

        var startingTimer = new createjs.Text("5", "700 24px Roboto", color.darkGray);
        startingTimer = alignTextToStageCenter(stage, startingTimer);
        startingTimer.y = 220 + 110;
        stage.addChild(startingTimer);

        var i = 0;

        timerInterval = setInterval(refreshIntroTimer, 1000);

        // Send LSL Message
        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_intro_countdown_start");
        }

        function refreshIntroTimer() {

            i++;
            startingTimer.text = 5 - i;

            if (i > 5) {
                clearInterval(timerInterval);

                stage.removeChild(startingTimer);
                stage.removeChild(startingLabel);

                var title = levelStructure.getChildAt(5);
                levelStructure.removeChild(title);

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
                results = loadLevel2();
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


        // Send LSL Message
        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_basic_1_start");
        }

        var markers = 5;
        var idx = 0;
        var marker = [];

        // Create metrics
        var metrics = [];
        metrics.points = markers;
        metrics.countOff = 0;
        metrics.countOffTotal = 0;
        metrics.countOnTotal = 0;
        metrics.eval = 0;

        // Create intervals (used in evaluation process)
        var intervals = [];

        var markerTimeout;
        addMarker(idx);

        function addMarker(idx) {

            marker[idx] = new createjs.Bitmap("assets/marker.png");
            marker[idx].x = getRandomInt(idx, 160, stage.canvas.width - 160);
            marker[idx].y = getRandomInt(idx, 160, stage.canvas.height - 160);
            stage.addChild(marker[idx]);

            marker[idx].on("mouseover", function() {
                metrics.countOnTotal++;
                changeCursor(true);
                createjs.Ticker.addEventListener("tick", mouseTick);
                markerTimeout = setTimeout( loadNewMarker, interval.markerHover);

                progressBarInterval = setInterval(refreshProgressBar, 10);
                progressBar = createProgressBarElement(mousePointer);

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

                // Send LSL Message
                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_over");
                }

            });

            marker[idx].on("mouseout", function() {
                changeCursor(false);
                metrics.countOffTotal++;
                metrics.countOff++;
                createjs.Ticker.removeEventListener("tick", mouseTick);
                window.clearTimeout(markerTimeout);

                progressBar.foreground.scaleX = 0;
                stage.removeChild(progressBar.foreground, progressBar.background);
                clearInterval(progressBarInterval);

                // Send LSL Message
                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_out");
                }
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

            intervals = calculateLvl1Intervals(intervals, stopwatch.time(), metrics);
            metrics.countOff = 0;
            idx++;

            if (idx > metrics.points-1) {

                for (var i in intervals) {
                    if (i > 0) {

                        intervals[i].accEval = intervals[i].accuracy > evaluationRatio * intervals[i-1].accuracy;
                        intervals[i].speedEval = intervals[i].time < evaluationRatio * intervals[i-1].time;

                        if (intervals[i].accEval || intervals[i].speedEval) {
                            metrics.eval++;
                        }
                    }
                }

                // delete me (Debugging)
                /*metrics.eval = 0;*/

                // Got trophy! The user didn't move his eyes from the target.
                // Evaluation does not matter, beacuse his performance is top.
                if (metrics.countOnTotal === metrics.points && metrics.points === markers) {

                    // Send LSL Message
                    if (window.loggingMediator) {
                        SendLSLMessage("level_complete");
                        SendLSLMessage("trophy");
                    }

                    metrics.trophy = true;
                    results = [marker, metrics, intervals];
                    endLevel(true);
                }
                // If not trophy, then check evaluation strategy
                else {
                    metrics.trophy = false;

                    // Level completed (no trophy)
                    if (metrics.eval > (metrics.points-1) / 2) {

                        // Send LSL Message
                        if (window.loggingMediator) {
                            SendLSLMessage("level_complete");
                        }

                        results = [marker, metrics, intervals];
                        endLevel(true);
                    }
                    else {

                        // Level failed (no trophy obviously)
                        if (metrics.points >= (3*markers)-1) {
                            // Send LSL Message
                            if (window.loggingMediator) {
                                SendLSLMessage("level_failed");
                            }

                            results = [marker, metrics, intervals];
                            endLevel(false);
                        }
                        // Add another group of markers
                        else {

                            // Send LSL Message
                            if (window.loggingMediator) {
                                SendLSLMessage("level_basic_1__new_markers_batch");
                                SendLSLMessage("level_basic_1__new_marker");
                            }

                            metrics.points = metrics.points + markers;
                            addMarker(idx);
                        }
                    }
                }

            } else {
                // Send LSL Message
                if (window.loggingMediator) {
                    SendLSLMessage("level_basic_1__new_marker");
                }
                // Load another marker
                addMarker(idx);
            }
        }
    }


    function loadLevel2() {

        // Send LSL Message
        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_basic_2_start");
        }

        var markers = 8;

        var index = 0;

        var i, j;
        var width = 80;
        var height = 80;
        var cols = 3;
        var rows = 2;

        var metrics = [];
        metrics.countOn = 0;
        metrics.countOff = 0;
        metrics.hits = 0;
        metrics.moles = markers;

        var intervals = [];

        var col = [];
        col.x = 60;
        col.width = (window.innerWidth - 120)/cols;
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


        var idx = 0;

        startMoles(index);

        function startMoles(index) {

            for (i=index; i < metrics.moles; i++) {
                // Pick one at random

                idx = getRandomInt(idx, 0,5);

                level2CurrentMarker[i] = markersContainer.getChildAt(idx);
                createjs.Tween.get(level2CurrentMarker[i])
                    .wait(interval.markerDuration * (i-index))
                    .call(activateMole, [level2CurrentMarker[i], i]);
            }
        }

        function activateMole(elem, i) {

            // Send LSL Message
            if (window.loggingMediator) {
                SendLSLMessage("level_basic_2__mole_start");
            }

            elem.image.src = "assets/marker.png";
            elem.on("mouseover", function() {

                // Send LSL Message
                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_over");
                }

                changeCursor(true);
                metrics.countOn++;
                createjs.Ticker.addEventListener("tick", mouseTick);

                elem.markerTimeout = setTimeout( hit, interval.markerFocus);
                elem.progressBarInterval = setInterval(refreshProgressBar, 10);

                elem.progressBar = createProgressBarElement(mousePointer);

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

                // Send LSL Message
                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_out");
                }

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

            // Send LSL Message
            if (window.loggingMediator) {
                SendLSLMessage("level_basic_2__mole_end");
            }

            window.clearTimeout(elem.markerTimeout);

            elem.image.src = "assets/marker_disabled.png";
            createjs.Ticker.removeEventListener("tick", mouseTick);

            if (elem.progressBar) {
                stage.removeChild(elem.progressBar.foreground, elem.progressBar.background, elem.progressBar.text);
            }
            clearInterval(elem.progressBarInterval);

            elem.removeAllEventListeners();
            changeCursor(false);

            if(!intervals[i]) {
                intervals.push({ hit: false });
            }

            // When all moles have popped, end the level
            if (i === metrics.moles-1) {

                // GOT trophy when all targets are successfully hit!
                if (metrics.hits === metrics.moles) {

                    // Send LSL Message
                    if (window.loggingMediator) {
                        SendLSLMessage("level_complete");
                        SendLSLMessage("trophy");

                    }

                    metrics.trophy = true;
                    results = [markersContainer, metrics, intervals];
                    endLevel(true);
                }
                else {
                    metrics.trophy = false;

                    // Level complete - no trophy
                    if (metrics.hits > (metrics.moles/2)) {

                        // Send LSL Message
                        if (window.loggingMediator) {
                            SendLSLMessage("level_complete");
                        }

                        results = [markersContainer, metrics, intervals];
                        endLevel(true);
                    }
                    else {

                        // Level failed (no trophy obviously)
                        if (metrics.moles >= (3*markers)-1) {

                            // Send LSL Message
                            if (window.loggingMediator) {
                                SendLSLMessage("level_failed");
                            }

                            results = [markersContainer, metrics, intervals];
                            endLevel(false);
                        }
                        // Add another group of markers
                        else {

                            // Send LSL Message
                            if (window.loggingMediator) {
                                SendLSLMessage("level_basic_2__moles_new_batch");
                            }

                            metrics.moles = metrics.moles + markers;
                            startMoles(index + metrics.moles - markers);
                        }
                    }
                }
            }
        }

        function hit() {

            // Send LSL Message
            if (window.loggingMediator) {
                SendLSLMessage("level_basic_2__mole_hit");
            }

            // Calculate the time spent from activation of marker to start of the hover that hits it.
            var time = stopwatch.time();
            time = time - (interval.markerDuration * intervals.length) - interval.markerFocus;
            intervals.push({ startTime: time, hit: true });

            // Increment hit counter
            metrics.hits++;
        }
    }

    function loadLevel3() {

        // Send LSL Message
        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_int_1_start");
        }

        // Set height manually in every stage (except splash)
        stage.canvas.height = 2000;
        window.innerHeight = 768;

        var levelContainer = new createjs.Container();
        var towerContainer =  new createjs.Container();

        var metrics = [];
        metrics.countOn = 0;
        metrics.countOff = 0;
        metrics.hit = 0;
        metrics.clicks = 0;

        var backgroundColor = new createjs.Shape();
        backgroundColor.graphics.beginFill(color.brown).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

        var villageTextA = new createjs.Text(genericText.lvl3ScrollDownA, "700 24px Roboto", color.whitePimary);
        if (gameTypeStripped) {
            villageTextA = new createjs.Text(genericText.arrScrollDown, "700 24px Roboto", color.whitePimary);
        }
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


        if (gameTypeStripped) {

            cave = new createjs.Bitmap("assets/int/wizard.png");
            cave.x = 80;
            cave.y = stage.canvas.height - 400;

            tower = new createjs.Bitmap("assets/int/wizard.png");
            tower.x = stage.canvas.width - 480;
            tower.y = 800;

        }

        tower.on("mousedown", function() {

            metrics.hit++;

            // Create browser state so as to use the back button!
            history.pushState(null, null, 'tower');
            stage.removeChild(levelContainer);

            resizeCanvas();

            var arrow, arrowLabel;

            if (!gameTypeStripped) {

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
                brb.x = fireplace.x + 180;
                brb.y = fireplace.y + 220;
                brb.textAlign = "center";
                brb.rotation = -8;

                arrow = new createjs.Bitmap("assets/arrow.png");
                arrow.x = 100;
                arrow.y = window.innerHeight * (55/100);
                arrow.rotation = -180;
                arrowLabel = new createjs.Text(genericText.arrBackBtn, "500 32px Roboto", color.whitePimary);
                arrowLabel.x = 180;
                arrowLabel.y = arrow.y - 58;

                towerContainer.addChild(towerFloor, towerWall, fireplace, frame, table, brb, arrow, arrowLabel);

            } else {

                arrow = new createjs.Bitmap("assets/arrow.png");
                arrow.x = 100;
                arrow.y = window.innerHeight * (55/100);
                arrow.rotation = -180;
                arrowLabel = new createjs.Text(genericText.arrBackBtn, "500 32px Roboto", color.green);
                arrowLabel.x = 40;
                arrowLabel.y = arrow.y + 40;

                towerContainer.addChild(arrow, arrowLabel);
            }

            stage.addChild(towerContainer);

            // Send LSL Message
            if (window.loggingMediator) {
                SendLSLMessage("level_int_1__tower_instance");
            }

        });

        // Listener for the back button, to get user out of tower!
        window.onpopstate = function(event) {

            // Send LSL Message
            if (window.loggingMediator) {
                SendLSLMessage("event__browser_back");
            }

            canvas.height = 2000;


            stage.removeChild(towerContainer);

            if (gameTypeStripped) {
                tower.visible = false;
                towerSelect.visible = false;
                towerSelectIcon.visible = false;
            }

            stage.addChild(levelContainer);
            stage.setChildIndex(levelContainer, 0);

            stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
        };


        cave.on("mousedown", function() {

            metrics.hit++;

            stage.removeChild(levelContainer);

            if (!gameTypeStripped) {
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

                levelContainer.addChild(backgroundColor, caveFloor, rocksL, rocksR, torchL, torchR, fire, wizard);

                stage.addChild(levelContainer);

                // Send LSL Message
                if (window.loggingMediator) {
                    SendLSLMessage("level_int_1__cave_instance");
                }
            }



            metrics.trophy = (metrics.hit < 3);
            if (metrics.trophy) {
                if (window.loggingMediator) {
                    SendLSLMessage("trophy");
                }
            }

            results = [levelContainer, metrics];

            if (!gameTypeStripped) {
                createjs.Tween.get(levelContainer)
                    .wait(3000)
                    .call( function () {
                        if (window.loggingMediator) {
                            SendLSLMessage("level_complete");
                        }
                        endLevel(true);
                    });
            }
            else {
                if (window.loggingMediator) {
                    SendLSLMessage("level_complete");
                }
                endLevel(true);
            }
        });


        if (!gameTypeStripped) {
            levelContainer.addChild(backgroundColor, river, village, villageTextA, villageTextB, villageTitle, tower, towerTitle, towerSelect, towerSelectIcon, cave, caveTitle, caveSelect, caveSelectIcon,
                forest, bush1, bush2, bush3, bush4);
        } else {

            towerSelectIcon = new createjs.Bitmap("assets/ic_hand_green.png");
            towerSelectIcon.x = stage.canvas.width - 250;
            towerSelectIcon.y = 1210;

            caveSelectIcon = new createjs.Bitmap("assets/ic_hand_green.png");
            caveSelectIcon.x = 400;
            caveSelectIcon.y = stage.canvas.height - 80;

            villageTextA.color = color.green;
            villageTextB.color = color.green;
            towerSelect.color = color.green;
            caveSelect.color = color.green;

            levelContainer.addChild(villageTextA, villageTextB, tower, towerSelect, towerSelectIcon, cave, caveSelect, caveSelectIcon);
        }

        stage.addChild(levelContainer);
        stage.setChildIndex(levelContainer, 0);

        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);

        document.addEventListener("mousedown", function(){

            // Send LSL Message
            if (window.loggingMediator) {
                SendLSLMessage("event__mouse_down");
            }

            metrics.clicks++;
        });

    }

    function loadLevel4() {

        // Send LSL Message
        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_int_2_start");
        }

        var levelContainer = new createjs.Container();

        var textInput = document.getElementById('inputTextFirst');
        textInput.placeholder = genericText.answer;
        textInput.style.display = "none";

        var metrics = [];
        metrics.click = 0;
        metrics.submit = 0;
        metrics.pass = 0;
        metrics.fail = 0;
        metrics.trophy = false;

        var questions = [];
        questions.total = 3;
        questions.idx = questions.total;

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
        papyrus.x = (stage.canvas.width/2) - 512;
        papyrus.y = stage.canvas.height - 440;
        papyrus.alpha = 0;

        if (!gameTypeStripped) {
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

        }
        else {
            questionLabel.color = color.darkBrown;
            questionLabel.alpha = 1;
            launchTrivia();
        }

        function launchTrivia() {

            var idx = 0;
            var pointer = 0;

            var barContainer = new createjs.Container();

            var hint = new createjs.Text(genericText.lvl4ScrollDesc, "400 14px Roboto", color.darkBrown);
            hint = alignTextToStageCenter(stage, hint);
            hint.y = papyrus.y + 220;

            // Attach an event handler to input to trick GTW and spawn the "T" overlay
            document.getElementById("inputTextFirst").addEventListener("click", spawnElement());

            textInput.style.display = "block";
            textInput.style.position = "absolute";
            textInput.style.width = "150px";
            textInput.style.left = (stage.canvas.width/2) - 220 + "px";
            textInput.style.top = (stage.canvas.height - 175)  + "px";
            textInput.style.border = "5px solid white";
            textInput.style.padding = "15px";
            textInput.style.background = "rgba(255,255,255,0.5)";
            textInput.className = "elementAdded";


            var inputDomElement = new createjs.DOMElement('inputTextFirst');
            inputDomElement.visible = true;

            var submitBtn;

            var submitLabel = new createjs.Text(genericText.clickMe, "700 24px Roboto", color.darkBrown);
            submitLabel.x = stage.canvas.width/2 + 70;
            submitLabel.y = stage.canvas.height - 170;

            if (!gameTypeStripped) {
                submitBtn = new createjs.Bitmap("assets/int/btn-go.png");
            }
            else {
                submitBtn = new createjs.Bitmap("assets/int/btn-go-simple.png");
                textInput.style.border = "5px solid #50BAA6";
                submitLabel.y = stage.canvas.height - 166;
                submitLabel.x = stage.canvas.width/2 + 66;
                submitLabel.color = "#fff";
            }

            submitBtn.x = stage.canvas.width/2;
            submitBtn.y = stage.canvas.height - 190;

            var question = new createjs.Text(" ", "700 24px Roboto", color.darkBrown);
            var answerA = new createjs.Text(" ", "400 10px Roboto", color.darkBrown);
            var answerB = new createjs.Text(" ", "400 10px Roboto", color.darkBrown);
            var answerC = new createjs.Text(" ", "400 10px Roboto", color.darkBrown);
            var answerD = new createjs.Text(" ", "400 10px Roboto", color.darkBrown);

            ask(idx);

            function ask(idx) {

                if (idx === 0) {

                    // Send LSL Message
                    if (window.loggingMediator) {
                        SendLSLMessage("level_int_2__question_asked_easy");
                    }

                    pointer = 0;

                } else if (idx === 1) {

                    // Send LSL Message
                    if (window.loggingMediator) {
                        SendLSLMessage("level_int_2__question_asked_med");
                    }

                    pointer = 1;

                } else {

                    // Send LSL Message
                    if (window.loggingMediator) {
                        SendLSLMessage("level_int_2__question_asked_hard");
                    }
                    pointer = 2;
                }

                if (idx === 2) {
                    questionLabel.text = genericText.question + " " + '3' + " / " + questions.total;
                } else {
                    questionLabel.text = genericText.question + " " + (pointer+1) + " / " + questions.total;
                }

                questionLabel = alignTextToStageCenter(stage, questionLabel);
                questionLabel.y = 100;
                question.text = quizText[pointer].question;
                question = alignTextToStageCenter(stage, question);
                question.y = papyrus.y + 100;

                answerA.text =  toggleQuizTranslations ? quizText[pointer].answer1_en + " / " + quizText[pointer].answer1 : quizText[pointer].answer1_en;
                answerA.x = (stage.canvas.width/2) - 200;
                answerA.y = papyrus.y + 150;
                answerB.text =  toggleQuizTranslations ? quizText[pointer].answer2_en + " / " + quizText[pointer].answer2 : quizText[pointer].answer2_en;
                answerB.x = (stage.canvas.width/2) - 200;
                answerB.y = papyrus.y + 180;
                answerC.text =  toggleQuizTranslations ? quizText[pointer].answer3_en + " / " + quizText[pointer].answer3 : quizText[pointer].answer3_en;
                answerC.x = (stage.canvas.width/2) + 60;
                answerC.y = papyrus.y + 150;
                answerD.text =  toggleQuizTranslations ? quizText[pointer].answer4_en + " / " + quizText[pointer].answer4 : quizText[pointer].answer4_en;
                answerD.x = (stage.canvas.width/2) + 60;
                answerD.y = papyrus.y + 180;

                if (gameTypeStripped) {
                    answerA.text = "";
                    answerC.text = "";
                    answerD.text = "";
                    hint.text = genericText.lvl4ScrollDescSV;
                }

            }

            submitBtn.addEventListener("mousedown", function (e) {

                // Send LSL Message
                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_down");
                }

                // Check GAZETHEWEB INPUT TYPE
                metrics.submit++;

                var barElement = new createjs.Shape();

                barElement.x = (stage.canvas.width/2 - 304/2) + ( metrics.submit * 61);
                barElement.y = 160;

                if (textInput.value.toUpperCase() === quizText[pointer].correct.toUpperCase()) {

                    // Send LSL Message
                    if (window.loggingMediator) {
                        SendLSLMessage("level_int_2__answer_correct");
                    }

                    barElement.graphics.beginFill(color.barGreen).drawRect(0, 0, 60, 12).endFill();
                    metrics.pass++;

                    idx++;

                } else {

                    // Send LSL Message
                    if (window.loggingMediator) {
                        SendLSLMessage("level_int_2__answer_wrong");
                    }

                    barElement.graphics.beginFill(color.barRed).drawRect(0, 0, 60, 12).endFill();
                    metrics.fail++;
                }



                barContainer.addChild(barElement);
                textInput.value = '';
                stage.addChild(barContainer);

                if (metrics.fail > 2) {

                    // Send LSL Message
                    if (window.loggingMediator) {
                        SendLSLMessage("level_failed");
                    }

                    stage.removeChild(barContainer);

                    // Delete dummy event
                    document.getElementById("inputTextFirst").removeEventListener("click", spawnElement());
                    textInput.style.display = "none";
                    textInput.className = "elementRemoved";
                    results = [levelContainer, metrics];
                    endLevel(false);
                }

                if (idx === questions.total) {

                    metrics.trophy = (metrics.fail === 0);

                    if (metrics.trophy) {
                        if (window.loggingMediator) {
                            SendLSLMessage("trophy");
                        }
                    }

                    createjs.Tween.get(levelContainer)
                        .wait(500)
                        .call(function(){

                            stage.removeChild(barContainer);

                            // Delete dummy event
                            document.getElementById("inputTextFirst").removeEventListener("click", spawnElement());
                            textInput.style.display = "none";
                            textInput.className = "elementRemoved";
                            results = [levelContainer, metrics];

                            // Send LSL Message
                            if (window.loggingMediator) {
                                SendLSLMessage("level_complete");
                            }
                            endLevel(true);

                        });
                } else {
                    ask(idx);
                }
            });
            levelContainer.addChild(question, answerA, answerB, answerC, answerD, hint, submitBtn, submitLabel);
        }

        if (!gameTypeStripped) {
            levelContainer.addChild(backgroundColor, caveFloor, rocksL, rocksR, torchL, torchR, fire, wizard, congratTextA, congratTextB, papyrus, questionLabel);
            levelContainer.alpha = 0;
            createjs.Tween.get(levelContainer).to({alpha:1}, 1000);
        } else {
            levelContainer.addChild(questionLabel);
        }

        stage.addChild(levelContainer);
        stage.setChildIndex(levelContainer, 0);

        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    }

    function loadLevel5() {

        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_int_3_start");
        }

        var levelContainer = new createjs.Container();

        var textInput1 = document.getElementById('inputTextFirst');
        textInput1.placeholder = genericText.latitude;
        textInput1.style.display = "none";
        textInput1.className = "elementAdded";

        var textInput2 = document.getElementById('inputTextSecond');
        textInput2.placeholder = genericText.longitude;
        textInput2.style.display = "none";
        textInput2.className = "elementAdded";

        var textElement1 = document.getElementById('caveLatText');
        textElement1.style.display = "none";
        textElement1.className = "textStyle";

        var textElement2 = document.getElementById('caveLngText');
        textElement2.style.display = "none";
        textElement2.className = "textStyle";

        var metrics = [];
        metrics.copy = 0;
        metrics.paste = 0;
        metrics.click = 0;
        metrics.errors = 0;
        metrics.trophy = false;

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

        var wrongCoordsLabel;

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

        var pasteDesc = new createjs.Text(genericText.lvl5PasteDesc + " ", "500 20px Roboto", color.brown);
        pasteDesc.x = 280;
        pasteDesc.y = stage.canvas.height - 90;
        pasteDesc.textAlign = "center";

        var pasteIcon = new createjs.Bitmap("assets/ic_paste.png");
        pasteIcon.x = 360;
        pasteIcon.y = pasteDesc.y - 10;

        textElement1.style.position = "absolute";
        textElement1.style.left ="166px";
        textElement1.style.top = stage.canvas.height - 230  + "px";
        textElement1.style.fontSize = "18px";
        textElement1.style.fontStyle = "Italic";
        textElement1.style.fontWeight = "500";
        textElement1.style.lineHeight = "30px";
        textElement1.style.padding = "12px";
        textElement1.style.color = color.darkBrown;

        textElement2.style.position = "absolute";
        textElement2.style.left ="166px";
        textElement2.style.top = stage.canvas.height - 180  + "px";
        textElement2.style.fontSize = "18px";
        textElement2.style.fontStyle = "Italic";
        textElement2.style.fontWeight = "500";
        textElement2.style.lineHeight = "30px";
        textElement2.style.padding = "12px";
        textElement2.style.color = color.darkBrown;

        var globe = new createjs.Bitmap("assets/int/globe.png");
        globe.x = stage.canvas.width - 400 < stage.canvas.width/2 ? stage.canvas.width - 400 : stage.canvas.width/2 + 200;
        globe.y = stage.canvas.height - 300;

        var clickLabel = new createjs.Text(genericText.clickMe, "700 28px Roboto", color.whitePimary);
        clickLabel.x = stage.canvas.width - 400 < stage.canvas.width/2 ? stage.canvas.width - 400 : stage.canvas.width/2 + 200;
        clickLabel.y = globe.y + 180;

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
        textInput1.style.width = "200px";

        textInput2.style.position = "absolute";
        textInput2.style.left = stage.canvas.width - 400 < stage.canvas.width/2 ? stage.canvas.width - 400 + "px": stage.canvas.width/2 + 200 + "px";
        textInput2.style.top = stage.canvas.height - 230  + "px";
        textInput2.style.border = "5px solid white";
        textInput2.style.padding = "15px";
        textInput2.style.background = "rgba(255,255,255,0.5)";
        textInput2.style.width = "200px";

        var submitBtn = new createjs.Bitmap("assets/int/btn-go.png");

        var submitLabel = new createjs.Text(genericText.clickMe, "700 28px Roboto", color.darkBrown);

        submitBtn.x = stage.canvas.width - 410 < stage.canvas.width/2 ? stage.canvas.width - 410 : stage.canvas.width/2 + 190 ;
        submitBtn.y = stage.canvas.height - 150;
        submitBtn.alpha = 0;

        submitLabel.x = submitBtn.x + 60;
        submitLabel.y = submitBtn.y + 20;
        submitLabel.alpha = 0;

        if(!gameTypeStripped) {

            globe.on("mousedown", function() {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_down");
                    SendLSLMessage("level_int_3__map_on");
                }

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
                    textInput1.className = "elementAdded";
                    // Attach an event handler to input to trick GTW and spawn the "T" overlay
                    document.getElementById("inputTextFirst").addEventListener("click", spawnElement());

                    textInput2.style.display = "block";
                    textInput2.className = "elementAdded";
                    // Attach an event handler to input to trick GTW and spawn the "T" overlay
                    document.getElementById("inputTextSecond").addEventListener("click", spawnElement());

                });
            });

        } else {

            submitBtn = new createjs.Bitmap("assets/int/btn-go-simple.png");

            submitBtn.x = stage.canvas.width - 410 < stage.canvas.width/2 ? stage.canvas.width - 410 : stage.canvas.width/2 + 190 ;
            submitBtn.y = stage.canvas.height - 150;

            textInput1.style.border = "5px solid #50BAA6";
            textInput2.style.border = "5px solid #50BAA6";

            submitLabel.color = "#fff";

            clickLabel.visible = false;

            textInput1.style.display = "block";
            textInput2.style.display = "block";

            submitBtn.alpha = 1;
            submitLabel.alpha = 1;
        }



        submitBtn.on("mousedown", function() {

            if (window.loggingMediator) {
                SendLSLMessage("event__mouse_down");
                SendLSLMessage("level_int_3__coords_submit");
            }

            stage.removeChild(wrongCoordsLabel);

            var latString = textInput1.value.replace(/\s+/g, '');
            var lngString  = textInput2.value.replace(/\s+/g, '');

            if (latString === "40.6401N" && lngString === "22.9444E"){
                textElement1.style.display = "none";
                textElement2.style.display = "none";
                textInput1.style.display = "none";
                textInput2.style.display = "none";
                textInput1.value = '';
                textInput2.value = '';

                textInput1.className = "elementRemoved";
                textInput2.className = "elementRemoved";
                textElement1.classList.remove("textStyle");
                textElement2.classList.remove("textStyle");

                // Delete dummy events
                document.getElementById("inputTextFirst").removeEventListener("click", spawnElement());
                document.getElementById("inputTextSecond").removeEventListener("click", spawnElement());

                metrics.trophy = (metrics.paste < 3);

                if (metrics.trophy) {
                    if (window.loggingMediator) {
                        SendLSLMessage("trophy");
                    }
                }


                if (window.loggingMediator) {
                    SendLSLMessage("level_int_3__coords_correct");
                    SendLSLMessage("level_complete");
                }

                results = [levelContainer, metrics];
                endLevel(true);
            } else {

                if (window.loggingMediator) {
                    SendLSLMessage("level_int_3__coords_wrong");
                }

                metrics.errors++;

                wrongCoordsLabel = new createjs.Text(genericText.lvl5coords, "500 20px Roboto", color.red);
                wrongCoordsLabel = alignTextToStageCenter(stage, wrongCoordsLabel);
                wrongCoordsLabel.y = 150;

                stage.addChild(wrongCoordsLabel);
            }

        });

        document.addEventListener("copy", function() {

            if (window.loggingMediator) {
                SendLSLMessage("event__copy");
            }

            stage.removeChild(wrongCoordsLabel);
            metrics.copy++;
        });

        document.addEventListener("paste", function() {

            if (window.loggingMediator) {
                SendLSLMessage("event__paste");
            }

            metrics.paste++;
        });

        document.addEventListener("mousedown", function() {

            if (window.loggingMediator) {
                SendLSLMessage("event__mouse_down");
            }

            metrics.click++;
        });


        if (!gameTypeStripped) {
            levelContainer.addChild(backgroundColor, caveFloor, rocksL, rocksR, torchL, torchR, fire, wizard, congratulatoryText, scroll, scrollTitle, scrollDesc, cpIcon, globe, clickLabel, map, submitBtn, submitLabel, pasteDesc, pasteIcon);
            levelContainer.alpha = 0;

            createjs.Tween.get(levelContainer).to({alpha:1}, 1000).call(function () {
                textElement1.style.display = "block";
                textElement2.style.display = "block";
            });

        } else {
            levelContainer.addChild(scrollTitle, scrollDesc, cpIcon, clickLabel, submitBtn, submitLabel, pasteDesc, pasteIcon);
            textElement1.style.display = "block";
            textElement2.style.display = "block";
        }

        stage.addChild(levelContainer);
        stage.setChildIndex(levelContainer, 0);

        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    }

    function loadLevel6() {

        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_adv_1_start");
        }

        var metrics = [];
        metrics.close = 0;
        metrics.gaze_on = 0;
        metrics.gaze_off = 0;
        metrics.general = 0;
        metrics.settings = 0;
        metrics.trophy = false;

        // Create task list. All must be set to true to finish level
        var taskList = [];
        taskList.settings = false;
        taskList.general = false;
        taskList.gaze_on = false;
        taskList.close = false;
        taskList.gaze_off = false;
        taskList.end = false;

        var i;

        var backgroundColor = new createjs.Shape();
        backgroundColor.graphics.beginFill(color.blue).drawRect(0, 0, stage.canvas.width, canvas.height);

        var levelContainer;

        if (!gameTypeStripped) {

            levelContainer = loadAdvancedLevelsIntroMap(1);
            var actualLevel = levelContainer.getChildAt(0);

            actualLevel.on("mousedown", function() {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_down");
                }

                stage.removeChild(levelContainer);

                startTheLevel();
            });
        }
        else { startTheLevel(); }


        function startTheLevel() {

            var taskContainer = new createjs.Container();

            var tasksLabel = new createjs.Text(genericText.tasks, "700 34px Roboto", color.whitePimary);
            tasksLabel = alignTextToStageCenter(stage, tasksLabel);
            tasksLabel.y = 80;

            taskContainer.addChild(tasksLabel);

            var taskLabel = [];
            var checkmark = [];
            var icon = [];

            var icons = {
                0: "assets/advanced/ic_adv_settings.png",
                1: "assets/advanced/ic_adv_go.png",
                2: "assets/advanced/ic_adv_toggle_on.png",
                3: "assets/advanced/ic_adv_go.png",
                4: "assets/advanced/ic_adv_toggle_off.png"
            };

            var idx = 0;
            for (i in advFirstInstructions) {

                taskLabel[idx] = new createjs.Text(advFirstInstructions[i], "400 28px Roboto", color.whitePimary);
                taskLabel[idx] = alignTextToStageCenter(stage, taskLabel[idx]);
                taskLabel[idx].y = (idx === 0) ? 160 : taskLabel[idx-1].y + 80;
                taskLabel[idx].alpha = 0.54;

                checkmark[idx] = new createjs.Bitmap("assets/advanced/checkmark.png");
                checkmark[idx].x = taskLabel[idx].x - 50;
                checkmark[idx].y = taskLabel[idx].y - 10;
                checkmark[idx].alpha = 0;

                var bounds = taskLabel[idx].getBounds();
                if (icons[idx]) {
                    icon[idx] = new createjs.Bitmap(icons[idx]);
                    icon[idx].y = taskLabel[idx].y - 10;
                    icon[idx].x = taskLabel[idx].x + bounds.width + 30;

                    taskContainer.addChild(taskLabel[idx], checkmark[idx], icon[idx]);
                } else {
                    taskContainer.addChild(taskLabel[idx], checkmark[idx]);
                }
                idx++;
            }

            stage.addChild(taskContainer);

            // Start communication with GTW
            if (window.loggingMediator) {

                window.loggingMediator.registerFunction(function(string) {

                    if (string === 'settings') {

                        SendLSLMessage("level_adv_1__msg_settings");

                        metrics.settings++;

                        taskList.settings = true;
                        taskLabel[0].alpha = 1;
                        checkmark[0].alpha = 1;
                    }

                    if (string === 'general') {

                        SendLSLMessage("level_adv_1__msg_general");

                        metrics.general++;

                        taskList.general = true;
                        taskLabel[1].alpha = 1;
                        checkmark[1].alpha = 1;
                    }

                    if (string === 'gaze_on') {

                        SendLSLMessage("level_adv_1__msg_gaze_on");

                        metrics.gaze_on++;

                        taskList.gaze_on = true;
                        taskLabel[2].alpha = 1;
                        checkmark[2].alpha = 1;
                    }

                    if (string === 'close') {

                        SendLSLMessage("level_adv_1__msg_close");

                        taskList.close = true;
                        metrics.close++;
                    }

                    if (string === 'general' && taskList.gaze_on) {

                        SendLSLMessage("level_adv_1__msg_general");

                        metrics.general++;

                        taskLabel[3].alpha = 1;
                        checkmark[3].alpha = 1;
                    }

                    if (string === 'gaze_off') {

                        SendLSLMessage("level_adv_1__msg_gaze_off");

                        metrics.gaze_off++;

                        taskList.gaze_off = true;
                        taskLabel[4].alpha = 1;
                        checkmark[4].alpha = 1;
                    }

                    if (string === 'close' && taskList.gaze_off) {

                        SendLSLMessage("level_adv_1__msg_close");

                        metrics.close++;

                        taskList.end = true;
                        taskLabel[5].alpha = 1;
                        checkmark[5].alpha = 1;
                    }

                    if (taskList.end) {


                        results = [taskContainer, metrics];

                        // Gain trophy if the menu closes only 2 times (which means all the steps are performed once)
                        metrics.trophy = (metrics.settings < 3 );
                        if (metrics.trophy) {
                            SendLSLMessage("trophy");
                        }

                        createjs.Tween.get(actualLevel)
                            .wait(1000)
                            .call(function () {
                                if (window.loggingMediator) {
                                    SendLSLMessage("level_complete");
                                }

                                window.loggingMediator.unregisterFunction();
                                endLevel(true);
                            });
                    }
                });
            }
        }

        stage.addChild(backgroundColor);
        stage.addChild(levelContainer);
        stage.setChildIndex(backgroundColor, 0);
        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    }

    function loadLevel7() {

        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_adv_2_start");
        }

        var metrics = [];
        metrics.tabs = 0;
        metrics.edit = 0;
        metrics.keystroke = 0;
        metrics.close = 0;
        metrics.trophy = false;

        // Create task list. All must be set to true to finish level
        var taskList = [];
        taskList.tabs = false;
        taskList.edit = false;
        taskList.type = 0;
        taskList.url = false;
        taskList.abort = false;
        taskList.end = false;

        var i;

        var backgroundColor = new createjs.Shape();
        backgroundColor.graphics.beginFill(color.blue).drawRect(0, 0, stage.canvas.width, canvas.height);

        var levelContainer;

        if (!gameTypeStripped) {

            levelContainer = loadAdvancedLevelsIntroMap(2);
            var actualLevel = levelContainer.getChildAt(2);

            actualLevel.on("mousedown", function() {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_down");
                }
                stage.removeChild(levelContainer);
                startTheLevel();
            });
        }
        else { startTheLevel(); }


        function startTheLevel() {
            var taskContainer = new createjs.Container();

            var tasksLabel = new createjs.Text(genericText.tasks, "700 34px Roboto", color.whitePimary);
            tasksLabel = alignTextToStageCenter(stage, tasksLabel);
            tasksLabel.y = 80;

            taskContainer.addChild(tasksLabel);

            var taskLabel = [];
            var checkmark = [];
            var icon = [];

            var icons = {
                0: "assets/advanced/ic_adv_tabs.png",
                1: "assets/advanced/ic_adv_edit.png",

                3: "assets/advanced/ic_adv_close.png"
            };

            var idx = 0;
            for (i in advSecondInstructions) {

                taskLabel[idx] = new createjs.Text(advSecondInstructions[i], "400 28px Roboto", color.whitePimary);
                taskLabel[idx] = alignTextToStageCenter(stage, taskLabel[idx]);
                taskLabel[idx].y = (idx === 0) ? 160 : taskLabel[idx-1].y + 80;
                taskLabel[idx].alpha = 0.54;

                checkmark[idx] = new createjs.Bitmap("assets/advanced/checkmark.png");
                checkmark[idx].x = taskLabel[idx].x - 50;
                checkmark[idx].y = taskLabel[idx].y - 10;
                checkmark[idx].alpha = 0;

                var bounds = taskLabel[idx].getBounds();
                if (icons[idx]) {
                    icon[idx] = new createjs.Bitmap(icons[idx]);
                    icon[idx].y = taskLabel[idx].y - 10;
                    icon[idx].x = taskLabel[idx].x + bounds.width + 30;

                    taskContainer.addChild(taskLabel[idx], checkmark[idx], icon[idx]);
                } else {
                    taskContainer.addChild(taskLabel[idx], checkmark[idx]);
                }
                idx++;
            }

            stage.addChild(taskContainer);

            // Start communication with GTW
            if (window.loggingMediator) {

                window.loggingMediator.registerFunction(function(string) {

                    if (string === 'tabs') {

                        SendLSLMessage("level_adv_2__msg_tabs");

                        metrics.tabs++;

                        taskList.tabs = true;
                        taskLabel[0].alpha = 1;
                        checkmark[0].alpha = 1;
                    }

                    if (string === 'edit') {

                        SendLSLMessage("level_adv_2__msg_edit");

                        metrics.edit++;

                        taskList.edit = true;
                        taskLabel[1].alpha = 1;
                        checkmark[1].alpha = 1;
                    }

                    if (string === 'keystroke') {

                        SendLSLMessage("level_adv_2__msg_keystroke");

                        taskList.type++;
                        metrics.keystroke++;

                        if (taskList.type > 8) {
                            taskList.url = true;
                            taskLabel[2].alpha = 1;
                            checkmark[2].alpha = 1;
                        }
                    }

                    if (string === 'close') {

                        SendLSLMessage("level_adv_2__msg_close");
                        metrics.close++;
                    }

                    console.log(string);
                    console.log(taskList);

                    if (string === 'close' && taskList.url) {

                        metrics.trophy = (metrics.edit === 1);

                        if (metrics.trophy) {
                            SendLSLMessage("trophy");
                        }

                        metrics.close++;

                        taskLabel[3].alpha = 1;
                        checkmark[3].alpha = 1;

                        taskLabel[4].alpha = 1;
                        checkmark[4].alpha = 1;

                        results = [taskContainer, metrics];

                        createjs.Tween.get(actualLevel)
                            .wait(1000)
                            .call(function () {

                                SendLSLMessage("level_complete");

                                window.loggingMediator.unregisterFunction();
                                endLevel(true);
                            });
                    }
                });
            }
        }

        stage.addChild(backgroundColor);
        stage.addChild(levelContainer);
        stage.setChildIndex(backgroundColor, 0);
        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    }

    function loadLevel8() {

        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_adv_3_start");
        }

        var metrics = [];
        metrics.phrase = [];
        metrics.click = 0;
        metrics.close = 0;
        metrics.trophy = false;

        // Create task list. All must be set to true to finish level
        var taskList = [];
        taskList.edit = false;
        taskList.phrase = "";
        taskList.abort = false;
        taskList.end = false;

        var i;

        var backgroundColor = new createjs.Shape();
        backgroundColor.graphics.beginFill(color.blue).drawRect(0, 0, stage.canvas.width, canvas.height);

        var levelContainer;

        if (!gameTypeStripped) {
            levelContainer = loadAdvancedLevelsIntroMap(3);
            var actualLevel = levelContainer.getChildAt(4);
            actualLevel.on("mousedown", function() {
                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_down");
                }
                stage.removeChild(levelContainer);
                startTheLevel();
            });
        } else { startTheLevel(); }

        function startTheLevel() {

            var taskContainer = new createjs.Container();

            var tasksLabel = new createjs.Text(genericText.tasks, "700 34px Roboto", color.whitePimary);
            tasksLabel = alignTextToStageCenter(stage, tasksLabel);
            tasksLabel.y = 80;

            tasksLabel.x = tasksLabel.x + 100;

            taskContainer.addChild(tasksLabel);

            var taskLabel = [];
            var checkmark = [];
            var icon = [];

            var icons = {
                3: "assets/advanced/ic_adv_ok.png"
            };

            var idx = 0;
            for (i in advThirdInstructions) {

                taskLabel[idx] = new createjs.Text(advThirdInstructions[i], "400 28px Roboto", color.whitePimary);
                taskLabel[idx] = alignTextToStageCenter(stage, taskLabel[idx]);
                taskLabel[idx].y = (idx === 0) ? 160 : taskLabel[idx-1].y + 80;
                taskLabel[idx].alpha = 0.54;
                taskLabel[idx].x = taskLabel[idx].x + 100;

                checkmark[idx] = new createjs.Bitmap("assets/advanced/checkmark.png");
                checkmark[idx].x = taskLabel[idx].x - 50;
                checkmark[idx].y = taskLabel[idx].y - 10;
                checkmark[idx].alpha = 0;

                var bounds = taskLabel[idx].getBounds();
                if (icons[idx]) {
                    icon[idx] = new createjs.Bitmap(icons[idx]);
                    icon[idx].y = taskLabel[idx].y - 10;
                    icon[idx].x = taskLabel[idx].x + bounds.width + 30;

                    taskContainer.addChild(taskLabel[idx], checkmark[idx], icon[idx]);
                } else {
                    taskContainer.addChild(taskLabel[idx], checkmark[idx]);
                }
                idx++;

            }

            var quoteDoc = new createjs.Bitmap("assets/advanced/doc-after.png");
            quoteDoc.x = 130;
            quoteDoc.y = 220;

            var quoteFirstLine = new createjs.Text(genericText.advQuote1, "500 24px Roboto", "#4D3D36");
            quoteFirstLine.x = quoteDoc.x + 60;
            quoteFirstLine.y = quoteDoc.y + 70;

            var quoteSecondLine = new createjs.Text(genericText.advQuote2, "500 24px Roboto", "#4D3D36");
            quoteSecondLine.x = quoteDoc.x + 55;
            quoteSecondLine.y = quoteFirstLine.y + 70;

            taskContainer.addChild(quoteDoc, quoteFirstLine, quoteSecondLine);
            stage.addChild(taskContainer);

            var textInput = document.getElementById('inputTextFirst');
            textInput.style.display = "block";
            textInput.style.position = "absolute";
            textInput.placeholder = " ";
            textInput.style.left = quoteDoc.x + 50 + "px";
            textInput.style.top = "440px";
            textInput.style.border = "none";
            textInput.style.padding = "15px";
            textInput.style.width = "210px";
            textInput.style.background = color.transparent;
            textInput.style.fontSize = "24px";
            textInput.style.fontWeight = "500";
            textInput.style.color = "#4D3D36";
            textInput.className = "elementAdded";

            textInput.addEventListener("click", function () {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_down");
                }

                metrics.click++;

                taskLabel[0].alpha = 1;
                checkmark[0].alpha = 1;

                taskList.edit = true;
                taskLabel[1].alpha = 1;
                checkmark[1].alpha = 1;
            });

            // Start communication with GTW
            if (window.loggingMediator) {

                window.loggingMediator.registerFunction(function(string) {

                    if (string === 'submit' || string === 'close') {

                        SendLSLMessage("level_adv_3__msg_close");

                        metrics.close++;

                        // Important wait to get the value
                        createjs.Tween.get(actualLevel)
                            .wait(1000)
                            .call(getTextValue);
                    }

                    function getTextValue() {

                        taskList.phrase = document.getElementById("inputTextFirst").value;
                        metrics.phrase.push(taskList.phrase);

                        taskList.phrase = taskList.phrase.trim();

                        var inputPhrase = taskList.phrase.split(" ");
                        var correctPhrase = advThirdInstructions.phrase.split(" ");
                        var equalFlag = false;

                        if (inputPhrase.length === correctPhrase.length) {
                            for (i=0; i< inputPhrase.length; i++) {

                                equalFlag = (inputPhrase[i].toUpperCase() === correctPhrase[i].toUpperCase());

                                if (equalFlag === false) {
                                    break;
                                }
                            }
                        }

                        if (equalFlag) {

                            metrics.trophy = (metrics.phrase.length === 1);
                            if (metrics.trophy) {
                                SendLSLMessage("trophy");
                            }

                            taskLabel[2].alpha = 1;
                            checkmark[2].alpha = 1;
                            taskLabel[3].alpha = 1;
                            checkmark[3].alpha = 1;
                            taskLabel[4].alpha = 1;
                            checkmark[4].alpha = 1;

                            window.loggingMediator.unregisterFunction();

                            createjs.Tween.get(actualLevel)
                                .wait(1000)
                                .call(function(){

                                    SendLSLMessage("level_complete");

                                    textInput.style.display = "none";
                                    textInput.className = "elementRemoved";
                                    results = [taskContainer, metrics];
                                    endLevel(true);
                                });
                        }
                    }
                });
            }
        }

        stage.addChild(backgroundColor);
        stage.addChild(levelContainer);
        stage.setChildIndex(backgroundColor, 0);
        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    }

    function loadLevel9() {

        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_adv_4_start");
        }

        var metrics = [];
        metrics.tabs = 0;
        metrics.bookmark_add = 0;
        metrics.new_tab = 0;
        metrics.bookmarks = 0;
        metrics.select_bookmark = 0;
        metrics.tabs_again = 0;
        metrics.trophy = false;

        // Create task list. All must be set to true to finish level
        var taskList = [];
        taskList.tabs = false;
        taskList.bookmark = false;
        taskList.new_tab = false;
        taskList.open_bookmarks = false;
        taskList.select_bookmark = false;
        taskList.tabs_again = false;
        taskList.return = false;

        var i;

        var backgroundColor = new createjs.Shape();
        backgroundColor.graphics.beginFill(color.blue).drawRect(0, 0, stage.canvas.width, canvas.height);

        var levelContainer;

        if (!gameTypeStripped) {
            levelContainer = loadAdvancedLevelsIntroMap(4);
            var actualLevel = levelContainer.getChildAt(6);
            actualLevel.on("mousedown", function() {

                if (window.loggingMediator) {
                    SendLSLMessage("event__mouse_down");
                }
                stage.removeChild(levelContainer);
                startTheLevel();
            });
        } else { startTheLevel(); }

        function startTheLevel() {

            var taskContainer = new createjs.Container();

            var tasksLabel = new createjs.Text(genericText.tasks, "700 34px Roboto", color.whitePimary);
            tasksLabel = alignTextToStageCenter(stage, tasksLabel);
            tasksLabel.y = 80;

            taskContainer.addChild(tasksLabel);

            var taskLabel = [];
            var checkmark = [];
            var icon = [];

            var icons = {
                0: "assets/advanced/ic_adv_tabs.png",
                1: "assets/advanced/ic_adv_bookmark.png",
                2: "assets/advanced/ic_adv_new_tab.png",
                3: "assets/advanced/ic_adv_bookmarks.png",
                4: "assets/advanced/ic_adv_go.png",
                5: "assets/advanced/ic_adv_tabs.png"
            };

            var idx = 0;
            for (i in advFourthInstructions) {

                taskLabel[idx] = new createjs.Text(advFourthInstructions[i], "400 28px Roboto", color.whitePimary);
                taskLabel[idx] = alignTextToStageCenter(stage, taskLabel[idx]);
                taskLabel[idx].y = (idx === 0) ? 160 : taskLabel[idx-1].y + 80;
                taskLabel[idx].alpha = 0.54;

                checkmark[idx] = new createjs.Bitmap("assets/advanced/checkmark.png");
                checkmark[idx].x = taskLabel[idx].x - 50;
                checkmark[idx].y = taskLabel[idx].y - 10;
                checkmark[idx].alpha = 0;

                var bounds = taskLabel[idx].getBounds();
                if (icons[idx]) {
                    icon[idx] = new createjs.Bitmap(icons[idx]);
                    icon[idx].y = taskLabel[idx].y - 10;
                    icon[idx].x = taskLabel[idx].x + bounds.width + 30;

                    taskContainer.addChild(taskLabel[idx], checkmark[idx], icon[idx]);
                } else {
                    taskContainer.addChild(taskLabel[idx], checkmark[idx]);
                }
                idx++;

            }
            stage.addChild(taskContainer);

            // Start communication with GTW
            if (window.loggingMediator) {

                window.loggingMediator.registerFunction(function(string) {

                    if (string === "tabs") {

                        SendLSLMessage("level_adv_4__msg_tabs");

                        metrics.tabs++;

                        taskList.tabs = true;
                        taskLabel[0].alpha = 1;
                        checkmark[0].alpha = 1;
                    }

                    if (string === "bookmark_add") {

                        SendLSLMessage("level_adv_4__msg_bookmark_add");

                        metrics.bookmark_add++;

                        taskList.bookmark = true;
                        taskLabel[1].alpha = 1;
                        checkmark[1].alpha = 1;
                    }

                    if (string === "new_tab") {

                        SendLSLMessage("level_adv_4__msg_new_tab");

                        metrics.new_tab++;

                        taskList.new_tab = true;
                        taskLabel[2].alpha = 1;
                        checkmark[2].alpha = 1;
                    }

                    if (string === "bookmarks") {

                        SendLSLMessage("level_adv_4__msg_bookmarks");

                        metrics.bookmarks++;

                        taskList.open_bookmarks = true;
                        taskLabel[3].alpha = 1;
                        checkmark[3].alpha = 1;
                    }

                    if (string === "open_bookmark") {

                        SendLSLMessage("level_adv_4__msg_open_bookmark");

                        metrics.select_bookmark++;

                        taskList.select_bookmark = true;
                        taskLabel[4].alpha = 1;
                        checkmark[4].alpha = 1;
                    }

                    if (taskList.select_bookmark && string === "tabs") {

                        SendLSLMessage("level_adv_4__msg_tabs_again");

                        metrics.tabs_again++;

                        taskList.tabs_again = true;
                        taskLabel[5].alpha = 1;
                        checkmark[5].alpha = 1;
                    }

                    if (taskList.tabs_again && string === "tab0") {

                        SendLSLMessage("level_adv_4__msg_tab0");

                        taskList.return = true;
                        taskLabel[6].alpha = 1;
                        checkmark[6].alpha = 1;


                        results = [taskContainer, metrics];

                        createjs.Tween.get(actualLevel)
                            .wait(1000)
                            .call(function () {

                                window.loggingMediator.unregisterFunction();

                                metrics.trophy = (metrics.new_tab === 1 && metrics.bookmarks === 1 && metrics.select_bookmark === 1);
                                if (metrics.trophy) {
                                    if (window.loggingMediator) {
                                        SendLSLMessage("trophy");
                                    }
                                }

                                endLevel(true);
                            });
                    }
                });
            }
        }

        stage.addChild(backgroundColor);
        stage.addChild(levelContainer);
        stage.setChildIndex(backgroundColor, 0);
        stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    }


    function endLevel(levelComplete) {

        if (progressBar) {
            stage.removeChild(progressBar);
            clearInterval(progressBarInterval);
        }

        stopwatch.stop();
        timer.text = stopwatch.update();
        clearInterval(levelTimerInterval);

        var abortBtn = levelStructure.getChildAt(5);
        var abortLabel = levelStructure.getChildAt(6);
        levelStructure.removeChild(abortBtn);
        levelStructure.removeChild(abortLabel);


        var outroStoryContainer;
        var scoreInfoContainer = new createjs.Container();
        var metrics;
        var intervals;
        var score = [];
        var time = [];
        var trophy = [];

        var poe = [];
        poe.x = 40;
        poe.y = 70;

        trophy.current = false;

        switch(group) {
            case 0:
                if (level === 0) {
                    stage.removeChild(results[0]); // remove marker
                    metrics = results[1];
                    intervals = results[2];

                    score.current = parseInt(scoreBounds.level11 - ((stopwatch.time()/2) + ((metrics.countOffTotal - metrics.points) * 50)), 10);
                    trophy.current = metrics.trophy;

                } else if (level === 1) {
                    stage.removeChild(results[0]); // remove markers container
                    metrics = results[1];
                    intervals = results[2];

                    var i;
                    var segment = parseInt(scoreBounds.level12 / metrics.hits, 10);
                    score.current = 0;
                    for (i in intervals) {
                        if (intervals[i].hit) {
                            intervals[i].scoreRatio = 1.2 - ((intervals[i].startTime / (interval.markerDuration - interval.markerFocus)));

                            score.current = score.current + parseInt((segment * intervals[i].scoreRatio), 10);
                        }
                    }
                    trophy.current = metrics.trophy;
                }

                break;
            case 1:
                if (level === 0) {

                    canvas.height = window.innerHeight - 20;

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];

                    trophy.current = metrics.trophy;
                    score.current = parseInt(scoreBounds.level21 - (stopwatch.time()/2 + (metrics.clicks * 50)), 10);


                } else if (level === 1) {

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];

                    trophy.current = metrics.trophy;

                    score.current = parseInt(scoreBounds.level22 - (stopwatch.time()/8 + (metrics.fail * 200)), 10);
                }
                else if (level === 2) {

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];

                    trophy.current = metrics.trophy;

                    score.current = parseInt(scoreBounds.level23 - (stopwatch.time()/4), 10);
                }

                break;
            case 2:

                var bg = stage.getChildAt(0);
                bg.graphics.beginFill(color.whitePimary).drawRect(0, 0, stage.canvas.width, canvas.height);

                if (level === 0) {

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];

                    trophy.current = metrics.trophy;

                    score.current = parseInt(scoreBounds.level31 - (stopwatch.time()/4), 10);
                }
                else if (level === 1) {

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];

                    trophy.current = metrics.trophy;

                    score.current = parseInt(scoreBounds.level32 - (stopwatch.time()/4), 10);
                }
                else if (level === 2) {

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];

                    trophy.current = metrics.trophy;

                    score.current = parseInt(scoreBounds.level33 - (stopwatch.time()/6), 10);
                }
                else if (level === 3) {

                    stage.removeChild(results[0]); // remove container
                    metrics = results[1];

                    trophy.current = metrics.trophy;

                    score.current = parseInt(scoreBounds.level34 - (stopwatch.time()/6), 10);
                }
                break;
        }


        // Run update to firebase only if threshold is reached
        if (levelComplete) {

            // Check if score is negative, then substitute with zero.
            score.current = score.current > 0 ? score.current : 0;

            // Create results screen
            var resultsPopup = new createjs.Shape();
            resultsPopup.height = window.innerHeight - 200 - poe.y;
            resultsPopup.width = window.innerWidth - 100;
            resultsPopup.graphics.beginFill(color.blue).drawRect(poe.x, poe.y + 100, resultsPopup.width, resultsPopup.height);
            resultsPopup.shadow = new createjs.Shadow(color.gray, 0, 2, 4);

            resultsPopup.visible = !gameTypeStripped;

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

                    if (snapshot.val().levels){

                        var levelInformation = [];

                        if (group === 0) {

                            if (snapshot.val().levels.basic) {
                                levelInformation = snapshot.val().levels.basic[Object.keys(snapshot.val().levels.basic)[level]];
                            }
                        } else if (group === 1) {
                            if (snapshot.val().levels.int) {
                                levelInformation = snapshot.val().levels.int[Object.keys(snapshot.val().levels.int)[level]];
                            }
                        } else if (group === 2) {
                            if (snapshot.val().levels.adv) {
                                levelInformation = snapshot.val().levels.adv[Object.keys(snapshot.val().levels.adv)[level]];
                            }
                        }

                        if (!levelInformation || levelInformation.length === 0) {
                            levelInformation = [];
                            levelInformation.score = 0;
                            levelInformation.ms = 999999999999;
                            levelInformation.trophyGained = trophy.hasIt;
                        }

                        score = calculateNewScore(score, levelInformation.score);
                        time = calculateNewTime(time, levelInformation, stopwatch);
                        trophy = calculateNewTrophy(trophy, levelInformation.trophyGained);
                    }
                }

                var positionedResults = positionResultsElements(score, time, trophy, col, label, separator);
                score = positionedResults[0];
                time = positionedResults[1];
                trophy = positionedResults[2];
                label = positionedResults[3];
                separator = positionedResults[4];

                updateUserData(group, level, userId, score, time, trophy, metrics, intervals);

                // Add Rankings
                createScoreboard(group, level, col);

                // Footer navigation buttons
                var button = positionResultsFooterElements(col, resultsPopup, poe, loadOverviewPage, replayCurrentLevel, advanceToNextLevel, group, level);

                if (!gameTypeStripped) {
                    scoreInfoContainer.addChild(resultsPopup, label.score, separator.score, label.currentScore, label.previousScore, label.time, separator.time, label.currentTime, label.previousTime, label.rewards, separator.rewards, score.currentValue, score.previousValue, time.currentValue, time.previousValue, trophy.title, trophy.img, trophy.desc, button.overview.btn, button.overview.icon, button.overview.label, button.replay.btn, button.replay.icon, button.replay.label, button.next.btn, button.next.icon, button.next.label);
                } else  {
                    scoreInfoContainer.addChild(button.overview.btn, button.overview.icon, button.overview.label, button.replay.btn, button.replay.icon, button.replay.label, button.next.btn, button.next.icon, button.next.label);
                }

                stage.addChild( scoreInfoContainer );
                stage.setChildIndex( outroStoryContainer, stage.getNumChildren()-1);

                // Add timer label to next level (optional to-do)

            });


            // Load Outro Story

            if (trophy.current || trophy.hasIt) {
                outroStoryContainer = loadLvlOutroStory(poe, 'trophy');
            } else {
                outroStoryContainer = loadLvlOutroStory(poe, true);
            }

            if (window.loggingMediator) {
                SendLSLMessage("page_load__level_results");
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
            btnPos.y = stage.canvas.height - 300;

            var button = [];
            button.replay = new Button(color.green, btnSize, btnPos, genericText.replay, replayCurrentLevel);
            button.replay.icon = new createjs.Bitmap("assets/ic_replay.png");
            button.replay.icon.x = window.innerWidth/2 - 180;
            button.replay.icon.y = btnPos.y + btnSize.y/2 - 27;

            stage.addChild(button.replay.btn, button.replay.icon, button.replay.label);


            if (window.loggingMediator) {
                SendLSLMessage("page_load__level_failed_text");
            }

        }
        stage.addChild(outroStoryContainer);
    }

    function replayCurrentLevel() {

        if (window.loggingMediator) {
            SendLSLMessage("page_load__level_replay");
        }

        loadLevel(group, level);
    }

    // Increment levels! (to load next)
    function advanceToNextLevel() {

        if (window.loggingMediator) {
            SendLSLMessage("page_load__next_level");
        }

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

                    if (!advLevelsEnabled) {
                        loadCongratulatoryPage();
                    } else {
                        loadLevel(2, 0);
                    }
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

                    if (advLevelsEnabled) {
                        loadCongratulatoryPage();
                    }
                    break;
                }

                break;
        }
    }

    function loadCongratulatoryPage() {

        stage.removeAllChildren();
        stage.removeAllEventListeners("mouseover");
        stage.removeAllEventListeners("mouseout");
        stage.addChild(firebaseUsernameHUD);
        addMousePointer();

        var congratsContainer = new createjs.Container();

        // Create Congratulatory screen
        var congratsPopup = new createjs.Shape();
        congratsPopup.height = window.innerHeight - 200;
        congratsPopup.width = window.innerWidth - 200;
        congratsPopup.graphics.beginFill(color.green).drawRect(100, 100, congratsPopup.width, congratsPopup.height);
        congratsPopup.shadow = new createjs.Shadow(color.gray, 0, 2, 4);

        var title = new createjs.Text(genericText.congrats, "700 48px Roboto", "rgba(255,255,255,1)");
        title = alignTextToStageCenter(stage, title);
        title.y = 150;

        var separator = new createjs.Shape();
        separator.graphics.beginFill(color.whitePimary);
        separator.graphics.drawRect(300, 240, congratsPopup.width - 400, 2);
        separator.graphics.endFill();

        var desc = new createjs.Text(genericText.treasureFound, "500 36px Roboto", "rgba(255,255,255,1)");
        desc = alignTextToStageCenter(stage, desc);
        desc.y = 500;

        var img;

        if (gameTypeStripped) {
            title.text = " ";
            desc.text = genericText.trainingComplete;
            img = new createjs.Bitmap("assets/star.png");
            img.x = (stage.canvas.width/2) -84;
            img.visible = false;
        } else {

            img = new createjs.Bitmap("assets/treasure.png");
            img.x = (stage.canvas.width/2) -89;
        }
        img.y = 300;

        var size = [], pos = [];
        size.x = 500;
        size.y = 100;
        pos.x = window.innerWidth/2 - size.x/2;
        pos.y = 600;

        var btn = new Button(color.blue, size, pos, genericText.ok, removeCongratulatoryPage);

        congratsContainer.addChild(congratsPopup, title, separator, img, desc, btn.btn, btn.label);

        function removeCongratulatoryPage() {
            stage.removeChild(congratsContainer);
            loadOverviewPage();
        }
        stage.addChild(congratsContainer);
    }
}