export type QuestionType = 'single_choice' | 'qa'

export type SingleChoiceQuestion = {
  id: string
  bankId: 'bankA' | 'bankB'
  categoryId: string
  categoryName: string
  type: 'single_choice'
  question: string
  options: string[]
  answer: string
  explanation?: string
}

export type QAQuestion = {
  id: string
  bankId: 'bankA' | 'bankB'
  categoryId: string
  categoryName: string
  type: 'qa'
  question: string
  referenceAnswer: string
  explanation?: string
}

export type Question = SingleChoiceQuestion | QAQuestion

export type Category = {
  id: string
  name: string
}

export type QuestionBank = {
  bankId: 'bankA' | 'bankB'
  bankName: string
  categories: Category[]
  questions: Question[]
}

// localStorage record types
export type AnswerRecord = {
  questionId: string
  correct: boolean // for MC: true/false; for QA: "我會"=true, else false
  selfRating?: 'know' | 'fuzzy' | 'dont_know'
  timestamp: number
}

export type StudyProgress = {
  bankId: string
  categoryId: string
  questionType: QuestionType
  currentIndex: number
  timestamp: number
}
