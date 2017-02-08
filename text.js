var randomFeedbackFlag = 10;

var user = [];
var personalizedFeedback;

var defaultFeedback = [];
defaultFeedback.positive = "You have finished the level, and can proceed to the next.";
defaultFeedback.neutral = "You have finished the level, and can play again or proceed to the next level.";
defaultFeedback.negative = "You have not completed the level succesfully. You can play again or proceed to the next level.";

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
        story: "Open the map using the click emulation button, then use the GazeTheWeb copy & paste functionality to find the treasure! Be successful at your first try cop & pasting to get the trophy!"
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
        question: "Which of the following is a traditional Greek dish?",
        answer1: "moussaka",
        answer2: "spaghetti",
        answer3: "pizza",
        answer4: "burger",
        answer1_en: "moussaka", // Don't translate this!
        answer2_en: "spaghetti", // Don't translate this!
        answer3_en: "pizza", // Don't translate this!
        answer4_en: "burger", // Don't translate this!
        correct: "moussaka", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "Who is the son of Daedalus?",
        answer1: "minoas",
        answer2: "theseus",
        answer3: "icarus",
        answer4: "menelaus",
        answer1_en: "minoas", // Don't translate this!
        answer2_en: "theseus", // Don't translate this!
        answer3_en: "icarus", // Don't translate this!
        answer4_en: "menelaus", // Don't translate this!
        correct: "icarus", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "What was the color of the ‘Baywatch’ lifeguard swimsuit?",
        answer1: "pink",
        answer2: "red",
        answer3: "green",
        answer4: "white",
        answer1_en: "pink", // Don't translate this!
        answer2_en: "red", // Don't translate this!
        answer3_en: "green", // Don't translate this!
        answer4_en: "white", // Don't translate this!
        correct: "red", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "In honor of which goddess was the Acropolis of Athens built?",
        answer1: "aphrodite",
        answer2: "ira",
        answer3: "artemis",
        answer4: "athena",
        answer1_en: "aphrodite", // Don't translate this!
        answer2_en: "ira", // Don't translate this!
        answer3_en: "artemis", // Don't translate this!
        answer4_en: "athena", // Don't translate this!
        correct: "athena", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "Who is considered as the founder of Medicine?",
        answer1: "hippocrates",
        answer2: "hieronymus",
        answer3: "xenophon",
        answer4: "demosthenes",
        answer1_en: "hippocrates", // Don't translate this!
        answer2_en: "hieronymus", // Don't translate this!
        answer3_en: "xenophon", // Don't translate this!
        answer4_en: "demosthenes", // Don't translate this!
        correct: "hippocrates", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: "Which team won the national football league in 2014?",
        answer1: "olympiacos",
        answer2: "panathinaikos",
        answer3: "aek",
        answer4: "paok",
        answer1_en: "olympiacos", // Don't translate this!
        answer2_en: "panathinaikos", // Don't translate this!
        answer3_en: "aek", // Don't translate this!
        answer4_en: "paok", // Don't translate this!
        correct: "olympiacos", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: "Which was the host country of Euro 2004?",
        answer1: "italy",
        answer2: "england",
        answer3: "greece",
        answer4: "portugal",
        answer1_en: "italy", // Don't translate this!
        answer2_en: "england", // Don't translate this!
        answer3_en: "greece", // Don't translate this!
        answer4_en: "portugal", // Don't translate this!
        correct: "portugal", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: "He is considered as the father of History",
        answer1: "herodotus",
        answer2: "eratosthenes",
        answer3: "pausanias",
        answer4: "pericles",
        answer1_en: "herodotus", // Don't translate this!
        answer2_en: "eratosthenes", // Don't translate this!
        answer3_en: "pausanias", // Don't translate this!
        answer4_en: "pericles", // Don't translate this!
        correct: "herodotus", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: "Who cut off Vincent van Gogh's ear?",
        answer1: "a thief",
        answer2: "himself",
        answer3: "his mother",
        answer4: "his father",
        answer1_en: "a thief", // Don't translate this!
        answer2_en: "himself", // Don't translate this!
        answer3_en: "his mother", // Don't translate this!
        answer4_en: "his father", // Don't translate this!
        correct: "himself", // Don't translate this!
        cat: "Advanced" // Don't translate this!
    },
    {
        question: "Which country launched the cultivation of coffee?",
        answer1: "arabia",
        answer2: "brazil",
        answer3: "colombia",
        answer4: "mexico",
        answer1_en: "arabia", // Don't translate this!
        answer2_en: "brazil", // Don't translate this!
        answer3_en: "colombia", // Don't translate this!
        answer4_en: "mexico", // Don't translate this!
        correct: "arabia", // Don't translate this!
        cat: "Advanced" // Don't translate this!
    },
    {
        question: "Cleopatra used to bathe in...",
        answer1: "milk",
        answer2: "coconut oil",
        answer3: "water",
        answer4: "olive oil",
        answer1_en: "milk", // Don't translate this!
        answer2_en: "coconut oil", // Don't translate this!
        answer3_en: "water", // Don't translate this!
        answer4_en: "olive oil", // Don't translate this!
        correct: "milk", // Don't translate this!
        cat: "Advanced" // Don't translate this!
    },
    {
        question: "Where was Che Guevara born?",
        answer1: "brazil",
        answer2: "cuba",
        answer3: "argentina",
        answer4: "colombia",
        answer1_en: "brazil", // Don't translate this!
        answer2_en: "cuba", // Don't translate this!
        answer3_en: "argentina", // Don't translate this!
        answer4_en: "colombia", // Don't translate this!
        correct: "argentina", // Don't translate this!
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
        arrBackBtn: "Go back",
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
        zoom: "Zoom in on the piece of paper to reveal the text box",
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