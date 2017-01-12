function tick(event)
{
    stage.update();
}

function resizeCanvas() {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;

    stage.canvas.width = window.innerWidth - 20;
    stage.canvas.height = window.innerHeight - 20;
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

function loadLvlStructure(fullTitle, shortTitle, description) {
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

    timer.text = new createjs.Text("00:00:00", "Italic 24px Roboto", color.gray);
    timer.text.x = timer.icon.x + 43;
    timer.text.y = 75;
    timer.text.textAlign = "left";

    var mainTitle = new createjs.Text(shortTitle, "48px Roboto", color.green);
    mainTitle = alignTextToStageCenter(stage, mainTitle);
    mainTitle.y = 160;
    var mainTitleBounds = mainTitle.getBounds();

    var poe = window.innerWidth/2 - mainTitleBounds.width/2 - 60;

    var smallSeparator = new createjs.Shape();
    smallSeparator.graphics.beginFill(color.gray);
    smallSeparator.graphics.drawRect(poe, 216, mainTitleBounds.width + 100, 1);
    smallSeparator.graphics.endFill();

    var descriptionText = new createjs.Text(description, "22px Roboto", color.blue);
    descriptionText = alignTextToStageCenter(stage, descriptionText);
    descriptionText.y = 220;

    var levelStructureContainer = new createjs.Container();
    levelStructureContainer.addChild(polygon, bigSeparator, levelTitle, timer.icon, timer.text, mainTitle, smallSeparator, descriptionText);
    stage.addChild(levelStructureContainer);

    return levelStructureContainer;
}

function loadLvlIntroStory(script) {

    // Add speech bubble & story text
    var speechBubbleContainer = [];
    speechBubbleContainer.width = window.innerWidth - 500;
    speechBubbleContainer.x = 250;
    speechBubbleContainer.y = 260;

    var bubbleText = new createjs.Text(script, "500 18px Roboto", color.textRegular);
    bubbleText.x = speechBubbleContainer.x + 20;
    bubbleText.y = speechBubbleContainer.y + 20;
    bubbleText.lineWidth = speechBubbleContainer.width - 40;
    bubbleText.lineHeight = 26;

    var textBounds = bubbleText.getBounds();
    speechBubbleContainer.height = textBounds.height + 60;

    var speechBubble = new Image();
    speechBubble.onload = function() { stage.update(); };
    speechBubble.src = "assets/speechBubble.png";
    var sb = new createjs.ScaleBitmap(speechBubble, new createjs.Rectangle(12, 12, 5, 10));
    sb.setDrawSize(speechBubbleContainer.width, speechBubbleContainer.height);
    sb.x = speechBubbleContainer.x;
    sb.y = speechBubbleContainer.y;

    var face = new createjs.Bitmap("assets/face-default.png");
    face.x = window.innerWidth - face.image.width - 200;
    face.y = sb.y + speechBubbleContainer.height;

    introStoryContainer = new createjs.Container();

    introStoryContainer.addChild(sb, bubbleText, face);
    stage.addChild(introStoryContainer);

    return introStoryContainer;

}

function loadLvlOutroStory(poe, completion) {

    var speechBubbleContainer = [];
    speechBubbleContainer.width = window.innerWidth - 500;
    speechBubbleContainer.x = 250;
    speechBubbleContainer.y = poe.y + 40;

    var bubbleText;
    var face;

    if (completion) {

        if (completion === 'trophy') {

            bubbleText = new createjs.Text(textString.levelSuperComplete, "500 18px Roboto", color.textRegular);
            face = new createjs.Bitmap("assets/face-happy.png");

        }
        else {

            bubbleText = new createjs.Text(textString.levelComplete, "500 18px Roboto", color.textRegular);
            face = new createjs.Bitmap("assets/face-default.png");
        }

    } else {

        bubbleText = new createjs.Text(textString.levelIncomplete, "500 18px Roboto", color.textRegular);
        face = new createjs.Bitmap("assets/face-sad.png");
    }

    bubbleText.x = speechBubbleContainer.x + 20;
    bubbleText.y = speechBubbleContainer.y + 40;
    bubbleText.lineWidth = speechBubbleContainer.width - 40;
    bubbleText.lineHeight = 26;

    var textBounds = bubbleText.getBounds();
    speechBubbleContainer.height = textBounds.height + 60;

    var speechBubble = new Image();
    speechBubble.onload = function() { stage.update(); };
    speechBubble.src = "assets/speechBubbleInv.png";
    var sb = new createjs.ScaleBitmap(speechBubble, new createjs.Rectangle(10, 26, 5, 15));
    sb.setDrawSize(speechBubbleContainer.width, speechBubbleContainer.height);
    sb.x = speechBubbleContainer.x;
    sb.y = speechBubbleContainer.y;

    face.x = window.innerWidth - face.image.width - 100;
    face.y = 5;

    var outroStoryContainer = new createjs.Container();

    outroStoryContainer.addChild(sb, bubbleText, face);

    return outroStoryContainer;
}


function initializeResultsValues(group, level, stopwatch, score, time, trophy) {

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
            }
            break;
    }

    trophy.info = trophiesArray[id];

    trophy.img = new createjs.Bitmap("assets/trophies/" + trophy.info.group +"-"+trophy.info.level+"-off.png");
    trophy.title = new createjs.Text(trophy.info.title, "Italic 20px Roboto", color.whiteSecondary);
    trophy.desc = new createjs.Text(trophy.info.description, "14px Roboto", color.whiteHint);
    trophy.hasIt = trophy.current;

    score.saved = "No score";
    score.previousValue = new createjs.Text(score.saved, "Italic 20px Roboto", color.whiteSecondary);
    score.currentValue = new createjs.Text(score.current, "Italic 20px Roboto", color.yellow);

    time.saved = " ";
    time.current = stopwatch.time();
    time.currentFormatted = stopwatch.formattedTime();
    time.previousValue = new createjs.Text(time.saved, "Italic 20px Roboto", color.whiteSecondary);
    time.currentValue = new createjs.Text(time.currentFormatted, "Italic 20px Roboto", color.yellow);

    return [trophy, score, time];
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

