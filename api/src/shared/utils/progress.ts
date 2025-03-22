import { addDays, addHours, differenceInSeconds } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

// Constantes
const BASE_XP_MULTIPLIER = 5
const STREAK_BONUS_PERCENT = 2
const MAX_STREAK_BONUS_PERCENT = 80
const ERRORS_PENALTY_PERCENT = 10
const TIME_BONUS_THRESHOLD = 300 // 5 minutos
const TIME_BONUS_MAX_PERCENT = 20
const TIME_PENALTY_THRESHOLD = 1800 // 30 minutos
const TIME_PENALTY_PERCENT = 10

// Intervalos de revisão em dias
const REVIEW_INTERVALS = [1, 3, 7, 14, 30, 60, 120]

/**
 * Calcula o XP base para uma lição
 */
export function calculateBaseXP(lessonLevel: number): number {
  return BASE_XP_MULTIPLIER * lessonLevel
}

/**
 * Calcula o bônus de XP baseado no streak
 */
export function calculateStreakBonus(baseXP: number, streak: number): number {
  const bonusPercent = Math.min(streak * STREAK_BONUS_PERCENT, MAX_STREAK_BONUS_PERCENT)
  return Math.floor(baseXP * (bonusPercent / 100))
}

/**
 * Calcula a penalidade de XP baseada em erros
 */
export function calculateErrorsPenalty(baseXP: number, errors: number): number {
  return Math.floor(baseXP * (errors * ERRORS_PENALTY_PERCENT / 100))
}

/**
 * Calcula o bônus/penalidade de XP baseado no tempo gasto
 */
export function calculateTimeBonus(baseXP: number, timeSpent: number): number {
  if (timeSpent <= TIME_BONUS_THRESHOLD) {
    // Bônus por completar rápido
    const bonusPercent = Math.floor((1 - timeSpent / TIME_BONUS_THRESHOLD) * TIME_BONUS_MAX_PERCENT)
    return Math.floor(baseXP * (bonusPercent / 100))
  } else if (timeSpent >= TIME_PENALTY_THRESHOLD) {
    // Penalidade por demorar muito
    return -Math.floor(baseXP * (TIME_PENALTY_PERCENT / 100))
  }
  return 0
}

/**
 * Calcula o XP total para uma lição completada
 */
export function calculateTotalXP(
  lessonLevel: number,
  streak: number,
  errors: number,
  timeSpent: number
): number {
  const baseXP = calculateBaseXP(lessonLevel)
  const streakBonus = calculateStreakBonus(baseXP, streak)
  const errorsPenalty = calculateErrorsPenalty(baseXP, errors)
  const timeBonus = calculateTimeBonus(baseXP, timeSpent)

  return Math.max(0, baseXP + streakBonus - errorsPenalty + timeBonus)
}

/**
 * Calcula o próximo nível baseado no XP total
 */
export function calculateLevel(xp: number): number {
  // Cada nível requer 20% mais XP que o anterior
  // Nível 1: 100 XP
  // Nível 2: 120 XP
  // Nível 3: 144 XP
  // etc.
  const baseXP = 100
  let level = 1
  let xpRequired = baseXP

  while (xp >= xpRequired) {
    level++
    xpRequired = Math.floor(xpRequired * 1.2)
  }

  return level
}

/**
 * Calcula a próxima data de revisão
 */
export function calculateNextReview(reviewCount: number, timezone: string): Date {
  const interval = REVIEW_INTERVALS[Math.min(reviewCount, REVIEW_INTERVALS.length - 1)]
  const now = new Date()
  const userNow = utcToZonedTime(now, timezone)
  const nextReview = addDays(userNow, interval)
  return zonedTimeToUtc(nextReview, timezone)
}

/**
 * Verifica se o streak deve ser mantido baseado na última atividade
 */
export function shouldKeepStreak(lastActivity: Date, timezone: string): boolean {
  const now = new Date()
  const userNow = utcToZonedTime(now, timezone)
  const userLastActivity = utcToZonedTime(lastActivity, timezone)
  
  // Considera o dia do usuário baseado em seu timezone
  const diffInHours = differenceInSeconds(userNow, userLastActivity) / 3600
  return diffInHours <= 24
}

/**
 * Calcula o tempo gasto em uma lição em segundos
 */
export function calculateTimeSpent(startTime: Date, endTime: Date): number {
  return differenceInSeconds(endTime, startTime)
} 