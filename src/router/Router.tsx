import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

import { Home } from '../pages'
import { Historico } from '../pages'
import { Categorias } from '../pages'
import { NoPage } from '../pages'


//importando todas as paginas que foram exportadas no ../pages/index.ts

const Router = () => (      //constante Router é igual a uma função vazia que vai executar a pesquisa rotas e paginas
    <BrowserRouter>     
        <Routes> 
            <Route index element={ <Home /> } />
            <Route  path="/home" element={ <Home /> } />
            <Route  path="/historico" element={ <Historico /> } />
            <Route  path="/admcategoria" element={ <Categorias /> } />
            <Route  path="*" element={ <NoPage /> } />
            
            
        </Routes>
    </BrowserRouter>
  )

export default Router