function calculateNewMetrics(metrics, savedMetrics) {
    metrics.countOn = metrics.countOn < savedMetrics.countOn ? metrics.countOn : savedMetrics.countOn;
    metrics.countOff = metrics.countOff < savedMetrics.countOff ? metrics.countOff : savedMetrics.countOff;
    return metrics;
}

function positionResultsElements(score, time, trophy, col, label, separator) {

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

    trophy.img.x = col.x + (2 * col.width);
    trophy.img.y = col.y + 34;

    trophy.title.x = col.x + (2 * col.width) + 34;
    trophy.title.y = col.y + 36;

    trophy.desc.x = col.x + (2 * col.width);
    trophy.desc.y = col.y + 64;
    trophy.desc.lineWidth = col.width - col.x;


    label.score = new createjs.Text(genericText.score.toUpperCase(), "700 24px Roboto", color.whitePimary);
    label.score.x = col.x;
    label.score.y = col.y;

    separator.score = new createjs.Shape();
    separator.score.graphics.beginFill(color.whitePimary);
    separator.score.graphics.drawRect(label.score.x, col.y + 30, col.width - col.x, 2);
    separator.score.graphics.endFill();

    label.currentScore = new createjs.Text(genericText.newScore, "700 14px Roboto", color.whiteSecondary);
    label.currentScore.x = col.x;
    label.currentScore.y = col.y + 34;
    label.currentScore.textAlign = "left";

    label.previousScore = new createjs.Text(genericText.best, "700 14px Roboto", color.whiteSecondary);
    label.previousScore.x = col.width;
    label.previousScore.y = col.y + 34;
    label.previousScore.textAlign = "right";

    label.time = new createjs.Text(genericText.time.toUpperCase(), "700 24px Roboto", color.whitePimary);
    label.time.x = col.x + col.width;
    label.time.y = col.y;

    separator.time = new createjs.Shape();
    separator.time.graphics.beginFill(color.whitePimary);
    separator.time.graphics.drawRect(label.time.x, col.y + 30, col.width - col.x, 2);
    separator.time.graphics.endFill();

    label.currentTime = new createjs.Text(genericText.newScore, "700 14px Roboto", color.whiteSecondary);
    label.currentTime.x = col.x + col.width;
    label.currentTime.y = col.y + 34;
    label.currentTime.textAlign = "left";

    label.previousTime = new createjs.Text(genericText.best, "700 14px Roboto", color.whiteSecondary);
    label.previousTime.x = 2 * col.width;
    label.previousTime.y = col.y + 34;
    label.previousTime.textAlign = "right";

    label.rewards = new createjs.Text(genericText.rewards.toUpperCase(), "700 24px Roboto", color.whitePimary);
    label.rewards.x = col.x + (2 * col.width);
    label.rewards.y = col.y;

    separator.rewards = new createjs.Shape();
    separator.rewards.graphics.beginFill(color.whitePimary);
    separator.rewards.graphics.drawRect(label.rewards.x, col.y + 30, col.width - col.x, 2);
    separator.rewards.graphics.endFill();

    return [score, time, trophy, label, separator];

}

