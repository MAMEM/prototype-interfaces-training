var randomFeedbackFlag = 10;

var user = [];
var personalizedFeedback;

var defaultFeedback = [];
defaultFeedback.positive = "You have finished the level, and can proceed to the next.";
defaultFeedback.neutral = "You have finished the level, and can play again or proceed to the next level.";
defaultFeedback.negative = "You have not completed the level successfully.";

// Translate everything inside " " but be careful to not change what is inside + +.
function createFeedback() {

    personalizedFeedback = {

        youngMale: {

            positive: [
                "Wow " + user.firstName + ", great score! You also got the trophy!",
                user.firstName + ", you scored really great! You finished the level very effectively, gaining you the trophy!",
                "Your performance is the best, " + user.firstName + "! Nice work earning the trophy!"
            ],
            neutral: [
                user.firstName + ", you completed the level. You can replay the level and score better so you earn the trophy.",
                "Congratulations on completing the level, " + user.firstName + '. Score better next time, and the trophy is yours!',
                "Your gameplay was quite effective, " + user.firstName + '. Try to be better to win the trophy.'
            ],
            negative: [
                user.firstName + ', you can score higher than that! Please try again to win the trophy.',
                "You can be more effective, " + user.firstName + '! Try again and earn that trophy!'
            ]
        },

        oldMale: {

            positive: [
                "Wow, " + user.firstName + ", great score! You have won the trophy!",
                user.firstName + ", you scored really great! You finished the level very effectively, gaining you the trophy!",
                "Your performance is the best, " + user.firstName + "! Nice work earning the trophy!"
            ],
            neutral: [
                user.firstName + ", you completed the level. I am sure you can replay it and then win the trophy.",
                "Congratulations on completing the level " + user.firstName + '. If you keep on improving like this, the trophy will be yours! So replay!'
            ],
            negative: [
                user.firstName + ", I'm confident that you can score better. Please try again.",
                user.firstName + ", replay the level! You were getting closer to setting a great score!"
            ]
        },

        youngFemale: {

            positive: [
                "Wow, " + user.firstName + ", great score! You have won the trophy!",
                user.firstName + ", you scored really great! You finished the level very effectively, gaining you the trophy!",
                "Your performance is the best, " + user.firstName + "! Nice work earning the trophy!"
            ],
            neutral: [
                user.firstName + ", you completed the level. Without too much effort, you might score better and win the trophy.",
                "Congratulations on completing the level, " + user.firstName + '. If you try a little harder, you could certainly get a fantastic score!'
            ],
            negative: [
                user.firstName + ', you may have to keep on practicing, but you could improve your score! Please try again.',
                user.firstName + ', winning the trophy is possible with a lot of practicing. Just keep on going!'
            ]
        },

        oldFemale: {

            positive: [
                "Wow " + user.firstName + ", great score! Everybody will be proud that you have won the trophy!",
                user.firstName + ", you're a really fast learner! You became skillful quickly, gaining you the trophy!",
                "You're a fast learner, " + user.firstName + "! Nice work earning the trophy!"
            ],
            neutral: [
                user.firstName + ", you completed the level with time to spare! You can replay, and make everyone proud by winning the trophy.",
                "You are learning quickly, " + user.firstName + '! Doctors will be happy when you score even better!'
            ],
            negative: [
                user.firstName + ', if you keep on improving, you could get a great score and make everyone proud!',
                user.firstName + ', hard practice will earn you that trophy! Everybody would love it if you score better!'
            ]
        }
    };

    return personalizedFeedback;
}


