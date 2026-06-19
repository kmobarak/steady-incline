// Aura (الأثر) - Weekly Quiz Engine

// Local state for the quiz
let activeQuizState = {
  mode: null, // 'weekly' or 'practice'
  type: null, // 'guess_author', 'explain_concept', 'book_reflection'
  question: null,
  referenceInfo: null,
  score: 0,
  feedback: null,
  correctExplanation: null
};

// Check and update Quiz Tab View
window.updateQuizView = function() {
  const setupPanel = document.getElementById('quiz-state-setup');
  const lockedPanel = document.getElementById('quiz-state-locked');
  const readyPanel = document.getElementById('quiz-state-ready');
  const activePanel = document.getElementById('quiz-state-active');
  const loadingPanel = document.getElementById('quiz-state-loading');
  const resultPanel = document.getElementById('quiz-state-result');

  // Hide all first
  setupPanel.style.display = 'none';
  lockedPanel.style.display = 'none';
  readyPanel.style.display = 'none';
  activePanel.style.display = 'none';
  loadingPanel.style.display = 'none';
  resultPanel.style.display = 'none';

  // State 1: API Key missing
  if (!state.apiKey) {
    setupPanel.style.display = 'block';
    return;
  }

  // State 2: Active quiz taking place (don't interrupt if they just navigated)
  if (activeQuizState.question && activePanel.style.display === 'none' && loadingPanel.style.display === 'none' && resultPanel.style.display === 'none') {
    activePanel.style.display = 'block';
    return;
  }

  // Check locking state (if weekly quiz taken in last 7 days)
  if (state.lastQuizDate) {
    const lastQuiz = new Date(state.lastQuizDate).getTime();
    const now = Date.now();
    const diffTime = now - lastQuiz;
    const cooldown = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

    if (diffTime < cooldown) {
      // Locked state
      lockedPanel.style.display = 'block';
      startLockCountdown(cooldown - diffTime);
      return;
    }
  }

  // State 3: Ready for weekly challenge
  readyPanel.style.display = 'block';
};

