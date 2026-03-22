const STORAGE_KEY = 'ai_usage'
const MAX_DAILY_CALLS = 500

type UsageData = { date: string; count: number }

function getToday(): string {
  return new Date().toISOString().slice(0, 10)
}

function getUsage(): UsageData {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return { date: getToday(), count: 0 }
  const data: UsageData = JSON.parse(raw)
  // Reset if new day
  if (data.date !== getToday()) {
    return { date: getToday(), count: 0 }
  }
  return data
}

function saveUsage(data: UsageData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function canCallAi(): boolean {
  return getUsage().count < MAX_DAILY_CALLS
}

export function recordAiCall(): void {
  const usage = getUsage()
  usage.count++
  usage.date = getToday()
  saveUsage(usage)
}

export function getRemainingCalls(): number {
  return Math.max(0, MAX_DAILY_CALLS - getUsage().count)
}

export function getDailyLimit(): number {
  return MAX_DAILY_CALLS
}
