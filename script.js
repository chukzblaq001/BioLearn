/* =========================================
   BIOLEARN - MAIN JAVASCRIPT FILE
   Student page + Admin page
========================================= */
"use strict";
const KEYS = {
  completed: "biolearnCompletedLessons",
  history: "biolearnExamHistory",
  dailyAnswers: "biolearnDailyAnswers",
  streak: "biolearnDailyStreak",
  custom: "biolearnAdminQuestions"
};
const $ = selector => document.querySelector(selector);
function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error("Storage read failed:", error);
    return fallback;
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Storage write failed:", error);
    return false;
  }
}
function el(tag, className = "", text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== "") element.textContent = text;
  return element;
}
function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
/* =========================================
   BIOLOGY LESSONS
========================================= */
const lessons = [
  {
    id: "cell",
    title: "Cell Biology",
    summary: "Cells, organelles and organisation of living things.",
    topic: "Cell Biology",
    notes: [
      [
        "What is a cell?",
        "A cell is the basic structural and functional unit of life."
      ],
      [
        "Cell structures",
        "The cell membrane regulates exchange. Cytoplasm is where many reactions occur. The nucleus contains most genetic material in eukaryotic cells."
      ],
      [
        "Organelles",
        "Mitochondria release usable energy. Ribosomes build proteins. Plant cells typically have a cellulose cell wall, chloroplasts and a large vacuole."
      ]
    ]
  },
  {
    id: "plant",
    title: "Plant Biology",
    summary: "Photosynthesis, transport and plant structures.",
    topic: "Plant Biology",
    notes: [
      [
        "Photosynthesis",
        "Green plants use light energy, chlorophyll, carbon dioxide and water to make glucose and release oxygen."
      ],
      [
        "Transport",
        "Xylem transports water and minerals. Phloem transports sugars and other organic substances."
      ],
      [
        "Transpiration",
        "Transpiration is the loss of water vapour from plant surfaces, especially leaves."
      ]
    ]
  },
  {
    id: "human",
    title: "Human Biology",
    summary: "Blood, digestion, breathing and body systems.",
    topic: "Human Biology",
    notes: [
      [
        "Blood",
        "Red blood cells carry oxygen using haemoglobin. White blood cells help defend the body. Platelets help clotting. Plasma transports dissolved substances."
      ],
      [
        "Digestion",
        "Digestion breaks large food molecules into smaller molecules that can be absorbed."
      ],
      [
        "Respiration",
        "Cellular respiration releases energy from nutrients. Aerobic respiration uses oxygen."
      ]
    ]
  },
  {
    id: "genetics",
    title: "Genetics",
    summary: "DNA, genes, chromosomes and inheritance.",
    topic: "Genetics",
    notes: [
      [
        "Genes and DNA",
        "DNA carries genetic information. A gene is a DNA sequence associated with a functional product or inherited characteristic."
      ],
      [
        "Chromosomes",
        "Chromosomes are structures made of DNA and proteins. Most human body cells normally contain 46 chromosomes."
      ],
      [
        "Inheritance",
        "Alleles are different versions of a gene. Inheritance depends on how alleles are passed to offspring."
      ]
    ]
  },
  {
    id: "ecology",
    title: "Ecology",
    summary: "Ecosystems, food chains and the environment.",
    topic: "Ecology",
    notes: [
      [
        "Ecosystems",
        "An ecosystem includes organisms and the non-living environment with which they interact."
      ],
      [
        "Food chains",
        "Producers make organic food; consumers feed on organisms; decomposers break down dead material."
      ],
      [
        "Energy flow",
        "Energy flows through food chains, with some energy transferred to the environment at each trophic level."
      ]
    ]
  },
  {
    id: "micro",
    title: "Microbiology",
    summary: "Bacteria, viruses, fungi and microorganisms.",
    topic: "Microbiology",
    notes: [
      [
        "Microorganisms",
        "Microorganisms are generally too small to be seen clearly without magnification."
      ],
      [
        "Bacteria",
        "Bacteria are single-celled prokaryotes. Some are useful and some can cause disease."
      ],
      [
        "Viruses",
        "Viruses need host cells to reproduce. Antibiotics do not treat viral infections."
      ]
    ]
  }
];
/* =========================================
   STARTER BIOLOGY QUESTIONS
========================================= */
const questions = [
  {
    topic: "Cell Biology",
    question: "Which organelle is commonly called the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondrion", "Ribosome", "Golgi apparatus"],
    answer: 1,
    explanation: "Mitochondria produce most of the ATP used to power cellular activities."
  },
  {
    topic: "Cell Biology",
    question: "Which structure regulates movement into and out of a cell?",
    options: ["Cell membrane", "Nucleolus", "Ribosome", "Chromosome"],
    answer: 0,
    explanation: "The cell membrane is selectively permeable."
  },
  {
    topic: "Plant Biology",
    question: "Which process uses light energy to help plants make glucose?",
    options: ["Transpiration", "Germination", "Photosynthesis", "Fermentation"],
    answer: 2,
    explanation: "Photosynthesis converts light energy into chemical energy."
  },
  {
    topic: "Plant Biology",
    question: "Which tissue mainly transports water from roots?",
    options: ["Phloem", "Xylem", "Epidermis", "Cambium"],
    answer: 1,
    explanation: "Xylem conducts water and dissolved minerals."
  },
  {
    topic: "Human Biology",
    question: "Which blood component transports most oxygen?",
    options: ["Platelets", "Plasma", "Red blood cells", "White blood cells"],
    answer: 2,
    explanation: "Haemoglobin in red blood cells binds oxygen."
  },
  {
    topic: "Human Biology",
    question: "Which blood component helps blood clot?",
    options: ["Platelets", "Red blood cells", "Bile", "Alveoli"],
    answer: 0,
    explanation: "Platelets help initiate blood clot formation."
  },
  {
    topic: "Genetics",
    question: "What is a basic unit of heredity?",
    options: ["Organ", "Gene", "Tissue", "Enzyme"],
    answer: 1,
    explanation: "A gene is a DNA sequence associated with a functional product or inherited characteristic."
  },
  {
    topic: "Ecology",
    question: "Which is a producer in a grassland food chain?",
    options: ["Lion", "Grass", "Goat", "Eagle"],
    answer: 1,
    explanation: "Grass makes organic food by photosynthesis."
  },
  {
    topic: "Microbiology",
    question: "Which statement about viruses is correct?",
    options: [
      "They make their own food",
      "They replicate inside suitable host cells",
      "All are visible to the naked eye",
      "Antibiotics kill all viruses"
    ],
    answer: 1,
    explanation: "Viruses depend on host cells to replicate."
  },
  {
    topic: "Biological Methods",
    question: "Which instrument is commonly used to observe cells?",
    options: ["Barometer", "Thermometer", "Microscope", "Ammeter"],
    answer: 2,
    explanation: "A microscope magnifies small structures."
  },
  {
    topic: "Human Biology",
    question: "Where does gas exchange mainly occur in human lungs?",
    options: ["Trachea", "Alveoli", "Oesophagus", "Diaphragm"],
    answer: 1,
    explanation: "Alveoli provide a large, thin surface for gas exchange."
  },
  {
    topic: "Ecology",
    question: "What is the main energy source for most ecosystems?",
    options: ["The Moon", "The Sun", "Soil minerals", "Wind alone"],
    answer: 1,
    explanation: "Sunlight supports photosynthesis and most food webs."
  },
  {
    topic: "Cell Biology",
    question: "Which structure contains most genetic material in a typical eukaryotic cell?",
    options: ["Nucleus", "Cell wall", "Vacuole", "Cell membrane"],
    answer: 0,
    explanation: "The nucleus contains most DNA in a typical eukaryotic cell."
  },
  {
    topic: "Plant Biology",
    question: "Loss of water vapour from plant surfaces is called:",
    options: ["Pollination", "Transpiration", "Fertilisation", "Germination"],
    answer: 1,
    explanation: "Transpiration is water-vapour loss from plant surfaces."
  },
  {
    topic: "Genetics",
    question: "Different versions of the same gene are called:",
    options: ["Organs", "Alleles", "Tissues", "Enzymes"],
    answer: 1,
    explanation: "Alleles are alternative versions of a gene."
  }
];
/* =========================================
   EXAM STATE
========================================= */
let active = [];
let answers = [];
let index = 0;
let mode = "practice";
let examType = "JAMB";
let seconds = 0;
let timer = null;
/* =========================================
   LESSON DISPLAY AND PROGRESS
========================================= */
function renderLessons() {
  const grid = $("#lesson-grid");
  if (!grid) return;
  grid.replaceChildren();
  lessons.forEach((lesson, i) => {
    const card = el("article", "lesson-card");
    card.append(
      el("div", "lesson-num", String(i + 1).padStart(2, "0")),
      el("h3", "", lesson.title),
      el("p", "", lesson.summary)
    );
    const button = el("button", "button primary", "Open lesson");
    button.type = "button";
    button.addEventListener("click", () => openLesson(lesson.id));
    card.append(button);
    grid.append(card);
  });
  updateProgress();
}
function openLesson(id) {
  const lesson = lessons.find(item => item.id === id);
  if (!lesson) return;
  $("#lesson-topic").textContent = lesson.topic.toUpperCase();
  $("#lesson-title").textContent = lesson.title;
  const content = $("#lesson-content");
  content.replaceChildren();
  lesson.notes.forEach(([heading, paragraph]) => {
    content.append(
      el("h4", "", heading),
      el("p", "", paragraph)
    );
  });
  const completed = read(KEYS.completed, []) || [];
  const done = completed.includes(id);
  $("#complete-lesson").textContent = done
    ? "Completed ✓"
    : "Mark as completed";
  $("#lesson-message").textContent = done
    ? "This lesson is already marked complete."
    : "";
  $("#complete-lesson").onclick = () => {
    const savedLessons = read(KEYS.completed, []) || [];
    if (!savedLessons.includes(id)) {
      savedLessons.push(id);
    }
    if (!write(KEYS.completed, savedLessons)) {
      $("#lesson-message").textContent =
        "Could not save progress. Check browser storage.";
      return;
    }
    $("#complete-lesson").textContent = "Completed ✓";
    $("#lesson-message").textContent = "Progress saved. Well done!";
    updateProgress();
  };
  $("#lesson-viewer").hidden = false;
  $("#lesson-viewer").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
function getHistory() {
  const history = read(KEYS.history, []);
  return Array.isArray(history) ? history : [];
}
function updateProgress() {
  if (!$("#completed-count")) return;
  const completed = read(KEYS.completed, []) || [];
  const percentage = Math.round(
    completed.length / lessons.length * 100
  );
  $("#completed-count").textContent = completed.length;
  $("#hero-completed").textContent = completed.length;
  $("#completion-percent").textContent = `${percentage}% complete`;
  $("#lesson-progress").style.width = percentage + "%";
  const history = getHistory();
  $("#attempt-count").textContent = history.length;
  $("#average-score").textContent =
    (history.length
      ? Math.round(
          history.reduce(
            (sum, item) => sum + (Number(item.percent) || 0),
            0
          ) / history.length
        )
      : 0) + "%";
  $("#best-score").textContent =
    (history.length
      ? Math.max(...history.map(item => Number(item.percent) || 0))
      : 0) + "%";
  const historyBox = $("#exam-history");
  historyBox.replaceChildren();
  if (!history.length) {
    historyBox.append(
      el("p", "muted", "Complete an exam to see your results.")
    );
  }
  history.slice(0, 5).forEach(item => {
    const row = el("div", "history-row");
    row.append(
      el("span", "", `${item.examName} · ${item.mode}`),
      el(
        "strong",
        "",
        `${item.score}/${item.total} (${item.percent}%)`
      )
    );
    historyBox.append(row);
  });
  renderTopicAnalysis();
}
/* =========================================
   TOPIC ANALYSIS
========================================= */
function renderTopicAnalysis() {
  const box = $("#topic-analysis");
  if (!box) return;
  box.replaceChildren();
  const totals = {};
  getHistory().forEach(exam => {
    Object.entries(exam.topicResults || {}).forEach(([topic, result]) => {
      if (
        !result ||
        !Number.isFinite(result.correct) ||
        !Number.isFinite(result.total) ||
        result.total <= 0
      ) {
        return;
      }
      if (!totals[topic]) {
        totals[topic] = { correct: 0, total: 0 };
      }
      totals[topic].correct += result.correct;
      totals[topic].total += result.total;
    });
  });
  const items = Object.entries(totals)
    .map(([name, result]) => ({
      ...result,
      name,
      pct: Math.round(result.correct / result.total * 100)
    }))
    .sort((a, b) => a.pct - b.pct);
  if (!items.length) {
    box.append(
      el("p", "muted", "Complete an exam to begin topic analysis.")
    );
    return;
  }
  items.forEach(topic => {
    const item = el("div", "topic-item");
    const heading = el("div", "topic-head");
    heading.append(
      el("strong", "", topic.name),
      el("strong", "", topic.pct + "%")
    );
    const bar = el("div", "topic-bar");
    const fill = el("div");
    fill.style.width = topic.pct + "%";
    bar.append(fill);
    item.append(
      heading,
      bar,
      el(
        "p",
        "muted",
        `${topic.correct} correct out of ${topic.total}${
          topic.total >= 3 && topic.pct < 60
            ? " — prioritise revision"
            : ""
        }.`
      )
    );
    box.append(item);
  });
}
/* =========================================
   EXAM QUESTION BANK
========================================= */
function getExamQuestions(type) {
  const custom = read(KEYS.custom, []);
  const selected = String(type).toUpperCase();
  const matched = (Array.isArray(custom) ? custom : [])
    .filter(question =>
      selected === "ALL" ||
      question.examCategory === "ALL" ||
      question.examCategory === selected
    )
    .filter(question =>
      typeof question.question === "string" &&
      Array.isArray(question.options) &&
      question.options.length === 4 &&
      Number.isInteger(question.answer) &&
      question.answer >= 0 &&
      question.answer < 4 &&
      question.options.every(
        option => typeof option === "string" && option.trim()
      )
    )
    .map(question => ({
      topic: question.topic || "Other",
      question: question.question,
      options: [...question.options],
      answer: question.answer,
      explanation: question.explanation || ""
    }));
  return shuffle([
    ...questions.map(question => ({
      ...question,
      options: [...question.options]
    })),
    ...matched
  ]);
}
/* =========================================
   START EXAM
========================================= */
function startExam() {
  examType = $("#exam-type").value;
  mode = $("#exam-mode").value;
  const allQuestions = getExamQuestions(examType);
  const countValue = $("#exam-count").value;
  const count = countValue === "all"
    ? allQuestions.length
    : Number(countValue);
  if (!allQuestions.length) {
    alert("No questions available.");
    return;
  }
  active = allQuestions.slice(
    0,
    Math.min(count, allQuestions.length)
  );
  answers = Array(active.length).fill(null);
  index = 0;
  seconds = mode === "timed" ? 900 : 0;
  $("#exam-label").textContent =
    `${examType === "ALL" ? "ALL BIOLOGY" : examType + " BIOLOGY"} · ` +
    `${mode === "timed" ? "TIMED CBT" : "PRACTICE"}`;
  $("#exam-area").hidden = false;
  $("#exam-result").hidden = true;
  if (timer) clearInterval(timer);
  if (mode === "timed") {
    showTimer();
    timer = setInterval(() => {
      seconds--;
      showTimer();
      if (seconds <= 0) {
        finishExam(true);
      }
    }, 1000);
  } else {
    $("#timer").textContent = "No timer";
  }
  renderQuestion();
  $("#exam-area").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
function showTimer() {
  const minutes = Math.floor(Math.max(0, seconds) / 60);
  const remainingSeconds = Math.max(0, seconds) % 60;
  $("#timer").textContent =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(remainingSeconds).padStart(2, "0")}`;
}
/* =========================================
   DISPLAY EXAM QUESTIONS
========================================= */
function renderQuestion() {
  const question = active[index];
  if (!question) return;
  $("#question-number").textContent =
    `Question ${index + 1} of ${active.length}`;
  $("#question-topic").textContent = question.topic;
  $("#question-text").textContent = question.question;
  $("#exam-bar").style.width =
    ((index + 1) / active.length * 100) + "%";
  $("#exam-feedback").textContent = "";
  const box = $("#question-options");
  box.replaceChildren();
  question.options.forEach((option, i) => {
    const button = el(
      "button",
      "exam-option",
      `${"ABCD"[i]}. ${option}`
    );
    button.type = "button";
    if (answers[index] === i) {
      button.classList.add("selected");
    }
    button.addEventListener("click", () => {
      answers[index] = i;
      [...box.children].forEach(element => {
        element.classList.remove("selected");
      });
      button.classList.add("selected");
      if (mode === "practice") {
        $("#exam-feedback").textContent =
          (i === question.answer ? "Correct. " : "Not quite. ") +
          question.explanation;
      }
    });
    box.append(button);
  });
  $("#previous-question").disabled = index === 0;
  $("#next-question").textContent =
    index === active.length - 1
      ? "Last question"
      : "Next";
}
/* =========================================
   FINISH EXAM AND SAVE RESULT
========================================= */
function finishExam(expired = false) {
  if (!active.length) return;
  if (timer) clearInterval(timer);
  timer = null;
  const total = active.length;
  const score = active.reduce(
    (sum, question, i) =>
      sum + (answers[i] === question.answer ? 1 : 0),
    0
  );
  const unanswered = answers.filter(answer => answer === null).length;
  const wrong = total - score - unanswered;
  const percentage = Math.round(score / total * 100);
  const topicResults = {};
  active.forEach((question, i) => {
    const topic = question.topic || "Other";
    if (!topicResults[topic]) {
      topicResults[topic] = { correct: 0, total: 0 };
    }
    topicResults[topic].total++;
    if (answers[i] === question.answer) {
      topicResults[topic].correct++;
    }
  });
  const history = getHistory();
  history.unshift({
    examName: examType === "ALL" ? "All Biology questions" : examType,
    mode,
    score,
    total,
    percent: percentage,
    wrong,
    unanswered,
    timeExpired: expired,
    topicResults,
    date: new Date().toISOString()
  });
  const historySaved = write(
    KEYS.history,
    history.slice(0, 100)
  );
  $("#exam-area").hidden = true;
  const result = $("#exam-result");
  result.replaceChildren(
    el("p", "eyebrow", "EXAM COMPLETE"),
    el("h3", "", `Your score: ${score}/${total} (${percentage}%)`),
    el(
      "p",
      "",
      `Correct: ${score} · Incorrect: ${wrong} · Unanswered: ${unanswered}`
    ),
    el(
      "p",
      "muted",
      expired
        ? "Time ran out. Your answers were submitted automatically."
        : historySaved
          ? "Your result has been saved in this browser."
          : "Your score was calculated, but the result could not be saved."
    )
  );
  const details = el("details");
  const summary = el("summary", "", "Review answers and explanations");
  details.append(summary);
  active.forEach((question, i) => {
    const block = el("div", "topic-item");
    block.append(
      el("strong", "", `${i + 1}. ${question.question}`),
      el(
        "p",
        "muted",
        `Your answer: ${
          answers[i] === null
            ? "Not answered"
            : question.options[answers[i]]
        }`
      ),
      el("p", "", "Correct answer: " + question.options[question.answer]),
      el("p", "muted", question.explanation)
    );
    details.append(block);
  });
  result.append(details);
  result.hidden = false;
  active = [];
  answers = [];
  updateProgress();
  result.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}
/* =========================================
   DAILY QUESTION
========================================= */
function dailyDate(date = new Date()) {
  return `${date.getFullYear()}-` +
    `${String(date.getMonth() + 1).padStart(2, "0")}-` +
    `${String(date.getDate()).padStart(2, "0")}`;
}
function dailyQuestion() {
  const today = dailyDate();
  const [year, month, day] = today.split("-").map(Number);
  const number = Math.floor(
    new Date(year, month - 1, day).getTime() / 86400000
  );
  return questions[
    ((number % questions.length) + questions.length) % questions.length
  ];
}
function renderDaily() {
  if (!$("#daily-question")) return;
  const question = dailyQuestion();
  const today = dailyDate();
  const answersByDay = read(KEYS.dailyAnswers, {});
  const streak = read(KEYS.streak, {
    count: 0,
    lastCompletedDate: null,
    correctTotal: 0
  });
  $("#daily-streak").textContent = streak.count || 0;
  $("#daily-correct").textContent = streak.correctTotal || 0;
  $("#daily-topic").textContent = question.topic.toUpperCase();
  $("#daily-question").textContent = question.question;
  const box = $("#daily-options");
  box.replaceChildren();
  $("#daily-feedback").textContent = "";
  question.options.forEach((option, i) => {
    const button = el(
      "button",
      "daily-option",
      `${"ABCD"[i]}. ${option}`
    );
    button.type = "button";
    if (answersByDay[today]) {
      button.disabled = true;
      if (i === question.answer) {
        button.classList.add("selected");
      }
      if (
        i === answersByDay[today].selectedIndex &&
        i !== question.answer
      ) {
        button.style.borderColor = "#b42318";
      }
    } else {
      button.addEventListener("click", () => answerDaily(i));
    }
    box.append(button);
  });
  if (answersByDay[today]) {
    $("#daily-feedback").textContent =
      (answersByDay[today].correct
        ? "Correct! "
        : "Not quite. The correct answer is " +
          question.options[question.answer] + ". ") +
      question.explanation;
  }
}
function answerDaily(i) {
  const today = dailyDate();
  const question = dailyQuestion();
  const answersByDay = read(KEYS.dailyAnswers, {});
  if (answersByDay[today]) return;
  const correct = i === question.answer;
  answersByDay[today] = {
    selectedIndex: i,
    correct,
    topic: question.topic
  };
  const streak = read(KEYS.streak, {
    count: 0,
    lastCompletedDate: null,
    correctTotal: 0
  });
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = dailyDate(yesterdayDate);
  streak.count =
    streak.lastCompletedDate === yesterday
      ? (streak.count || 0) + 1
      : 1;
  streak.lastCompletedDate = today;
  if (correct) {
    streak.correctTotal = (streak.correctTotal || 0) + 1;
  }
  const answersSaved = write(KEYS.dailyAnswers, answersByDay);
  const streakSaved = write(KEYS.streak, streak);
  if (!answersSaved || !streakSaved) {
    alert("Could not save progress. Check browser storage.");
    return;
  }
  renderDaily();
}
/* =========================================
   INITIALISE STUDENT PAGE
========================================= */
function initStudent() {
  renderLessons();
  updateProgress();
  renderDaily();
  $("#start-exam").addEventListener("click", startExam);
  $("#previous-question").addEventListener("click", () => {
    if (index > 0) {
      index--;
      renderQuestion();
    }
  });
  $("#next-question").addEventListener("click", () => {
    if (index < active.length - 1) {
      index++;
      renderQuestion();
    } else {
      $("#exam-feedback").textContent =
        "This is the last question. Select Finish exam when ready.";
    }
  });
  $("#finish-exam").addEventListener("click", () => {
    if (confirm("Finish and submit this exam?")) {
      finishExam();
    }
  });
  $("#close-lesson").addEventListener("click", () => {
    $("#lesson-viewer").hidden = true;
  });
  const toggle = $("#menu-toggle");
  const nav = $("#main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
}
/* =========================================
   ADMIN PAGE
========================================= */
function initAdmin() {
  const form = $("#admin-form");
  if (!form) return;
  const field = id => $("#" + id);
  const msg = (text, error = false) => {
    field("admin-message").textContent = text;
    field("admin-message").style.color =
      error ? "#b42318" : "#16835b";
  };
  const get = () => {
    const questions = read(KEYS.custom, []);
    return Array.isArray(questions) ? questions : [];
  };
  const save = questions => write(KEYS.custom, questions);
  const reset = () => {
    form.reset();
    field("admin-id").value = "";
    field("form-heading").textContent = "Add a question";
    field("admin-save").textContent = "Save question";
    field("admin-cancel").hidden = true;
    msg("");
  };
  const update = () => {
    const questions = get();
    field("admin-total").textContent = questions.length;
    field("admin-jamb").textContent = questions.filter(
      question => ["JAMB", "ALL"].includes(question.examCategory)
    ).length;
    field("admin-waec").textContent = questions.filter(
      question => ["WAEC", "ALL"].includes(question.examCategory)
    ).length;
    field("admin-neco").textContent = questions.filter(
      question => ["NECO", "ALL"].includes(question.examCategory)
    ).length;
  };
  const render = () => {
    const term = field("admin-search").value.trim().toLowerCase();
    const box = field("admin-list");
    box.replaceChildren();
    const filteredQuestions = get().filter(question =>
      [
        question.question,
        question.topic,
        question.examCategory,
        question.explanation,
        ...(question.options || [])
      ].join(" ").toLowerCase().includes(term)
    );
    if (!filteredQuestions.length) {
      box.append(
        el(
          "p",
          "muted",
          term ? "No matching questions." : "No custom questions yet."
        )
      );
    }
    filteredQuestions.forEach(question => {
      const item = el("article", "admin-question");
      const heading = el("h3", "", question.question);
      item.append(
        heading,
        el(
          "p",
          "admin-question-meta",
          `Topic: ${question.topic} · Category: ${question.examCategory}`
        )
      );
      const list = el("ol");
      question.options.forEach((option, i) => {
        list.append(
          el(
            "li",
            "",
            `${"ABCD"[i]}. ${option}${
              i === question.answer ? " (Correct)" : ""
            }`
          )
        );
      });
      item.append(
        list,
        el("p", "", `Explanation: ${question.explanation}`)
      );
      const actions = el("div", "admin-actions");
      const edit = el("button", "button secondary", "Edit");
      const del = el("button", "button danger", "Delete");
      edit.type = "button";
      del.type = "button";
      edit.addEventListener("click", () => {
        field("admin-id").value = question.id;
        field("admin-question").value = question.question;
        field("admin-topic").value = question.topic;
        field("admin-category").value = question.examCategory;
        ["option-a", "option-b", "option-c", "option-d"].forEach(
          (id, i) => {
            field(id).value = question.options[i];
          }
        );
        field("admin-answer").value = String(question.answer);
        field("admin-explanation").value = question.explanation;
        field("form-heading").textContent = "Edit question";
        field("admin-save").textContent = "Update question";
        field("admin-cancel").hidden = false;
        msg("Editing question.");
        form.scrollIntoView({
          behavior: "smooth"
        });
      });
      del.addEventListener("click", () => {
        if (!confirm("Delete this question?")) return;
        const remaining = get().filter(
          item => item.id !== question.id
        );
        if (!save(remaining)) {
          return msg("Could not save changes.", true);
        }
        if (field("admin-id").value === question.id) {
          reset();
        }
        render();
        msg("Question deleted.");
      });
      actions.append(edit, del);
      item.append(actions);
      box.append(item);
    });
    update();
  };
  form.addEventListener("submit", event => {
    event.preventDefault();
    const question = field("admin-question").value.trim();
    const topic = field("admin-topic").value;
    const examCategory = field("admin-category").value;
    const options = [
      "option-a",
      "option-b",
      "option-c",
      "option-d"
    ].map(id => field(id).value.trim());
    const answer = Number(field("admin-answer").value);
    const explanation = field("admin-explanation").value.trim();
    if (
      !question ||
      !topic ||
      !examCategory ||
      options.some(option => !option) ||
      !Number.isInteger(answer) ||
      answer < 0 ||
      answer > 3 ||
      !explanation
    ) {
      return msg(
        "Complete all fields and choose the correct answer.",
        true
      );
    }
    const questions = get();
    const id = field("admin-id").value;
    if (id) {
      const position = questions.findIndex(item => item.id === id);
      if (position < 0) {
        return msg(
          "Question not found. Refresh and try again.",
          true
        );
      }
      questions[position] = {
        ...questions[position],
        question,
        topic,
        examCategory,
        options,
        answer,
        explanation,
        updatedAt: new Date().toISOString()
      };
    } else {
      questions.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        question,
        topic,
        examCategory,
        options,
        answer,
        explanation,
        createdAt: new Date().toISOString()
      });
    }
    if (!save(questions)) {
      return msg(
        "Could not save. Browser storage may be unavailable.",
        true
      );
    }
    reset();
    render();
    msg(id ? "Question updated." : "Question saved.");
  });
  field("admin-cancel").addEventListener("click", reset);
  field("admin-search").addEventListener("input", render);
  render();
}
/* =========================================
   START THE CORRECT PAGE
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  if ($("#admin-form")) {
    initAdmin();
  }
  if ($("#lesson-grid")) {
    initStudent();
  }
});