// Timer for cooldown display
let countdownInterval = null;
function startLockCountdown(remainingMs) {
  const countdownEl = document.getElementById('quiz-locked-countdown');
  if (!countdownEl) return;

  if (countdownInterval) clearInterval(countdownInterval);

  function updateTimer() {
    if (remainingMs <= 0) {
      clearInterval(countdownInterval);
      updateQuizView();
      return;
    }

    const days = Math.floor(remainingMs / (24 * 60 * 60 * 1000));
    const hours = Math.floor((remainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);

    countdownEl.innerText = `Next quiz in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    remainingMs -= 1000;
  }

  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

// Start a non-saved Practice Quiz
window.startPracticeQuiz = function() {
  generateQuizQuestion('practice');
};

// Generate Question client-side
window.generateQuizQuestion = function(mode) {
  // Clear input
  const inputEl = document.getElementById('quiz-user-answer');
  if (inputEl) inputEl.value = '';

  activeQuizState.mode = mode;

  // Decide type of question (randomly select from 3 categories)
  const types = ['guess_author', 'explain_concept', 'book_reflection'];
  const chosenType = types[Math.floor(Math.random() * types.length)];
  activeQuizState.type = chosenType;

  const badgeEl = document.getElementById('quiz-question-type');
  const questionEl = document.getElementById('quiz-question-content');

  if (chosenType === 'guess_author') {
    badgeEl.innerText = "Guess the Author";
    badgeEl.className = "quiz-badge badge-author";

    // Combine standard and custom quotes
    const quotes = [...DAILY_QUOTES, ...state.customQuotes.map(q => ({ morning: q, evening: q }))];
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteObject = quotes[quoteIndex];
    // Randomly choose morning or evening quote
    const quoteSub = Math.random() > 0.5 ? quoteObject.morning : quoteObject.evening;

    const quoteText = quoteSub.translation || quoteSub.text;
    activeQuizState.question = `Reflect on this quote:\n\n"${quoteText}"\n\n**Who is the author? What is the book/source? Describe the core philosophical meaning in your own words.**`;
    activeQuizState.referenceInfo = `Author: ${quoteSub.author}, Book/Source: ${quoteSub.source}${quoteSub.translation ? `, English Translation: ${quoteSub.translation}` : ''}`;
  } 
  else if (chosenType === 'explain_concept') {
    badgeEl.innerText = "Explain the Concept";
    badgeEl.className = "quiz-badge badge-concept";

    const index = Math.floor(Math.random() * DAILY_SPARKS.length);
    const spark = DAILY_SPARKS[index];

    activeQuizState.question = `Explain the concept of **"${spark.title}"** (from '${spark.source}').\n\n**What are the key ideas of this concept, and why is it significant?**`;
    activeQuizState.referenceInfo = `Concept Name: ${spark.title}, Source: ${spark.source}, Explanation Details: ${spark.content}`;
  } 
  else {
    badgeEl.innerText = "Book Reflection";
    badgeEl.className = "quiz-badge badge-book";

    // Combine standard and custom books
    const books = [...WEEKLY_BOOKS, ...state.customBooks];
    const bookIndex = Math.floor(Math.random() * books.length);
    const book = books[bookIndex];

    const takeawayIndex = Math.floor(Math.random() * book.takeaways.length);
    const takeaway = book.takeaways[takeawayIndex];

    activeQuizState.question = `In **"${book.title}"** by ${book.author}, one of the key takeaways is:\n\n*"${takeaway}"*\n\n**How does this takeaway apply to modern cultural, philosophical, or intellectual struggles? Reflect in your own words.**`;
    activeQuizState.referenceInfo = `Book Title: ${book.title}, Author: ${book.author}, Summary: ${book.description}, Takeaway Details: ${takeaway}`;
  }

  // Display active question panel
  questionEl.innerText = activeQuizState.question;
  
  // Update view to active panel
  document.getElementById('quiz-state-ready').style.display = 'none';
  document.getElementById('quiz-state-locked').style.display = 'none';
  document.getElementById('quiz-state-active').style.display = 'block';
};

// Cancel quiz state
window.cancelQuiz = function() {
  activeQuizState = {
    mode: null,
    type: null,
    question: null,
    referenceInfo: null,
    score: 0,
    feedback: null,
    correctExplanation: null
  };
  updateQuizView();
};

// Submit response to Gemini for grading
window.submitQuizAnswer = async function(event) {
  event.preventDefault();

  const userAnswer = document.getElementById('quiz-user-answer').value;
  if (!userAnswer.trim()) return;

  // Show loading
  document.getElementById('quiz-state-active').style.display = 'none';
  document.getElementById('quiz-state-loading').style.display = 'block';

  const systemPrompt = `You are a supportive but intellectually rigorous tutor for a personal reading and reflection PWA called "Aura" (الأثر). 
The user is studying philosophy (Islamic and Western), literature, history, and social science.
Your job is to grade the user's answer to the following question.

Question Category: ${activeQuizState.type}
Question: ${activeQuizState.question}
Reference Information: ${activeQuizState.referenceInfo}

User's response:
"${userAnswer}"

Grade the response on a scale of 1 to 5 (1 being incorrect/insufficient, 5 being exceptionally deep, accurate, and showing high critical thinking).
Provide a constructive, encouraging, but intellectually honest critique of their response in "critique".
Provide a clear, detailed correct answer or explanation in "correctExplanation".
Respond ONLY in JSON matching the schema.`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${state.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              score: { type: "INTEGER", description: "Score from 1 to 5 stars" },
              critique: { type: "STRING", description: "Constructive, intellectual critique and feedback" },
              correctExplanation: { type: "STRING", description: "Correct reference explanation or details" }
            },
            required: ["score", "critique", "correctExplanation"]
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    const resultObj = JSON.parse(resultText);

    activeQuizState.score = Math.max(1, Math.min(5, resultObj.score));
    activeQuizState.feedback = resultObj.critique;
    activeQuizState.correctExplanation = resultObj.correctExplanation;

    // Save history if it's the weekly quiz
    if (activeQuizState.mode === 'weekly') {
      state.lastQuizDate = getTodayKey();
      state.quizHistory.push({
        date: getTodayKey(),
        type: activeQuizState.type,
        question: activeQuizState.question,
        userAnswer: userAnswer,
        score: activeQuizState.score,
        feedback: activeQuizState.feedback
      });
      // Give a streak boost or trigger confetti if score is >= 3
      if (activeQuizState.score >= 3) {
        state.streak = (state.streak || 0) + 1;
        state.lastCompletedDate = getTodayKey();
        if (typeof triggerConfetti === 'function') triggerConfetti();
      }
      saveState();
    }

    // Display Results
    document.getElementById('quiz-state-loading').style.display = 'none';
    document.getElementById('quiz-state-result').style.display = 'block';

    document.getElementById('quiz-score-stars').innerText = "⭐".repeat(activeQuizState.score);
    document.getElementById('quiz-score-text').innerText = `Score: ${activeQuizState.score} / 5 (${activeQuizState.mode === 'weekly' ? 'Weekly Quiz' : 'Practice Quiz'})`;
    document.getElementById('quiz-feedback-text').innerText = activeQuizState.feedback;
    document.getElementById('quiz-ideal-text').innerText = activeQuizState.correctExplanation;

  } catch (error) {
    console.error("Gemini API error", error);
    alert("Error communicating with Gemini API. Please make sure your API key is correct and you have an active network connection.");
    
    // Fallback to active screen
    document.getElementById('quiz-state-loading').style.display = 'none';
    document.getElementById('quiz-state-active').style.display = 'block';
  }
};

// Wrap up quiz session
window.finishQuiz = function() {
  // Clear state
  activeQuizState = {
    mode: null,
    type: null,
    question: null,
    referenceInfo: null,
    score: 0,
    feedback: null,
    correctExplanation: null
  };
  
  // Re-render streak badge
  const countEl = document.getElementById('streak-count');
  if (countEl) {
    countEl.innerText = `${state.streak} Day Streak`;
  }
  
  updateQuizView();
};
