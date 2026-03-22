import { useI18n } from './context'
import { tc2sc } from './tc2sc'
import { enTranslations } from './en-questions'
import type { Question, SingleChoiceQuestion, QAQuestion } from '../data/types'

/** Returns localized question text based on current locale */
export function useLocalizedQuestion() {
  const { locale } = useI18n()

  function localize(text: string, questionId?: string, field?: string): string {
    if (locale === 'zh-TW') return text
    if (locale === 'zh-CN') return tc2sc(text)
    // English
    if (questionId && field) {
      const en = enTranslations[questionId]
      if (en && field in en) return (en as Record<string, string>)[field] ?? text
    }
    // Fallback: show original TC for untranslated
    return text
  }

  function localizeQuestion(q: Question): Question {
    if (q.type === 'single_choice') {
      return {
        ...q,
        question: localize(q.question, q.id, 'question'),
        options: q.options.map((opt, i) => localize(opt, q.id, `option${i}`)),
        answer: localize(q.answer, q.id, 'answer'),
        explanation: q.explanation ? localize(q.explanation, q.id, 'explanation') : undefined,
        categoryName: localize(q.categoryName),
      } as SingleChoiceQuestion
    } else {
      return {
        ...q,
        question: localize(q.question, q.id, 'question'),
        referenceAnswer: localize(q.referenceAnswer, q.id, 'referenceAnswer'),
        explanation: q.explanation ? localize(q.explanation, q.id, 'explanation') : undefined,
        categoryName: localize(q.categoryName),
      } as QAQuestion
    }
  }

  function localizeText(text: string): string {
    return localize(text)
  }

  return { localizeQuestion, localizeText, locale }
}
