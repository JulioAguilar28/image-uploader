import * as O from 'fp-ts/lib/Option'
import * as A from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/function'

export const getFileType = (file: File) => file.type.split('/')[1]

export const parseAcceptedExtensionFiles = (extensions: Array<string>): string =>
  pipe(
    extensions,
    O.fromNullable,
    O.chain((values) => (values ? O.some(values) : O.none)),
    O.map((values) => {
      return pipe(
        values,
        A.map((extension) => `image/${extension}`),
        (values) => values.join(',')
      )
    }),
    O.fold(
      () => '',
      (values) => values
    )
  )
