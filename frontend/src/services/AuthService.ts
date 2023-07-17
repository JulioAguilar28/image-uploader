import React from 'react'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/lib/Option'
import * as TO from 'fp-ts/lib/TaskOption'
import { pipe } from 'fp-ts/lib/function'
import { ApiService, authenticateService } from './ApiService'
import { NewUserCredentials, User, UserCredentials } from '../models/appModels'
import {
  AuthError,
  AxiosRequestError,
  ServerError,
  UnexpectedError,
  parseRequestError
} from './ApiErrors'
import { AuthAction } from '../context/auth/authReducer'
import * as AuthActions from '../context/auth/authActions'
import { AxiosResponse } from 'axios'
import { getToken, setToken } from './StorageService'

export const getCurrentUser = () =>
  pipe(
    getToken(),
    O.map((token) => {
      authenticateService(token)
      return token
    }),
    TE.fromOption(() => TE.left(AuthError.of('user not found'))),
    TE.chainW(getCurrentUserRequest),
    TE.map((response) => response.data.user),
    TE.fold(
      (_error) => TO.none,
      (user) => TO.some(user)
    )
  )

const getCurrentUserRequest = () =>
  TE.tryCatch<AuthError | ServerError | UnexpectedError, AxiosResponse<{ user: User }>>(
    () => ApiService.of().get('/credentials'),
    (reason) => {
      const error = parseRequestError(reason)
      switch (error.code) {
        case 401:
          return AuthError.of(error.message)
        case 500:
          return ServerError.of('login', error.response!.data as string)
        default:
          return UnexpectedError.of(`request login:${error.message}`)
      }
    }
  )

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
        const token = response.data.user.token

        dispatch(AuthActions.setUser(response.data.user))
        authenticateService(token)
        setToken(token)
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
        const token = response.data.user.token

        dispatch(AuthActions.setUser(response.data.user))
        authenticateService(token)
        setToken(token)
      }
    )
  )
}

const loginRequest = (credentials: UserCredentials) =>
  TE.tryCatch<AxiosRequestError, AxiosResponse<{ user: User }>>(
    () => ApiService.of().post('/login', credentials),
    (error) => parseRequestError(error)
  )
