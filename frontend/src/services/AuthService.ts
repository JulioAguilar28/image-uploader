import React from 'react'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { ApiService, authenticateService } from './ApiService'
import { NewUserCredentials, User, UserCredentials } from '../models/appModels'
import { AxiosRequestError, parseRequestError } from './ApiErrors'
import { AuthAction } from '../context/auth/authReducer'
import * as AuthActions from '../context/auth/authActions'
import { AxiosResponse } from 'axios'

export const signup = async (
  credentials: NewUserCredentials,
  dispatch: React.Dispatch<AuthAction>
) => {
  const operation = signupRequest(credentials)
  const result = await operation()

  pipe(
    result,
    E.fold(
      (error) => {
        console.error(error)
      },
      (response) => {
        dispatch(AuthActions.setUser(response.data.user))
        authenticateService(response.data.user.token)
      }
    )
  )
}

const signupRequest = (credentials: NewUserCredentials) =>
  TE.tryCatch<AxiosRequestError, AxiosResponse<{ user: User }>>(
    () => ApiService.of().post('/signup', credentials),
    (error) => parseRequestError(error)
  )

export const login = async (
  credentials: UserCredentials,
  dispatch: React.Dispatch<AuthAction>
) => {
  const operation = loginRequest(credentials)
  const result = await operation()

  pipe(
    result,
    E.fold(
      (error) => {
        console.error(error)
      },
      (response) => {
        dispatch(AuthActions.setUser(response.data.user))
        authenticateService(response.data.user.token)
      }
    )
  )
}

const loginRequest = (credentials: UserCredentials) =>
  TE.tryCatch<AxiosRequestError, AxiosResponse<{ user: User }>>(
    () => ApiService.of().post('/login', credentials),
    (error) => parseRequestError(error)
  )
