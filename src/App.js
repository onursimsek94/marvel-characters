import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import CharactersView from './views/CharactersView'
import CharacterDetailView from './views/CharacterDetailView'
import Loading from './components/Loading'

function App () {
  const loading = useSelector(state => state.loading)

  return (
    <Router>
      {loading > 0 &&
      <Loading/>
      }
      <Switch>
        <Route
          path='/'
          exact
          component={CharactersView}
        />

        <Route
          path='/character-detail/:characterId'
          exact
          component={CharacterDetailView}
        />

        <Redirect from='*' to='/'/>
      </Switch>
    </Router>
  )
}

export default App
