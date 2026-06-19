// Aura (الأثر) - App Logic

// Local storage key names
const STORAGE_KEY = 'aura_app_state';

// State management
let state = {
  streak: 0,
  lastCompletedDate: null, // YYYY-MM-DD
  todayCompleted: {
    morningQuote: false,
    eveningQuote: false,
    dailySpark: false,
    date: null
  },
  favorites: [], // Array of favorite items
  customQuotes: [], // User added quotes
  customBooks: [], // User added books
  apiKey: null,
  quizHistory: [],
  lastQuizDate: null, // timestamp or YYYY-MM-DD
  settings: {
    themeMode: 'dynamic' // dynamic, morning, evening
  }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  setupEventListeners();
  checkTimeAndTheme();
  renderApp();
  
  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('Service Worker registered successfully.', reg.scope))
        .catch(err => console.log('Service Worker registration failed: ', err));
    });
  }
  
  // Regularly check theme every minute if dynamic
  setInterval(() => {
    if (state.settings.themeMode === 'dynamic') {
      checkTimeAndTheme();
    }
  }, 60000);
});

// Calculate current date key: YYYY-MM-DD
function getTodayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Calculate yesterday's date key
function getYesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Get stable daily index
function getDayIndex() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  // Simple stable hash to rotate quotes
  const dayCode = year * 365 + month * 31 + day;
  return dayCode % DAILY_QUOTES.length;
}

// Get stable weekly index
function getWeekIndex() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysSinceEpoch = Math.floor(new Date(year, month, day).getTime() / (1000 * 60 * 60 * 24));
  const weekNum = Math.floor(daysSinceEpoch / 7);
  return weekNum % WEEKLY_BOOKS.length;
}

