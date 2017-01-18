var textString = [];

textString.levelSuperComplete = 'Wow ' + user.firstName + ', great score! You also got the trophy!';
textString.levelComplete = 'You completed the level. You can try replaying it in order to earn the trophy.';
textString.levelIncomplete = 'Please try again';


var levelText = [
    {
        fullTitle: "BASIC - 01 Focus on the markers",
        shortTitle: "Focus on the markers",
        description: "Focus long enough on several locations",
        story: "Try to focus your eyes on a series of markers for a set amount of time!"
    },
    {
        fullTitle: "BASIC - 02 Focus on a sequence of markers",
        shortTitle: "Whack-a-mole!",
        description: "Focus on a sequence of locations",
        story: "Try to focus your eyes on each marker when it appears, for a set amount of time!"
    },
    {
        fullTitle: "INTERMEDIATE - 01 Find the wizard",
        shortTitle: "Find the wizard",
        description: "He is hiding somewhere along the river",
        story: "Scroll through the level to find the wizard using the scroll overlays or the auto scrolling, and use the click emulation button to select the place where he is hiding!"
    },
    {
        fullTitle: "INTERMEDIATE - 02 The Quiz",
        shortTitle: "The quiz",
        description: "Let GazeTheWeb aid you to answer correctly to the quiz",
        story: "You found the wizard! Now he is challenging you to a quiz test. Use the ZOOM buttons to see the available answers and type the correct one to each question using the GazeTheWeb KEYBOARD!"
    },
    {
        fullTitle: "INTERMEDIATE - 03 Find the treasure",
        shortTitle: "The map",
        description: "Use GazeTheWeb copy & paste functionality to find the treasure",
        story: "Open the map using the click emulation button, then use the GazeTheWeb copy & paste functionality to find the treasure!"
    },
    {
        fullTitle: "ADVANCED - 01 Gaze Visualization",
        shortTitle: "Settings - Gaze Visualization",
        description: "Access General Settings of GTW and learn how to use Gaze Visualization",
        story: "You uncovered the location of the treasure in the previous levels. Now tread through the path accross 4 locations to finally find the treasure, while learning how to use the unique tools GTW has to offer!"
    },
    {
        fullTitle: "ADVANCED - 02 URL Typing",
        shortTitle: "URL Typing",
        description: "Learn how to type a url",
        story: "Learn how to type a url for a new tab to open"
    },
    {

        fullTitle: "ADVANCED - 03 Text prediction",
        shortTitle: "Text prediction",
        description: "Learn how to use the text predictor",
        story: "---------------------------------"
    },
    {
        fullTitle: "ADVANCED - 04 Bookmarks",
        shortTitle: "Bookmarks",
        description: "Learn how to bookmark a page",
        story: "---------------------------------"
    }
];

// Categories: easy = 0, int = 1, adv = 2
var quizText = [
    {
        questionLabel: "Easy 1",
        question: "Which of the following is a traditional Greek dish?",
        answer1: "moussaka",
        answer2: "spaghetti",
        answer3: "pizza",
        answer4: "burger",
        correct: "moussaka",
        cat: "Easy"
    },
    {
        questionLabel: "Easy 2",
        question: "Who is the son of Daedalus?",
        answer1: "minoas",
        answer2: "theseus",
        answer3: "icarus",
        answer4: "menelaus",
        correct: "icarus",
        cat: "Easy"
    },
    {
        questionLabel: "Easy 3",
        question: "What was the color of the ‘Baywatch’ lifeguard swimsuit?",
        answer1: "pink",
        answer2: "red",
        answer3: "green",
        answer4: "white",
        correct: "red",
        cat: "Easy"
    },
    {
        questionLabel: "Easy 4",
        question: "In honor of which goddess was the Acropolis of Athens built?",
        answer1: "aphrodite",
        answer2: "ira",
        answer3: "artemis",
        answer4: "athena",
        correct: "athena",
        cat: "Easy"
    },
    {
        questionLabel: "Int 1",
        question: "what? 1",
        answer1: "pizza",
        answer2: "hat",
        answer3: "bat",
        answer4: "jesus",
        correct: "pizza",
        cat: "Intermediate"
    },
    {
        questionLabel: "Int 2",
        question: "what? 2",
        answer1: "ant",
        answer2: "panda",
        answer3: "bear",
        answer4: "bug",
        correct: "ant",
        cat: "Intermediate"
    },
    {
        questionLabel: "Int 3",
        question: "what? 3",
        answer1: "1",
        answer2: "2",
        answer3: "3",
        answer4: "4",
        correct: "1",
        cat: "Intermediate"
    },
    {
        questionLabel: "Int 4",
        question: "what? 3",
        answer1: "a) 1",
        answer2: "b) 2",
        answer3: "c) 3",
        answer4: "d) 4",
        correct: "1",
        cat: "Intermediate"
    },
    {
        questionLabel: "Adv 1",
        question: "what? 1",
        answer1: "a) pizza",
        answer2: "b) hat",
        answer3: "c) bat",
        answer4: "d) jesus",
        correct: "pizza",
        cat: "Advanced"
    },
    {
        questionLabel: "Adv 2",
        question: "what? 2",
        answer1: "a) ant",
        answer2: "b) panda",
        answer3: "c) bear",
        answer4: "d) bug",
        correct: "ant",
        cat: "Advanced"
    },
    {
        questionLabel: "Adv 3",
        question: "what? 3",
        answer1: "a) 1",
        answer2: "b) 2",
        answer3: "c) 3",
        answer4: "d) 4",
        correct: "1",
        cat: "Advanced"
    },
    {
        questionLabel: "Adv 4",
        question: "what? 3",
        answer1: "a) 1",
        answer2: "b) 2",
        answer3: "c) 3",
        answer4: "d) 4",
        correct: "1",
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
        latitude: "latitude",
        longitude: "longitude",
        lvl5CongrText: "You have been deemed worthy! Now find the treasure!",
        coordinates: "COORDINATES",
        lvl5ScrollDesc: "use the",
        signedOut: "USER IS SIGNED OUT",
        tasks: "Tasks"
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
        typeUrl: "Type www.mamem.eu",
        abort: "Abort",
        taskComplete: "Level completed"
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
        title: "In Control!",
        description: "You really like to see how everything works."
    },
    {
        group: 'adv',
        level: 'level2',
        title: "Commander!",
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