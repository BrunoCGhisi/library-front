import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { Fragment } from 'react'

import {Categorias} from '../pages'
//importando todas as paginas que foram exportadas no ../pages/index.ts


const Router = () => (      //constante Router é igual a uma função vazia que vai executar a pesquisa rotas e paginas
    <BrowserRouter>    
        <Routes>
            <Route path={'/'}> 
                <Route path={'admcategoria'}>
                    element={
                        < Categorias />
                    }
                </Route>
            </Route>
            
        </Routes>
    </BrowserRouter>
  )

export default Router