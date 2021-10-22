import './App.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Home } from './screens/Home'
import { Game } from './screens/Game'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/game">
          <Game/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
