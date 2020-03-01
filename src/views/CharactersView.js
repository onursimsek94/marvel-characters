import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacters } from '../store/actions'
import MarvelCard from '../components/MarvelCard'
import './CharactersView.scss'

export default function CharactersView () {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    characters,
    charactersTotal,
  } = useSelector(state => ({ ...state }))

  useEffect(() => {
    document.title = 'Marvel Characters List'
    if (!characters.length) {
      dispatch(fetchCharacters())
    }

    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        dispatch(fetchCharacters())
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      window.onscroll = null
    }
  }, [])

  function handleCardClick (characterId) {
    history.push(`/character-detail/${characterId}`)
  }

  return (
    <div className="page-frame characters-view">
      {characters.length > 0 &&
      <>
        <div className="result-count">{charactersTotal} RESULTS</div>

        <div className="characters-list">
          {characters.map(character => (
            <MarvelCard
              key={character.id}
              id={character.id}
              name={character.name}
              thumbnail={character.thumbnail}
              handleClickFn={handleCardClick}
            />
          ))}
        </div>
      </>
      }
    </div>
  )
}
