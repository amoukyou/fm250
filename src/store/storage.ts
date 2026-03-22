import type { AnswerRecord, StudyProgress } from '../data/types'

const KEYS = {
  answers: 'exam_answers',
  favorites: 'exam_favorites',
  progress: 'exam_progress',
} as const

// ---- Answer Records ----

export function getAnswerRecords(): Record<string, AnswerRecord[]> {
  const raw = localStorage.getItem(KEYS.answers)
  return raw ? JSON.parse(raw) : {}
}

export function addAnswerRecord(questionId: string, record: Omit<AnswerRecord, 'questionId'>) {
  const all = getAnswerRecords()
  if (!all[questionId]) all[questionId] = []
  all[questionId].push({ ...record, questionId })
  localStorage.setItem(KEYS.answers, JSON.stringify(all))
}

export function getWrongQuestionIds(): string[] {
  const all = getAnswerRecords()
  return Object.keys(all).filter((id) => {
    const latest = all[id][all[id].length - 1]
    return !latest.correct
  })
}

export function removeFromWrong(questionId: string) {
  const all = getAnswerRecords()
  if (all[questionId]) {
    all[questionId].push({
      questionId,
      correct: true,
      timestamp: Date.now(),
    })
    localStorage.setItem(KEYS.answers, JSON.stringify(all))
  }
}

// ---- Favorites ----

export function getFavorites(): string[] {
  const raw = localStorage.getItem(KEYS.favorites)
  return raw ? JSON.parse(raw) : []
}

export function toggleFavorite(questionId: string): boolean {
  const favs = getFavorites()
  const idx = favs.indexOf(questionId)
  if (idx >= 0) {
    favs.splice(idx, 1)
    localStorage.setItem(KEYS.favorites, JSON.stringify(favs))
    return false
  } else {
    favs.push(questionId)
    localStorage.setItem(KEYS.favorites, JSON.stringify(favs))
    return true
  }
}

export function isFavorite(questionId: string): boolean {
  return getFavorites().includes(questionId)
}

// ---- Study Progress (resume) ----

export function saveProgress(progress: StudyProgress) {
  localStorage.setItem(KEYS.progress, JSON.stringify(progress))
}

export function getProgress(): StudyProgress | null {
  const raw = localStorage.getItem(KEYS.progress)
  return raw ? JSON.parse(raw) : null
}

// ---- Stats ----

export function getStats() {
  const all = getAnswerRecords()
  const questionIds = Object.keys(all)
  let correctCount = 0
  let wrongCount = 0
  const qaRatings = { know: 0, fuzzy: 0, dont_know: 0 }

  for (const id of questionIds) {
    const latest = all[id][all[id].length - 1]
    if (latest.selfRating) {
      qaRatings[latest.selfRating]++
    }
    if (latest.correct) correctCount++
    else wrongCount++
  }

  return {
    totalAnswered: questionIds.length,
    correctCount,
    wrongCount,
    accuracy: questionIds.length > 0 ? Math.round((correctCount / questionIds.length) * 100) : 0,
    favoriteCount: getFavorites().length,
    wrongQuestionCount: getWrongQuestionIds().length,
    qaRatings,
  }
}

// ---- Clear All ----

export function clearAll() {
  localStorage.removeItem(KEYS.answers)
  localStorage.removeItem(KEYS.favorites)
  localStorage.removeItem(KEYS.progress)
}
