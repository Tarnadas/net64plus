declare module 'immer' {
  import produce from 'immer'

  const immer: <S>(baseState: Readonly<S>, draftFunction: (draftState: S) => void) => Readonly<S>
  export default immer
}
