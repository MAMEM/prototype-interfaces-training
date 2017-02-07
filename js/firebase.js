var firebaseUsernameHUD;



function registerUser() {

    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(function() {

        var currentUser =  firebase.auth().currentUser;

        if (currentUser != null) {

            user.name = user.firstName + " " + user.lastName;

            // When saving data on first level, save name too (to be used on scoreboard).
            firebase.database().ref('users/' + currentUser.uid + '/userDetails').set({
                "name": user.firstName + " " + user.lastName,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "gender": user.gender,
                "age": user.age
            });

            firebaseUsernameHUD = new createjs.Text(user.name, "18px Roboto", color.textRegular);
            firebaseUsernameHUD.x = parseInt(stage.canvas.width-20, 10);
            firebaseUsernameHUD.y = 20;
            firebaseUsernameHUD.textAlign = "right";
            stage.addChild(firebaseUsernameHUD);

            personalizedFeedback = createFeedback(user.firstName);

        } else {
            return genericText.signedOut;
        }

    }, function(error) { return error.code; });
}


function loginUser() {

    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function() {

        var currentUser =  firebase.auth().currentUser;
        if (currentUser != null) {

            return firebase.database().ref('/users/' + currentUser.uid).once('value').then(function(snapshot) {

                user.firstName = snapshot.val().userDetails.firstName;
                user.lastName = snapshot.val().userDetails.lastName;
                user.name = snapshot.val().userDetails.name;
                user.gender = snapshot.val().userDetails.gender;
                user.age = snapshot.val().userDetails.age;

                firebaseUsernameHUD = new createjs.Text(user.name, "18px Roboto", color.textRegular);
                firebaseUsernameHUD.x = parseInt(stage.canvas.width-20, 10);
                firebaseUsernameHUD.y = 20;
                firebaseUsernameHUD.textAlign = "right";
                stage.addChild(firebaseUsernameHUD);

                personalizedFeedback = createFeedback(user.firstName);

            });

        } else {
            return genericText.signedOut;
        }

    }, function(error) { return error.code; });
}

function updateUserData(group, level, userId, score, time, trophy, metrics, intervals) {

    switch(group) {
        case 0:
            if (level === 0) {

                firebase.database().ref('users/' + userId + '/levels/basic/level1').set({
                    "score": score.current,
                    "ms": time.current,
                    "timeLabel": time.currentFormatted,
                    "trophyGained": trophy.hasIt,
                    "markers": metrics.points,
                    "eval": metrics.eval,
                    "countOnTotal": metrics.countOnTotal,
                    "countOffTotal": metrics.countOffTotal,
                    "intervals": intervals
                });


            } else if (level === 1) {
                firebase.database().ref('users/' + userId + '/levels/basic/level2').set({
                    "score": score.current,
                    "ms": time.current,
                    "timeLabel": time.currentFormatted,
                    "trophyGained": trophy.hasIt,
                    "hits": metrics.hits,
                    "moles": metrics.moles,
                    "intervals": intervals
                });
            }
            break;
        case 1:

            if (level === 0) {
                firebase.database().ref('users/' + userId + '/levels/int/level1').set({
                    "score": score.current,
                    "ms": time.current,
                    "timeLabel": time.currentFormatted,
                    "trophyGained": trophy.hasIt,
                    "countOn": metrics.countOn,
                    "countOff": metrics.countOff,
                    "clicks": metrics.clicks,
                    "hits": metrics.hit
                });
            } else if (level === 1) {
                firebase.database().ref('users/' + userId + '/levels/int/level2').set({
                    "score": score.current,
                    "ms": time.current,
                    "timeLabel": time.currentFormatted,
                    "trophyGained": trophy.hasIt,
                    "clicks": metrics.click,
                    "submit": metrics.submit,
                    "pass": metrics.pass,
                    "fail": metrics.fail
                });

            } else if (level === 2) {
                firebase.database().ref('users/' + userId + '/levels/int/level3').set({
                    "score": score.current,
                    "ms": time.current,
                    "timeLabel": time.currentFormatted,
                    "trophyGained": trophy.hasIt,
                    "copy": metrics.copy,
                    "paste": metrics.paste,
                    "click": metrics.click,
                    "errors": metrics.errors
                });
            }

            break;
        case 2:
            if (level === 0) {
                firebase.database().ref('users/' + userId + '/levels/adv/level1').set({
                    "score": score.current,
                    "ms": time.current,
                    "timeLabel": time.currentFormatted,
                    "trophyGained": trophy.hasIt,
                    "metrics": {
                        "settings": metrics.settings,
                        "general": metrics.general,
                        "gaze_on": metrics.gaze_on,
                        "gaze_off": metrics.gaze_off,
                        "close": metrics.close
                    }
                });
            } else if (level === 1) {
                firebase.database().ref('users/' + userId + '/levels/adv/level2').set({
                    "score": score.current,
                    "ms": time.current,
                    "timeLabel": time.currentFormatted,
                    "trophyGained": trophy.hasIt,
                    "metrics": {
                        "tabs": metrics.tabs,
                        "edit": metrics.edit,
                        "keystroke": metrics.keystroke,
                        "close": metrics.close
                    }
                });
            } else if (level === 2) {
                firebase.database().ref('users/' + userId + '/levels/adv/level3').set({
                    "score": score.current,
                    "ms": time.current,
                    "timeLabel": time.currentFormatted,
                    "trophyGained": trophy.hasIt,
                    "metrics": {
                        "click": metrics.click,
                        "close": metrics.close,
                        "phrase": metrics.phrase
                    }
                });
            } else if (level === 3) {
                firebase.database().ref('users/' + userId + '/levels/adv/level4').set({
                    "score": score.current,
                    "ms": time.current,
                    "timeLabel": time.currentFormatted,
                    "trophyGained": trophy.hasIt,
                    "metrics": {
                        "tabs": metrics.tabs,
                        "bookmark_add": metrics.bookmark_add,
                        "new_tab": metrics.new_tab,
                        "bookmarks": metrics.bookmarks,
                        "select_bookmark": metrics.select_bookmark,
                        "return_to_tabs": metrics.tabs_again
                    }
                });
            }
            break;
    }
}

