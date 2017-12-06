var randomFeedbackFlag = 10;

var user = [];
var personalizedFeedback;

var defaultFeedback = [];
defaultFeedback.positive = "סיימתם את השלב בהצלחה, אתם יכולים להמשיך לשלב הבא";
defaultFeedback.neutral = "סיימתם את השלב בהצלחה, אתם יכולים לשחק שוב או להמשיך לשלב הבא";
defaultFeedback.negative = "לא סיימתם את השלב בהצלחה";

// Translate everything inside " " but be careful to not change what is inside + +.
function createFeedback() {

    personalizedFeedback = {

        youngMale: {

            positive: [
                "ציון טוב, זכית גם בגביע "+ user.firstName +" Wow",
                "קיבלת ציון ממש טוב, סיימת את השלב בצורה מוצלחת וקיבלת את הגביע " + user.firstName ,
                "הביצוע שלך הכי טוב " + user.firstName + " ,הרווחת את הגביע"
            ],
            neutral: [
                "סיימת את השלב. ניתן לבצע שוב את השלב ולזכות בגביע " + user.firstName ,
                'אם תקבל ציון טוב יותר בפעם הבאה, תקבל גביע '+ user.firstName  + "ברכות על סיום השלב" ,
                'נסה להשתפר כדי לזכות בגביע,'+ user.firstName + " הביצוע שלך היה מוצלח"
            ],
            negative: [
                'אתה יכול לבצע טוב יותר. נסה שוב כדי לקבל את הגביע,' + user.firstName ,
                "נסה שוב כדי להרוויח את הגביע " + user.firstName + 'אתה יכול לבצע טוב יותר'
            ]
        },

        oldMale: {

            positive: [
                "ציון טוב, זכית גם בגביע " + user.firstName +" Wow",
                "קיבלת ציון ממש טוב. סיימת את השלב בצורה מוצלחת וקיבלת את הגביע " + user.firstName ,
                "הביצוע שלך הכי טוב"  + user.firstName + " ,הרווחת את הגביע"
            ],
            neutral: [
                "סיימת את השלב. ניתן לבצע שוב את השלב ולזכות בגביע " + user.firstName ,
                'אם תקבל ציון טוב יותר בפעם הבאה, תקבל גביע '+ user.firstName  + " ברכות על סיום השלב"
            ],
            negative: [
                "אנו בטוחים שאתה יכול לקבל ציון טוב יותר, נסה שוב " +  user.firstName,
                "נסה שוב את השלב, היית קרוב לקבל ציון טוב"  + user.firstName
            ]
        },

        youngFemale: {

            positive: [
                "ציון טוב, זכית גם בגביע "+ user.firstName +" Wow",
                "קיבלת ציון ממש טוב. סיימת את השלב בצורה מוצלחת וקיבלת את הגביע " + user.firstName ,
                "הביצוע שלך הכי טוב " + user.firstName + " ,הרווחת את הגביע"
            ],
            neutral: [
                "סיימת את השלב. ניתן לבצע שוב את השלב ולזכות בגביע " + user.firstName ,
                'אם תקבלי ציון טוב יותר בפעם הבאה, תקבל גביע '+ user.firstName  + " ברכות על סיום השלב"
            ],
            negative: [
                "אנו בטוחים שאת יכולה לקבל ציון טוב יותר, נסי שוב " +  user.firstName,
                "נסי שוב את השלב, היית קרובה לקבל ציון טוב " + user.firstName
            ]
        },

        oldFemale: {

            positive: [
                "ציון טוב, זכית גם בגביע "+ user.firstName +" Wow",
                "קיבלת ציון ממש טוב. סיימת את השלב בצורה מוצלחת וקיבלת את הגביע " + user.firstName ,
                "הביצוע שלך הכי טוב"  + user.firstName + " ,הרווחת את הגביע"
            ],
            neutral: [
                "סיימת את השלב. ניתן לבצע שוב את השלב ולזכות בגביע " + user.firstName ,
                'אם תקבלי ציון טוב יותר בפעם הבאה, תקבל גביע'+ user.firstName  + " ברכות על סיום השלב"
            ],
            negative: [
                "אנו בטוחים שאת יכולה לקבל ציון טוב יותר, נסי שוב " +  user.firstName,
                "נסי שוב את השלב, היית קרובה לקבל ציון טוב " + user.firstName
            ]
        }
    };

    return personalizedFeedback;
}


