import { HashRouter,Routes,Route } from 'react-router-dom'
import "./App.css";
import InputForEnter from './components/InputForEnter';
import PokemonInfo from './components/PokemonInfo';
import Pokemons from './components/Pokemons';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {


	return ( 
      <div className="App">
         <HashRouter>
            <Routes>
              < Route path='/' element={<InputForEnter/>}/>

              <Route element={<ProtectedRoutes/>}>
                  < Route path='/pokemons' element={<Pokemons/>}/>
                  < Route path='/pokemon/:id' element={<PokemonInfo/>}/>
              </Route>
              
            </Routes>
         </HashRouter>
      </div>
      )
}

export default App;
