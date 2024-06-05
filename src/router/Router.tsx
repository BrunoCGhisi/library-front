import { BrowserRouter, Route, Routes } from 'react-router-dom'

//importando todas as páginas 
import { Home }         from '../pages'
import { Historico }    from '../pages'
import { Categorias }   from '../pages'
import { NoPage }       from '../pages'
import Autores from '../pages/adm/Autores'


//importando todas as paginas que foram exportadas no ../pages/index.ts

const Router = () => (   //constante Router é igual a uma função vazia que vai executar a pesquisa rotas e paginas
    <BrowserRouter>     
        <Routes> 
            <Route  index               element={ <Categorias   /> } />
            <Route  path="/home"        element={ <Home         /> } />
            <Route  path="/historico"   element={ <Historico    /> } />
            <Route  path="/admcategoria"element={ <Categorias   /> } />
            <Route  path="/admautor"    element={ <Autores      /> } />
            <Route  path="*"            element={ <NoPage       /> } />
        </Routes>
    </BrowserRouter>
  )

export default Router