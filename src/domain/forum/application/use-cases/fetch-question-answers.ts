/* eslint-disable prettier/prettier */
import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answer-repository'
import { Injectable } from '@nestjs/common'

interface FetchRecentQuestionsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<null, {
  answers: Answer[]
}>

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers =  await this.answersRepository.findManyByQuestionId(questionId,{page})


    return right({
      answers,
    })
  }
}
