var randomFeedbackFlag = 10;

var user = [];
var personalizedFeedback;

var defaultFeedback = [];
defaultFeedback.positive = "Έχεις ολοκληρώσει το επίπεδο και μπορείς να προχωρήσεις στο επόμενο.";
defaultFeedback.neutral = "Έχεις ολοκληρώσει το επίπεδο. Μπορείς να το ξαναπαίξεις ή να προχωρήσεις στο επόμενο.";
defaultFeedback.negative = "Δεν έχεις ολοκληρώσει το επίπεδο με επιτυχία.";

// Translate everything inside " " but be careful to not change what is inside + +.
function createFeedback() {

    personalizedFeedback = {

        youngMale: {

            positive: [
                "Ουάου " + user.firstName + ", πολύ καλό σκορ! Επίσης κέρδισες το τρόπαιο!",
                user.firstName + ", έκανες πολύ καλό σκορ! Τελείωσες το επίπεδο αποτελεσματικά, κερδίζοντας το τρόπαιο!",
                "Η απόδοση σου είναι από τις καλύτερες, " + user.firstName + "! Συγχαρητήρια, κέρδισες το τρόπαιο!"
            ],
            neutral: [
                user.firstName + ", ολοκλήρωσες το επίπεδο. Μπορείς να το επαναλάβεις έτσι ώστε να κάνεις καλύτερο σκορ και να κερδίσεις το τρόπαιο.",
                "Συγχαρητήρια, ολοκλήρωσες το επίπεδο, " + user.firstName + '. Την επόμενη φορά προσπάθησε να κάνεις καλύτερο σκορ και το τρόπαιο θα είναι δικό σου!',
                "Έπαιξες αρκετά αποτελεσματικά, " + user.firstName + '. Προσπάθησε να βελτιωθείς ώστε να κερδίσεις το τρόπαιο.'
            ],
            negative: [
                user.firstName + ', μπορείς να κάνεις μεγαλύτερο σκορ απο αυτό! Δοκίμασε ξανά και προσπάθησε να κερδίσεις το τρόπαιο!',
                "Μπορείς να παίξεις και πιο αποτελεσματικά, " + user.firstName + '! Δοκίμασε ξανά και κέρδισε αυτό το τρόπαιο!'
            ]
        },

        oldMale: {

            positive: [
                "Ουάου " + user.firstName + ", πολύ καλό σκορ! Κέρδισες το τρόπαιο!",
                user.firstName + ", έκανες πολύ καλό σκορ! Τελείωσες το επίπεδο αποτελεσματικά, κερδίζοντας το τρόπαιο!",
                "Η απόδοση σου είναι από τις καλύτερες, " + user.firstName + "! Συγχαρητήρια, κέρδισες το τρόπαιο!"
            ],
            neutral: [
                user.firstName + ", ολοκλήρωσες το επίπεδο. Είμαι σίγουρος ότι μπορείς να το ξαναπαίξεις ώστε να κερδίσεις το τρόπαιο.",
                "Συγχαρητήρια, ολοκλήρωσες το επίπεδο " + user.firstName + '. Εάν συνεχίσεις να βελτιώνεσαι έτσι, το τρόπαιο θα γίνει δικό σου! Παίξε ξανά!'
            ],
            negative: [
                user.firstName + ", είμαι βέβαιος ότι μπορείς να πετύχεις καλύτερο σκορ. Προσπάθησε ξανά.",
                user.firstName + ", παίξε ξανά το επίπεδο! Ήσουν πολύ κοντά στο να κάνεις ένα πολύ καλό σκορ!"
            ]
        },

        youngFemale: {

            positive: [
                "Ουάου " + user.firstName + ", πολύ καλό σκορ! Κέρδισες το τρόπαιο!",
                user.firstName + ", έκανες πολύ καλό σκορ! Τελείωσες το επίπεδο αποτελεσματικά, κερδίζοντας το τρόπαιο!",
                "Η απόδοση σου είναι από τις καλύτερες, " + user.firstName + "! Συγχαρητήρια, κέρδισες το τρόπαιο!"
            ],
            neutral: [
                user.firstName + ", ολοκλήρωσες το επίπεδο. Πιστεύω πως χωρίς ιδιαίτερη προσπάθεια θα πετύχεις καλύτερο σκορ και θα κερδίσεις το τρόπαιο.",
                "Συγχαρητήρια, ολοκλήρωσες το επίπεδο " + user.firstName + '. Αν προσπαθήσεις λίγο περισσότερο σίγουρα θα επιτύχεις ένα φανταστικό σκορ!'
            ],
            negative: [
                user.firstName + ', μπορεί να χρειάζεσαι εξάσκηση, αλλά θα βελτιώσεις σίγουρα το σκορ σου. Προσπάθησε ξανά!',
                user.firstName + ', το να κερδίσεις το τρόπαιο είναι εφικτό με αρκετή εξάσκηση! Συνέχισε έτσι!'
            ]
        },

        oldFemale: {

            positive: [
                "Ουάου " + user.firstName + ", πολύ καλό σκορ! Όλοι θα πρέπει να είναι περήφανοι που κέρδισες το τρόπαιο!",
                user.firstName + ", μαθαίνεις γρήγορα! Απέκτησες πολύ γρήγορα τις δεξιότητες που σε οδήγησαν στο τρόπαιο!",
                "Μαθαίνεις γρήγορα, " + user.firstName + "! Συγχαρητήρια, κέρδισες το τρόπαιο!"
            ],
            neutral: [
                user.firstName + ", ολοκλήρωσες το επίπεδο αρκετά γρήγορα! Μπορείς να το ξαναπαίξεις και να κάνεις όλους να τρίβουν τα μάτια τους, κερδίζοντας το τρόπαιο!",
                "Μαθαίνεις γρήγορα, " + user.firstName + '! Οι γιατροί σου θα ενθουσιαστούν όταν δουν νέο ακόμα καλύτερο σκορ!'
            ],
            negative: [
                user.firstName + ', συνέχισε να βελτιώνεσαι. Θα καταφέρεις ένα μεγάλο σκορ και όλοι θα μείνει με το στόμα ανοιχτό!',
                user.firstName + ', με συνεχόμενη εξάσκηση θα καταφέρεις να αποκτήσεις αυτό το τρόπαιο! Όλοι θα χαρούν αν κάνεις καλύτερο σκορ!'
            ]
        }
    };

    return personalizedFeedback;
}