// Local Storage Initializer
function initStorage() {
  const savedState = localStorage.getItem(STORAGE_KEY);
  const todayKey = getTodayKey();
  
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      // Merge saved state into default state to maintain backward compatibility
      state = { ...state, ...parsed };
      
      // Ensure sub-objects exist
      state.todayCompleted = state.todayCompleted || { morningQuote: false, eveningQuote: false, dailySpark: false, date: null };
      state.settings = state.settings || { themeMode: 'dynamic' };
      state.favorites = state.favorites || [];
      state.customQuotes = state.customQuotes || [];
      state.customBooks = state.customBooks || [];
      state.apiKey = state.apiKey || null;
      state.quizHistory = state.quizHistory || [];
      state.lastQuizDate = state.lastQuizDate || null;
    } catch (e) {
      console.error("Failed to parse storage, using defaults", e);
    }
  }

  // Handle new day transition
  if (state.todayCompleted.date !== todayKey) {
    const yesterdayKey = getYesterdayKey();
    
    // Check if yesterday was completed to preserve streak
    const yesterdayWasCompleted = state.lastCompletedDate === yesterdayKey;
    const todayWasCompleted = state.lastCompletedDate === todayKey;
    
    if (!yesterdayWasCompleted && !todayWasCompleted) {
      // Streak broken
      state.streak = 0;
    }
    
    // Reset daily checkboxes
    state.todayCompleted = {
      morningQuote: false,
      eveningQuote: false,
      dailySpark: false,
      date: todayKey
    };
    
    saveState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Theme Engine
function checkTimeAndTheme() {
  const mode = state.settings.themeMode;
  
  if (mode === 'morning') {
    applyTheme('morning');
  } else if (mode === 'evening') {
    applyTheme('evening');
  } else {
    // Dynamic based on hour
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      applyTheme('morning');
    } else {
      applyTheme('evening');
    }
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  const body = document.body;
  
  if (theme === 'morning') {
    root.style.setProperty('--theme-bg-gradient', 'linear-gradient(135deg var(--in-oklch), var(--morning-bg-1), var(--morning-bg-2))');
    root.style.setProperty('--theme-accent', 'var(--morning-accent)');
    root.style.setProperty('--theme-card-bg', 'var(--morning-card-bg)');
    root.style.setProperty('--theme-card-border', 'var(--morning-card-border)');
    root.style.setProperty('--theme-text-main', 'var(--morning-text-main)');
    root.style.setProperty('--theme-text-muted', 'var(--morning-text-muted)');
    root.style.setProperty('--theme-shadow', 'var(--morning-shadow)');
    body.setAttribute('data-active-theme', 'morning');
  } else {
    root.style.setProperty('--theme-bg-gradient', 'linear-gradient(135deg var(--in-oklch), var(--evening-bg-1), var(--evening-bg-2))');
    root.style.setProperty('--theme-accent', 'var(--evening-accent)');
    root.style.setProperty('--theme-card-bg', 'var(--evening-card-bg)');
    root.style.setProperty('--theme-card-border', 'var(--evening-card-border)');
    root.style.setProperty('--theme-text-main', 'var(--evening-text-main)');
    root.style.setProperty('--theme-text-muted', 'var(--evening-text-muted)');
    root.style.setProperty('--theme-shadow', 'var(--evening-shadow)');
    body.setAttribute('data-active-theme', 'evening');
  }
}

// Rendering Engine
function renderApp() {
  renderQuote();
  renderSpark();
  renderBookOfTheWeek();
  renderChecklist();
  renderLibrary();
  renderFavorites();
}

// Render Daily Quote
function renderQuote(tabOverride = null) {
  const container = document.getElementById('daily-quote-container');
  if (!container) return;
  
  const dayIdx = getDayIndex();
  let quote = DAILY_QUOTES[dayIdx];
  
  // Determine if showing morning or evening quote
  let isMorning = true;
  if (tabOverride) {
    isMorning = tabOverride === 'morning';
  } else {
    const hour = new Date().getHours();
    isMorning = (hour >= 6 && hour < 18);
  }
  
  // Render tabs
  const tabHTML = `
    <div class="quote-tabs">
      <button class="tab-btn ${isMorning ? 'active' : ''}" onclick="changeQuoteTab('morning')">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/></svg> Morning
      </button>
      <button class="tab-btn ${!isMorning ? 'active' : ''}" onclick="changeQuoteTab('evening')">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Evening
      </button>
    </div>
  `;
  
  const activeQuote = isMorning ? quote.morning : quote.evening;
  const isFavorite = checkIfFavorite('quote', dayIdx + (isMorning ? '-m' : '-e'));
  
  let quoteTextHTML = '';
  if (activeQuote.translation) {
    // Has original Arabic
    quoteTextHTML = `
      <div class="quote-arabic">${activeQuote.text}</div>
      <div class="quote-translation">"${activeQuote.translation}"</div>
    `;
  } else {
    quoteTextHTML = `
      <div class="quote-text">"${activeQuote.text}"</div>
    `;
  }
  
  container.innerHTML = `
    ${tabHTML}
    <div class="quote-body">
      ${quoteTextHTML}
      <div class="quote-meta">
        <div class="quote-author-info">
          <span class="quote-author">${activeQuote.author}</span>
          <span class="quote-source">${activeQuote.source}</span>
        </div>
        <div class="quote-actions">
          <button class="icon-btn" onclick="toggleFavorite('quote', '${dayIdx + (isMorning ? '-m' : '-e')}', ${JSON.stringify(activeQuote).replace(/"/g, '&quot;')})" aria-label="Favorite quote">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" style="${isFavorite ? 'color: #ff4a4a;' : ''}">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

window.changeQuoteTab = function(type) {
  renderQuote(type);
};

// Render Daily Spark
function renderSpark() {
  const container = document.getElementById('daily-spark-container');
  if (!container) return;
  
  const dayIdx = getDayIndex();
  const spark = DAILY_SPARKS[dayIdx % DAILY_SPARKS.length];
  const isFavorite = checkIfFavorite('spark', dayIdx);
  
  container.innerHTML = `
    <div class="spark-category">${spark.category}</div>
    <h3 class="spark-title">${spark.title}</h3>
    <p class="spark-content">${spark.content}</p>
    <div class="quote-meta" style="margin-top: 16px; border-top: 1px solid rgba(128,128,128,0.1); padding-top: 12px;">
      <span class="quote-source" style="font-size: 0.8rem;">Concept study from <strong>${spark.source}</strong></span>
      <button class="icon-btn" onclick="toggleFavorite('spark', ${dayIdx}, ${JSON.stringify(spark).replace(/"/g, '&quot;')})" aria-label="Favorite spark">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" style="${isFavorite ? 'color: #ff4a4a;' : ''}">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>
  `;
}

// Render Book of the Week
function renderBookOfTheWeek() {
  const container = document.getElementById('book-of-the-week-container');
  if (!container) return;
  
  const weekIdx = getWeekIndex();
  const book = WEEKLY_BOOKS[weekIdx];
  const isFavorite = checkIfFavorite('book', weekIdx);
  
  // Format takeaways list
  const takeawaysHTML = book.takeaways.map(t => `<li>${t}</li>`).join('');
  
  // Style config for book cover
  const theme = book.colorTheme;
  const styleClass = `book-cover-style-${theme.style || 'classic'}`;
  
  container.innerHTML = `
    <div class="book-recommendation">
      <div class="book-cover-container">
        <div class="book-cover ${styleClass}" style="background: ${theme.bg}; color: ${theme.text}; border-color: ${theme.accent}">
          <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <span class="book-cover-author" style="color: ${theme.accent};">${book.author}</span>
            <div class="book-cover-divider" style="background-color: ${theme.accent};"></div>
            <h4 class="book-cover-title">${book.title}</h4>
          </div>
          <span style="font-size: 0.5rem; text-align: center; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.5;">Aura Curated</span>
        </div>
      </div>
      <div class="book-details">
        <h3 class="book-title">${book.title}</h3>
        <span class="book-author">by ${book.author}</span>
        <p class="book-desc">${book.description}</p>
        <p class="spark-category" style="font-size: 0.7rem; margin-bottom: 4px;">Key Takeaways</p>
        <ul class="book-takeaways">
          ${takeawaysHTML}
        </ul>
        <div class="quote-meta" style="margin-top: 18px; border-top: 1px solid rgba(128,128,128,0.1); padding-top: 12px; justify-content: flex-end;">
          <button class="icon-btn" onclick="toggleFavorite('book', ${weekIdx}, ${JSON.stringify(book).replace(/"/g, '&quot;')})" aria-label="Favorite book">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" style="${isFavorite ? 'color: #ff4a4a;' : ''}">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render Daily Checklist and Streaks