function createScoreboard(group, level, col) {

    firebase.database().ref("users").once('value').then(function(snapshot) {
        var userData = snapshot.val();
        var key;
        var entity = [];
        var users = [];

        var trophyPath = [];

        switch(group) {
            case 0:

                trophyPath.group = "basic";

                if (level === 0) {

                    trophyPath.level = "level1";

                    for (key in userData) {

                        // skip loop if the property is from prototype
                        if (!userData.hasOwnProperty(key)) continue;
                        if (!userData[key].levels) continue;
                        if (!userData[key].levels.basic) continue;
                        if (!userData[key].levels.basic.level1) continue;

                        console.log(userData[key]);

                        entity = {
                            name: userData[key].userDetails.name,
                            id: key,
                            score: userData[key].levels.basic.level1.score,
                            time: userData[key].levels.basic.level1.timeLabel,
                            trophy: userData[key].levels.basic.level1.trophyGained
                        };
                        users.push(entity);
                    }

                } else if (level === 1) {

                    trophyPath.level = "level2";

                    for (key in userData) {
                        // skip loop if the property is from prototype
                        if (!userData.hasOwnProperty(key)) continue;
                        if (userData[key].userDetails) continue;
                        if (!userData[key].levels) continue;
                        if (!userData[key].levels.basic) continue;
                        if (!userData[key].levels.basic.level2) continue;

                        entity = {
                            name: userData[key].userDetails.name,
                            id: key,
                            score: userData[key].levels.basic.level2.score,
                            time: userData[key].levels.basic.level2.timeLabel,
                            trophy: userData[key].levels.basic.level2.trophyGained
                        };
                        users.push(entity);
                    }
                }
                break;
            case 1:

                trophyPath.group = "int";

                if (level === 0) {

                    trophyPath.level = "level1";

                    for (key in userData) {
                        // skip loop if the property is from prototype
                        if (!userData.hasOwnProperty(key)) continue;
                        if (!userData[key].levels) continue;
                        if (!userData[key].levels.int) continue;
                        if (!userData[key].levels.int.level1) continue;

                        entity = {
                            name: userData[key].userDetails.name,
                            id: key,
                            score: userData[key].levels.int.level1.score,
                            time: userData[key].levels.int.level1.timeLabel,
                            trophy: userData[key].levels.int.level1.trophyGained
                        };
                        users.push(entity);
                    }

                } else if (level === 1) {

                    trophyPath.level = "level2";

                    for (key in userData) {
                        // skip loop if the property is from prototype
                        if (!userData.hasOwnProperty(key)) continue;
                        if (!userData[key].levels) continue;
                        if (!userData[key].levels.int) continue;
                        if (!userData[key].levels.int.level2) continue;

                        entity = {
                            name: userData[key].userDetails.name,
                            id: key,
                            score: userData[key].levels.int.level2.score,
                            time: userData[key].levels.int.level2.timeLabel,
                            trophy: userData[key].levels.int.level2.trophyGained
                        };
                        users.push(entity);
                    }

                } else if (level === 2) {

                    trophyPath.level = "level3";

                    for (key in userData) {
                        // skip loop if the property is from prototype
                        if (!userData.hasOwnProperty(key)) continue;
                        if (!userData[key].levels) continue;
                        if (!userData[key].levels.int) continue;
                        if (!userData[key].levels.int.level3) continue;

                        entity = {
                            name: userData[key].userDetails.name,
                            id: key,
                            score: userData[key].levels.int.level3.score,
                            time: userData[key].levels.int.level3.timeLabel,
                            trophy: userData[key].levels.int.level3.trophyGained
                        };
                        users.push(entity);
                    }
                }
                break;
            case 2:

                trophyPath.group = "adv";

                if (level === 0) {

                    trophyPath.level = "level1";

                    for (key in userData) {
                        // skip loop if the property is from prototype
                        if (!userData.hasOwnProperty(key)) continue;
                        if (!userData[key].levels) continue;
                        if (!userData[key].levels.adv) continue;
                        if (!userData[key].levels.adv.level1) continue;

                        entity = {
                            name: userData[key].userDetails.name,
                            id: key,
                            score: userData[key].levels.adv.level1.score,
                            time: userData[key].levels.adv.level1.timeLabel,
                            trophy: userData[key].levels.adv.level1.trophyGained
                        };
                        users.push(entity);
                    }

                } else if (level === 1) {

                    trophyPath.level = "level2";

                    for (key in userData) {
                        // skip loop if the property is from prototype
                        if (!userData.hasOwnProperty(key)) continue;
                        if (!userData[key].levels) continue;
                        if (!userData[key].levels.adv) continue;
                        if (!userData[key].levels.adv.level2) continue;

                        entity = {
                            name: userData[key].userDetails.name,
                            id: key,
                            score: userData[key].levels.adv.level2.score,
                            time: userData[key].levels.adv.level2.timeLabel,
                            trophy: userData[key].levels.adv.level2.trophyGained
                        };
                        users.push(entity);
                    }

                } else if (level === 2) {

                    trophyPath.level = "level3";

                    for (key in userData) {
                        // skip loop if the property is from prototype
                        if (!userData.hasOwnProperty(key)) continue;
                        if (!userData[key].levels) continue;
                        if (!userData[key].levels.adv) continue;
                        if (!userData[key].levels.adv.level3) continue;

                        entity = {
                            name: userData[key].userDetails.name,
                            id: key,
                            score: userData[key].levels.adv.level3.score,
                            time: userData[key].levels.adv.level3.timeLabel,
                            trophy: userData[key].levels.adv.level3.trophyGained
                        };
                        users.push(entity);
                    }
                } else if (level === 3) {

                    trophyPath.level = "level4";

                    for (key in userData) {
                        // skip loop if the property is from prototype
                        if (!userData.hasOwnProperty(key)) continue;
                        if (!userData[key].levels) continue;
                        if (!userData[key].levels.adv) continue;
                        if (!userData[key].levels.adv.level4) continue;

                        entity = {
                            name: userData[key].userDetails.name,
                            id: key,
                            score: userData[key].levels.adv.level4.score,
                            time: userData[key].levels.adv.level4.timeLabel,
                            trophy: userData[key].levels.adv.level4.trophyGained
                        };
                        users.push(entity);
                    }
                }

                break;
        }

        // Sort the array
        users.sort(function(a, b) {
            return parseInt(b.score) - parseInt(a.score);
        });

        // Keep only top 5
        if (users.length > 6) {
            users = users.slice(0,5);
        }

        var rankingsLabels = [];
        rankingsLabels.title = new createjs.Text(genericText.rankings, "700 24px Roboto", color.whitePimary);
        rankingsLabels.title.x = col.x;
        rankingsLabels.title.y = col.y + 100;
        rankingsLabels.title.textAlign = "left";

        if (RTL) {
            rankingsLabels.title.textAlign = "right";
            rankingsLabels.title.x = (3 * col.width);
        }

        rankingsLabels.posLabel = new createjs.Text("#", "400 22px Roboto", color.whitePimary);
        rankingsLabels.posLabel.x = col.x + 5;
        rankingsLabels.posLabel.y = col.y + 130;
        rankingsLabels.posLabel.textAlign = "left";

        rankingsLabels.nameLabel = new createjs.Text(genericText.name, "400 22px Roboto", color.whitePimary);
        rankingsLabels.nameLabel.x = col.x + 30;
        rankingsLabels.nameLabel.y = col.y + 130;
        rankingsLabels.nameLabel.textAlign = "left";

        rankingsLabels.scoreLabel = new createjs.Text(genericText.score, "400 22px Roboto", color.whitePimary);
        rankingsLabels.scoreLabel.x = col.width + (2 * col.x);
        rankingsLabels.scoreLabel.y = col.y + 130;
        rankingsLabels.scoreLabel.textAlign = "left";

        rankingsLabels.timeLabel = new createjs.Text(genericText.time, "400 22px Roboto", color.whitePimary);
        rankingsLabels.timeLabel.x = (2 * col.width) - col.x;
        rankingsLabels.timeLabel.y = col.y + 130;
        rankingsLabels.timeLabel.textAlign = "left";

        rankingsLabels.rewardsLabel = new createjs.Text(genericText.rewards, "400 22px Roboto", color.whitePimary);
        rankingsLabels.rewardsLabel.x = (2 * col.width) + (3* col.x);
        rankingsLabels.rewardsLabel.y = col.y + 130;
        rankingsLabels.rewardsLabel.textAlign = "left";

        rankingsLabels.separator = new createjs.Shape();
        rankingsLabels.separator.graphics.beginFill(color.whitePimary);
        rankingsLabels.separator.graphics.drawRect(col.x, col.y + 158, (3 * col.width) - col.x, 2);
        rankingsLabels.separator.graphics.endFill();

        stage.addChild(rankingsLabels.title, rankingsLabels.posLabel, rankingsLabels.nameLabel, rankingsLabels.scoreLabel, rankingsLabels.timeLabel, rankingsLabels.rewardsLabel,  rankingsLabels.separator);

        var pos = [rankingsLabels.posLabel.x, rankingsLabels.nameLabel.x, rankingsLabels.scoreLabel.x, rankingsLabels.timeLabel.x, rankingsLabels.rewardsLabel.x];

        var rankingUser = [];
        for (i=0;i<users.length;i++) {
            rankingUser[i] = [];
        }

        var i;
        var firebaseUser = firebase.auth().currentUser;
        for (i=0;i<users.length;i++) {

            rankingUser[i].trophy = users[i].trophy ? new createjs.Bitmap("assets/trophies/" + trophyPath.group +"-"+ trophyPath.level +"-on.png") : new createjs.Bitmap("assets/trophies/" + trophyPath.group +"-"+ trophyPath.level +"-off.png") ;
            rankingUser[i].trophy.setTransform(0,0,0.7,0.7);

            if (firebaseUser.uid === users[i].id) {
                rankingUser[i].pos = new createjs.Text(i+1, "500 18px Roboto", color.yellow);
                rankingUser[i].name = new createjs.Text(users[i].name, "400 18px Roboto", color.yellow);
                rankingUser[i].score = new createjs.Text(users[i].score, "400 18px Roboto", color.yellow);
                rankingUser[i].time = new createjs.Text(users[i].time, "400 18px Roboto", color.yellow);

            } else {
                rankingUser[i].pos = new createjs.Text(i+1, "400 18px Roboto", color.whitePimary);
                rankingUser[i].name = new createjs.Text(users[i].name, "300 18px Roboto", color.whitePimary);
                rankingUser[i].score = new createjs.Text(users[i].score, "300 18px Roboto", color.whitePimary);
                rankingUser[i].time = new createjs.Text(users[i].time, "300 18px Roboto", color.whitePimary);

            }

            rankingUser[i].pos.x = pos[0];
            rankingUser[i].pos.y = col.y + 170 + (i*20);
            rankingUser[i].pos.textAlign = "left";
            rankingUser[i].name.x = pos[1];
            rankingUser[i].name.y = col.y + 170 + (i*20);
            rankingUser[i].name.textAlign = "left";
            rankingUser[i].score.x = pos[2];
            rankingUser[i].score.y = col.y + 170 + (i*20);
            rankingUser[i].score.textAlign = "left";
            rankingUser[i].time.x = pos[3];
            rankingUser[i].time.y = col.y + 170 + (i*20);
            rankingUser[i].time.textAlign = "left";
            rankingUser[i].trophy.x = pos[4];
            rankingUser[i].trophy.y = col.y + 170 + (i*20);

            stage.addChild(rankingUser[i].pos, rankingUser[i].name, rankingUser[i].score, rankingUser[i].time, rankingUser[i].trophy);
        }
    });
}