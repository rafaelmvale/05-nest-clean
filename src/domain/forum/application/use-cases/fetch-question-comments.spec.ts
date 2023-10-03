/* eslint-disable prettier/prettier */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from '../../enterprise/entities/factories/make-question-comment'


let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Commentss', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question commentss', async () => {
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }))
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
      questionId: new UniqueEntityID('question-1')
    }))

    const result = await sut.execute(
      {
        questionId: 'question-1',
        page: 1,
      })

      expect(result.value?.questionComments).toHaveLength(3)
    
  })

  
  it('should be able to fetch paginated question commentss', async () => {
    for(let i =1; i<= 22; i++){
      await inMemoryQuestionCommentsRepository.create(makeQuestionComment({
        questionId: new UniqueEntityID('question-1')
      }),
    )
  } 

    
    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