// Translate all phrases inside " "
var levelText = [
    {
        fullTitle: "BASIC - 01 Focus on the markers",
        shortTitle: "Focus on the markers",
        story: "Try to focus your eyes on a series of markers. Get the trophy by focusing on each marker only once!"
    },
    {
        fullTitle: "BASIC - 02 Focus on a sequence of markers",
        shortTitle: "Whack-a-mole!",
        story: "Try to focus your eyes on each marker when it appears, for a set amount of time! Hit all the markers to earn the trophy!"
    },
    {
        fullTitle: "INTERMEDIATE - 01 Find the wizard",
        shortTitle: "Find the wizard",
        story: "Scroll through the level to find the wizard using the scroll overlays or the auto scrolling, and use the click emulation button to select the place where he is hiding! Visit all locations only once to earn the trophy!"
    },
    {
        fullTitle: "INTERMEDIATE - 02 The Quiz",
        shortTitle: "The quiz",
        story: "You found the wizard! Now he is challenging you to a quiz test. Use the ZOOM buttons to see the available answers and type the correct one to each question using the GazeTheWeb KEYBOARD! Answer correctly to all questions and earn the trophy!"
    },
    {
        fullTitle: "INTERMEDIATE - 03 Find the treasure",
        shortTitle: "The map",
        story: "Open the map using the click emulation button, then use the GazeTheWeb copy & paste functionality to find the treasure! Be successful at your first try copy & pasting to get the trophy!"
    },
    {
        fullTitle: "ADVANCED - 01 Gaze Visualization",
        shortTitle: "Settings - Gaze Visualization",
        story: "You uncovered the location of the treasure in the previous levels. Now tread through the path accross 4 locations to finally find the treasure, while learning how to use the unique tools GTW has to offer! Try following the instructions without making the same action twice to get the trophy!"
    },
    {
        fullTitle: "ADVANCED - 02 URL Typing",
        shortTitle: "URL Typing",
        story: "Learn how to edit a url on GTW Browser. Try following the instructions without making the same action twice to get the trophy!"
    },
    {
        fullTitle: "ADVANCED - 03 Text prediction",
        shortTitle: "Text prediction",
        story: "Learn how to type using text prediction. Try following the instructions without making the same action twice to get the trophy!"
    },
    {
        fullTitle: "ADVANCED - 04 Bookmarks",
        shortTitle: "Bookmarks",
        story: "Learn how to bookmark a page. Try following the instructions without making the same action twice to get the trophy!"
    }
];


// In here translate only the 'question' and 'answer' fields (NO answer_en).
var quizText = [
    {
        question: "What is the capital city of France?",
        answer1: "barcelona",
        answer2: "paris",
        answer3: "london",
        answer4: "amsterdam",
        answer1_en: "barcelona", // Don't translate this!
        answer2_en: "paris", // Don't translate this!
        answer3_en: "london", // Don't translate this!
        answer4_en: "amsterdam", // Don't translate this!
        correct: "paris", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "What is the name of the girlfriend of Mickey Mouse?",
        answer1: "nano mouse",
        answer2: "micro mouse",
        answer3: "minnie mouse",
        answer4: "mega mouse",
        answer1_en: "nano mouse", // Don't translate this!
        answer2_en: "micro mouse", // Don't translate this!
        answer3_en: "minnie mouse", // Don't translate this!
        answer4_en: "mega mouse", // Don't translate this!
        correct: "minnie mouse", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "What object fell on the head of Newton that made him discover gravity?",
        answer1: "a brick",
        answer2: "an apple",
        answer3: "a light bulb",
        answer4: "a balloon",
        answer1_en: "a brick", // Don't translate this!
        answer2_en: "an apple", // Don't translate this!
        answer3_en: "a light bulb", // Don't translate this!
        answer4_en: "a balloon", // Don't translate this!
        correct: "an apple", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: "What is the biggest planet in our Solar System?",
        answer1: "mercury",
        answer2: "venus",
        answer3: "mars",
        answer4: "jupiter",
        answer1_en: "mercury", // Don't translate this!
        answer2_en: "venus", // Don't translate this!
        answer3_en: "mars", // Don't translate this!
        answer4_en: "jupiter", // Don't translate this!
        correct: "jupiter", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: "Who was the first President of the United States?",
        answer1: "george washington",
        answer2: "abraham lincoln",
        answer3: "theodore roosevelt",
        answer4: "george bush sr.",
        answer1_en: "george washington", // Don't translate this!
        answer2_en: "abraham lincoln", // Don't translate this!
        answer3_en: "theodore roosevelt", // Don't translate this!
        answer4_en: "george bush sr.", // Don't translate this!
        correct: "george washington", // Don't translate this!
        cat: "Advanced" // Don't translate this!
    }
];