function renderChecklist() {
  const morningCB = document.getElementById('check-morning');
  const eveningCB = document.getElementById('check-evening');
  const sparkCB = document.getElementById('check-spark');
  const streakText = document.getElementById('streak-count');
  
  if (morningCB) morningCB.checked = state.todayCompleted.morningQuote;
  if (eveningCB) eveningCB.checked = state.todayCompleted.eveningQuote;
  if (sparkCB) sparkCB.checked = state.todayCompleted.dailySpark;
  
  if (streakText) {
    streakText.innerText = `${state.streak} Day Streak`;
  }
}

// Check list item toggle logic
window.toggleCheck = function(type) {
  const todayKey = getTodayKey();
  
  if (type === 'morning') {
    state.todayCompleted.morningQuote = !state.todayCompleted.morningQuote;
  } else if (type === 'evening') {
    state.todayCompleted.eveningQuote = !state.todayCompleted.eveningQuote;
  } else if (type === 'spark') {
    state.todayCompleted.dailySpark = !state.todayCompleted.dailySpark;
  }
  
  // Check if today is completed fully
  const allCompleted = state.todayCompleted.morningQuote && 
                        state.todayCompleted.eveningQuote && 
                        state.todayCompleted.dailySpark;
                        
  if (allCompleted) {
    if (state.lastCompletedDate !== todayKey) {
      state.streak += 1;
      state.lastCompletedDate = todayKey;
      triggerConfetti(); // fun micro-animation reward!
    }
  } else {
    // If they unchecked something that was completed today, reduce streak back down
    if (state.lastCompletedDate === todayKey) {
      state.streak = Math.max(0, state.streak - 1);
      state.lastCompletedDate = null;
    }
  }
  
  saveState();
  renderChecklist();
};

