export type Locale = 'zh-TW' | 'zh-CN' | 'en'

export const localeNames: Record<Locale, string> = {
  'zh-TW': '繁中',
  'zh-CN': '简中',
  'en': 'EN',
}

// UI strings only - question content stays in original language
const translations = {
  // Header
  'app.title': { 'zh-TW': '駕考寶典-上天版', 'zh-CN': '驾考宝典-上天版', en: 'Fly Exam Pro' },
  'nav.back': { 'zh-TW': '返回', 'zh-CN': '返回', en: 'Back' },

  // Bottom tabs
  'tab.home': { 'zh-TW': '首頁', 'zh-CN': '首页', en: 'Home' },
  'tab.wrong': { 'zh-TW': '錯題本', 'zh-CN': '错题本', en: 'Mistakes' },
  'tab.favorites': { 'zh-TW': '收藏', 'zh-CN': '收藏', en: 'Saved' },
  'tab.stats': { 'zh-TW': '統計', 'zh-CN': '统计', en: 'Stats' },

  // Home page
  'home.subtitle': { 'zh-TW': '台灣超輕型載具考試題庫', 'zh-CN': '台湾超轻型载具考试题库', en: 'Taiwan Ultralight Pilot Exam' },
  'home.progress': { 'zh-TW': '學習進度', 'zh-CN': '学习进度', en: 'Progress' },
  'home.resume': { 'zh-TW': '繼續上次練習', 'zh-CN': '继续上次练习', en: 'Resume Practice' },
  'home.resume.q': { 'zh-TW': '第', 'zh-CN': '第', en: 'Q' },
  'home.resume.unit': { 'zh-TW': '題', 'zh-CN': '题', en: '' },
  'home.banks': { 'zh-TW': '題庫選擇', 'zh-CN': '题库选择', en: 'Question Banks' },
  'home.mock': { 'zh-TW': '模擬測驗', 'zh-CN': '模拟测验', en: 'Mock Test' },
  'home.mockExam': { 'zh-TW': '全真模擬考試', 'zh-CN': '全真模拟考试', en: 'Full Mock Exam' },
  'home.mockDesc': { 'zh-TW': '隨機抽題，限時作答', 'zh-CN': '随机抽题，限时作答', en: 'Random questions, timed' },
  'home.overview': { 'zh-TW': '學習概況', 'zh-CN': '学习概况', en: 'Overview' },
  'home.done': { 'zh-TW': '已做', 'zh-CN': '已做', en: 'Done' },
  'home.correct': { 'zh-TW': '正確', 'zh-CN': '正确', en: 'Correct' },
  'home.wrongCount': { 'zh-TW': '錯題', 'zh-CN': '错题', en: 'Wrong' },
  'home.savedCount': { 'zh-TW': '收藏', 'zh-CN': '收藏', en: 'Saved' },

  // Bank page
  'bank.total': { 'zh-TW': '共 {n} 題', 'zh-CN': '共 {n} 题', en: '{n} questions total' },
  'bank.mc': { 'zh-TW': '選擇題練習', 'zh-CN': '选择题练习', en: 'Multiple Choice' },
  'bank.tf': { 'zh-TW': '是非題練習', 'zh-CN': '是非题练习', en: 'True / False' },
  'bank.qa': { 'zh-TW': '問答題練習', 'zh-CN': '问答题练习', en: 'Q&A Practice' },
  'bank.questions': { 'zh-TW': '{n} 題', 'zh-CN': '{n} 题', en: '{n} questions' },
  'bank.done': { 'zh-TW': '已做 {n}', 'zh-CN': '已做 {n}', en: 'Done {n}' },
  'bank.correctN': { 'zh-TW': '正確 {n}', 'zh-CN': '正确 {n}', en: 'Correct {n}' },
  'bank.wrongN': { 'zh-TW': '錯誤 {n}', 'zh-CN': '错误 {n}', en: 'Wrong {n}' },
  'bank.completion': { 'zh-TW': '完成度', 'zh-CN': '完成度', en: 'Done' },

  // Practice
  'practice.mc': { 'zh-TW': '選擇題', 'zh-CN': '选择题', en: 'Multiple Choice' },
  'practice.qa': { 'zh-TW': '問答題', 'zh-CN': '问答题', en: 'Q&A' },
  'practice.prev': { 'zh-TW': '上一題', 'zh-CN': '上一题', en: 'Prev' },
  'practice.next': { 'zh-TW': '下一題', 'zh-CN': '下一题', en: 'Next' },
  'practice.finish': { 'zh-TW': '完成', 'zh-CN': '完成', en: 'Finish' },
  'practice.correct': { 'zh-TW': '回答正確！', 'zh-CN': '回答正确！', en: 'Correct!' },
  'practice.wrongAns': { 'zh-TW': '回答錯誤，正確答案：', 'zh-CN': '回答错误，正确答案：', en: 'Wrong. Correct answer: ' },
  'practice.explanation': { 'zh-TW': '解析', 'zh-CN': '解析', en: 'Explanation' },
  'practice.showAnswer': { 'zh-TW': '顯示參考答案', 'zh-CN': '显示参考答案', en: 'Show Answer' },
  'practice.refAnswer': { 'zh-TW': '參考答案', 'zh-CN': '参考答案', en: 'Reference Answer' },
  'practice.selfRate': { 'zh-TW': '自我評估', 'zh-CN': '自我评估', en: 'Self Assessment' },
  'practice.know': { 'zh-TW': '我會', 'zh-CN': '我会', en: 'Got it' },
  'practice.fuzzy': { 'zh-TW': '模糊', 'zh-CN': '模糊', en: 'Unsure' },
  'practice.dontKnow': { 'zh-TW': '不會', 'zh-CN': '不会', en: "Don't know" },
  'practice.recorded': { 'zh-TW': '已記錄', 'zh-CN': '已记录', en: 'Recorded' },
  'practice.noQuestions': { 'zh-TW': '沒有符合條件的題目', 'zh-CN': '没有符合条件的题目', en: 'No matching questions' },

  // Result
  'result.great': { 'zh-TW': '太棒了！', 'zh-CN': '太棒了！', en: 'Excellent!' },
  'result.good': { 'zh-TW': '做得不錯！', 'zh-CN': '做得不错！', en: 'Good job!' },
  'result.tryAgain': { 'zh-TW': '繼續加油！', 'zh-CN': '继续加油！', en: 'Keep trying!' },
  'result.accuracy': { 'zh-TW': '正確率', 'zh-CN': '正确率', en: 'Accuracy' },
  'result.answered': { 'zh-TW': '作答題數', 'zh-CN': '作答题数', en: 'Answered' },
  'result.correctN': { 'zh-TW': '正確', 'zh-CN': '正确', en: 'Correct' },
  'result.wrongN': { 'zh-TW': '錯誤', 'zh-CN': '错误', en: 'Wrong' },
  'result.home': { 'zh-TW': '返回首頁', 'zh-CN': '返回首页', en: 'Home' },
  'result.wrongBook': { 'zh-TW': '查看錯題本', 'zh-CN': '查看错题本', en: 'View Mistakes' },

  // Mock exam
  'mock.title': { 'zh-TW': '模擬考試', 'zh-CN': '模拟考试', en: 'Mock Exam' },
  'mock.answered': { 'zh-TW': '已答', 'zh-CN': '已答', en: 'Answered' },
  'mock.submit': { 'zh-TW': '提交答卷', 'zh-CN': '提交答卷', en: 'Submit' },
  'mock.submitAll': { 'zh-TW': '全部已答完，提交答卷', 'zh-CN': '全部已答完，提交答卷', en: 'All done, submit now' },
  'mock.score': { 'zh-TW': '正確率', 'zh-CN': '正确率', en: 'Accuracy' },
  'mock.pass': { 'zh-TW': '恭喜通過！', 'zh-CN': '恭喜通过！', en: 'Passed!' },
  'mock.fail': { 'zh-TW': '繼續加油！', 'zh-CN': '继续加油！', en: 'Keep trying!' },
  'mock.details': { 'zh-TW': '答題詳情', 'zh-CN': '答题详情', en: 'Details' },
  'mock.wrongAnswer': { 'zh-TW': '題答錯', 'zh-CN': '题答错', en: 'wrong' },
  'mock.yourAnswer': { 'zh-TW': '你的答案：', 'zh-CN': '你的答案：', en: 'Your answer: ' },
  'mock.noAnswer': { 'zh-TW': '未作答', 'zh-CN': '未作答', en: 'Not answered' },
  'mock.correctAnswer': { 'zh-TW': '正確答案：', 'zh-CN': '正确答案：', en: 'Correct: ' },
  'mock.retry': { 'zh-TW': '再考一次', 'zh-CN': '再考一次', en: 'Retry' },

  // Wrong & Favorites
  'wrong.title': { 'zh-TW': '錯題本', 'zh-CN': '错题本', en: 'Mistakes' },
  'wrong.empty': { 'zh-TW': '太棒了，目前沒有錯題！', 'zh-CN': '太棒了，目前没有错题！', en: 'No mistakes yet!' },
  'wrong.remove': { 'zh-TW': '移除', 'zh-CN': '移除', en: 'Remove' },
  'wrong.correctAns': { 'zh-TW': '正確答案：', 'zh-CN': '正确答案：', en: 'Answer: ' },
  'fav.title': { 'zh-TW': '收藏夾', 'zh-CN': '收藏夹', en: 'Saved' },
  'fav.empty': { 'zh-TW': '還沒有收藏題目', 'zh-CN': '还没有收藏题目', en: 'No saved questions' },
  'fav.remove': { 'zh-TW': '取消收藏', 'zh-CN': '取消收藏', en: 'Unsave' },
  'filter.allBanks': { 'zh-TW': '全部題庫', 'zh-CN': '全部题库', en: 'All Banks' },
  'filter.allTypes': { 'zh-TW': '全部題型', 'zh-CN': '全部题型', en: 'All Types' },
  'filter.mc': { 'zh-TW': '選擇題', 'zh-CN': '选择题', en: 'MC' },
  'filter.qa': { 'zh-TW': '問答題', 'zh-CN': '问答题', en: 'Q&A' },
  'filter.noMatch': { 'zh-TW': '篩選條件下沒有結果', 'zh-CN': '筛选条件下没有结果', en: 'No results for filter' },

  // Stats
  'stats.title': { 'zh-TW': '學習統計', 'zh-CN': '学习统计', en: 'Study Stats' },
  'stats.total': { 'zh-TW': '總題量', 'zh-CN': '总题量', en: 'Total' },
  'stats.done': { 'zh-TW': '已做題量', 'zh-CN': '已做题量', en: 'Done' },
  'stats.notDone': { 'zh-TW': '未做題量', 'zh-CN': '未做题量', en: 'Remaining' },
  'stats.accuracy': { 'zh-TW': '正確率', 'zh-CN': '正确率', en: 'Accuracy' },
  'stats.mcCorrect': { 'zh-TW': '選擇題正確', 'zh-CN': '选择题正确', en: 'MC Correct' },
  'stats.mcWrong': { 'zh-TW': '選擇題錯誤', 'zh-CN': '选择题错误', en: 'MC Wrong' },
  'stats.favCount': { 'zh-TW': '收藏數', 'zh-CN': '收藏数', en: 'Saved' },
  'stats.wrongCount': { 'zh-TW': '錯題數', 'zh-CN': '错题数', en: 'Mistakes' },
  'stats.qaRating': { 'zh-TW': '問答題自評分布', 'zh-CN': '问答题自评分布', en: 'Q&A Self-Rating' },
  'stats.know': { 'zh-TW': '我會', 'zh-CN': '我会', en: 'Got it' },
  'stats.fuzzy': { 'zh-TW': '模糊', 'zh-CN': '模糊', en: 'Unsure' },
  'stats.dontKnow': { 'zh-TW': '不會', 'zh-CN': '不会', en: "Don't know" },
  'stats.categories': { 'zh-TW': '各分類完成度', 'zh-CN': '各分类完成度', en: 'By Category' },
  'stats.clear': { 'zh-TW': '清除所有學習記錄', 'zh-CN': '清除所有学习记录', en: 'Clear All Data' },
  'stats.clearConfirm': { 'zh-TW': '確定要清除所有學習記錄嗎？此操作無法復原。', 'zh-CN': '确定要清除所有学习记录吗？此操作无法恢复。', en: 'Clear all study data? This cannot be undone.' },

  // Manual
  'home.manual': { 'zh-TW': '學習資料', 'zh-CN': '学习资料', en: 'Study Material' },
  'manual.title': { 'zh-TW': 'FM250 飛行手冊', 'zh-CN': 'FM250 飞行手册', en: 'FM250 Flight Manual' },
  'manual.desc': { 'zh-TW': '中文版飛行手冊，隨時查閱', 'zh-CN': '中文版飞行手册，随时查阅', en: 'Chinese flight manual, read anytime' },

  // Search
  'search.placeholder': { 'zh-TW': '搜尋題目、選項、答案...', 'zh-CN': '搜索题目、选项、答案...', en: 'Search questions...' },
  'search.results': { 'zh-TW': '找到 {n} 個結果', 'zh-CN': '找到 {n} 个结果', en: '{n} results found' },
} as const

export type TranslationKey = keyof typeof translations

export function t(key: TranslationKey, locale: Locale, vars?: Record<string, string | number>): string {
  const entry = translations[key]
  let text: string = entry?.[locale] ?? entry?.['zh-TW'] ?? key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, String(v))
    }
  }
  return text
}
