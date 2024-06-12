import { useState, useEffect } from "react";
import { BooksVO }             from "../../services/types";
import axios                   from "axios";

//https://web.dev/articles/base64-encoding#:~:text=The%20core%20functions%20to%20base64,and%20atob()%20decodes%20back.
// error https://stackoverflow.com/questions/56952405/how-to-decode-encode-string-to-base64-in-typescript-express-server
// flask https://stackoverflow.com/questions/67165636/decoding-base64-encoded-image-in-flask


const Livros = () =>{

  const [books, setBooks]       = useState<BooksVO[]>() 
  const [fk_autor, setFk_autor]             = useState("");
  const [fk_categoria, setFk_categoria]        = useState("");
  const [titulo, setTitulo]                 = useState("");
  const [ano, setAno]                       = useState("");
  const [disponiveis, setDisponiveis]         = useState("");
  const [estoque, setEstoque]               = useState("");
  const [capa, setCapa]                     = useState("");

 //   const [open, setOpen] = useState(false);
 //   const addOn = () => setOpen(true);
 //   const addOf = () => setOpen(false);
 
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
                fk_autor: fk_autor,
                fk_categoria: fk_categoria,
                titulo: titulo,
                ano: ano,
                disponiveis: disponiveis,
                estoque: estoque,
                capa: btoa(capa)
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
                fk_autor: fk_autor,
                fk_categoria: fk_categoria,
                titulo: titulo,
                ano: ano,
                disponiveis: disponiveis,
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
                    <span> Nome    {livro.capa}     </span>
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
          id  ="id_autor"
          placeholder='Id_autor'
          value ={fk_autor}
          onChange ={(e) => setFk_autor(e.target.value)}
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
          id  ="disponiveis"
          placeholder='disponiveis'
          value ={disponiveis}
          onChange ={(e) => setDisponiveis(e.target.value)}
        />
          
        <input 
          type="text"
          id  ="estoque"
          placeholder='estoque'
          value ={estoque}
          onChange ={(e) => setEstoque(e.target.value)}
        />

        <input 
          type="file"
          id  ="capa"
          placeholder='capa'
          value ={capa}
          onChange ={(e) => setCapa(e.target.value)}
        />

        <input 
          type="text"
          id  ="fk_categoria"
          placeholder='fk_categoria'
          value ={fk_categoria}
          onChange ={(e) => setFk_categoria(e.target.value)}
        />

        <button onClick={postBooks}> Adicionar Livro </button>
        </div>


);}

export default Livros