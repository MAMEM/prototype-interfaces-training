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

var scoreThreshold = [];
scoreThreshold.level11 = 20000;
scoreThreshold.level12 = 20000;
scoreThreshold.level21 = 20000;
scoreThreshold.level22 = 20000;
scoreThreshold.level23 = 5000;

var scoreBounds = [];
scoreBounds.level11 = 100000;
scoreBounds.level12 = 100000;
scoreBounds.level21 = 100000;
scoreBounds.level22 = 100000;
scoreBounds.level23 = 100000;

var interval = [];
interval.normal = 1500;
interval.markerHover = 3000;
interval.markerFocus = 2000;

interval.markerDuration = 4000;

var introStoryContainer;

var Button = function (fillColor, size, pos, text, action) {

    this.btn = new createjs.Shape();
    this.btn.graphics.beginFill(fillColor).drawRect(10, 0, size.x-20, size.y);
    this.btn.x = pos.x;
    this.btn.y = pos.y;

    this.btn.outColor = fillColor;
    this.btn.overColor = '';

    var timeout;
    this.btn.addEventListener("mouseover", function(event) {
        changeCursor(true);
        createjs.Ticker.addEventListener("tick", mouseTick);
        timeout = setTimeout(action, interval.normal);
    });


    this.btn.addEventListener("mouseout", function(event) {
        changeCursor(false);
        createjs.Ticker.removeEventListener("tick", mouseTick);

        window.clearTimeout(timeout);

    });

    this.label = new createjs.Text(text, "500 48px Roboto", color.whitePimary);
    this.label = centerElement(size, pos, this.label);

    return this;
};