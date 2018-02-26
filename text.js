var randomFeedbackFlag = 10;
var user = [];
var levelText = [];
var quizText = [];
var personalizedFeedback;
var genericText = {};
var defaultFeedback = [];
var advFirstInstructions = {};
var advSecondInstructions = {};
var advThirdInstructions = {};
var advFourthInstructions = {};
var trophiesArray = [];

// Translate everything inside " " but be careful to not change what is inside + +.
function createFeedback(lang) {

    switch(lang) {
        case 'english':

            defaultFeedback.positive = "You have finished the level, and can proceed to the next.";
            defaultFeedback.neutral = "You have finished the level, and can play again or proceed to the next level.";
            defaultFeedback.negative = "You have not completed the level successfully.";

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


            levelText = [
                {
                    fullTitle: "BASIC - 01 Focus on the markers",
                    shortTitle: "Focus on the markers",
                    story: "Look at each marker to strike! TIP: Be fast and accurate for extra points!",
                    storyNeutral: "Try to focus your eyes on a series of markers."
                },
                {
                    fullTitle: "BASIC - 02 Focus on a sequence of markers",
                    shortTitle: "Whack-a-mole!",
                    story: "Whack the markers with your eyes! TIP: Be fast and don't miss any marker to score extra points!",
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
                    story: "The wizard is challenging you to a quiz test. Use the GazeTheWeb Keyboard to type the correct answer to 2 questions.",
                    storyNeutral: "Use the ZOOM buttons to see the available answers and type the correct one to each question using the GazeTheWeb KEYBOARD."
                },
                {
                    fullTitle: "INTERMEDIATE - 03 Find the treasure",
                    shortTitle: "The map",
                    story: "You are about to find where the treasure is. Select each coordinate, copy and then paste them into the map.",
                    storyNeutral: "Use the GazeTheWeb copy & paste functionality to find the treasure."
                },
                {
                    fullTitle: "ADVANCED - 01 Gaze Visualization",
                    shortTitle: "Settings - Gaze Visualization",
                    story: "You uncovered the location of the treasure in the previous levels. Now tread through the path across 4 locations to finally find the treasure, while learning how to use the unique tools GTW has to offer!",
                    storyNeutral: "Learning how to use the Gaze Visualization."
                },
                {
                    fullTitle: "ADVANCED - 02 URL Typing",
                    shortTitle: "URL Typing",
                    story: "Learn how to edit a url on GTW Browser.",
                    storyNeutral: "Learn how to edit a url on GTW Browser."
                },
                {
                    fullTitle: "ADVANCED - 03 Text prediction",
                    shortTitle: "Text prediction",
                    story: "Learn how to type using text prediction.",
                    storyNeutral: "Learn how to type using text prediction."
                },
                {
                    fullTitle: "ADVANCED - 04 Bookmarks",
                    shortTitle: "Bookmarks",
                    story: "Learn how to bookmark a page.",
                    storyNeutral: "Learn how to bookmark a page."
                }
            ];

            // In here translate only the 'question' and 'answer' fields (NO answer_en).
            quizText = [
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
                }
            ];

            // Translate all phrases inside " "
            genericText =
                {
                    gazeTheWeb: "Gaze The Web",
                    subTitle: "Learn how to use the browser",
                    play: "Play",
                    replay: "Replay",
                    levelSelect: "Complete the three groups of levels to become the master of Gaze the Web!",
                    basic: "BASIC",
                    intermediate: "INTERMEDIATE",
                    advanced: "ADVANCED",
                    completed: "COMPLETED",
                    trophies: "trophies",
                    score: "Score",
                    newScore: "CURRENT",
                    best: "BEST",
                    time: "Time",
                    rewards: "Rewards",
                    accuracy: "Accuracy",
                    rankings: "RANKINGS - TOP 3",
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
                    lvl3ManualScroll: "to scroll manually",
                    lvl3AutoScroll: "to auto scroll",
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
                    lvl5ScrollDesc: "Copy: use the",
                    lvl5PasteDesc: "Paste: use the",
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
            advFirstInstructions =
                {
                    openSettings: "Open Settings",
                    generalSettings: "Go to General Settings",
                    enableGaze: "Enable Gaze Visualization",
                    generalSettingsAgain: "Go to General Settings again",
                    disableGaze: "Disable Gaze Visualization",
                    taskComplete: "Level completed"
                };
            advSecondInstructions =
                {
                    openTabs: "Open Tab manager",
                    editUrl: "Edit url",
                    typeUrl: "Type 'www.mamem.eu'",
                    abort: "Close",
                    taskComplete: "Level completed"
                };
            advThirdInstructions =
                {
                    editUrl: "Click on the text element",
                    typeUrl: "Type the missing phrase:",
                    phrase: "See In The World",
                    abort: "Press OK",
                    taskComplete: "Level completed"
                };
            advFourthInstructions =
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
            trophiesArray = [
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
            break;

        case 'greek':

            defaultFeedback.positive = "Έχεις ολοκληρώσει το επίπεδο και μπορείς να προχωρήσεις στο επόμενο.";
            defaultFeedback.neutral = "Έχεις ολοκληρώσει το επίπεδο. Μπορείς να το ξαναπαίξεις ή να προχωρήσεις στο επόμενο.";
            defaultFeedback.negative = "Δεν έχεις ολοκληρώσει το επίπεδο με επιτυχία.";

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

            levelText = [
                {
                    fullTitle: "ΒΑΣΙΚΟ - 01 Εστίασε στους δείκτες",
                    shortTitle: "Εστίασε στους δείκτες",
                    story: "Προσπάθησε να εστιάσεις το βλέμα σου στους δείκτες. Συμβουλή: Να είσαι γρήγορος και ακριβής για κερδίσεις επιπλέον πόντους",
                    storyNeutral: "Προσπάθησε να εστιάσεις το βλέμα σου στους δείκτες."
                },
                {
                    fullTitle: "ΒΑΣΙΚΟ - 02 Εστίασε σε μια σειρά από δείκτες",
                    shortTitle: "Whack-a-mole!",
                    story: "Προσπάθησε να εστιάσεις το βλέμα σου σε κάθε δείκτη όταν αυτός εμφανίζεται. Συμβουλή: Να είσαι γρήγορος και ακριβής για κερδίσεις επιπλέον πόντους",
                    storyNeutral: "Προσπάθησε να εστιάσεις το βλέμα σου στους δείκτες."
                },
                {
                    fullTitle: "ΕΝΔΙΑΜΕΣΟ - 01 Κυνήγι θησαυρού",
                    shortTitle: "Κυνήγι θησαυρού",
                    story: "Ο μάγος ξέρει που βρίσκεται ο θησαυρός. Κατέβα μέχρι το τέλος της σελίδας και επισκέψου όλες τις τοποθεσίες για να βρεις που κρύβεται ο μαγος",
                    storyNeutral: ""
                },
                {
                    fullTitle: "ΕΝΔΙΑΜΕΣΟ - 02 Κουιζ τεστ",
                    shortTitle: "Κουιζ τεστ",
                    story: "Ο μάγος σας προκαλεί σε μια δοκιμασία κουίζ. Χρησιμοποιήστε το πληκτρολόγιο του GazeTheWeb για να γράψετε τη σωστή απάντηση που αντιστοιχεί σε κάθε μια απο τις 2 ερωτήσεις",
                    storyNeutral: ""
                },
                {
                    fullTitle: "ΕΝΔΙΑΜΕΣΟ - 03 Ο χάρτης",
                    shortTitle: "Ο χάρτης",
                    story: "Είσαι πολύ κοντά στο να βρεις τον κρυμμένο θησαυρό. Επέλεξε τις συντεταγμένες μια προς μια, αντέγραψε και στη συνέχεια επικόλλησε τις στο χάρτη",
                    storyNeutral: ""
                },
                {
                    fullTitle: "ΠΡΟΧΩΡΗΜΕΝΟ - 01 Οπτικοποίηση βλέματος",
                    shortTitle: "Οπτικοποίηση Βλέματος",
                    story: "Στα προηγούμενα επίπεδα ανακάλυψες τις συντεταγμένες του θησαυρού! Τώρα ψάξε ανάμεσα στις 4 τοποθεσίες για να βρεις το θησαυρό, καθώς θα μαθαίνεις πως να χρησιμοποιείς τις μοναδικές λειτουργίες του GazeTheWeb",
                    storyNeutral: ""
                },
                {
                    fullTitle: "ΠΡΟΧΩΡΗΜΕΝΟ - 02 Πληκτρολόγηση διέυθυνσης του ίντερνετ",
                    shortTitle: "Πληκτρολόγηση ίντερνετ URL",
                    story: "Μάθε πως να επεξεργάζεσαι μια διεύθυνση του ίντερνετ",
                    storyNeutral: ""
                },
                {
                    fullTitle: "ΠΡΟΧΩΡΗΜΕΝΟ - 03 Πρόβλεψη κειμένου",
                    shortTitle: "Πρόβλεψη κειμένου",
                    story: "Μάθε πως να πληκτρολογείς χρησιμοποιώντας την πρόβλεψη κειμένου",
                    storyNeutral: ""
                },
                {
                    fullTitle: "ΠΡΟΧΩΡΗΜΕΝΟ - 04 Σελιδοδείκτες",
                    shortTitle: "Σελιδοδείκτες",
                    story: "Μάθε πως να διαχειρίζεσαι τους σελιδοδείκτες",
                    storyNeutral: ""
                }
            ];

            quizText = [
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
                }
            ];


            genericText =
                {
                    gazeTheWeb: "Gaze The Web",
                    subTitle: "Μάθε πως να χρησιμοποιείς το πρόγραμμα περιήγησης",
                    play: "Παίξε",
                    replay: "Επανάληψη",
                    levelSelect: "Επίλεξε επίπεδο",
                    basic: "ΒΑΣΙΚΟ",
                    intermediate: "ΕΝΔΙΑΜΕΣΟ",
                    advanced: "ΠΡΟΧΩΡΗΜΕΝΟ",
                    completed: "ΟΛΟΚΛΗΡΩΘΗΚΑΝ",
                    trophies: "τρόπαια",
                    score: "Σκορ",
                    newScore: "ΝΕΟ",
                    best: "ΚΑΛΥΤΕΡΟ",
                    time: "Χρονος",
                    rewards: "Τροπαια",
                    rankings: "ΠΙΝΑΚΑΣ ΒΑΘΜΟΛΟΓΙΑΣ - TOP 5",
                    name: "Όνομα",
                    overview: "Επίπεδα",
                    next: "Επόμενο",
                    start: "Έναρξη",
                    startingIn: "Έναρξη σε",
                    hit: "ΕΠΙΤΥΧΙΑ!",
                    arrScrollUp: "Μετακίνηση προς τα πάνω",
                    arrScrollDown: "Μετακίνηση προς τα κάτω",
                    arrBackBtn: "Τώρα πάτα το κουμπί της Επιστροφής!",
                    arrScrollBtn: "Αυτόματη μετακίνηση",
                    clickEmu: "Εξομοίωση κλικ",
                    zoomBtn: "Ζουμ",
                    textSelBtn: "Επιλογή κειμένου",
                    question: "Ερώτηση",
                    lvl3ScrollDownA: "Μετακινήσου προς τα κάτω ακολουθώντας το ποτάμι",
                    lvl3ScrollDownB: "για να βρείς το μάγο",
                    lvl3Village: "ΧΩΡΙΟ",
                    lvl3BRB: "επιστρέφω!",
                    lvl3Tower: "ΠΥΡΓΟΣ ΤΟΥ ΜΑΓΟΥ",
                    lvl3Cave: "ΣΠΗΛΙΑ",
                    lvl3Select: "Επέλεξε με, με",
                    lvl3ManualScroll: "Μη αυτόματα κύλιση",
                    lvl3AutoScroll: "Αυτόματη κύλιση",
                    lvl4CongrTextA: "Συγχαρητήρια! Με βρήκες!",
                    lvl4CongrTextB: "Η πραγματική δοκιμασία ξεκινάει τώρα!",
                    lvl4ScrollDesc: "Χρησιμοποίησε το κουμπί ZOOM για να διαβάσεις τις διαθέσιμες απαντήσεις και πληκτρολόγησε τη σωστή απάντηση",
                    lvl4ScrollDescSV: "Use the ZOOM button to read the answer, then type it below!",
                    clickMe: "Κλικ!",
                    latitude: "Γεωγραφικό πλάτος",
                    longitude: "Γεωγραφικό μήκος",
                    answer: "Απάντηση",
                    lvl5CongrText: "Άξιος! Τώρα βρες το θησαυρό!",
                    coordinates: "ΣΥΝΤΕΤΑΓΜΕΝΕΣ",
                    lvl5ScrollDesc: "χρησιμοποίησε το",
                    lvl5PasteDesc: "για επικόλληση",
                    lvl5coords: "Λάθος συντεταγμένες! Δεν υπάρχει θησαυρός εκεί!",
                    signedOut: "Ο ΧΡΗΣΤΗΣ ΑΠΟΣΥΝΔΕΘΗΚΕ",
                    tasks: "Ενέργειες",
                    advQuote1: "Be The Change",
                    advQuote2: "That You Want To",
                    noScore: "δεν υπάρχει σκόρ",
                    abort: "Διακοπή",
                    congrats: "ΣΥΓΧΑΡΗΤΗΡΙΑ",
                    trainingComplete: "Ολοκλήρωσες την εκπαίδευση",
                    treasureFound: "Βρήκες το Θησαυρό!",
                    ok: "OK",
                    accuracy: "Ακριβεια"
                };

            advFirstInstructions =
                {
                    openSettings: "Άνοιξε τα Settings",
                    generalSettings: "Πήγαινε στα General Settings",
                    enableGaze: "Ενεργοποίησε το Gaze Visualization",
                    generalSettingsAgain: "Πήγαινε στα General Settings ξανά",
                    disableGaze: "Απενεργοποίησε το Gaze Visualization",
                    taskComplete: "Ολοκλήρωση επιπέδου"
                };
            advSecondInstructions =
                {
                    openTabs: "Άνοιξε τη διαχείριση καρτελών",
                    editUrl: "Επεξεργάσου τη διεύθυνση",
                    typeUrl: "Γράψε 'www.mamem.eu'",
                    abort: "Ακύρωση",
                    taskComplete: "Ολοκλήρωση επιπέδου"
                };
            advThirdInstructions =
                {
                    editUrl: "Κάνε κλικ στο πλαίσιο κειμένου ",
                    typeUrl: "Πληκτρολόγησε τη φράση που λείπει:",
                    phrase: "See In The World",
                    abort: "Πάτα OK",
                    taskComplete: "Ολοκλήρωση επιπέδου"
                };
            advFourthInstructions =
                {
                    openTabs: "Άνοιξε τη διαχείριση καρτελών",
                    bookmark: "Αποθήκευσε τη σελίδα στους σελιδοδείκτες",
                    add: "Άνοιξε καινούρια καρτέλα μέσω της διαχείρισης",
                    openBookmarks: "Πήγαινε στη διαχείριση σελιδοδεικτών",
                    selectBookmark: "Επέλεξε τον αποθηκευμένο σελιδοδείκτη",
                    openTabsAgain: "Άνοιξε τη διαχείριση καρτελών ξανά",
                    taskComplete: "Επιστροφή στην καρτέλα του παιχνιδιού"
                };

            trophiesArray = [
                {
                    group: 'basic',
                    level: 'level1',
                    title: "Ατρόμητος!",
                    description: "Τελείωσες το επίπεδο εστιάζοντας σε κάθε δείκτη μόνο μια φορά!"
                },
                {
                    group: 'basic',
                    level: 'level2',
                    title: "Σκοπευτής!",
                    description: "Εστίασες σε όλους τους δείκτες!"
                },
                {
                    group: 'int',
                    level: 'level1',
                    title: "Η αστραπή!",
                    description: "Ο κεραυνός χτυπά μόνο 1 φορά στο ίδιο μέρος!"
                },
                {
                    group: 'int',
                    level: 'level2',
                    title: "Λόγιος!",
                    description: "Πω πω! Είσαι στ'αλήθεια γνώστης!"
                },
                {
                    group: 'int',
                    level: 'level3',
                    title: "Χαρτογραφημένος!",
                    description: "Βρήκες τις συντεταγμένες για το θησαυρό μονομιάς!"
                },
                {
                    group: 'adv',
                    level: 'level1',
                    title: "'Βλέπω τα πάντα!'",
                    description: "Σου αρέσει πραγματικά να εξερευνείς πως δουλεύουν τα πάντα!"
                },
                {
                    group: 'adv',
                    level: 'level2',
                    title: "Πλοηγός!",
                    description: "Είσαι ο καπετάνιος του πλοίου 'GTW'! ΤΟΥΤ ΤΟΥΤ!"
                },
                {
                    group: 'adv',
                    level: 'level3',
                    title: "Ανδροειδές!",
                    description: "Έχεις υπερβεί τα όρια της ανθρώπινης φύσης!"
                },
                {
                    group: 'adv',
                    level: 'level4',
                    title: "Βιβλιοθηκάριος!",
                    description: "Σου απονέμεται ο τιμητικός τίτλος του βιβλιοθηκάριου!"
                }
            ];

            break;
        case 'hebrew':

            defaultFeedback.positive = "סיימתם את השלב בהצלחה, אתם יכולים להמשיך לשלב הבא";
            defaultFeedback.neutral = "סיימתם את השלב בהצלחה, אתם יכולים לשחק שוב או להמשיך לשלב הבא";
            defaultFeedback.negative = "לא סיימתם את השלב בהצלחה";

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

            // Translate all phrases inside " "
            levelText = [
                {
                    fullTitle: "בסיסי – 01 – התמקדות בסמנים",
                    shortTitle: "התמקדו בסמנים",
                    story: "הסתכלו על כל סמן כדי להכות! טיפ: היו מהירים ומדויקים עבור נקודות נוספות",
                    storyNeutral: "נסו למקד את העיניים על סדרה של סמנים"
                },
                {
                    fullTitle: "בסיסי – 02 – התמקדות ברצף של סמנים",
                    shortTitle: "משחק – הכה את החפרפרת",
                    story: " הכו את הסמנים עם העיניים שלכם! טיפ: היו מהירים ואל תפספסו שום סמן כדי לקבל נקודות נוספות",
                    storyNeutral: "נסו למקד את העיניים על כל סמן כאשר הוא מופיע לזמן מוגבל"
                },
                {
                    fullTitle: "בינוני – 01 מצאו את הקוסם",
                    shortTitle: "צייד אוצרות",
                    story: " הקוסם יודע היכן נמצא האוצר. גללו למטה ובקרו בכל המקומות כדי למצוא היכן הוא מסתתר",
                    storyNeutral: " גללו דרך השלב כדי למצוא את האשף באמצעות כפתורי הגלילה או באמצעות גלילה אוטומטית, והשתמשו בלחצן כדי ללחוץ עליו"
                },
                {
                    fullTitle: "בינוני – 02 החידון",
                    shortTitle: "החידון",
                    story: " הקוסם מאתגר אתכם בחידון. השתמשו במקלדת כדי להקליד את התשובה הנכונה בשתי שאלות",
                    storyNeutral: " השתמשו בלחצני ההתקרבות\התרחקות כדי לראות את התשובות האפשריות והקלידו את התשובות הנכונות לדעתכם באמצעות המקלדת"
                },
                {
                    fullTitle: "בינוני – 03 מצאו את האוצר",
                    shortTitle: "המפה",
                    story: "אתם עומדים למצוא היכן נמצא האוצר. בחרו כל קואורדינטה והעתיקו-הדביקו אותם",
                    storyNeutral: "השתמשו בפונקציות העתקה-הדבקה כדי למצוא את האוצר"
                },
                {
                    fullTitle: "מתקדם – 01 ויזואליזציה למבט",
                    shortTitle: "הגדרות – ויזואליזציה למבט",
                    story: " חשפתם את המיקום של האוצר ברמות הקודמות. עכשיו יש לעקוב אחר הנתיב על פני ארבעה מיקומים שונים כדי למצוא סוף סוף את האוצר, תוך למידה כיצד להשתמש בכלים ייחודיים!",
                    storyNeutral: "ללמוד כיצד למשתמש בוויזואליזציה למבט"
                },
                {
                    fullTitle: "מתקדם – 02 הקלדת כתובת אתר",
                    shortTitle: "הקלדת כתובת אתר",
                    story: "למדו כיצד להקליד כתובת אתר",
                    storyNeutral: "למדו כיצד להקליד כתובת אתר"
                },
                {
                    fullTitle: "מתקדם – 03 ניבוי טקסט",
                    shortTitle: "ניבוי טקסט",
                    story: "למדו אין להשתמש בניבוי טקסט",
                    storyNeutral: "למדו אין להשתמש בניבוי טקסט"
                },
                {
                    fullTitle: "מתקדם – 04 סימניות",
                    shortTitle: "סימניות",
                    story: "למדו איך ליצור סימניות לדף אינטרנט",
                    storyNeutral: "למדו איך ליצור סימניות לדף אינטרנט"
                }
            ];


            quizText = [
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

            genericText =
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
                    lvl3ManualScroll: "to scroll manually",
                    lvl3AutoScroll: "to auto scroll",
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
                    lvl5PasteDesc: "כדי להדביק, השתמשו",
                    lvl5coords: "הקואורדינטות שגוי, האוצר לא נמצא",
                    signedOut: "המשתמש התנתק",
                    tasks: "מטלות",
                    advQuote1: "היו השינוי",
                    advQuote2: "שאתם רוצים להיות",
                    noScore: "אין ציון",
                    abort: "יציאה",
                    congrats: "כל הכבוד",
                    trainingComplete: "השלמתם את האימונים",
                    treasureFound: "מצאתם את האוצר!",
                    ok: "OK",
                    accuracy: "דיוק"
                };

            advFirstInstructions =
                {
                    openSettings: "פתחו הגדרות",
                    generalSettings: "לכו להגדרות כלליות",
                    enableGaze: "gaze visualization אפשרו",
                    generalSettingsAgain: "לכו להגדרות כלליות שוב",
                    disableGaze: "gaze visualization בטלו",
                    taskComplete: "השלב הושלם"
                };
            advSecondInstructions =
                {
                    openTabs: "Tab manager-פתחו את ה",
                    editUrl: "Edit url-בחרו ב",
                    typeUrl: " 'www.mamem.eu'הקלידו",
                    abort: "בטלו",
                    taskComplete: "השלב הושלם"
                };
            advThirdInstructions =
                {
                    editUrl: "לחצו על אלמנט הטקסט",
                    typeUrl: "הקלידו את המשפט הבא:",
                    phrase: "See In The World",
                    abort: "OK לחצו על",
                    taskComplete: "השלב הושלם"
                };
            advFourthInstructions =
                {
                    openTabs: "Tab manager-פתחו את ה",
                    bookmark: "צרו סימניה מהדף הנוכחי",
                    add: "הוסיפו כרטיסייה חדשה",
                    openBookmarks: "Bookmarks-לכו ל",
                    selectBookmark: "Saved bookmark-בחרו ב",
                    openTabsAgain: "שוב Tab manager-פתחו את ה",
                    taskComplete: "חזרו לכרטיסיית המשחק"
                };

            trophiesArray = [
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
            break;
    }
    return personalizedFeedback;
}