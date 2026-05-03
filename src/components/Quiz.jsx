import { useState, useReducer } from 'react';
import { useReveal } from '../hooks/index.js';
import { quizData, badges } from '../data/content.js';

// ── Quiz Reducer ──────────────────────────────────────
const initialState = {
  current: 0,
  score: 0,
  selected: null,
  done: false,
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SELECT': {
      const correct = action.idx === quizData[state.current].ans;
      return { ...state, selected: action.idx, score: correct ? state.score + 1 : state.score };
    }
    case 'NEXT': {
      const next = state.current + 1;
      if (next >= quizData.length) return { ...state, done: true };
      return { ...state, current: next, selected: null };
    }
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

function getBadgeIdx(score) {
  if (score === 5) return 4;
  if (score === 4) return 3;
  if (score === 3) return 2;
  if (score >= 1) return 1;
  return 0;
}

export default function Quiz({ showToast }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [ref, visible] = useReveal(0.15);
  const [advancing, setAdvancing] = useState(false);

  const q = quizData[state.current];
  const progress = ((state.current + (state.done ? 1 : 0)) / quizData.length) * 100;

  const selectAnswer = (idx) => {
    if (state.selected !== null || advancing) return;
    dispatch({ type: 'SELECT', idx });
    setAdvancing(true);
    setTimeout(() => {
      dispatch({ type: 'NEXT' });
      setAdvancing(false);
    }, 1500);
  };

  const handleShare = () => {
    const badge = badges[getBadgeIdx(state.score)];
    const text = `Aku baru dapet badge "${badge.title}" ${badge.emoji} di Singosari Cultural Site! #SingosariHeritage`;
    if (navigator.share) {
      navigator.share({ title: 'Singosari Quiz', text });
    } else {
      navigator.clipboard?.writeText(text);
      showToast('📋 Teks disalin! Share sekarang!');
    }
  };

  return (
    <section id="quiz-section" className="quiz-section">
      <div className="container">
        <div className={`section-header reveal-up${visible ? ' revealed' : ''}`} ref={ref}>
          <div className="section-label">🎮 Gamifikasi</div>
          <h2 className="section-title">Seberapa <span className="gradient-text">Jago</span> Kamu?</h2>
          <p className="section-desc">Jawab kuis ini dan klaim badge digitalmu!</p>
        </div>

        <div className="quiz-widget reveal-up revealed" id="quiz-widget">
          {/* Progress */}
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="quiz-counter" id="quiz-counter">
            {state.done
              ? `Selesai! Skor: ${state.score}/${quizData.length}`
              : `Pertanyaan ${state.current + 1} dari ${quizData.length}`}
          </div>

          {/* Question */}
          {!state.done && (
            <div className="quiz-body" id="quiz-body">
              <div className="quiz-question">{q.q}</div>
              <div className="quiz-options">
                {q.opts.map((opt, i) => {
                  let cls = 'quiz-option';
                  if (state.selected !== null) {
                    if (i === q.ans) cls += ' correct';
                    else if (i === state.selected) cls += ' wrong';
                  }
                  return (
                    <button
                      key={i}
                      id={`quiz-opt-${i}`}
                      className={cls}
                      disabled={state.selected !== null}
                      onClick={() => selectAnswer(i)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {state.selected !== null && (
                <div
                  className="quiz-feedback"
                  style={{
                    marginTop: '1rem',
                    fontSize: '.875rem',
                    textAlign: 'center',
                    color: state.selected === q.ans ? '#4ade80' : '#f87171',
                  }}
                >
                  {state.selected === q.ans ? '✅ ' : '❌ '}{q.exp}
                </div>
              )}
            </div>
          )}

          {/* Result */}
          {state.done && (
            <div className="quiz-result" id="quiz-result">
              <div className="result-badge" id="result-badge">
                {badges[getBadgeIdx(state.score)].emoji}
              </div>
              <h3 id="result-title">{badges[getBadgeIdx(state.score)].title}</h3>
              <p id="result-desc">{badges[getBadgeIdx(state.score)].desc}</p>
              <div className="result-actions">
                <button className="btn btn-primary" id="quiz-share-btn" onClick={handleShare}>
                  🔗 Share Badge
                </button>
                <button
                  className="btn btn-ghost"
                  id="quiz-retry-btn"
                  onClick={() => dispatch({ type: 'RESET' })}
                >
                  🔄 Coba Lagi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
