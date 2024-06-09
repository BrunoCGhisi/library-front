import { BrowserRouter, Route, Routes } from 'react-router-dom'

//importando todas as páginas 
import { Home }         from '../pages'
import { Historico }    from '../pages'
import { Categorias }   from '../pages'
import { NoPage }       from '../pages'
import { Membros }      from '../pages'
import { Autores }      from '../pages'
import { Template }     from '../pages'
import { Livros }       from '../pages'



//importando todas as paginas que foram exportadas no ../pages/index.ts

const Router = () => (   //constante Router é igual a uma função vazia que vai executar a pesquisa rotas e paginas
    <BrowserRouter>     
        <Routes> 
            <Route  index               element={ <Template     /> } />
            <Route  path="/home"        element={ <Home         /> } />
            <Route  path="/historico"   element={ <Historico    /> } />
            <Route  path="/admcategoria"element={ <Categorias   /> } />
            <Route  path="/admautor"    element={ <Autores      /> } />
            <Route  path="/admmembro"   element={ <Membros      /> } />
            <Route  path="/admlivro"    element={ <Livros        /> } />
            <Route  path="/template"    element={ <Template     /> } />
            <Route  path="*"            element={ <NoPage       /> } />
        </Routes>
    </BrowserRouter>
  )

export default Router