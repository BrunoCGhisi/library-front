import { useState, useEffect } from 'react'
import { CategoryVO } from '../../services/types'
import { getCategories } from '../../services/libraryService'

const Categorias = () => {
    //UseState esta recebendo o tipo CategoryVO, pois vamos utilziar ele
  const [categories, setCategories] = useState<CategoryVO[]>() 

  //Função assincrona findCategories que cria a variável response que complementa o GetCategories
  async function findCategories() {
    const response = await getCategories()
    setCategories(response)
  }

  //toda vez que entrar no página, vai a função getCategories, nesse caso vai pegar os clientes
  useEffect(() => {
    findCategories(); //retorna uma lista de categorias
  }, []);             //dependecias (controla a execução do useEffect), então nesse caso TODA vez que CATEGORIES for alterado, vai executar novamente
  console.debug(categories)
  
    return (
        <div>
          <h1> Aqui estão as categorias de livros: </h1>
          <h2> use com sabedoria </h2>
          <h3> Não consideramos fan-fic um genero literário {`>:(`} </h3>
          {categories && categories?.map((categoria) => (
            <div
              key={categoria.id_categoria}
              style={{
                display: 'flex',
                border: '1px solid #ff0',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center'
              }}
            > 
              <span> Id_Categoria {categoria.id_categoria}  </span>
              <span> Categoria    {categoria.categoria}     </span>
            </div>
          )
        
        )}
        </div>
      )
}

export default Categorias