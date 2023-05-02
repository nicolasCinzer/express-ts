import { Unit } from './enums'

export interface PRs {
  id: number
  exerciseId: number
  reps: number
  series: number
  weight: number
  unit: Unit
}

export type newPREntry = Omit<PRs, 'id'>