// Translate all phrases inside " "
var levelText = [
    {
        fullTitle: "בסיסי - 01 התמקדות בסימנים",
        shortTitle: "התמקדות בסימנים",
        story: "נסו להתמקד בסדרת הסימנים. קבלו את הגביע אם תתמקדו על כל סימן רק פעם אחת"
    },
    {
        fullTitle: "בסיסי - 02 התמקדות בסדרה של סימנים",
        shortTitle: "הכה את החפרפרת",
        story: "נסו להתמקד עם העיניים על כל סמן כאשר הוא מופיע למשך פרק זמן מוגדר. הכו את כל הסמנים להרוויח את הגביע"
    },
    {
        fullTitle: "בינוני - 01 מצא את הקוסם",
        shortTitle: "מצא את הקוסם",
        story: " יש לגלול את המסך כדי למצוא את המכשף באמצעות כפתורי הגלילה או הגלילה אוטומטית, ולהשתמש בלחצן כדי לסמן את המקום בו הקוסם מתחבא! בקרו בכל המקומות רק פעם אחת כדי להרוויח את הגביע"
    },
    {
        fullTitle: "בינוני - 02 חידון",
        shortTitle: "החידון",
        story: " מצאתם את הקוסם! עכשיו הוא מזמין אתכם לשחק בחידון. השתמשו בלחצני ההגדלה\\הקטנה כדי לראות את התשובות והקלידו את התשובה הנכונה לכל שאלה באמצעות המקלדת. תשובה נכונה לכל השאלות ותרוויחו את הגביע"
    },
    {
        fullTitle: "בינוני - 03 מצא את האוצר",
        shortTitle: "המפה",
        story: " יש לפתוח את המפה באמצעות הלחצן, ואז להשתמש באפשרויות העתק והדבק כדי למצוא את האוצר. הצליחו בניסיון הראשון כדי לקבל את הגביע"
    },
    {
        fullTitle: "מתקדם - 01 ויזואליזציה למבט",
        shortTitle: "הגדרות – ויזואליזציה למבט",
        story: " חשפתם את מיקומו של האוצר ברמות הקודמות. עכשיו יש לעבור בנתיב עם ארבעה מוקדים כדי למצוא את האוצר, תוך כדי למידה כיצד להשתמש בכלים ייחודיים של התוכנה. נסו לפעול על פי ההוראות מבלי לבצע את אותה פעולה פעמיים כדי לקבל את הגביע"
    },
    {
        fullTitle: "מתקדם - 02 הקלדת כתובת",
        shortTitle: "הקלדת כתובת",
        story: " למדו כיצד לערוך כתובת אינטרנט בדפדפן. נסו לפעול על פי ההוראות מבלי לבצע את אותה פעולה פעמיים כדי לקבל את הגביע"
    },
    {
        fullTitle: "מתקדם - 03 ניבוי כתיבה",
        shortTitle: "ניבוי כתיבה",
        story: " למדו כיצד לכתוב עם ניבוי טקסט. נסו לפעול על פי ההוראות מבלי לבצע את אותה פעולה פעמיים כדי לקבל את הגביע"
    },
    {
        fullTitle: "מתקדם - 04 סימניות",
        shortTitle: " סימניות",
        story: " למדו כיצד ליצור סימניה. נסו לפעול על פי ההוראות מבלי לבצע את אותה פעולה פעמיים כדי לקבל את הגביע"
    }
];


// In here put the translated question & answers that you have from inside the docx you sent me. (in the empty strings)
var quizText = [
    {
        question: " מהו המאכל המזוהה ביותר עם ישראל מהבאים",
        answer1: "פלאפל",
        answer2: "פיצה",
        answer3: "רגלי צפרדע",
        answer4: "המבורגר",
        answer1_en: "falafel", // Don't translate this!
        answer2_en: "pizza", // Don't translate this!
        answer3_en: "frog legs", // Don't translate this!
        answer4_en: "hamburger", // Don't translate this!
        correct: "falafel", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: " מיהו האבא של יעקב ועשו",
        answer1: "שלמה",
        answer2: "דויד",
        answer3: "אברהם",
        answer4: "יצחק",
        answer1_en: "solomon", // Don't translate this!
        answer2_en: "david", // Don't translate this!
        answer3_en: "abraham", // Don't translate this!
        answer4_en: "yitzhak ", // Don't translate this!
        correct: "yitzhak ", // Don't translate this!
        cat: "Easy" // Don't translate this!
    }
];

