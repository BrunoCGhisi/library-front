import { useState, useEffect } from "react";
import { BooksVO }             from "../../services/types/booksVO";
import axios                   from "axios";

const Livros = () =>{

  const [books, setBooks]       = useState<BooksVO[]>() 

  const [id_autor_livro, setId_autor_livro] = useState("");
  const [titulo, setTitulo]                 = useState("");
  const [ano, setAno]                       = useState("");
  const [disponivel, setDisponivel]         = useState("");
  const [estoque, setEstoque]               = useState("");
  const [capa, setCapa]                     = useState("");
 
//------------------------------------------------------------------
    async function getBooks() {

        try {

           const response = await axios.get('http://localhost:3000/livro');
            setBooks(response.data.livros);

        } 
        catch (error:any) {
            console.log("Erro na requisição:", error.response.data);
        }

    }

    async function postBooks() {

        try {

            const response = await axios.post('http://localhost:3000/livro',{
                id_autor_livro: id_autor_livro,
                titulo: titulo,
                ano: ano,
                disponivel: disponivel,
                estoque: estoque,
                capa: capa
            });
            
            if (response.status === 200) alert("Adicionado com sucesso");
            getBooks();
 
         } 
         catch (error:any) {
             console.log("Erro na requisição:", error.response.data);
         }
        
    }

    async function putBooks(id:string) {

        try {

            const response = await axios.put(`http://localhost:3000/livro?id=${id}`,{
                id_autor_livro: id_autor_livro,
                titulo: titulo,
                ano: ano,
                disponivel: disponivel,
                estoque: estoque,
                capa: capa
            });
            
            if (response.status === 200) alert("Atualizado com sucesso");
            getBooks();
 
         } 
         catch (error:any) {
             console.log("Erro na requisição:", error.response.data);
         }
        
    }

    async function delBooks(id:string) {

        try {

            const response = await axios.delete(`http://localhost:3000/livro?id=${id}`);

            if (response.status === 200) alert("Deletadp com sucesso");
            getBooks();
 
         } 
         catch (error:any) {
             console.log("Erro na requisição:", error.response.data);
         }
    }

//------------------------------------------------------

    useEffect(() => {
        getBooks();
    }, []);

return(
    <div>
        <h1> Aqui estão os autores dos seus livros favoritos: </h1>
        <h2> use com sabedoria </h2>
        <h3> Separamos a obra do autor {`>:(`} </h3>
        {books && books?.length > 0 ? books.map((livro) => 
            ( 
                <div
                    key={livro.id_livro}
                    style={{
                    display: 'flex',
                    border: '1px solid #ff0',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center'
                    }}> 

                    <span> Id_livro {livro.id_livro}  </span>
                    <span> Nome    {livro.titulo}     </span>
                    <button onClick={ () => putBooks(livro.id_livro)}> Alterar livro </button>
                    <button onClick={ () => delBooks(livro.id_livro)}> Deletar livro </button>
                </div>
            )) : 
            (
                <h1>Carregando...</h1>
            )
        }
         
        <input 
          type="text"
          id  ="id_autor_livro"
          placeholder='Id_autor_livro'
          value ={id_autor_livro}
          onChange ={(e) => setId_autor_livro(e.target.value)}
        />

        <input 
          type="text"
          id  ="titulo"
          placeholder='titulo'
          value ={titulo}
          onChange ={(e) => setTitulo(e.target.value)}
        />

        <input 
          type="text"
          id  ="ano"
          placeholder='ano'
          value ={ano}
          onChange ={(e) => setAno(e.target.value)}
        />

        <input 
          type="text"
          id  ="disponivel"
          placeholder='disponivel'
          value ={disponivel}
          onChange ={(e) => setDisponivel(e.target.value)}
        />
          
        <input 
          type="text"
          id  ="estoque"
          placeholder='estoque'
          value ={estoque}
          onChange ={(e) => setEstoque(e.target.value)}
        />

        <input 
          type="text"
          id  ="capa"
          placeholder='capa'
          value ={capa}
          onChange ={(e) => setCapa(e.target.value)}
        />

        <button onClick={postBooks}> Adicionar Livro </button>
        </div>


);}

export default Livros