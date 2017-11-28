function tick(event)
{
    stage.update();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}

function moveHandler()
{
    mousePointer.x = stage.mouseX;
    mousePointer.y = stage.mouseY;
}

function addMousePointer() {
    mousePointer.graphics.beginFill(color.cursor).drawCircle(0, 0, 50);
    mousePointer.x = -9999;
    mousePointer.y = -9999;

    stage.addChild(mousePointer);
    stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    stage.canvas.style.cursor = "none";
}

function alignTextToStageCenter(stage, text) {

    var textBounds = text.getBounds();
    text.x = parseInt((stage.canvas.width/2) - (textBounds.width/2), 10);

    return text;
}

function centerElement(parentSize, parentPos, element) {

    var elemBounds = element.getBounds();

    element.x = parseInt(parentPos.x + parentSize.x/2 - elemBounds.width/2, 10);
    element.y = parseInt(parentPos.y + parentSize.y/2 - elemBounds.height/2, 10);

    return element;
}

function changeCursor(hover) {

    if (hover) {
        mousePointer.graphics.beginStroke(color.whitePimary);
        mousePointer.graphics.setStrokeStyle(3);
        mousePointer.graphics.setStrokeDash([20, 10], 0);
        mousePointer.graphics.beginFill(color.transparent);
        mousePointer.graphics.drawCircle(0,0, 30);
    } else {

        mousePointer.graphics.clear();
        mousePointer.graphics.beginFill(color.cursor).drawCircle(0, 0, 50);
    }

    stage.setChildIndex( mousePointer, stage.getNumChildren()-1);
    stage.update();
}

function mouseTick() {
    mousePointer.rotation++;
}

function abortLevel() {

    // Delete countdown interval
    if (timerInterval) {
        console.log("Countdown interval deleted");
        clearInterval(timerInterval);
        timerInterval = false;
    }

    // Delete BASIC 2 tweens if active
    var  i;
    if (level2CurrentMarker){
        for (i in level2CurrentMarker) {
            createjs.Tween.removeTweens(level2CurrentMarker[i]);
        }
    }


    // Delete dummy events
    document.getElementById("inputTextFirst").removeEventListener("click", spawnElement());
    document.getElementById("inputTextSecond").removeEventListener("click", spawnElement());

    var textInput1 = document.getElementById('inputTextFirst');
    textInput1.style.display = "none";
    textInput1.className = "elementRemoved";
    // Delete dummy event

    var textInput2 = document.getElementById('inputTextSecond');
    textInput2.style.display = "none";
    textInput2.className = "elementRemoved";


    var textElement1 = document.getElementById('caveLatText');
    textElement1.style.display = "none";
    textElement1.classList.remove("textStyle");
    var textElement2 = document.getElementById('caveLngText');
    textElement2.classList.remove("textStyle");

    loadOverviewPage();
}

function createProgressBarElement(mousePointer) {
    var progressBar = [];

    progressBar.foreground = new createjs.Shape();
    progressBar.background = new createjs.Shape();
    progressBar.foreground.graphics.beginFill(color.green).drawRect(0, 0, 1, 8).endFill();
    progressBar.background.graphics.beginFill(color.gray).drawRect(0, 0, 100, 8).endFill();
    progressBar.foreground.x = mousePointer.x - 50;
    progressBar.foreground.y = mousePointer.y + 60;
    progressBar.background.x = mousePointer.x - 50;
    progressBar.background.y = mousePointer.y + 60;

    return progressBar;
}