// Translate all phrases inside " "
var levelText = [
    {
        fullTitle: "ΒΑΣΙΚΟ - 01 Εστίασε στους δείκτες",
        shortTitle: "Εστίασε στους δείκτες",
        story: "Προσπάθησε να εστιάσεις το βλέμα σου στους δείκτες. Κέρδισε το τρόπαιο εστιάζοντας σε κάθε δείκτη μόνο μια φορά!"
    },
    {
        fullTitle: "ΒΑΣΙΚΟ - 02 Εστίασε σε μια σειρά από δείκτες",
        shortTitle: "Whack-a-mole!",
        story: "Προσπάθησε να εστιάσεις το βλέμα σου σε κάθε δείκτη όταν αυτός εμφανίζεται, για ένα χρονικό διάστημα. Εστίασε σε όλους τους δείκτες και κέρδισε το τρόπαιο!"
    },
    {
        fullTitle: "ΕΝΔΙΑΜΕΣΟ - 01 Βρές το μάγο",
        shortTitle: "Βρές το μάγο",
        story: "Μετακινήσου πάνω κάτω στο επίπεδο ώσπου να βρεις το μάγο, χρησιμοποιώντας τα κουμπιά κύλισης ή την αυτόματη κύλιση, καθώς και το κουμπί εξομείωσης κλικ για να επιλέξεις το μέρος στο οποίο κρύβεται ο μάγος! Επισκέψου όλες τις τοποθεσίες για να κερδίσεις το τρόπαιο!"
    },
    {
        fullTitle: "ΕΝΔΙΑΜΕΣΟ - 02 Παιχνίδι ερωτήσεων",
        shortTitle: "Παιχνίδι ερωτήσεων",
        story: "Βρήκες το μάγο! Σε προκαλλεί σε ένα παιχνίδι ερωτήσεων. Χρησιμοποίησε το κουμπί για ZOOM για να δεις τις διαθέσιμες απαντήσεις και πληκτρολόγησε τες σωστά χρησιμοποιόντας το πληκτρολογιο του GazeTheWeb! Απάντησε σωστά σε όλες τις ερωτήσεις για να κερδίσεις το τρόπαιο!"
    },
    {
        fullTitle: "ΕΝΔΙΑΜΕΣΟ - 03 Ψάξε το θησαυρό",
        shortTitle: "Ο χάρτης",
        story: "Άνοιξε το χάρτη με τη βοήθεια του κουμπιού εξομοίωσης κλικ και στη συνέχεια με τη λειτουργία αντιγραφής & επικόλλησης, βάλε τις συντεταγμένες στο χάρτη για να εντοπίσεις το θησαυρό! Χρησιμοποίησε τη λειτουργία αντιγραφής και επικόλλησης μόνο 2 φορές για να κερδίσεις το τρόπαιο!"
    },
    {
        fullTitle: "ΠΡΟΧΩΡΗΜΕΝΟ - 01 Οπτικοποίηση βλέματος",
        shortTitle: "Ρυθμίσεις - Οπτικοποίηση Βλέματος",
        story: "Στα προηγούμενα επίπεδα ανακάλυψες τις συντεταγμένες του θησαυρού! Τώρα ψάξε ανάμεσα στις 4 τοποθεσίες για να βρεις το θησαυρό, καθώς θα μαθαίνεις πως να χρησιμοποιείς τις μοναδικές λειτουργίες του GazeTheWeb! Προσπάθησε να ακολουθήσεις τις οδηγίες χωρίς να επαναλάβεις το ίδιο βήμα δεύτερη φορά, για να κερδίσεις το τρόπαιο!"
    },
    {
        fullTitle: "ΠΡΟΧΩΡΗΜΕΝΟ - 02 Πληκτρολόγηση διέυθυνσης του ίντερνετ",
        shortTitle: "Πληκτρολόγηση διέυθυνσης του ίντερνετ",
        story: "Μάθε πως να επεξεργάζεσαι μια διεύθυνση του ίντερνετ. Προσπάθησε να ακολουθήσεις τις οδηγίες χωρίς να επαναλάβεις το ίδιο βήμα δεύτερη φορά, για να κερδίσεις το τρόπαιο!"
    },
    {
        fullTitle: "ΠΡΟΧΩΡΗΜΕΝΟ - 03 Πρόβλεψη κειμένου",
        shortTitle: "Πρόβλεψη κειμένου",
        story: "Μάθε πως να πληκτρολογείς χρησιμοποιώντας την πρόβλεψη κειμένου. Προσπάθησε να ακολουθήσεις τις οδηγίες χωρίς να επαναλάβεις το ίδιο βήμα δεύτερη φορά, για να κερδίσεις το τρόπαιο!"
    },
    {
        fullTitle: "ΠΡΟΧΩΡΗΜΕΝΟ - 04 Σελιδοδείκτες",
        shortTitle: "Σελιδοδείκτες",
        story: "Μάθε πως να διαχειρίζεσαι τους σελιδοδείκτες. Προσπάθησε να ακολουθήσεις τις οδηγίες χωρίς να επαναλάβεις το ίδιο βήμα δεύτερη φορά, για να κερδίσεις το τρόπαιο!"
    }
];


