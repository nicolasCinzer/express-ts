import { PRs } from '../types'
import prsData from './prsData.json'
import { newPR, checkRepeatedPR, checkExistingPR, updatePR } from '../utils/prs'

let prs: PRs[] = prsData as PRs[]
export const getPRs = (): PRs[] => prs

export const getPRbyId = (id: number): PRs => {
  const queriedPR: PRs = prs.filter(pr => pr.id === id)[0]

  return queriedPR
}

export const getPRbyExersiceId = (exerciseId: number): PRs[] => {
  const queriedPRs: PRs[] = prs.filter(pr => pr.exerciseId === exerciseId)

  return queriedPRs
}

export const addPR = (prAttributes: any): PRs => {
  if (checkRepeatedPR(prAttributes, prs)) {
    throw new Error('This PR already exists!')
  }

  if (checkExistingPR(prAttributes, prs)) {
    const updatedPR = updatePR(prAttributes, prs)
    prs = prs.map(pr => {
      if (pr.id === updatedPR.id) {
        return updatedPR
      }

      return pr
    })

    return updatedPR
  }

  const restOfAttributes = newPR(prAttributes)

  const newPrEntry: PRs = {
    id: Math.max(...prs.map(pr => pr.id)) + 1,
    ...restOfAttributes
  }

  prs.push(newPrEntry)

  return newPrEntry
}
