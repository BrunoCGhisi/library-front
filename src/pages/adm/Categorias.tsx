import { useState, useEffect }  from 'react'
import { CategoryVO }           from '../../services/types'
import { getCategories }        from '../../services/CategoryService'
import  axios                   from 'axios';

const Categorias = () => {
  //UseState esta recebendo o tipo CategoryVO, pois vamos utilziar ele
  const [categories, setCategories]       = useState<CategoryVO[]>() 
  //UseStates relacionados ao post
  const [categoria, setCategoria]         = useState("");

  //Função assincrona findCategories que cria a variável response que complementa o GetCategories
  async function findCategories() {
    const response = await getCategories()
    setCategories(response)
  }

  useEffect(() => {
    findCategories();     //retorna uma lista de categorias
  }, []);                 //dependecias (controla a execução do useEffect), então nesse caso TODA vez que CATEGORIES for alterado, vai executar novamente
  console.debug(categories)

  //Criando uma função assincrona Post
  async function postCategory() {
    try {
      const response = await axios.post('http://localhost:3000/categoria', {
        categoria: categoria,
    });
    if (response.status === 200) alert("usuário cadastro com sucesso!");
    findCategories()
    } catch (error: any) {
      new Error(error);
    }
  }

  //Criando uma função assincrona Put
  async function putCategory(id:string) { //Precisa de um argumento, nesse caso o ID para alterar a tabela X
    try {
      const response = await axios.put(`http://localhost:3000/categoria?id=${id}`, { //Vai procurar pelo argumento
        categoria: categoria //A unica informação além do Id_categoria dentro do Banco
      });
      console.log(response)
      if (response.status === 200) alert("usuário alterado com sucesso!"); //Se a alteração ocorrer, pop up, 
        findCategories(); //refresh nas categorias
    } catch (error: any) {
      new Error(error)
    }
  }
  //Criando uma função assincrona Put
  async function deleteCategory(id:string) { //Precisa de um argumento, nesse caso o ID para alterar a tabela X
    try {
      const response = await axios.delete(`http://localhost:3000/categoria?id=${id}`); //Vai procurar pelo argumento
      console.log(response)
      if (response.status === 200) alert("usuário deletado com sucesso!"); //Se o delete ocorrer, pop up,
        findCategories(); //refresh nas categorias
    } catch (error: any) {
      new Error(error)
    }
  }
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
              <button
              onClick={ () => 
                deleteCategory(categoria.id_categoria)}
              > Deletar   </button>
              <button
              onClick={ () => 
                putCategory(categoria.id_categoria)}
              > Alterar   </button>
            </div>
          )

        )}
        <input 
          type="text"
          id  ="categoria"
          placeholder='NomeCategoria'
          value ={categoria}
          onChange ={(e) => setCategoria(e.target.value)}
        />

        <button onClick={postCategory}> Adicionar Categoria </button>
        </div>
      )
}

export default Categorias