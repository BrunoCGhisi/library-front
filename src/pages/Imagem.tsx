import { useState, useEffect } from "react";
import { BooksVO } from "../services/types";
import axios from "axios";

const Imagem = () => {
  const [books, setBooks] = useState<BooksVO[]>();
  const [fk_autor, setFk_autor] = useState("");
  const [fk_categoria, setFk_categoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState("");
  const [disponiveis, setDisponiveis] = useState("");
  const [estoque, setEstoque] = useState("");
  const [capa, setCapa] = useState<File | null | string>("");

  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:3000/livro');
      setBooks(response.data.livros);
      console.log(response.data.livros.map((livro:any) => livro.capa))
    } catch (error: any) {
      console.log("Erro na requisição:", error.response.data);
    }
  }

  async function postBooks() {
    try {
      const response = await axios.post('http://localhost:3000/livro', {
        fk_autor,
        fk_categoria,
        titulo,
        ano,
        disponiveis,
        estoque,
        capa
      });

      if (response.status === 200) alert("Adicionado com sucesso");
      getBooks();
    } catch (error: any) {
      console.log("Erro na requisição:", error.response.data);
    }
  }

  async function putBooks(id: string) {
    try {
      const response = await axios.put(`http://localhost:3000/livro?id=${id}`, {
        fk_autor,
        fk_categoria,
        titulo,
        ano,
        disponiveis,
        estoque,
        capa
      });

      if (response.status === 200) alert("Atualizado com sucesso");
      getBooks();
    } catch (error: any) {
      console.log("Erro na requisição:", error.response.data);
    }
  }

  async function delBooks(id: string) {
    try {
      const response = await axios.delete(`http://localhost:3000/livro?id=${id}`);

      if (response.status === 200) alert("Deletado com sucesso");
      getBooks();
    } catch (error: any) {
      console.log("Erro na requisição:", error.response.data);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  function Convert(file: Blob) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = async () => {
        const base64String = fileReader.result as string;
        setCapa(base64String);
        resolve(base64String);
      };

      fileReader.onerror = error => {
        reject(error);
      };
    });
  }

  return (
    <div>
      <h1>Aqui estão os autores dos seus livros favoritos:</h1>
      <h2>use com sabedoria</h2>
      <h3>Separamos a obra do autor {`>:(`}</h3>
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

            <span>Id_livro {livro.id_livro}</span>
            <span>Nome {livro.titulo}</span>
            <img src={livro.capa} title="Image" alt="OI" style={{ width: 100, height: 100, objectFit: 'cover' }} />
            <button onClick={() => putBooks(livro.id_livro)}>Alterar livro</button>
            <button onClick={() => delBooks(livro.id_livro)}>Deletar livro</button>
          </div>
        )) :
        (
          <h1>Carregando...</h1>
        )
      }

      <input
        type="text"
        id="id_autor"
        placeholder='Id_autor'
        value={fk_autor}
        onChange={(e) => setFk_autor(e.target.value)}
      />

      <input
        type="text"
        id="titulo"
        placeholder='titulo'
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        type="text"
        id="ano"
        placeholder='ano'
        value={ano}
        onChange={(e) => setAno(e.target.value)}
      />

      <input
        type="text"
        id="disponiveis"
        placeholder='disponiveis'
        value={disponiveis}
        onChange={(e) => setDisponiveis(e.target.value)}
      />

      <input
        type="text"
        id="estoque"
        placeholder='estoque'
        value={estoque}
        onChange={(e) => setEstoque(e.target.value)}
      />

      <input
        type="file"
        id="capa"
        placeholder='capa'
        onChange={(e) => Convert(e.target.files[0])}
      />

      <input
        type="text"
        id="fk_categoria"
        placeholder='fk_categoria'
        value={fk_categoria}
        onChange={(e) => setFk_categoria(e.target.value)}
      />

      <button onClick={postBooks}>Adicionar Livro</button>
    </div>
  );
}

export default Imagem;