import { useState, useEffect }  from 'react'
import { AuthorsVO }            from '../../services/types'
import  axios                   from 'axios';

const Autores = () => {

  //UseState esta recebendo o tipo CategoryVO, pois vamos utilziar ele
  const [authors, setAuthors]       = useState<AuthorsVO[]>() 

  //UseStates variaveis da tabela
  const [nome, setNome]         = useState("");

    const [open, setOpen] = useState(false);
    const addOn = () => setOpen(true);
    const addOf = () => setOpen(false);

  //------------------------------------------------------

    async function getAuthors(){
        try {
  
            const response = await axios.get("http://localhost:3000/autor");
            setAuthors(response.data.autores)  // aqui pe o nome que vem do back antona burra 
        } catch (error: any) {
           new Error(error); 
        }
    }
         
  async function postAuthors() {
    try {
      const response = await axios.post('http://localhost:3000/autor', {
        nome: nome,
    });
        getAuthors();
    if (response.status === 200) alert("Autor cadastro com sucesso!");
    } catch (error: any) {
        new Error(error);
    }
  }
  
  async function putAuthors(id:string) {
    try {
        const response = await axios.put(`http://localhost:3000/autor?id=${id}`, {
            nome: nome,
    });
        if (response.status === 200) alert("Autor atualizado com sucesso!");
        getAuthors(); 
    } catch (error: any) {
        new Error(error);
    }
  }

  async function delAuthors(id:string) {
    try {
        const response = await axios.delete(`http://localhost:3000/autor?id=${id}`);
        getAuthors(); 
        if (response.status === 200) alert("Autor atualizado com sucesso!");
    } catch (error: any) {
        new Error(error);
    }
  }

//------------------------------------------------------

  useEffect(() => {
    getAuthors();

}, []);   

    return (
        <div>
          <h1> Aqui estão os autores dos seus livros favoritos: </h1>
          <h2> use com sabedoria </h2>
          <h3> Separamos a obra do autor {`>:(`} </h3>
          {
            authors && authors?.length > 0 ? authors.map((autor) => ( // tirei o ?
            <div
              key={autor.id_autor}
              style={{
                display: 'flex',
                border: '1px solid #ff0',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center'
              }}
            > 
              <span> Id_Autor {autor.id_autor}  </span>
              <span> Nome    {autor.nome}     </span>
              <button onClick={ () => putAuthors(autor.id_autor)}> Alterar Autor </button>
              <button onClick={ () => delAuthors(autor.id_autor)}> Deletar Autor </button>
            </div>
          ))  : (
                <h1>Carregando...</h1>
            )
          }
         
        <input 
          type="text"
          id  ="autor"
          placeholder='Autor'
          value ={nome}
          onChange ={(e) => setNome(e.target.value)}
        />

        <button onClick={postAuthors}> Adicionar Autor </button>
        </div>
      )
}

export default Autores