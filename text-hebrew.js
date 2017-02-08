var randomFeedbackFlag = 10;

var user = [];
var personalizedFeedback;

var defaultFeedback = [];
defaultFeedback.positive = "סיימתם את השלב בהצלחה, אתם יכולים להמשיך לשלב הבא";
defaultFeedback.neutral = " סיימתם את השלב בהצלחה, אתם יכולים לשחק שוב או להמשיך לשלב הבא ";
defaultFeedback.negative = "לא סיימתם את השלב בהצלחה";

// Translate everything inside " " but be careful to not change what is inside + +.
function createFeedback() {

    personalizedFeedback = {

        youngMale: {

            positive: [
                "!ציון טוב, זכית גם בגביע"+ user.firstName +"Wow",
                "קיבלת ציון ממש טוב! סיימת את השלב בצורה מוצלחת וקיבלת את הגביע" + user.firstName ,
                "!הביצוע שלך הכי טוב" + user.firstName + ",הרווחת את הגביע"
            ],
            neutral: [
                "סיימת את השלב. ניתן לבצע שוב את השלב ולזכות בגביע" + user.firstName ,
                'אם תקבל ציון טוב יותר בפעם הבאה, תקבל גביע'+ user.firstName  + "ברכות על סיום השלב" ,
                'נסה להשתפר כדי לזכות בגביע,'+ user.firstName + "הביצוע שלך היה מוצלח"
            ],
            negative: [
                'אתה יכול לבצע טוב יותר! נסה שוב כדי לקבל את הגביע,' + user.firstName ,
                "!נסה שוב כדי להרוויח את הגביע" + user.firstName + 'אתה יכול לבצע טוב יותר'
            ]
        },

        oldMale: {

            positive: [
                "!ציון טוב, זכית גם בגביע"+ user.firstName +"Wow",
                "קיבלת ציון ממש טוב! סיימת את השלב בצורה מוצלחת וקיבלת את הגביע" + user.firstName ,
                "!הביצוע שלך הכי טוב" + user.firstName + ",הרווחת את הגביע"
            ],
            neutral: [
                "סיימת את השלב. ניתן לבצע שוב את השלב ולזכות בגביע" + user.firstName ,
                'אם תקבל ציון טוב יותר בפעם הבאה, תקבל גביע'+ user.firstName  + "ברכות על סיום השלב"
            ],
            negative: [
                "אנו בטוחים שאתה יכול לקבל ציון טוב יותר, נסה שוב" +  user.firstName,
                "!נסה שוב את השלב, היית קרוב לקבל ציון טוב" + user.firstName
            ]
        },

        youngFemale: {

            positive: [
                "!ציון טוב, זכית גם בגביע"+ user.firstName +"Wow",
                "קיבלת ציון ממש טוב! סיימת את השלב בצורה מוצלחת וקיבלת את הגביע" + user.firstName ,
                "!הביצוע שלך הכי טוב" + user.firstName + ",הרווחת את הגביע"
            ],
            neutral: [
                "סיימת את השלב. ניתן לבצע שוב את השלב ולזכות בגביע" + user.firstName ,
                'אם תקבלי ציון טוב יותר בפעם הבאה, תקבל גביע'+ user.firstName  + "ברכות על סיום השלב"
            ],
            negative: [
                "אנו בטוחים שאת יכולה לקבל ציון טוב יותר, נסי שוב" +  user.firstName,
                "!נסי שוב את השלב, היית קרובה לקבל ציון טוב" + user.firstName
            ]
        },

        oldFemale: {

            positive: [
                "!ציון טוב, זכית גם בגביע"+ user.firstName +"Wow",
                "קיבלת ציון ממש טוב! סיימת את השלב בצורה מוצלחת וקיבלת את הגביע" + user.firstName ,
                "!הביצוע שלך הכי טוב" + user.firstName + ",הרווחת את הגביע"
            ],
            neutral: [
                "סיימת את השלב. ניתן לבצע שוב את השלב ולזכות בגביע" + user.firstName ,
                'אם תקבלי ציון טוב יותר בפעם הבאה, תקבל גביע'+ user.firstName  + "ברכות על סיום השלב"
            ],
            negative: [
                "אנו בטוחים שאת יכולה לקבל ציון טוב יותר, נסי שוב" +  user.firstName,
                "!נסי שוב את השלב, היית קרובה לקבל ציון טוב" + user.firstName
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
        story: "נסו להתמקד בסדרת הסימנים. קבלו את הגביע אם תתמקדו על כל סימן רק פעם אחת "
    },
    {
        fullTitle: "בסיסי - 02 התמקדות בסדרה של סימנים",
        shortTitle: "הכה את החפרפרת",
        story: "נסו להתמקד העיניים על כל סמן כאשר הוא מופיע למשך פרק זמן מוגדר! הכה את כל הסמנים להרוויח את הגביע!"
    },
    {
        fullTitle: "בינוני - 01 מצא את הקוסם",
        shortTitle: "מצא את הקוסם",
        story: " יש לגלול בשלב כדי למצוא את המכשף באמצעות כפתורי הגלילה או הגלילה אוטומטית, והשתמש בלחצן כדי לסמן את המקום בו הוא מתחבא! בקרו בכל המקומות רק פעם אחת כדי להרוויח את הגביע!"
    },
    {
        fullTitle: "בינוני - 02 חידון",
        shortTitle: "החידון",
        story: " מצאתם את הקוסם! עכשיו הוא מזמין אתכם לשחק בחידון. השתמשו בלחצני ההגדלה\הקטנה כדי לראות את התשובות והקלידו את התשובה הנכונה לכל שאלה באמצעות המקלדת. תשובה נכונה לכל השאלות ותרוויחו את הגביע!"
    },
    {
        fullTitle: " בינוני - 03 מצא את האוצר",
        shortTitle: "המפה",
        story: " יש לפתוח את המפה באמצעות הלחצן, ואז להשתמש באפשרויות העתק והדבק כדי למצוא את האוצר! הצליחו בניסיון הראשון כדי לקבל את הגביע!"
    },
    {
        fullTitle: "מתקדם - 01 ויזואליזציה למבט",
        shortTitle: "הגדרות – ויזואליזציה למבט",
        story: " חשפתם את מיקומו של האוצר ברמות הקודמות. עכשיו יש לעבור בנתיב עם ארבעה מוקדים כדי סוף סוף למצוא את האוצר, תוך כדי למידה כיצד להשתמש בכלים ייחודיים של התוכנה! נסו לפעול על פי ההוראות מבלי לבצע את אותה פעולה פעמיים כדי לקבל את הגביע!"
    },
    {
        fullTitle: "מתקדם - 02 הקלדת כתובת",
        shortTitle: "הקלדת כתובת",
        story: " למדו כיצד לערוך כתובת אינטרנט בדפדפן. נסו לפעול על פי ההוראות מבלי לבצע את אותה פעולה פעמיים כדי לקבל את הגביע!"
    },
    {
        fullTitle: "מתקדם - 03 ניבוי כתיבה",
        shortTitle: "ניבוי כתיבה",
        story: " למדו כיצד לכתוב עם ניבוי טקסט. נסו לפעול על פי ההוראות מבלי לבצע את אותה פעולה פעמיים כדי לקבל את הגביע!"
    },
    {
        fullTitle: "מתקדם - 04 סימניות",
        shortTitle: " סימניות",
        story: " למדו כיצד ליצור סימניה. נסו לפעול על פי ההוראות מבלי לבצע את אותה פעולה פעמיים כדי לקבל את הגביע!"
    }
];


// In here put the translated question & answers that you have from inside the docx you sent me. (in the empty strings)
var quizText = [
    {
        question: " מהו המאכל המזוהה ביותר עם ישראל מהבאים:",
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
        question: " מיהו האבא של יעקב ועשו:",
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
    },
    {
        question: " מהו הצבע של בגדי הים בסדרה משמר המפרץ?",
        answer1: "ירוק",
        answer2: "צהוב",
        answer3: "אדום",
        answer4: "כחול",
        answer1_en: "green", // Don't translate this!
        answer2_en: "yellow", // Don't translate this!
        answer3_en: "red", // Don't translate this!
        answer4_en: "blue", // Don't translate this!
        correct: "red", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: " על שם מי נקראת טבריה ",
        answer1: "טיבריוס",
        answer2: "הורדוס",
        answer3: "טיטוס",
        answer4: "אספסיאנוס",
        answer1_en: "tiberius", // Don't translate this!
        answer2_en: "herod", // Don't translate this!
        answer3_en: "titus", // Don't translate this!
        answer4_en: "vespasianus", // Don't translate this!
        correct: "tiberius", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: " איזה חכם יהודי נחשב לרופא גדול:",
        answer1: "אבן גבירול",
        answer2: "זיגמונד פרויד",
        answer3: "הרמבם",
        answer4: "הרשבי",
        answer1_en: "even gvirol", // Don't translate this!
        answer2_en: "zigmond freud", // Don't translate this!
        answer3_en: "rabbi moshe ben maimon", // Don't translate this!
        answer4_en: "rabbi shimon bar yohai", // Don't translate this!
        correct: "rabbi moshe ben maimon", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: " איזו נבחרת זכתה במונדיאל 2014?",
        answer1: "גרמניה",
        answer2: "ארדנטינה",
        answer3: "ברזיל",
        answer4: "הולנד",
        answer1_en: "germany", // Don't translate this!
        answer2_en: "argentina", // Don't translate this!
        answer3_en: "brazil", // Don't translate this!
        answer4_en: "netherlands", // Don't translate this!
        correct: "germany", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: " באיזו מדינה התקיים מונדיאל 2014?",
        answer1: "יפן",
        answer2: "ברזיל",
        answer3: "ארהב",
        answer4: "יוון",
        answer1_en: "japan", // Don't translate this!
        answer2_en: "brazil", // Don't translate this!
        answer3_en: "u.s.", // Don't translate this!
        answer4_en: "greece", // Don't translate this!
        correct: "brazil", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: " איזה מצביא יהודי הפך להיסטוריון ",
        answer1: "יוסף בן מתיתיהו",
        answer2: "שמעון בר כוכבא",
        answer3: "משה דיין",
        answer4: "דויד בן גוריון",
        answer1_en: "joseph ben matthias", // Don't translate this!
        answer2_en: "shimon bar kochba", // Don't translate this!
        answer3_en: "moshe dayan", // Don't translate this!
        answer4_en: "david ben gurion", // Don't translate this!
        correct: "joseph ben matthias", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: " מי חתך לוואן גוך את אוזנו?",
        answer1: "גנב",
        answer2: "הוא עצמו",
        answer3: "אביו",
        answer4: "אחיו",
        answer1_en: "thief", // Don't translate this!
        answer2_en: "himself", // Don't translate this!
        answer3_en: "father", // Don't translate this!
        answer4_en: "brother", // Don't translate this!
        correct: "himself", // Don't translate this!
        cat: "Advanced" // Don't translate this!
    },
    {
        question: " היכן תורבת הקפה לראשונה?",
        answer1: "חצי האי ערב",
        answer2: "ברזיל",
        answer3: "קולומביה",
        answer4: "איטליה",
        answer1_en: "arabia", // Don't translate this!
        answer2_en: "brazil", // Don't translate this!
        answer3_en: "colombia", // Don't translate this!
        answer4_en: "italy", // Don't translate this!
        correct: "arabia", // Don't translate this!
        cat: "Advanced" // Don't translate this!
    },
    {
        question: " קליאופטרה הייתה מתרחצת ב:",
        answer1: "דבש",
        answer2: "יין",
        answer3: "חלב",
        answer4: "שמן זית",
        answer1_en: "honey", // Don't translate this!
        answer2_en: "wine", // Don't translate this!
        answer3_en: "milk", // Don't translate this!
        answer4_en: "olive oil", // Don't translate this!
        correct: "milk", // Don't translate this!
        cat: "Advanced" // Don't translate this!
    },
    {
        question: " היכן נולד צ'ה גווארה?",
        answer1: "קולומביה",
        answer2: "ברזיל",
        answer3: "קובה",
        answer4: "ארגנטינה",
        answer1_en: "colombia", // Don't translate this!
        answer2_en: "brazil", // Don't translate this!
        answer3_en: "cuba", // Don't translate this!
        answer4_en: "argentina", // Don't translate this!
        correct: "argentina", // Don't translate this!
        cat: "Advanced" // Don't translate this!
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
        hit: "פגיעה!",
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
        lvl3BRB: "תכף אשוב!",
        lvl3Tower: "מגדל הקוסמים",
        lvl3Cave: "מערה",
        lvl3Select: "בחר בי באמצעות",
        lvl4CongrTextA: "כל הכבוד, מצאתם אותי",
        lvl4CongrTextB: "המבחן האמיתי מתחיל עכשיו!",
        lvl4ScrollDesc: " השתמש בלחצן ZOOM לקרוא את התשובות הזמינות, ולאחר מכן הקלד את התשובה למטה!",
        clickMe: "לחץ עלי!",
        latitude: "קו רוחב",
        longitude: "קו אורך",
        answer: "תשובה",
        lvl5CongrText: "נמצאת ראוי, כעת מצא את האוצר",
        coordinates: "קואורדינטות",
        lvl5ScrollDesc: "השתמש ב",
        lvl5coords: "הקואורדינטות שגוי, האוצר לא נמצא",
        signedOut: "USER IS SIGNED OUT",
        tasks: "מטלות",
        advQuote1: "היו השינוי",
        advQuote2: "שאתם רוצים להיות",
        noScore: "אין ציון",
        abort: "יציאה"
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
        openTabs: "Tab manager פתחו את ה-",
        editUrl: "Edit urlבחרו ב-",
        typeUrl: " 'www.mamem.eu'הקלידו",
        abort: "בטלו",
        taskComplete: " השלב הושלם"
    };
var advThirdInstructions =
    {
        zoom: "התקרבו באמצעות כפתור הזום כדי לראות את הטקסט",
        editUrl: "לחצו על אלמנט הטקסט",
        typeUrl: "הקלידו את המשפט הבא:",
        phrase: "See In The World",
        abort: "OK לחצו על",
        taskComplete: " השלב הושלם"
    };
var advFourthInstructions =
    {
        openTabs: "Tab manager פתחו את ה-",
        bookmark: " צרו סימניה מהדף הנוכחי",
        add: "הוסיפו כרטיסייה חדשה",
        openBookmarks: "Bookmarks לכו ל-",
        selectBookmark: "Saved bookmark בחרו ב-",
        openTabsAgain: "שוב Tab manager פתחו את ה-",
        taskComplete: "חזרו לכרטיסיית המשחק"
    };


// Translate only the 'title' and 'description' fields.
var trophiesArray = [
    {
        group: 'basic',
        level: 'level1',
        title: "מדהים!",
        description: "לסיים את השלב כאשר מתמקדים בכל סמן פעם אחת בלבד"
    },
    {
        group: 'basic',
        level: 'level2',
        title: "מדהים!",
        description: "ללא פספוס של אף סמן"
    },
    {
        group: 'int',
        level: 'level1',
        title: "מהר מאוד!",
        description: " ברק מכה פעם אחת בלבד באותו המקום"
    },
    {
        group: 'int',
        level: 'level2',
        title: "מעולה!",
        description: " וואו! ידע כללי מרשים"
    },
    {
        group: 'int',
        level: 'level3',
        title: "מצוין!",
        description: "מצאתם את האוצר בפעם אחת"
    },
    {
        group: 'adv',
        level: 'level1',
        title: "כל הכבוד!",
        description: "אתם מעולים"
    },
    {
        group: 'adv',
        level: 'level2',
        title: "יפה מאוד!",
        description: "אתם טובים מאוד"
    },
    {
        group: 'adv',
        level: 'level3',
        title: "מדהים!",
        description: "ביצוע מרשים"
    },
    {
        group: 'adv',
        level: 'level4',
        title: "גאונים",
        description: "אתם אלופי הסימניות"
    }
];
