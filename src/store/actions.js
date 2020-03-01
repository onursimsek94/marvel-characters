import { format, subYears } from 'date-fns'
import {
  INCREMENT_LOADING,
  DECREMENT_LOADING,
  FETCH_CHARACTERS,
  INCREMENT_CHARACTERS_OFFSET,
  SET_CHARACTERS_TOTAL,
  FETCH_CHARACTERS_COMICS,
} from './constants'
import { CharactersProxy } from '../proxies/CharactersProxy'
import { CharactersTransformer } from '../transformers/CharactersTransformer'
import { CharacterComicsProxy } from '../proxies/CharacterComicsProxy'
import { CharacterComicsTransformer } from '../transformers/CharacterComicsTransformer'

const request = {
  characters: null,
  characterComics: null,
}

export function incrementLoading () {
  return dispatch => {
    dispatch({ type: INCREMENT_LOADING })
  }
}

export function decrementLoading () {
  return dispatch => {
    dispatch({ type: DECREMENT_LOADING })
  }
}

export function fetchCharacters () {
  return (dispatch, getState) => {
    if (request.characters) {
      return request.characters
    }

    const {
      charactersLimit,
      charactersOffset,
      charactersTotal,
    } = getState()

    if (charactersTotal && charactersOffset >= charactersTotal) return

    return new Promise((resolve, reject) => {
      dispatch(incrementLoading())
      request.characters = new CharactersProxy()
        .setParameter('orderBy', '-modified')
        .setParameter('limit', charactersLimit)
        .setParameter('offset', charactersOffset * charactersLimit)
        .all()

      request.characters
        .then(response => {
          const characterData = CharactersTransformer.fetch(response.data.results)

          if (!charactersTotal) {
            dispatch({
              type: SET_CHARACTERS_TOTAL,
              payload: response.data.total,
            })
          }

          dispatch({ type: INCREMENT_CHARACTERS_OFFSET })

          dispatch({
            type: FETCH_CHARACTERS,
            payload: characterData,
          })
          resolve(characterData)
        })
        .catch(reject)
        .finally(() => {
          request.characters = null
          dispatch(decrementLoading())
        })
    })
  }
}

export function fetchCharactersComics (characterId) {
  return (dispatch, getState) => {
    if (request.characterComics) {
      return request.characterComics
    }

    const { charactersComics } = getState()

    if (charactersComics[ characterId ]) return

    return new Promise((resolve, reject) => {
      dispatch(incrementLoading())
      const today = format(new Date(), 'yyyy-MM-dd')
      const fiveYearsAgo = format(subYears(new Date(), 5), 'yyyy-MM-dd')

      request.characterComics = new CharacterComicsProxy({ characterId })
        .setParameter('formatType', 'comic')
        .setParameter('dateRange', `${fiveYearsAgo},${today}`)
        .setParameter('orderBy', '-onsaleDate')
        .setParameter('limit', 10)
        .all()

      request.characterComics
        .then(response => {
          const charactersComicsData = {
            [ characterId.toString() ]: CharacterComicsTransformer.fetch(response.data.results),
          }

          dispatch({
            type: FETCH_CHARACTERS_COMICS,
            payload: charactersComicsData,
          })
          resolve(charactersComicsData)
        })
        .catch(reject)
        .finally(() => {
          request.characterComics = null
          dispatch(decrementLoading())
        })
    })
  }
}