function positionResultsFooterElements(col, resultsPopup, poe) {

    var button = [];

    button.overview = new createjs.Shape();
    button.overview.graphics.beginFill(color.green).drawRect(col.x, resultsPopup.height + poe.y - 20, col.width - col.x, 100);

    button.overview.icon = new createjs.Bitmap("assets/ic_overview.png");
    button.overview.icon.x = col.width/2 - col.x;
    button.overview.icon.y = resultsPopup.height + poe.y + 10;

    button.overview.label = new createjs.Text(genericText.overview, "22px Roboto", color.whitePimary);
    button.overview.label.x = col.width/2 - col.x + 56;
    button.overview.label.y = resultsPopup.height + poe.y + 20;

    button.replay = new createjs.Shape();
    button.replay.graphics.beginFill(color.green).drawRect(col.x + col.width, resultsPopup.height + poe.y - 20, col.width - col.x, 100);

    button.replay.icon = new createjs.Bitmap("assets/ic_replay.png");
    button.replay.icon.x = col.width + (col.width/2 - col.x);
    button.replay.icon.y = resultsPopup.height + poe.y + 10;

    button.replay.label = new createjs.Text(genericText.replay, "22px Roboto", color.whitePimary);
    button.replay.label.x = col.width + (col.width/2 - col.x) + 56;
    button.replay.label.y = resultsPopup.height + poe.y + 20;

    button.next = new createjs.Shape();
    button.next.graphics.beginFill(color.green).drawRect(col.x + (2 * col.width), resultsPopup.height + poe.y - 20, col.width - col.x, 100);

    button.next.icon = new createjs.Bitmap("assets/ic_next.png");
    button.next.icon.x = (2 * col.width) + (col.width - (2 * col.x));
    button.next.icon.y = resultsPopup.height + poe.y + 10;

    button.next.label = new createjs.Text(genericText.next, "22px Roboto", color.whitePimary);
    button.next.label.x = (2 * col.width) + (col.width/2 - col.x) + 80;
    button.next.label.y = resultsPopup.height + poe.y + 20;

    return button;
}