function loadLvlStructure(fullTitle, shortTitle) {
    var polygon = new createjs.Shape();
    polygon.graphics.beginFill(color.gray);
    polygon.graphics.moveTo(14, 0).lineTo(28, 16).lineTo(14, 32).lineTo(0, 16).lineTo(14, 0);
    polygon.x = 40;
    polygon.y = 20;

    var levelTitle = new createjs.Text(fullTitle, "500 24px Roboto", color.gray);
    levelTitle.x = polygon.x + 40;
    levelTitle.y = 20;

    var bigSeparator = new createjs.Shape();
    bigSeparator.graphics.beginFill(color.gray);
    bigSeparator.graphics.drawRect(polygon.x, 60, 500, 5);
    bigSeparator.graphics.endFill();

    var timer = [];

    timer.icon = new createjs.Bitmap("assets/timer.png");
    timer.icon.x = polygon.x - 3;
    timer.icon.y = 70;

    timer.text = new createjs.Text("00:00", "Italic 24px Roboto", color.gray);
    timer.text.x = timer.icon.x + 43;
    timer.text.y = 75;
    timer.text.textAlign = "left";

    var mainTitle = new createjs.Text(shortTitle, "48px Roboto", color.green);
    mainTitle = alignTextToStageCenter(stage, mainTitle);
    mainTitle.y = 160;

    var btnSize = [], btnPos = [];
    btnSize.x = 200; btnSize.y = 60;
    btnPos.x = stage.canvas.width - btnSize.x;
    btnPos.y = 50;
    var abortBtn = new Button(color.gray, btnSize, btnPos, genericText.abort, abortLevel);

    if(gameTypeStripped) {
        timer.icon.visible = false;
        timer.text.visible = false;
    }

    var levelStructureContainer = new createjs.Container();
    levelStructureContainer.addChild(polygon, bigSeparator, levelTitle, timer.icon, timer.text, mainTitle, abortBtn.btn, abortBtn.label);
    stage.addChild(levelStructureContainer);

    return levelStructureContainer;
}

function loadLvlIntroStory(script) {


    var scriptText = new createjs.Text(script, "500 22px Roboto", color.textRegular);
    /*scriptText.x = textContainer.x + 20;*/
    scriptText.y = 260;
    scriptText.lineHeight = 26;
    scriptText.lineWidth = (70*stage.canvas.width)/100;
    scriptText.textAlign = "center";
    scriptText.x = stage.canvas.width/2;

    if(gameTypeStripped) {
        scriptText = alignTextToStageCenter(stage, scriptText);
        scriptText.y = 300;
    }

    if (gameTypeElems) {
        /*scriptText.visible = false;*/
        scriptText = alignTextToStageCenter(stage, scriptText);
        scriptText.y = 300;
    }

    introStoryContainer = new createjs.Container();

    introStoryContainer.addChild(scriptText);
    stage.addChild(introStoryContainer);

    return introStoryContainer;
}

function loadLvlOutroStory(poe, completion) {

    var textContainer = [];
    textContainer.width = window.innerWidth - 500;
    textContainer.x = 250;
    textContainer.y = poe.y + 40;

    var scriptText;
    var textString;

    if (completion) {

        if (completion === 'trophy') {

            if (!gameTypeStripped)
            { textString = composeFeedback('positive'); }
            else
            { textString = defaultFeedback.positive; }

            scriptText = new createjs.Text(textString, "500 18px Roboto", color.textRegular);

        }
        else {
            if (!gameTypeStripped)
            { textString = composeFeedback('neutral'); }
            else
            { textString = defaultFeedback.neutral; }

            scriptText = new createjs.Text(textString, "500 18px Roboto", color.textRegular);
        }

    } else {

        if (!gameTypeStripped)
        { textString = composeFeedback('negative'); }
        else
        { textString = defaultFeedback.negative; }

        scriptText = new createjs.Text(textString, "500 18px Roboto", color.textRegular);
    }

    scriptText = alignTextToStageCenter(stage, scriptText);
    scriptText.y = textContainer.y;
    scriptText.lineWidth = textContainer.width - 40;
    scriptText.lineHeight = 26;

    if (RTL) {
        scriptText.textAlign = "right";
        scriptText.x = window.innerWidth - textContainer.x - 20;
    }

    var textBounds = scriptText.getBounds();
    textContainer.height = textBounds.height + 60;

    var outroStoryContainer = new createjs.Container();

    if(gameTypeStripped) {
        scriptText = alignTextToStageCenter(stage, scriptText);
        scriptText.y = stage.canvas.height/2 - 100;
    }

    if(gameTypeElems) { scriptText.visible = false; }

    outroStoryContainer.addChild(scriptText);

    return outroStoryContainer;
}


