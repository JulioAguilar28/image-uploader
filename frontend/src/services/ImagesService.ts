import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { ApiService } from './ApiService'
import { AxiosRequestError, parseRequestError } from './ApiErrors'
import { Image } from '../models/appModels'
import { AxiosResponse } from 'axios'

export const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('image', file)

  const operation = uploadImageRequest(formData)
  const result = await operation()

  pipe(
    result,
    E.fold(
      (error) => {
        console.error(error)
      },
      (response) => {
        console.log(response)
      }
    )
  )
}

const uploadImageRequest = (formData: FormData) =>
  TE.tryCatch<AxiosRequestError, AxiosResponse<{ image: Image }>>(
    () =>
      ApiService.of().post('/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
    (reason) => parseRequestError(reason)
  )
