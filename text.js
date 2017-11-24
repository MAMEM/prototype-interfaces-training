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
                "Wow " + user.firstName + ", great score!",
                user.firstName + ", you scored really great! You finished the level very effectively!",
                "Your performance is the best, " + user.firstName + "!"
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
                "Wow, " + user.firstName + ", great score!",
                user.firstName + ", you scored really great! You finished the level very effectively!",
                "Your performance is the best, " + user.firstName + "!"
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
                "Wow, " + user.firstName + ", great score!",
                user.firstName + ", you scored really great! You finished the level very effectively!",
                "Your performance is the best, " + user.firstName + "!"
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
                "Wow " + user.firstName + ", great score! Everybody will be proud!",
                user.firstName + ", you're a really fast learner! You became skillful quickly!",
                "You're a fast learner, " + user.firstName + "!"
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
        story: "Try to focus your eyes on a series of markers. Get the trophy by focusing on each marker only once!",
        storyNeutral: "Try to focus your eyes on a series of markers."
    },
    {
        fullTitle: "BASIC - 02 Focus on a sequence of markers",
        shortTitle: "Whack-a-mole!",
        story: "Try to focus your eyes on each marker when it appears, for a set amount of time! Hit all the markers to earn the trophy!",
        storyNeutral: "Try to focus your eyes on each marker when it appears, for a set amount of time."
    },
    {
        fullTitle: "INTERMEDIATE - 01 Find the wizard",
        shortTitle: "Treasure hunt",
        story: "The wizard knows where the treasure is. Scroll down and visit all locations to find where he is hiding.",
        storyNeutral: "Scroll through the level to find the wizard using the scroll overlays or the auto scrolling, and use the click emulation button to select him."
    },
    {
        fullTitle: "INTERMEDIATE - 02 The Quiz",
        shortTitle: "The quiz",
        story: "The wizard is challenging you to a quiz test. Use the GazeTheWeb Keyboard to type the correct answer to 3 questions.",
        storyNeutral: "Use the ZOOM buttons to see the available answers and type the correct one to each question using the GazeTheWeb KEYBOARD."
    },
    {
        fullTitle: "INTERMEDIATE - 03 Find the treasure",
        shortTitle: "The map",
        story: "You are about to find where the treasure is. Select each coordinate, copy and then paste them into the map",
        storyNeutral: "Use the GazeTheWeb copy & paste functionality to find the treasure."
    },
    {
        fullTitle: "ADVANCED - 01 Gaze Visualization",
        shortTitle: "Settings - Gaze Visualization",
        story: "You uncovered the location of the treasure in the previous levels. Now tread through the path accross 4 locations to finally find the treasure, while learning how to use the unique tools GTW has to offer! Try following the instructions without making the same action twice to get the trophy!",
        storyNeutral: "Learning how to use the Gaze Visualization."
    },
    {
        fullTitle: "ADVANCED - 02 URL Typing",
        shortTitle: "URL Typing",
        story: "Learn how to edit a url on GTW Browser. Try following the instructions without making the same action twice to get the trophy!",
        storyNeutral: "Learn how to edit a url on GTW Browser."
    },
    {
        fullTitle: "ADVANCED - 03 Text prediction",
        shortTitle: "Text prediction",
        story: "Learn how to type using text prediction. Try following the instructions without making the same action twice to get the trophy!",
        storyNeutral: "Learn how to type using text prediction."
    },
    {
        fullTitle: "ADVANCED - 04 Bookmarks",
        shortTitle: "Bookmarks",
        story: "Learn how to bookmark a page. Try following the instructions without making the same action twice to get the trophy!",
        storyNeutral: "Learn how to bookmark a page."
    }
];


// In here translate only the 'question' and 'answer' fields (NO answer_en).
var quizText = [
    {
        question: "What is the name of the girlfriend of Mickey Mouse?",
        answer1: "Nano Mouse",
        answer2: "Minnie Mouse",
        answer3: "Micro Mouse",
        answer4: "Mega Mouse",
        answer1_en: "Nano Mouse", // Don't translate this!
        answer2_en: "Minnie Mouse", // Don't translate this!
        answer3_en: "Micro Mouse", // Don't translate this!
        answer4_en: "Mega Mouse", // Don't translate this!
        correct: "Minnie Mouse", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "What is the capital city of France?",
        answer1: "Barcelona",
        answer2: "Paris",
        answer3: "London",
        answer4: "Amsterdam",
        answer1_en: "Barcelona", // Don't translate this!
        answer2_en: "Paris", // Don't translate this!
        answer3_en: "London", // Don't translate this!
        answer4_en: "Amsterdam", // Don't translate this!
        correct: "Paris", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: "Who was the first President of the United States?",
        answer1: "Lincoln",
        answer2: "Washington",
        answer3: "Roosevelt",
        answer4: "Bush sr.",
        answer1_en: "Lincoln", // Don't translate this!
        answer2_en: "Washington", // Don't translate this!
        answer3_en: "Roosevelt", // Don't translate this!
        answer4_en: "Bush sr.", // Don't translate this!
        correct: "Washington", // Don't translate this!
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
        levelSelect: "Complete the three level groups to become the master of Gaze the Web!",
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
        lvl4ScrollDescSV: "Use the ZOOM button to read the answer, then type it below!",
        clickMe: "Click me!",
        latitude: "Latitude",
        longitude: "Longitude",
        answer: "Answer",
        lvl5CongrText: "You have been deemed worthy! Now find the treasure!",
        coordinates: "COORDINATES",
        lvl5ScrollDesc: "use the",
        lvl5PasteDesc: "to paste, use",
        lvl5coords: "Wrong coordinates! Treasure not found!",
        signedOut: "USER IS SIGNED OUT",
        tasks: "Tasks",
        advQuote1: "Be The Change",
        advQuote2: "That You Want To",
        noScore: "no score",
        abort: "Abort",
        congrats: "CONGRATULATIONS",
        trainingComplete: "You have completed the training",
        treasureFound: "You have completed the training and found the treasure!",
        ok: "OK"
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
        abort: "Close",
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