function initializeResultsValues(group, level, stopwatch, score, time, accuracy, trophy) {

    var id = 0;

    switch(group) {
        case 0:
            if (level === 1) {
                id = 1;
            }
            break;
        case 1:
            if (level === 0) {
                id = 2;
            }
            else if (level === 1) {
                id = 3;
            }
            else if (level === 2) {
                id = 4;
            }
            break;
        case 2:
            if (level === 0) {
                id = 5;
            } else if (level === 1) {
                id = 6;
            } else if (level === 2) {
                id = 7;
            } else if (level === 3) {
                id = 8;
            }
            break;
    }

    trophy.info = trophiesArray[id];

    trophy.img = new createjs.Bitmap("assets/trophies/" + trophy.info.group +"-"+trophy.info.level+"-off.png");
    trophy.title = new createjs.Text(trophy.info.title, "Italic 20px Roboto", color.whiteSecondary);
    trophy.desc = new createjs.Text(trophy.info.description, "14px Roboto", color.whiteHint);
    trophy.hasIt = trophy.current;

    score.saved = genericText.noScore;
    score.previousValue = new createjs.Text(score.saved, "Italic 20px Roboto", color.whiteSecondary);
    score.currentValue = new createjs.Text(score.current, "Italic 20px Roboto", color.yellow);

    time.saved = " ";
    time.current = stopwatch.time();
    time.currentFormatted = stopwatch.formattedTime();
    time.previousValue = new createjs.Text(time.saved, "Italic 20px Roboto", color.whiteSecondary);
    time.currentValue = new createjs.Text(time.currentFormatted, "Italic 20px Roboto", color.yellow);

    accuracy.TextColor = (accuracy.val === 100) ? color.yellow : color.whiteSecondary;
    accuracy.stringVal = new createjs.Text(String(accuracy.val)+'%', "Italic 20px Roboto", accuracy.TextColor);

    return [trophy, score, time, accuracy];
}

function calculateLvl1Intervals(intervals, time, metrics) {

    var i;

    if (intervals.length > 0) {

        for (i in intervals) {
            time = time - intervals[i].time;
        }

        intervals.push({
            time: time,
            accuracy: metrics.countOff - 1
        });

    } else {
        intervals.push({
            time: time,
            accuracy: metrics.countOff
        });
    }

    return intervals;
}

function calculateNewScore(score, savedScore) {

    score.saved = savedScore;
    score.currentValue = score.current > score.saved ? new createjs.Text(score.current, "Italic 20px Roboto", color.yellow) : new createjs.Text(score.current, "Italic 20px Roboto", color.whiteSecondary);
    score.previousValue = score.current < score.saved ? new createjs.Text(score.saved, "Italic 20px Roboto", color.yellow) : new createjs.Text(score.saved, "Italic 20px Roboto", color.whiteSecondary);
    score.current = score.current > score.saved ? score.current : score.saved;

    return score;
}

function calculateNewTime(time, savedTimeObj, stopwatch) {

    time.saved = savedTimeObj.ms;

    time.previousFormatted = savedTimeObj.timeLabel;

    time.currentValue = time.current < time.saved ? new createjs.Text(time.currentFormatted, "Italic 20px Roboto", color.yellow) : new createjs.Text(time.currentFormatted, "Italic 20px Roboto", color.whiteSecondary);

    time.previousValue = time.current > time.saved ? new createjs.Text(time.previousFormatted, "Italic 20px Roboto", color.yellow) : new createjs.Text(time.previousFormatted, "Italic 20px Roboto", color.whiteSecondary);

    // Calculate which formatted time label to send
    if (time.current > time.saved) {
        time.currentFormatted = time.current < time.saved ? time.currentFormatted : time.previousFormatted;
    }

    time.current = stopwatch.time() < time.saved ? stopwatch.time() : time.saved;

    return time;
}

