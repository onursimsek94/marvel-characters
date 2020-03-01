import {
  INCREMENT_LOADING,
  DECREMENT_LOADING,
  FETCH_CHARACTERS,
  INCREMENT_CHARACTERS_OFFSET,
  SET_CHARACTERS_TOTAL,
  FETCH_CHARACTERS_COMICS,
} from './constants'

const initialState = {
  loading: 0,
  characters: [],
  charactersLimit: 30,
  charactersOffset: 0,
  charactersTotal: null,
  charactersComics: {},
}

function marvelApp (state = initialState, action) {
  switch (action.type) {
    case INCREMENT_LOADING:
      return { ...state, loading: state.loading + 1 }
    case DECREMENT_LOADING:
      return { ...state, loading: state.loading - 1 }
    case FETCH_CHARACTERS:
      return { ...state, characters: [...state.characters, ...action.payload] }
    case INCREMENT_CHARACTERS_OFFSET:
      return { ...state, charactersOffset: state.charactersOffset + 1 }
    case SET_CHARACTERS_TOTAL:
      return { ...state, charactersTotal: action.payload }
    case FETCH_CHARACTERS_COMICS:
      return { ...state, charactersComics: { ...state.charactersComics, ...action.payload } }
    default:
      return state
  }
}

export default marvelApp
