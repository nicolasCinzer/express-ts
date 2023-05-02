import { Unit } from '../enums'
import { PRs, newPREntry } from '../types'

const parseExerciseID = (reqExerciseId: any): number => {
  if (!isNumber(reqExerciseId)) {
    throw new Error('Invalid ExerciseId')
  }

  return reqExerciseId
}

const parseReps = (reqReps: any): number => {
  if (!isNumber(reqReps)) {
    throw new Error('Invalid Reps')
  }

  return reqReps
}

const parseSeries = (reqSeries: any): number => {
  if (!isNumber(reqSeries)) {
    throw new Error('Invalid Series')
  }

  return reqSeries
}

const parseWeight = (reqWeight: any): number => {
  if (!isNumber(reqWeight)) {
    throw new Error('Invalid Weight')
  }

  return reqWeight
}

const parseUnit = (reqUnit: any): Unit => {
  if (!isString(reqUnit) || !isUnit(reqUnit)) {
    throw new Error('Invalid Unit')
  }

  return reqUnit
}

const isNumber = (number: number): boolean => {
  return typeof number === 'number'
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isUnit = (unit: Unit): boolean => {
  return Object.values(Unit).includes(unit)
}

export const newPR = (prAttributes: any): newPREntry => {
  const newPR = {
    exerciseId: parseExerciseID(prAttributes.exerciseId),
    reps: parseReps(prAttributes.reps),
    series: parseSeries(prAttributes.series),
    weight: parseWeight(prAttributes.weight),
    unit: parseUnit(prAttributes.unit)
  }

  return newPR
}

export const checkRepeatedPR = (prAttributes: any, currentPRs: PRs[]): boolean => {
  const { exerciseId, series, reps, weight } = prAttributes

  return currentPRs.some(pr => pr.exerciseId === exerciseId && pr.series === series && pr.reps === reps && pr.weight === weight)
}

export const checkExistingPR = (prAttributes: any, currentPRs: PRs[]): boolean => {
  const { exerciseId, weight } = prAttributes

  return currentPRs.some(pr => pr.exerciseId === exerciseId && pr.weight === weight)
}

export const updatePR = (prAttributes: any, currentPRs: PRs[]): PRs => {
  const { exerciseId, series, reps, weight } = prAttributes

  const exisitingPR = currentPRs.filter(pr => pr.exerciseId === exerciseId && pr.weight === weight)[0]

  if (exisitingPR.reps >= reps && exisitingPR.series >= series) {
    throw new Error(`This is not a PR! You already did a ${exisitingPR.series}x${exisitingPR.reps}`)
  }

  const updatedPR = {
    id: exisitingPR.id,
    exerciseId: exisitingPR.exerciseId,
    series,
    reps,
    weight: exisitingPR.weight,
    unit: exisitingPR.unit
  }

  return updatedPR
}