function calculateNewTrophy(trophy, savedTrophy) {

    trophy.hasIt = savedTrophy;

    if (trophy.current) { trophy.hasIt = true; }

    // Check for the
    if (trophy.hasIt) {
        trophy.img = new createjs.Bitmap("assets/trophies/" + trophy.info.group +"-"+trophy.info.level+"-on.png");
        trophy.title = new createjs.Text(trophy.info.title, "Italic 20px Roboto", color.yellow);
    }

    return trophy;
}

function positionResultsElements(score, time, accuracy, trophy, col, label, separator) {

    score.currentValue.x = col.x;
    score.currentValue.y = col.y + 48;
    score.currentValue.textAlign = "left";

    score.previousValue.x = col.width;
    score.previousValue.y = col.y + 48;
    score.previousValue.textAlign = "right";

    time.currentValue.x = col.x + col.width;
    time.currentValue.y = col.y + 48;
    time.currentValue.textAlign = "left";

    time.previousValue.x = 2 * col.width;
    time.previousValue.y = col.y + 48;
    time.previousValue.textAlign = "right";

    accuracy.stringVal.x = col.x + (2 * col.width);
    accuracy.stringVal.y = col.y + 34;
    accuracy.stringVal.textAlign = "left";

    trophy.img.x = col.x + (3 * col.width);
    trophy.img.y = col.y + 40;

    trophy.title.x = col.x + (3 * col.width) + 58;
    trophy.title.y = col.y + 38;

    trophy.desc.x = col.x + (3 * col.width) + 58;
    trophy.desc.y = col.y + 60;
    trophy.desc.lineWidth = col.width - col.x;

    label.score = new createjs.Text(genericText.score.toUpperCase(), "700 26px Roboto", color.whitePimary);
    label.score.x = col.x;
    label.score.y = col.y;

    separator.score = new createjs.Shape();
    separator.score.graphics.beginFill(color.whitePimary);
    separator.score.graphics.drawRect(col.x, col.y + 30, col.width - col.x, 2);
    separator.score.graphics.endFill();

    label.currentScore = new createjs.Text(genericText.newScore, "700 16px Roboto", color.whiteSecondary);
    label.currentScore.x = col.x;
    label.currentScore.y = col.y + 34;
    label.currentScore.textAlign = "left";

    label.previousScore = new createjs.Text(genericText.best, "700 16px Roboto", color.whiteSecondary);
    label.previousScore.x = col.width;
    label.previousScore.y = col.y + 34;
    label.previousScore.textAlign = "right";

    label.time = new createjs.Text(genericText.time.toUpperCase(), "700 26px Roboto", color.whitePimary);
    label.time.x = col.x + col.width;
    label.time.y = col.y;

    separator.time = new createjs.Shape();
    separator.time.graphics.beginFill(color.whitePimary);
    separator.time.graphics.drawRect(col.x + col.width, col.y + 30, col.width - col.x, 2);
    separator.time.graphics.endFill();

    label.currentTime = new createjs.Text(genericText.newScore, "700 16px Roboto", color.whiteSecondary);
    label.currentTime.x = col.x + col.width;
    label.currentTime.y = col.y + 34;
    label.currentTime.textAlign = "left";

    label.previousTime = new createjs.Text(genericText.best, "700 16px Roboto", color.whiteSecondary);
    label.previousTime.x = 2 * col.width;
    label.previousTime.y = col.y + 34;
    label.previousTime.textAlign = "right";

    label.accuracy = new createjs.Text(genericText.accuracy.toUpperCase(), "700 26px Roboto", color.whitePimary);
    label.accuracy.x = col.x + (2 * col.width);
    label.accuracy.y = col.y;

    separator.accuracy = new createjs.Shape();
    separator.accuracy.graphics.beginFill(color.whitePimary);
    separator.accuracy.graphics.drawRect(col.x + (2*col.width), col.y + 30, col.width - col.x, 2);
    separator.accuracy.graphics.endFill();

    label.rewards = new createjs.Text(genericText.rewards.toUpperCase(), "700 26px Roboto", color.whitePimary);
    label.rewards.x = col.x + (3 * col.width);
    label.rewards.y = col.y;

    if (RTL) {
        label.rewards.textAlign = "right";
        label.rewards.x = (3* col.width);

        label.time.textAlign = "right";
        label.time.x = (2* col.width);

        label.score.textAlign = "right";
        label.score.x = (col.width);

        trophy.img.x = (3 * col.width) - (col.x/2);

        trophy.title.textAlign = "right";
        trophy.title.x = (3* col.width) - 40;

        trophy.desc.textAlign = "right";
        trophy.desc.x = label.rewards.x;
    }

    separator.rewards = new createjs.Shape();
    separator.rewards.graphics.beginFill(color.whitePimary);
    separator.rewards.graphics.drawRect(col.x + (3 * col.width), col.y + 30, col.width - col.x, 2);
    separator.rewards.graphics.endFill();

    return [score, time, accuracy, trophy, label, separator];

}

