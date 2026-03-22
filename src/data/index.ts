import bankA from './bank-a'
import bankB from './bank-b'
import type { Question, QuestionBank } from './types'

export const banks: QuestionBank[] = [bankA, bankB]

export function getBank(bankId: string): QuestionBank | undefined {
  return banks.find((b) => b.bankId === bankId)
}

export function getAllQuestions(): Question[] {
  return banks.flatMap((b) => b.questions)
}

export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find((q) => q.id === id)
}

export function getQuestionsByBank(bankId: string): Question[] {
  return getBank(bankId)?.questions ?? []
}

export function getQuestionsByCategory(bankId: string, categoryId: string): Question[] {
  return getQuestionsByBank(bankId).filter((q) => q.categoryId === categoryId)
}

export type { Question, QuestionBank, SingleChoiceQuestion, QAQuestion } from './types'
