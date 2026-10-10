'use server'

export async function calculateNextQuestionDifficulty(
  currentDifficulty: number,
  wasCorrect: boolean,
  questionIndex: number,
) {
  const difficulty = Math.min(8, Math.max(1, Math.round(currentDifficulty)))

  if (questionIndex >= 8) {
    return { finished: true, recommendedGrade: difficulty }
  }

  return {
    finished: false,
    nextDifficulty: wasCorrect
      ? Math.min(8, difficulty + 1)
      : Math.max(1, difficulty - 1),
  }
}