function positionResultsFooterElements(col, resultsPopup, poe, loadOverviewPage, replayCurrentLevel, advanceToNextLevel, group, level) {

    var button = [];

    var size = [], pos = [];
    size.x = col.width - col.x;
    size.y = 100;
    pos.x = col.x;
    pos.y = resultsPopup.height + poe.y - 20;

    button.overview = new Button(color.green, size, pos, genericText.overview, loadOverviewPage);
    button.overview.icon = new createjs.Bitmap("assets/ic_overview.png");
    button.overview.icon.x = col.width/2 - col.x - 40;
    button.overview.icon.y = resultsPopup.height + poe.y + 8;

    pos.x = col.x + col.width;
    button.replay = new Button(color.green, size, pos, genericText.replay, replayCurrentLevel);
    button.replay.icon = new createjs.Bitmap("assets/ic_replay.png");
    button.replay.icon.x = col.width + (col.width/2 - col.x) - 30;
    button.replay.icon.y = resultsPopup.height + poe.y + 8;

    pos.x = col.x + (2 * col.width);
    button.next = new Button(color.green, size, pos, genericText.next, advanceToNextLevel);
    button.next.icon = new createjs.Bitmap("assets/ic_next.png");
    button.next.icon.x = (2 * col.width) + (col.width - ( (2 * col.x) ));
    button.next.icon.y = resultsPopup.height + poe.y + 8;

    /*if (group === 2 && level === 3) {
        button.next.btn.visible = false;
        button.next.label.visible = false;
        button.next.icon.visible = false;
    }


    if (!advLevelsEnabled && group === 1 && level === 2) {
        button.next.btn.visible = false;
        button.next.label.visible = false;
        button.next.icon.visible = false;
    }*/


    return button;
}

