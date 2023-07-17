import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/function'
import Cookies from 'js-cookie'

export const getToken = (): O.Option<string> => getTokenFromCookie()

export const setToken = (token: string) => {
  const expires = { expires: 365 }

  Cookies.set('auth._refresh_token.local', 'false', expires)
  Cookies.set('auth._token.local', `Bearer ${token}`, expires)
  Cookies.set('auth._strategy', 'local', expires)
}

const getTokenFromCookie = (): O.Option<string> =>
  pipe(
    Cookies.get('auth._token.local'),
    O.fromNullable,
    O.chain((token) =>
      token ? O.some(token.substring(token.indexOf(' ')).trim()) : O.none
    )
  )