// Render full library (for the Library tab)
function renderLibrary() {
  const container = document.getElementById('library-list-container');
  if (!container) return;
  
  let libraryHTML = '';
  
  // Combine curated books + custom books
  const allBooks = [...WEEKLY_BOOKS, ...state.customBooks];
  
  if (allBooks.length === 0) {
    container.innerHTML = `<div class="empty-state">No books in library.</div>`;
    return;
  }
  
  allBooks.forEach((book, index) => {
    const isCustom = index >= WEEKLY_BOOKS.length;
    const bookId = isCustom ? `custom-${index}` : index;
    const isFavorite = checkIfFavorite('book', bookId);
    
    // Cover configurations
    const theme = book.colorTheme || { bg: 'linear-gradient(135deg, #444, #666)', text: '#fff', accent: '#fff', style: 'classic' };
    const styleClass = `book-cover-style-${theme.style || 'classic'}`;
    const takeawaysHTML = book.takeaways ? book.takeaways.map(t => `<li>${t}</li>`).join('') : '';
    
    libraryHTML += `
      <div class="glass-card" style="margin-bottom: 20px;">
        <div class="book-recommendation">
          <div class="book-cover-container">
            <div class="book-cover ${styleClass}" style="background: ${theme.bg}; color: ${theme.text}; border-color: ${theme.accent}; width: 110px; height: 165px; padding: 12px 8px;">
              <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                <span class="book-cover-author" style="color: ${theme.accent}; font-size: 0.55rem;">${book.author}</span>
                <div class="book-cover-divider" style="background-color: ${theme.accent}; margin: 4px auto;"></div>
                <h4 class="book-cover-title" style="font-size: 0.75rem;">${book.title}</h4>
              </div>
            </div>
          </div>
          <div class="book-details">
            <h3 class="book-title" style="font-size: 1.15rem;">${book.title}</h3>
            <span class="book-author">by ${book.author}</span>
            <p class="book-desc" style="font-size: 0.85rem; margin-bottom: 8px;">${book.description}</p>
            ${takeawaysHTML ? `
              <ul class="book-takeaways" style="margin-bottom: 12px;">
                ${takeawaysHTML}
              </ul>
            ` : ''}
            <div class="quote-meta" style="border-top: 1px solid rgba(128,128,128,0.1); padding-top: 8px;">
              ${isCustom ? `
                <button class="favorite-delete" onclick="deleteCustomBook(${index - WEEKLY_BOOKS.length})" style="font-size: 0.85rem;">Delete Card</button>
              ` : `
                <span class="quote-source" style="font-size: 0.7rem;">Curated selection</span>
              `}
              <button class="icon-btn" onclick="toggleFavorite('book', '${bookId}', ${JSON.stringify(book).replace(/"/g, '&quot;')})" aria-label="Favorite book" style="width: 34px; height: 34px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" style="${isFavorite ? 'color: #ff4a4a;' : ''}">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = libraryHTML;
}

// Render Favorites Drawer list
function renderFavorites() {
  const container = document.getElementById('favorites-list');
  if (!container) return;
  
  if (state.favorites.length === 0) {
    container.innerHTML = `<div class="empty-state">No favorites saved yet. Start saving quotes and books to see them here!</div>`;
    return;
  }
  
  let favoritesHTML = '';
  state.favorites.forEach((fav, index) => {
    let contentHTML = '';
    
    if (fav.type === 'quote') {
      if (fav.data.translation) {
        contentHTML = `
          <div class="favorite-text" style="font-family: serif; font-size: 1.15rem; text-align: right; direction: rtl;">${fav.data.text}</div>
          <div class="favorite-text" style="font-style: italic;">"${fav.data.translation}"</div>
        `;
      } else {
        contentHTML = `<div class="favorite-text">"${fav.data.text}"</div>`;
      }
      contentHTML += `<span class="favorite-author">— ${fav.data.author} (${fav.data.source})</span>`;
    } else if (fav.type === 'spark') {
      contentHTML = `
        <div class="favorite-text" style="font-weight: 700; color: var(--theme-accent); margin-bottom: 2px;">[SPARK] ${fav.data.title}</div>
        <p class="favorite-text" style="font-size: 0.85rem; opacity: 0.9;">${fav.data.content}</p>
        <span class="favorite-author">— ${fav.data.source}</span>
      `;
    } else if (fav.type === 'book') {
      contentHTML = `
        <div class="favorite-text" style="font-weight: 700; margin-bottom: 2px;">[BOOK] ${fav.data.title}</div>
        <p class="favorite-text" style="font-size: 0.85rem; opacity: 0.9;">${fav.data.description}</p>
        <span class="favorite-author">— by ${fav.data.author}</span>
      `;
    }
    
    favoritesHTML += `
      <div class="favorite-item">
        <div style="flex-grow: 1;">
          ${contentHTML}
        </div>
        <button class="favorite-delete" onclick="removeFavoriteByIndex(${index})" aria-label="Remove favorite">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `;
  });
  
  container.innerHTML = favoritesHTML;
}

// Favorites utility functions
function checkIfFavorite(type, id) {
  return state.favorites.some(fav => fav.type === type && fav.id === id);
}

window.toggleFavorite = function(type, id, data) {
  const index = state.favorites.findIndex(fav => fav.type === type && fav.id === id);
  if (index >= 0) {
    state.favorites.splice(index, 1);
  } else {
    state.favorites.push({ type, id, data });
  }
  saveState();
  renderApp();
};

window.removeFavoriteByIndex = function(index) {
  state.favorites.splice(index, 1);
  saveState();
  renderApp();
};

// Add Custom items
window.saveCustomQuote = function(e) {
  e.preventDefault();
  const textVal = document.getElementById('custom-quote-text').value;
  const authorVal = document.getElementById('custom-quote-author').value;
  const sourceVal = document.getElementById('custom-quote-source').value || 'Unknown';
  const translationVal = document.getElementById('custom-quote-translation').value;
  
  const newQuote = {
    text: textVal,
    author: authorVal,
    source: sourceVal
  };
  
  if (translationVal) {
    newQuote.translation = translationVal;
  }
  
  // Custom quotes will be added directly into our rotation data
  DAILY_QUOTES.push({
    id: `custom-${DAILY_QUOTES.length + 1}`,
    morning: newQuote,
    evening: newQuote
  });
  
  // Reset form
  document.getElementById('add-quote-form').reset();
  alert("Quote added successfully to rotation!");
  renderQuote();
};

window.saveCustomBook = function(e) {
  e.preventDefault();
  const title = document.getElementById('custom-book-title').value;
  const author = document.getElementById('custom-book-author').value;
  const description = document.getElementById('custom-book-desc').value;
  const t1 = document.getElementById('custom-book-t1').value;
  const t2 = document.getElementById('custom-book-t2').value;
  const t3 = document.getElementById('custom-book-t3').value;
  const coverColor = document.getElementById('custom-book-color').value || '#444444';
  
  const takeaways = [];
  if (t1) takeaways.push(t1);
  if (t2) takeaways.push(t2);
  if (t3) takeaways.push(t3);
  
  const newBook = {
    title,
    author,
    description,
    takeaways,
    colorTheme: {
      bg: `linear-gradient(135deg, ${coverColor}, ${adjustColorBrightness(coverColor, -30)})`,
      text: '#ffffff',
      accent: '#f39c12',
      style: 'modern'
    }
  };
  
  state.customBooks.push(newBook);
  saveState();
  
  // Reset form
  document.getElementById('add-book-form').reset();
  alert("Book added successfully to library!");
  renderLibrary();
};

window.deleteCustomBook = function(index) {
  if (confirm("Are you sure you want to delete this book recommendation?")) {
    state.customBooks.splice(index, 1);
    saveState();
    renderLibrary();
  }
};

// Utility to darken/lighten custom hex codes for gradient covers
function adjustColorBrightness(hex, percent) {
  let num = parseInt(hex.replace("#",""), 16),
  amt = Math.round(2.55 * percent),
  R = (num >> 16) + amt,
  G = (num >> 8 & 0x00FF) + amt,
  B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

// Navigation & Screen switching
window.switchTab = function(tabName) {
  // Hide all screens
  const screens = document.querySelectorAll('.app-screen');
  screens.forEach(s => s.style.display = 'none');
  
  // Show target screen
  const target = document.getElementById(`screen-${tabName}`);
  if (target) target.style.display = 'block';
  
  // Update nav highlight
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(n => n.classList.remove('active'));
  
  const activeNav = document.getElementById(`nav-${tabName}`);
  if (activeNav) activeNav.classList.add('active');
  
  // Render specific states
  if (tabName === 'library') {
    renderLibrary();
  } else if (tabName === 'quiz') {
    if (typeof updateQuizView === 'function') {
      updateQuizView();
    }
  }
};

// Settings Controls
window.changeThemeMode = function(mode) {
  state.settings.themeMode = mode;
  saveState();
  checkTimeAndTheme();
  
  // Re-render quote because tab backgrounds changes based on theme
  renderQuote();
};

window.saveApiKey = function(value) {
  state.apiKey = value ? value.trim() : null;
  saveState();
  // If the user goes back to the Quiz tab, update the view state.
  if (typeof updateQuizView === 'function') {
    updateQuizView();
  }
};

window.resetAllData = function() {
  if (confirm("Warning: This will clear your streaks, favorites, and custom books. Proceed?")) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
};

// Drawer controls
window.openDrawer = function(id) {
  const drawer = document.getElementById(id);
  const overlay = document.getElementById(`${id}-overlay`);
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
  }
};

window.closeDrawer = function(id) {
  const drawer = document.getElementById(id);
  const overlay = document.getElementById(`${id}-overlay`);
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  }
};

// Event Listeners setup
function setupEventListeners() {
  // Theme Mode Select handler
  const themeSelect = document.getElementById('setting-theme-mode');
  if (themeSelect) {
    themeSelect.value = state.settings.themeMode;
    themeSelect.addEventListener('change', (e) => {
      changeThemeMode(e.target.value);
    });
  }

  // Populate API key if saved
  const apiKeyInput = document.getElementById('setting-api-key');
  if (apiKeyInput && state.apiKey) {
    apiKeyInput.value = state.apiKey;
  }
}

// Confetti Reward animation on Checklist completion!
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let particles = [];
  const colors = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71', '#f1c40f'];
  
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height + 20,
      angle: Math.random() * Math.PI * 2,
      speed: 10 + Math.random() * 10,
      friction: 0.95,
      gravity: 0.3,
      size: 5 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    
    particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed - p.gravity;
      p.speed *= p.friction;
      p.opacity -= 0.015;
      
      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });
    
    if (alive) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }
  
  animate();
}