function loadAdvancedLevelsIntroMap(level) {
    var container = new createjs.Container();

    var elemSize = [];
    elemSize.x = 450;
    elemSize.y = 305;

    var label = new createjs.Text(genericText.clickMe, "700 28px Roboto", color.whitePimary);
    label.textAlign = "center";
    var hand = new createjs.Bitmap("assets/ic_hand.png");

    var lvl1 = new createjs.Bitmap("assets/advanced/lvl1.png");
    lvl1.x = 80;
    lvl1.y = 80;
    var lvl1Marker = new createjs.Bitmap("assets/advanced/place_off.png");
    lvl1Marker.x = (elemSize.x/2) + lvl1.x - 21;
    lvl1Marker.y = elemSize.y;

    var lvl2 = new createjs.Bitmap("assets/advanced/lvl2.png");
    lvl2.regX = elemSize.x;
    lvl2.x = stage.canvas.width - 80;
    lvl2.y = 80;
    var lvl2Marker = new createjs.Bitmap("assets/advanced/place_off.png");
    lvl2Marker.x = lvl2.x - (elemSize.x/2) - 21;
    lvl2Marker.y = elemSize.y;

    var lvl3 = new createjs.Bitmap("assets/advanced/lvl3.png");
    lvl3.regY = elemSize.y;
    lvl3.x = 80;
    lvl3.y = stage.canvas.height - 20;
    var lvl3Marker = new createjs.Bitmap("assets/advanced/place_off.png");
    lvl3Marker.x = (elemSize.x/2) + lvl3.x - 21;
    lvl3Marker.y = lvl3.y - 100;

    var lvl4 = new createjs.Bitmap("assets/advanced/lvl4.png");
    lvl4.regX = elemSize.x;
    lvl4.regY = elemSize.y;
    lvl4.x = stage.canvas.width - 80;
    lvl4.y = stage.canvas.height - 20;
    var lvl4Marker = new createjs.Bitmap("assets/advanced/place_off.png");
    lvl4Marker.x = lvl4.x - (elemSize.x/2) - 21;
    lvl4Marker.y = lvl4.y - 100;

    switch(level) {
        case 1:
            lvl2.alpha = 0.54;
            lvl3.alpha = 0.54;
            lvl4.alpha = 0.54;

            label.x = 300;
            label.y = elemSize.y + 80;

            hand.x = 380;
            hand.y = elemSize.y + 66;

            lvl1Marker = new createjs.Bitmap("assets/advanced/place_on.png");
            lvl1Marker.x = (elemSize.x/2) + lvl1.x - 21;
            lvl1Marker.y = elemSize.y;

            break;
        case 2:
            lvl1.alpha = 0.54;
            lvl3.alpha = 0.54;
            lvl4.alpha = 0.54;

            label.x = stage.canvas.width - 380;
            label.y = elemSize.y + 80;

            hand.x = stage.canvas.width - 300;
            hand.y = elemSize.y + 66;

            lvl2Marker = new createjs.Bitmap("assets/advanced/place_on.png");
            lvl2Marker.x = lvl2.x - (elemSize.x/2) - 21;
            lvl2Marker.y = elemSize.y;

            break;
        case 3:
            lvl1.alpha = 0.54;
            lvl2.alpha = 0.54;
            lvl4.alpha = 0.54;

            label.x = 300;
            label.y = stage.canvas.height - 50;

            hand.x = 380;
            hand.y = stage.canvas.height - 60;

            lvl3Marker = new createjs.Bitmap("assets/advanced/place_on.png");
            lvl3Marker.x = (elemSize.x/2) + lvl3.x - 21;
            lvl3Marker.y = lvl3.y - 100;

            break;
        case 4:
            lvl1.alpha = 0.54;
            lvl2.alpha = 0.54;
            lvl3.alpha = 0.54;

            label.x = stage.canvas.width - 380;
            label.y = stage.canvas.height - 50;

            hand.x = stage.canvas.width - 300;
            hand.y = stage.canvas.height - 60;

            lvl4Marker = new createjs.Bitmap("assets/advanced/place_on.png");
            lvl4Marker.x = lvl4.x - (elemSize.x/2) - 21;
            lvl4Marker.y = lvl4.y - 100;

            break;
    }

    container.addChild(lvl1, lvl1Marker, lvl2, lvl2Marker, lvl3, lvl3Marker, lvl4, lvl4Marker, label, hand);
    return container;
}

