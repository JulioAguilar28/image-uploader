import React from 'react'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { ApiService } from './ApiService'
import { NewUserCredentials, User, UserCredentials } from '../models/appModels'
import { AxiosRequestError, parseRequestError } from './ApiErrors'
import { AuthAction } from '../context/auth/authReducer'
import * as AuthActions from '../context/auth/authActions'

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
      (user) => {
        dispatch(AuthActions.setUser(user))
      }
    )
  )
}

const signupRequest = (credentials: NewUserCredentials) =>
  TE.tryCatch<AxiosRequestError, User>(
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
      (user) => {
        dispatch(AuthActions.setUser(user))
      }
    )
  )
}

const loginRequest = (credentials: UserCredentials) =>
  TE.tryCatch<AxiosRequestError, User>(
    () => ApiService.of().post('/login', credentials),
    (error) => parseRequestError(error)
  )