// In here translate only the 'question' and 'answer' fields (NO answer_en).
var quizText = [
    {
        question: "Ποιό από τα παρακάτω είναι παραδοσιακό φαγητό της Ελλάδας;",
        answer1: "Μουσακάς",
        answer2: "Μακαρόνια",
        answer3: "Πίτσα",
        answer4: "Μπέργκερ",
        answer1_en: "moussaka", // Don't translate this!
        answer2_en: "spaghetti", // Don't translate this!
        answer3_en: "pizza", // Don't translate this!
        answer4_en: "burger", // Don't translate this!
        correct: "moussaka", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "Ποιός ήταν ο γιος του Δαίδαλου;",
        answer1: "Μίνωας",
        answer2: "Θησέας",
        answer3: "Ίκαρος",
        answer4: "Μενέλαος",
        answer1_en: "minoas", // Don't translate this!
        answer2_en: "theseus", // Don't translate this!
        answer3_en: "icarus", // Don't translate this!
        answer4_en: "menelaus", // Don't translate this!
        correct: "icarus", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "Τι χρώμα μαγιώ φορούσαν οι ναυαγοσώστες του Baywatch;",
        answer1: "Ροζ",
        answer2: "Κόκκινο",
        answer3: "Πράσινο",
        answer4: "Λευκό",
        answer1_en: "pink", // Don't translate this!
        answer2_en: "red", // Don't translate this!
        answer3_en: "green", // Don't translate this!
        answer4_en: "white", // Don't translate this!
        correct: "red", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "Προς τιμήν ποιάς θεάς χτίστηκε η Ακρόπολη;",
        answer1: "Αφροδίτη",
        answer2: "Ήρα",
        answer3: "Άρτεμις",
        answer4: "Αθηνά",
        answer1_en: "aphrodite", // Don't translate this!
        answer2_en: "ira", // Don't translate this!
        answer3_en: "artemis", // Don't translate this!
        answer4_en: "athena", // Don't translate this!
        correct: "athena", // Don't translate this!
        cat: "Easy" // Don't translate this!
    },
    {
        question: "Ποιός θεωρείται πως είναι ο πατέρας της Ιατρικής;",
        answer1: "Ιπποκράτης",
        answer2: "Ιερώνυμος",
        answer3: "Ξενοφών",
        answer4: "Δημοσθένης",
        answer1_en: "hippocrates", // Don't translate this!
        answer2_en: "hieronymus", // Don't translate this!
        answer3_en: "xenophon", // Don't translate this!
        answer4_en: "demosthenes", // Don't translate this!
        correct: "hippocrates", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: "Ποιά ομάδα ποδοσφαίρου κατέκτησε το πρωτάθλημα του 2014?",
        answer1: "Ολυμπιακός",
        answer2: "Παναθηναικός",
        answer3: "ΑΕΚ",
        answer4: "ΠΑΟΚ",
        answer1_en: "olympiacos", // Don't translate this!
        answer2_en: "panathinaikos", // Don't translate this!
        answer3_en: "aek", // Don't translate this!
        answer4_en: "paok", // Don't translate this!
        correct: "olympiacos", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: "Σε ποιά χώρα έγινε το Ευρωπαικό πρωτάθλημα του 2004 το οποίο κατέκτησε η Ελλάδα?",
        answer1: "Ιταλία",
        answer2: "Αγγλία",
        answer3: "Ελλάδα",
        answer4: "Πορτογαλία",
        answer1_en: "italy", // Don't translate this!
        answer2_en: "england", // Don't translate this!
        answer3_en: "greece", // Don't translate this!
        answer4_en: "portugal", // Don't translate this!
        correct: "portugal", // Don't translate this!
        cat: "Intermediate" // Don't translate this!
    },
    {
        question: "Θεωρείται ως ο σημαντικότερος ιστορικός της αρχαιότητας",
        answer1: "Ηρόδοτος",
        answer2: "Ερατοσθένης",
        answer3: "Παυσανίας",
        answer4: "Περικλής",
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
        basic: "ΒΑΣΙΚΟ",
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