function composeFeedback(type) {

    var textString;
    switch(type) {
        case 'positive':

            if(user.age > 45 ) {
                // Old
                if (user.gender === 'm') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.oldMale.positive.length-1);
                    textString = personalizedFeedback.oldMale.positive[randomFeedbackFlag];
                }
                else if (user.gender === 'f') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.oldFemale.positive.length-1);
                    textString = personalizedFeedback.oldFemale.positive[randomFeedbackFlag];
                }

            } else {
                // Young
                if (user.gender === 'm') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.youngMale.positive.length-1);
                    textString = personalizedFeedback.youngMale.positive[randomFeedbackFlag];
                }
                else if (user.gender === 'f') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.youngFemale.positive.length-1);
                    textString = personalizedFeedback.youngFemale.positive[randomFeedbackFlag];
                }
            }

            break;
        case 'neutral':

            if(user.age > 45 ) {
                // Old
                if (user.gender === 'm') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.oldMale.neutral.length-1);
                    textString = personalizedFeedback.oldMale.neutral[randomFeedbackFlag];
                }
                else if (user.gender === 'f') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.oldFemale.neutral.length-1);
                    textString = personalizedFeedback.oldFemale.neutral[randomFeedbackFlag];
                }

            } else {
                // Young
                if (user.gender === 'm') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.youngMale.neutral.length-1);
                    textString = personalizedFeedback.youngMale.neutral[randomFeedbackFlag];
                }
                else if (user.gender === 'f') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.youngFemale.neutral.length-1);
                    textString = personalizedFeedback.youngFemale.neutral[randomFeedbackFlag];
                }
            }

            break;
        case 'negative':

            if(user.age > 45 ) {
                // Old
                if (user.gender === 'm') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.oldMale.negative.length-1);
                    textString = personalizedFeedback.oldMale.negative[randomFeedbackFlag];
                }
                else if (user.gender === 'f') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.oldFemale.negative.length-1);
                    textString = personalizedFeedback.oldFemale.negative[randomFeedbackFlag];
                }

            } else {
                // Young
                if (user.gender === 'm') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.youngMale.negative.length-1);
                    textString = personalizedFeedback.youngMale.negative[randomFeedbackFlag];
                }
                else if (user.gender === 'f') {
                    randomFeedbackFlag = getRandomInt(randomFeedbackFlag, 0, personalizedFeedback.youngFemale.negative.length-1);
                    textString = personalizedFeedback.youngFemale.negative[randomFeedbackFlag];
                }
            }

            break;
    }
    return textString;
}

function getRandomInt(idx, min, max) {
    var newVal = Math.floor(Math.random() * (max - min + 1)) + min;

    if (newVal === idx) {
        return getRandomInt(idx, min, max);
    }

    return newVal;
}

function spawnElement() {

}



function Stopwatch(text) {

    this.text = text;

    var	startAt	= 0;
    var	lapTime	= 0;

    var	now	= function() {
        return (new Date()).getTime();
    };

    this.start = function() {
        startAt	= startAt ? startAt : now();
        //TODO: there must be a more civilized way to achieve this...
        this.timer = setInterval(redirect, 100, this);
        function redirect(w) {
            w.update();
        }
    };

    this.stop = function() {
        lapTime	= startAt ? lapTime + now() - startAt : lapTime;
        startAt	= 0;
        clearInterval(this.timer);

    };

    this.reset = function() {
        lapTime = startAt = 0;
    };

    this.time = function() {
        return lapTime + (startAt ? now() - startAt : 0);
    };

    var pad = function(num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
    };

    this.formattedTime = function(){
        var  m, s, ms;
        var newTime = this.time();

        newTime = newTime % (60 * 60 * 1000);
        m = Math.floor( newTime / (60 * 1000) );
        newTime = newTime % (60 * 1000);
        s = Math.floor( newTime / 1000 );
        // Exclude ms;
        /*ms = newTime % 1000;*/
        /*return pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 2);*/
        return pad(m, 2) + ':' + pad(s, 2);
    };

    this.update =  function(){
        return this.formattedTime();
    };
}