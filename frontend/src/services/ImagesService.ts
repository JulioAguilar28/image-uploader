import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { ApiService } from './ApiService'
import { AxiosRequestError, parseRequestError } from './ApiErrors'
import { Image } from '../models/appModels'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

export const uploadImage = async (file: File, onsuccess?: (image: Image) => void) => {
  const formData = new FormData()
  formData.append('image', file)

  const operation = uploadImageRequest(formData)
  const result = await operation()

  pipe(
    result,
    E.fold(
      (error) => {
        console.error(error)
        const errorMessage =
          error.code === 422 ? 'We could not upload the image, try again' : error.message
        toast.error(errorMessage)
      },
      (response) => {
        if (onsuccess) onsuccess(response.data.image)
        toast.success('Your image was uploaded correctly')
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

export const getImageResource = async (
  imgId: string,
  userId: number,
  onsuccess?: (img: string) => void
) => {
  const operation = getImageResourceRequest(imgId, userId)
  const result = await operation()

  pipe(
    result,
    E.foldW(
      (error) => {
        console.error(error)
        toast.error('There was a problem uploading the image')
      },
      (response) => {
        const blob = new Blob([response.data])
        const img = URL.createObjectURL(blob)

        if (onsuccess) onsuccess(img)
      }
    )
  )
}

const getImageResourceRequest = (imgId: string, userId: number) =>
  TE.tryCatch(
    () =>
      ApiService.of().get(`/images/${userId}/${imgId}`, {
        responseType: 'blob'
      }),
    (reason) => parseRequestError(reason)
  )