function addTutorials(textPointer) {

    var container = new createjs.Container();

    var clickBtn, clickBtnLabel, labelBounds;

    switch(textPointer) {
        case 2:

            var arrUp = new createjs.Bitmap("assets/arrow.png");
            arrUp.x = window.innerWidth/2 + 300;
            arrUp.y = 100;
            arrUp.rotation = -180;
            var arrUpLabel = new createjs.Text(genericText.arrScrollUp, "500 32px Roboto", color.blue);
            arrUpLabel.x = arrUp.x + 30;
            arrUpLabel.y = arrUp.y - 60;

            var arrDown = new createjs.Bitmap("assets/arrow.png");
            arrDown.x = (window.innerWidth/2) + 35;
            arrDown.y = window.innerHeight - 200;
            arrDown.rotation = 90;
            var arrDownLabel = new createjs.Text(genericText.arrScrollDown, "500 32px Roboto", color.blue);
            arrDownLabel = alignTextToStageCenter(stage, arrDownLabel);
            arrDownLabel.y = arrDown.y - 50;

            clickBtn = new createjs.Bitmap("assets/arrow.png");
            clickBtn.x = window.innerWidth - 140;
            clickBtn.y = window.innerHeight * (50/100);
            clickBtnLabel = new createjs.Text(genericText.clickEmu, "500 32px Roboto", color.blue);
            labelBounds = clickBtnLabel.getBounds();
            clickBtnLabel.regX = labelBounds.width;
            clickBtnLabel.x = window.innerWidth - 50;
            clickBtnLabel.y = clickBtn.y + 80;

            var arrScrollBtn = new createjs.Bitmap("assets/arrow.png");
            arrScrollBtn.x = window.innerWidth - 140;
            arrScrollBtn.y = window.innerHeight * (68/100);
            var arrScrollBtnLabel = new createjs.Text(genericText.arrScrollBtn, "500 32px Roboto", color.blue);
            labelBounds = arrScrollBtnLabel.getBounds();
            arrScrollBtnLabel.regX = labelBounds.width;
            arrScrollBtnLabel.x = window.innerWidth - 50;
            arrScrollBtnLabel.y = arrScrollBtn.y + 80;


            container.addChild(arrUp, arrUpLabel, arrDown, arrDownLabel, clickBtn, clickBtnLabel, arrScrollBtn, arrScrollBtnLabel);

            break;
        case 3:

            clickBtn = new createjs.Bitmap("assets/arrow.png");
            clickBtn.x = window.innerWidth - 140;
            clickBtn.y = window.innerHeight * (50/100);
            clickBtnLabel = new createjs.Text(genericText.clickEmu, "500 32px Roboto", color.blue);
            labelBounds = clickBtnLabel.getBounds();
            clickBtnLabel.regX = labelBounds.width;
            clickBtnLabel.x = window.innerWidth - 50;
            clickBtnLabel.y = clickBtn.y + 80;

            var zoomBtn = new createjs.Bitmap("assets/arrow.png");
            zoomBtn.x = window.innerWidth - 140;
            zoomBtn.y = window.innerHeight * (82/100);
            var zoomBtnLabel = new createjs.Text(genericText.zoomBtn, "500 32px Roboto", color.blue);
            labelBounds = zoomBtnLabel.getBounds();
            zoomBtnLabel.regX = labelBounds.width;
            zoomBtnLabel.x = window.innerWidth - 50;
            zoomBtnLabel.y = zoomBtn.y + 80;

            container.addChild(clickBtn, clickBtnLabel, zoomBtn, zoomBtnLabel);
            break;

        case 4:

            var textSelBtn = new createjs.Bitmap("assets/arrow.png");
            textSelBtn.x = window.innerWidth - 140;
            textSelBtn.y = window.innerHeight * (20/100);
            var textSelBtnLabel = new createjs.Text(genericText.textSelBtn, "500 32px Roboto", color.blue);
            labelBounds = textSelBtnLabel.getBounds();
            textSelBtnLabel.regX = labelBounds.width;
            textSelBtnLabel.x = window.innerWidth - 50;
            textSelBtnLabel.y = textSelBtn.y + 80;

            clickBtn = new createjs.Bitmap("assets/arrow.png");
            clickBtn.x = window.innerWidth - 140;
            clickBtn.y = window.innerHeight * (50/100);
            clickBtnLabel = new createjs.Text(genericText.clickEmu, "500 32px Roboto", color.blue);
            labelBounds = clickBtnLabel.getBounds();
            clickBtnLabel.regX = labelBounds.width;
            clickBtnLabel.x = window.innerWidth - 50;
            clickBtnLabel.y = clickBtn.y + 80;

            container.addChild(clickBtn, clickBtnLabel, textSelBtn, textSelBtnLabel);
            break;
    }

    return container;
}

function getRandomInt(idx, min, max) {
    var newVal = Math.floor(Math.random() * (max - min + 1)) + min;

    if (newVal === idx) {
        return getRandomInt(idx, min, max);
    }

    return newVal;
}

function handleGTWMessages(str) {
    console.log(str);
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
        ms = newTime % 1000;

        return pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 2);
    };

    this.update =  function(){
        return this.formattedTime();
    };
}