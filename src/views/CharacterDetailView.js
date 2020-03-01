import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { fetchCharactersComics } from '../store/actions'
import MarvelCard from '../components/MarvelCard'
import './CharacterDetailView.scss'

export default function CharacterDetailView () {
  const history = useHistory()
  const { characterId } = useParams()
  const dispatch = useDispatch()
  const {
    character = {},
    charactersComics,
  } = useSelector(state => {
    return {
      character: state.characters.find(item => item.id === parseInt(characterId)),
      charactersComics: state.charactersComics[ characterId ],
    }
  }, shallowEqual)

  useEffect(() => {
    if (character.name) {
      document.title = character.name
    } else {
      history.goBack()
    }

    if (!charactersComics) {
      dispatch(fetchCharactersComics(characterId))
    }
  }, [])

  function handleBackButtonClick () {
    history.goBack()
  }

  return (
    <div className="page-frame character-detail-view">
      <img
        className="character-img"
        src={character.thumbnail}
        alt={character.name}
      />

      <div>
        <label className="input-label">CHARACTER: </label>
        {character.name}
      </div>

      <div>
        <label className="input-label">DESCRIPTION: </label>
        {character.description}
      </div>

      <div>
        <label className="input-label">COMICS: </label>
        {charactersComics &&
        <>
          {!charactersComics.length && <span>No Comics</span>}
          <div className="comics-list">
            {charactersComics.map(comic => (
              <MarvelCard
                key={comic.id}
                id={comic.id}
                name={comic.title}
                thumbnail={comic.thumbnail}
              />
            ))
            }
          </div>
        </>
        }
      </div>

      <button
        type="button"
        className="mrvl-btn red-btn"
        onClick={handleBackButtonClick}
      >
        BACK
      </button>
    </div>
  )
}
