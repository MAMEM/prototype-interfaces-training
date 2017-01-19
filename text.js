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
        story: "Learn how to edit a url on GTW Browser"
    },
    {

        fullTitle: "ADVANCED - 03 Text prediction",
        shortTitle: "Text prediction",
        description: "Learn how to type using text prediction",
        story: "Learn how to type using text prediction"
    },
    {
        fullTitle: "ADVANCED - 04 Bookmarks",
        shortTitle: "Bookmarks",
        description: "Learn how to bookmark a page",
        story: "Learn how to bookmark a page"
    }
];

// Categories: easy = 0, int = 1, adv = 2
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
        answer2: "Hieronymus",
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
        typeUrl: "Type 'www.mamem.eu'",
        abort: "Abort",
        taskComplete: "Level completed"
    };
var advThirdInstructions =
    {
        click: "Click on the document to reveal the text",
        editUrl: "Edit text",
        typeUrl: "Type the missing phrase:",
        phrase: "see in the world",
        abort: "Close keyboard",
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