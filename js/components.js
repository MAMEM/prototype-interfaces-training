var color = [];
color.cursor = "rgba(96,125,139, 0.54)";
color.transparent = "rgba(0,0,0,0)";
color.whitePimary = "rgb(255,255,255)";
color.whiteSecondary = "rgba(255,255,255,0.87)";
color.whiteHint = "rgba(255,255,255,0.54)";
color.darkGray = "rgba(0,0,0,0.54)";
color.gray = "rgba(0,0,0,0.23)";

color.blue = "rgb(95,125,139)";
color.red = "#FF3737";
color.green = "#50BAA6";
color.yellow = "rgb(255,235,59)";
color.brown = "rgb(136,104,105)";
color.darkBrown = "rgb(45,39,35)";

color.barGreen = "#64DD17";
color.barYellow = "#FFEB3B";
color.barRed = "#F44336";


color.textRegular = "rgba(0,0,0,0.87)";

var textSize = [];
textSize.mini = "400 14px Roboto";

// S-shaped curve Evaluation ratio
var evaluationRatio = 130 / 100;

var scoreThreshold = [];
scoreThreshold.level23 = 5000;
scoreThreshold.level31 = 20000;
scoreThreshold.level32 = 20000;
scoreThreshold.level33 = 20000;
scoreThreshold.level34 = 20000;

var scoreBounds = [];
scoreBounds.level11 = 100000;
scoreBounds.level12 = 100000;
scoreBounds.level21 = 100000;
scoreBounds.level22 = 100000;
scoreBounds.level23 = 100000;
scoreBounds.level31 = 100000;
scoreBounds.level32 = 100000;
scoreBounds.level33 = 100000;
scoreBounds.level34 = 100000;

var interval = [];
interval.normal = 1500;
interval.markerHover = 3000;
interval.markerFocus = 2000;

interval.markerDuration = 4000;

var introStoryContainer;

var Button = function (fillColor, size, pos, text, action) {

    this.btn = new createjs.Shape();
    this.btn.graphics.beginFill(fillColor).drawRect(0, 0, size.x, size.y);
    this.btn.x = pos.x + size.x/2;
    this.btn.y = pos.y + size.y/2;
    this.btn.regX = size.x/2;
    this.btn.regY = size.y/2;

    this.btn.outColor = fillColor;
    this.btn.overColor = color.gray;

    var timeout;
    var self = this;

    this.btn.addEventListener("mouseover", function(event) {

        // Send LSL Message
        if (window.loggingMediator) {
            SendLSLMessage("event__mouse_over");
        }

        self.btn.hoverFill = new createjs.Shape().set({
            x: self.btn.x,
            y: self.btn.y,
            scaleX: 0,
            scaleY: 0,
            regX: self.btn.regX,
            regY: self.btn.regY
        });

        self.btn.hoverFill.graphics
            .beginFill(self.btn.overColor)
            .drawRect(0, 0, size.x, size.y);

        stage.addChild(self.btn.hoverFill);

        createjs.Ticker.addEventListener("tick", mouseTick);

        createjs.Tween.get(self.btn.hoverFill)
            .to({
                scaleX:1,
                scaleY:1,
                x: self.btn.x,
                y: self.btn.y
            }, interval.normal, createjs.Ease.quadInOut);

        changeCursor(true);

        timeout = setTimeout(action, interval.normal);
    });


    this.btn.addEventListener("mouseout", function(event) {

        // Send LSL Message
        if (window.loggingMediator) {
            SendLSLMessage("event__mouse_out");
        }

        changeCursor(false);
        createjs.Ticker.removeEventListener("tick", mouseTick);

        createjs.Tween.removeTweens(self.btn.hoverFill);
        stage.removeChild(self.btn.hoverFill);

        window.clearTimeout(timeout);

    });

    this.label = new createjs.Text(text, "500 28px Roboto", color.whitePimary);
    this.label = centerElement(size, pos, this.label);

    return this;
};