// Translate all phrases inside " "
var genericText =
    {
        gazeTheWeb: "Gaze The Web",
        subTitle: "Learn how to use the browser",
        play: "Play",
        replay: "Replay",
        levelSelect: "Select level",
        basic: "BASIC",
        intermediate: "INTERMEDIATE",
        advanced: "ADVANCED",
        completed: "COMPLETED",
        trophies: "trophies",
        score: "Score",
        newScore: "NEW",
        best: "BEST",
        time: "Time",
        rewards: "Rewards",
        rankings: "RANKINGS - TOP 5",
        name: "Name",
        overview: "Overview",
        next: "Next",
        start: "Start",
        startingIn: "Starting in",
        hit: "HIT!",
        arrScrollUp: "Scroll up",
        arrScrollDown: "Scroll down",
        arrBackBtn: "Now press the Go-Back button!",
        arrScrollBtn: "Auto scrolling",
        clickEmu: "Click emulation",
        zoomBtn: "Zoom",
        textSelBtn: "Text selection",
        question: "Question",
        lvl3ScrollDownA: "Scroll down and follow the river",
        lvl3ScrollDownB: "to find the wizard",
        lvl3Village: "VILLAGE",
        lvl3BRB: "be right back!",
        lvl3Tower: "WIZARDS TOWER",
        lvl3Cave: "CAVE",
        lvl3Select: "Select me using",
        lvl4CongrTextA: "Congratulations on finding me.",
        lvl4CongrTextB: "Your real test begins now!",
        lvl4ScrollDesc: "Use the ZOOM button to read the available answers, then type the answer below!",
        clickMe: "Click me!",
        latitude: "Latitude",
        longitude: "Longitude",
        answer: "Answer",
        lvl5CongrText: "You have been deemed worthy! Now find the treasure!",
        coordinates: "COORDINATES",
        lvl5ScrollDesc: "use the",
        lvl5coords: "Wrong coordinates! Treasure not found!",
        signedOut: "USER IS SIGNED OUT",
        tasks: "Tasks",
        advQuote1: "Be The Change",
        advQuote2: "That You Want To",
        noScore: "no score",
        abort: "Abort"
    };


// Translate all phrases inside " "
var advFirstInstructions =
    {
        openSettings: "Open Settings",
        generalSettings: "Go to General Settings",
        enableGaze: "Enable Gaze Visualization",
        generalSettingsAgain: "Go to General Settings again",
        disableGaze: "Disable Gaze Visualization",
        taskComplete: "Level completed"
    };
var advSecondInstructions =
    {
        openTabs: "Open Tab manager",
        editUrl: "Edit url",
        typeUrl: "Type 'www.mamem.eu'",
        abort: "Abort",
        taskComplete: "Level completed"
    };
var advThirdInstructions =
    {
        editUrl: "Click on the text element",
        typeUrl: "Type the missing phrase:",
        phrase: "See In The World",
        abort: "Press OK",
        taskComplete: "Level completed"
    };
var advFourthInstructions =
    {
        openTabs: "Open Tab manager",
        bookmark: "Bookmark Current Tab",
        add: "Add a New Tab",
        openBookmarks: "Go to Bookmarks",
        selectBookmark: "Select Saved bookmark",
        openTabsAgain: "Open Tab manager again",
        taskComplete: "Return to game tab"
    };


// Translate only the 'title' and 'description' fields.
var trophiesArray = [
    {
        group: 'basic',
        level: 'level1',
        title: "Unflinching!",
        description: "Clear the level focusing on the markers only once."
    },
    {
        group: 'basic',
        level: 'level2',
        title: "Sharpshooter!",
        description: "Don't miss any marker."
    },
    {
        group: 'int',
        level: 'level1',
        title: "The Flash!",
        description: "Lightning strikes only once in the same place."
    },
    {
        group: 'int',
        level: 'level2',
        title: "Scholar!",
        description: "Whoa! You're really knowledgeable."
    },
    {
        group: 'int',
        level: 'level3',
        title: "Charted!",
        description: "You found the treasure at one fell swoop."
    },
    {
        group: 'adv',
        level: 'level1',
        title: "Gaze all the things!",
        description: "You really like to see how everything works."
    },
    {
        group: 'adv',
        level: 'level2',
        title: "Navigator!",
        description: "You are the captain of the GTW ship. Toot-toot!"
    },
    {
        group: 'adv',
        level: 'level3',
        title: "Automaton!",
        description: "You are transcending the boundaries of human nature."
    },
    {
        group: 'adv',
        level: 'level4',
        title: "Librarian!",
        description: "You have been awarded the honorary title of Bookmark master!"
    }
];