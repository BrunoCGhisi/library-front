import { BrowserRouter, Route, Routes } from "react-router-dom";

//importando todas as páginas
import { Home } from "../pages";
import { Historico } from "../pages";
import { Categorias } from "../pages";
import { NoPage } from "../pages";
import { Membros } from "../pages";
import { Autores } from "../pages";
import { Template } from "../pages";
import { Livros } from "../pages";
import { Reservas } from "../pages";
import { Emprestimos } from "../pages";
import { Status_emprestimos } from "../pages";
import { Multas } from "../pages";
import { Pagamentos } from "../pages";

//importando todas as paginas que foram exportadas no ../pages/index.ts

const Router = () => (
  //constante Router é igual a uma função vazia que vai executar a pesquisa rotas e paginas
  <BrowserRouter>
    <Routes>
      <Route index element={<Template />} />
      <Route path="/home" element={<Home />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/Categorias" element={<Categorias />} />
      <Route path="/Autores" element={<Autores />} />
      <Route path="/Membros" element={<Membros />} />
      <Route path="/Livros" element={<Livros />} />
      <Route path="/Reservas" element={<Reservas />} />
      <Route path="/Emprestimos" element={<Emprestimos />} />
      <Route path="/Status_emprestimos" element={<Status_emprestimos />} />
      <Route path="/Multas" element={<Multas />} />
      <Route path="/Pagamentos" element={<Pagamentos />} />
      <Route path="/Template" element={<Template />} />
      
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
