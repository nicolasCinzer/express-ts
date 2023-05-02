import express from 'express'
import { addPR, getPRbyId, getPRbyExersiceId, getPRs } from '../services/prs'

const router = express.Router()

router.get('/', (_, res) => {
  const allPRs = getPRs()
  res.send(allPRs)
})

router.get('/:id', (req, res) => {
  const PR = getPRbyId(+req.params.id)
  res.send(PR)
})

router.get('/exercise/:exerciseId', (req, res) => {
  const PRs = getPRbyExersiceId(+req.params.exerciseId)
  console.log(PRs)
  res.send(PRs)
})

router.post('/', (req, res) => {
  try {
    const { exerciseId, reps, series, weight, unit } = req.body
    const newPRAdded = addPR({ exerciseId, reps, series, weight, unit })

    res.send(newPRAdded)
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).send(err.message)
    }
  }
})

export default router