// Translate all phrases inside " "
var genericText =
    {
        gazeTheWeb: "Gaze The Web",
        subTitle: "למדו איך להפעיל את הדפדפן",
        play: "הפעל",
        replay: "הפעל שוב",
        levelSelect: "בחר שלב",
        basic: "בסיסי",
        intermediate: "בינוני",
        advanced: "מתקדם",
        completed: "הושלם",
        trophies: "גביעים",
        score: "ציון",
        newScore: "חדש",
        best: "הטוב ביותר",
        time: "זמן",
        rewards: "פרסים",
        rankings: "דירוגים – חמשת הטובים ביותר",
        name: "שם",
        overview: "סקירה",
        next: "הבא",
        start: "התחל",
        startingIn: "מתחיל ב",
        hit: "פגיעה",
        arrScrollUp: "גלול למעלה",
        arrScrollDown: "גלול למטה",
        arrBackBtn: "חזור",
        arrScrollBtn: "גלילה אוטומטית",
        clickEmu: "לחצן",
        zoomBtn: "ZOOM",
        textSelBtn: "בחירת טקסט",
        question: "שאלה",
        lvl3ScrollDownA: "גלול למטה ועקוב אחרי הנהר",
        lvl3ScrollDownB: "כדי למצוא את הקוסם",
        lvl3Village: "כפר",
        lvl3BRB: "תכף אשוב",
        lvl3Tower: "מגדל הקוסמים",
        lvl3Cave: "מערה",
        lvl3Select: "בחר בי באמצעות",
        lvl4CongrTextA: "כל הכבוד, מצאתם אותי",
        lvl4CongrTextB: "המבחן האמיתי מתחיל עכשיו",
        lvl4ScrollDesc: "השתמשו בלחצן הזום כדי לקרוא את התשובות הזמינות, ולאחר מכן הקלידו את התשובה למטה",
        lvl4ScrollDescSV: "Use the ZOOM button to read the answer, then type it below!",
        clickMe: "לחץ עלי",
        latitude: "קו רוחב",
        longitude: "קו אורך",
        answer: "תשובה",
        lvl5CongrText: "נמצאת ראוי, כעת מצא את האוצר",
        coordinates: "קואורדינטות",
        lvl5ScrollDesc: "השתמש ב",
        lvl5PasteDesc: "to paste, use",
        lvl5coords: "הקואורדינטות שגוי, האוצר לא נמצא",
        signedOut: "המשתמש התנתק",
        tasks: "מטלות",
        advQuote1: "היו השינוי",
        advQuote2: "שאתם רוצים להיות",
        noScore: "אין ציון",
        abort: "יציאה",
        congrats: "CONGRATULATIONS",
        trainingComplete: "You have completed the training",
        treasureFound: "You have found the treasure!",
        ok: "OK"
    };


// Translate all phrases inside " "
var advFirstInstructions =
    {
        openSettings: "פתחו הגדרות",
        generalSettings: "לכו להגדרות כלליות",
        enableGaze: "gaze visualization אפשרו",
        generalSettingsAgain: "לכו להגדרות כלליות שוב",
        disableGaze: "gaze visualization בטלו",
        taskComplete: "השלב הושלם"
    };
var advSecondInstructions =
    {
        openTabs: "Tab manager-פתחו את ה",
        editUrl: "Edit url-בחרו ב",
        typeUrl: " 'www.mamem.eu'הקלידו",
        abort: "בטלו",
        taskComplete: "השלב הושלם"
    };
var advThirdInstructions =
    {
        editUrl: "לחצו על אלמנט הטקסט",
        typeUrl: "הקלידו את המשפט הבא:",
        phrase: "See In The World",
        abort: "OK לחצו על",
        taskComplete: "השלב הושלם"
    };
var advFourthInstructions =
    {
        openTabs: "Tab manager-פתחו את ה",
        bookmark: "צרו סימניה מהדף הנוכחי",
        add: "הוסיפו כרטיסייה חדשה",
        openBookmarks: "Bookmarks-לכו ל",
        selectBookmark: "Saved bookmark-בחרו ב",
        openTabsAgain: "שוב Tab manager-פתחו את ה",
        taskComplete: "חזרו לכרטיסיית המשחק"
    };


// Translate only the 'title' and 'description' fields.
var trophiesArray = [
    {
        group: 'basic',
        level: 'level1',
        title: "מדהים",
        description: "לסיים את השלב כאשר מתמקדים בכל סמן פעם אחת בלבד"
    },
    {
        group: 'basic',
        level: 'level2',
        title: "מדהים",
        description: "ללא פספוס של אף סמן"
    },
    {
        group: 'int',
        level: 'level1',
        title: "מהר מאוד",
        description: "ברק מכה פעם אחת בלבד באותו המקום"
    },
    {
        group: 'int',
        level: 'level2',
        title: "מעולה",
        description: "וואו! ידע כללי מרשים"
    },
    {
        group: 'int',
        level: 'level3',
        title: "מצוין",
        description: "מצאתם את האוצר בפעם אחת"
    },
    {
        group: 'adv',
        level: 'level1',
        title: "כל הכבוד",
        description: "אתם מעולים"
    },
    {
        group: 'adv',
        level: 'level2',
        title: "יפה מאוד",
        description: "אתם טובים מאוד"
    },
    {
        group: 'adv',
        level: 'level3',
        title: "מדהים",
        description: "ביצוע מרשים"
    },
    {
        group: 'adv',
        level: 'level4',
        title: "גאונים",
        description: "אתם אלופי הסימניות"
    }
];
