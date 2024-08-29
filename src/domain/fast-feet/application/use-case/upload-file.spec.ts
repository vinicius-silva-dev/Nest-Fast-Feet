/* eslint-disable prettier/prettier */
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryAttachments } from '../../../../../test/repository/in-memory-attachments'
import { UploadFileUseCase } from './upload-file'
import { FakerUpload } from 'test/storage/fakerUploade'


let inMemoryAttachments: InMemoryAttachments
let fakeUpload: FakerUpload
let sut: UploadFileUseCase
describe('Create user', async () => {
  beforeEach(() => {
    inMemoryAttachments = new InMemoryAttachments()
    fakeUpload = new FakerUpload()
    sut = new UploadFileUseCase(inMemoryAttachments, fakeUpload)
  })
  test('should be abble to create user', async () => {
    await sut.execute({
      fileName: 'profile-img',
      fileType: 'image/jpeg',
      body: Buffer.from(''),
      userId: 'entregador-1',
      recipientId: 'recipient-1',
      attachments: []
    })

    console.log(inMemoryAttachments.items)
    expect(inMemoryAttachments.items).toHaveLength(1)
  })
})
