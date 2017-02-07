var randomFeedbackFlag = 10;

var user = [];
var personalizedFeedback;

function createFeedback() {

    personalizedFeedback = {

        youngMale: {

            positive: [
                "Wow " + user.firstName + ", great score! You also got the trophy!",
                user.firstName + ", you're really great! You finished the level with the most effective way, gaining you the trophy!",
                "Your skills are unmatched " + user.firstName + " ! Nice work earning the trophy!"
            ],
            neutral: [
                user.firstName + ", you completed the level. You can try replaying it in order to earn the trophy.",
                "Congratulations on completing the level " + user.firstName + '. Try playing it again to earn the trophy.',
                "Your score was good " + user.firstName + '. Try to step up your game a bit to earn the trophy.'
            ],
            negative: [
                user.firstName + ', you can do better than that! Please try again.',
                user.firstName + ', you can do better than that! Please try again.'
            ]
        },

        oldMale: {

            positive: [
                "Wow " + user.firstName + ", great score! You also got the trophy!",
                user.firstName + ", you're really great! You finished the level with the most effective way, gaining you the trophy!",
                "Your skills are unmatched " + user.firstName + " ! Nice work earning the trophy!"
            ],
            neutral: [
                user.firstName + ", you completed the level. You can try replaying it in order to earn the trophy.",
                "Congratulations on completing the level " + user.firstName + '. Try playing it again to earn the trophy.'
            ],
            negative: [
                user.firstName + ", I'm confident that you can finish the level without breaking a sweat. Please try again.",
                user.firstName + ", quickly, replay the level! You were very close to finish it!"
            ]
        },

        youngFemale: {

            positive: [
                "Wow " + user.firstName + ", great score! You also got the trophy!",
                user.firstName + ", you're really great! You finished the level with the most effective way, gaining you the trophy!",
                "Your skills are unmatched " + user.firstName + " ! Nice work earning the trophy!"
            ],
            neutral: [
                user.firstName + ", you completed the level. You can try replaying it in order to earn the trophy.",
                "Congratulations on completing the level " + user.firstName + '. Try playing it again to earn the trophy.'
            ],
            negative: [
                user.firstName + ', you can do better than that! Please try again.',
                user.firstName + ', I am confident that you can complete the level, play it again!'
            ]
        },

        oldFemale: {

            positive: [
                "Wow " + user.firstName + ", great score! You also got the trophy!",
                user.firstName + ", you're really great! You finished the level with the most effective way, gaining you the trophy!",
                "You're a fast learner " + user.firstName + " ! Nice work earning the trophy!"
            ],
            neutral: [
                user.firstName + ", you completed the level with time to spare! You can try replaying it though in order to earn the trophy.",
                "You adapt quickly under pressure " + user.firstName + '! You were "this" close from earning the trophy!'
            ],
            negative: [
                user.firstName + ', you can do better than that! Please try again.',
                user.firstName + ', I am confident that you can complete the level the next time you play it!'
            ]
        }
    };

    return personalizedFeedback;
}



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

var quizText = [
    {
        question: "Which of the following is a traditional Greek dish?",
        answer1: "moussaka",
        answer2: "spaghetti",
        answer3: "pizza",
        answer4: "burger",
        correct: "moussaka",
        cat: "Easy"
    },
    {
        question: "Who is the son of Daedalus?",
        answer1: "minoas",
        answer2: "theseus",
        answer3: "icarus",
        answer4: "menelaus",
        correct: "icarus",
        cat: "Easy"
    },
    {
        question: "What was the color of the ‘Baywatch’ lifeguard swimsuit?",
        answer1: "pink",
        answer2: "red",
        answer3: "green",
        answer4: "white",
        correct: "red",
        cat: "Easy"
    },
    {
        question: "In honor of which goddess was the Acropolis of Athens built?",
        answer1: "aphrodite",
        answer2: "ira",
        answer3: "artemis",
        answer4: "athena",
        correct: "athena",
        cat: "Easy"
    },
    {
        question: "Who is considered as the founder of Medicine?",
        answer1: "hippocrates",
        answer2: "hieronymus",
        answer3: "xenophon",
        answer4: "demosthenes",
        correct: "hippocrates",
        cat: "Intermediate"
    },
    {
        question: "Which team won the national football league in 2014?",
        answer1: "olympiacos",
        answer2: "panathinaikos",
        answer3: "aek",
        answer4: "paok",
        correct: "olympiacos",
        cat: "Intermediate"
    },
    {
        question: "Which was the host country of Euro 2004?",
        answer1: "italy",
        answer2: "england",
        answer3: "greece",
        answer4: "portugal",
        correct: "portugal",
        cat: "Intermediate"
    },
    {
        question: "He is considered as the father of History",
        answer1: "herodotus",
        answer2: "eratosthenes",
        answer3: "pausanias",
        answer4: "pericles",
        correct: "herodotus",
        cat: "Intermediate"
    },
    {
        question: "Who cut off Vincent van Gogh's ear?",
        answer1: "a thief",
        answer2: "himself",
        answer3: "his mother",
        answer4: "his father",
        correct: "himself",
        cat: "Advanced"
    },
    {
        question: "Which country launched the cultivation of coffee?",
        answer1: "arabia",
        answer2: "brazil",
        answer3: "colombia",
        answer4: "mexico",
        correct: "arabia",
        cat: "Advanced"
    },
    {
        question: "Cleopatra used to bathe in...",
        answer1: "milk",
        answer2: "coconut oil",
        answer3: "water",
        answer4: "olive oil",
        correct: "milk",
        cat: "Advanced"
    },
    {
        question: "Where was Che Guevara born?",
        answer1: "brazil",
        answer2: "cuba",
        answer3: "argentina",
        answer4: "colombia",
        correct: "argentina",
        cat: "Advanced"
    }
];

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
        noScore: "no score"
    };

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