import React, { useState, useEffect } from "react";
import { BooksVO } from "../../services/types";
import axios from "axios";

import { MiniDrawer } from "./components";

//Material UI

import {
  Accordion,
  AccordionDetails,
  Box,
  Modal,
  AccordionSummary,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

//Relacionados ao Grid
import { DataGrid, GridColDef } from "@mui/x-data-grid";

//Icones
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

//Estilos

import { ModalStyle, GridStyle } from "./styles";

const Livros = () => {
  const [books, setBooks] = useState<BooksVO[]>([]);
  const [bookId, setBookId] = useState("");
  const [fk_autor, setFk_autor] = useState("");
  const [fk_categoria, setFk_categoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [ano, setAno] = useState("");
  const [disponiveis, setDisponiveis] = useState("");
  const [estoque, setEstoque] = useState("");
  const [capa, setCapa] = useState<File | null | string>("");

  //Modal ADD
  const [adopen, setAdOpen] = React.useState(false);
  const addOn = () => setAdOpen(true);
  const addOf = () => setAdOpen(false);

  //Modal Put
  const [popen, setPOpen] = React.useState(false);
  const putOn = (
    id: string,
    fk_autor: string,
    fk_categoria: string,
    titulo: string,
    ano: string,
    disponiveis: string,
    estoque: string,
    capa: string
  ) => {
    setBookId(id);
    setFk_autor(fk_autor);
    setFk_categoria(fk_categoria);
    setTitulo(titulo);
    setAno(ano);
    setDisponiveis(disponiveis);
    setEstoque(estoque);
    setCapa(capa);
    setPOpen(true);
  };
  const putOf = () => setPOpen(false);

  //------------------------------------------------------

  async function getBooks() {
    try {
      const response = await axios.get("http://localhost:3000/livro");
      setBooks(response.data.livros);
    } catch (error: any) {
      console.log("Erro na requisição:", error.response.data);
    }
  }

  async function postBooks() {
    try {
      const response = await axios.post("http://localhost:3000/livro", {
        fk_autor,
        fk_categoria,
        titulo,
        ano,
        disponiveis,
        estoque,
        capa,
      });

      if (response.status === 200) alert("Livro adicionado com sucesso");
      getBooks();
    } catch (error: any) {
      console.log("Erro na requisição:", error.response.data);
    } finally {
      addOf();
    }
  }

  async function putBooks() {
    try {
      const response = await axios.put(
        `http://localhost:3000/livro?id=${bookId}`,
        {
          fk_autor,
          fk_categoria,
          titulo,
          ano,
          disponiveis,
          estoque,
          capa,
        }
      );

      if (response.status === 200) alert("Livro atualizado com sucesso");
      getBooks();
    } catch (error: any) {
      console.log("Erro na requisição:", error.response.data);
    } finally {
      putOf();
    }
  }

  async function delBooks(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/livro?id=${id}`
      );

      if (response.status === 200) alert("Livro deletado com sucesso");
      getBooks();
    } catch (error: any) {
      console.log("Erro na requisição:", error.response.data);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  function Convert(file?: Blob) {
    if (file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = async () => {
          const base64String = fileReader.result as string;
          setCapa(base64String);
          resolve(base64String);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    }
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", align: "left", type: "string", flex: 0 },
    {
      field: "fk_autor",
      headerName: "ID Autor",
      editable: false,
      flex: 0,
    },
    {
      field: "fk_categoria",
      headerName: "ID Categoria",
      editable: false,
      flex: 0,
    },
    {
      field: "titulo",
      headerName: "Titulo",
      editable: false,
      flex: 0,
    },
    {
      field: "ano",
      headerName: "Ano",
      editable: false,
      flex: 0,
    },
    {
      field: "disponiveis",
      headerName: "Disponiveis",
      editable: false,
      flex: 0,
    },
    {
      field: "estoque",
      headerName: "Estoque",
      editable: false,
      flex: 0,
    },
    {
      field: "acoes",
      headerName: "Ações",
      editable: false,
      align: "center",
      type: "actions",
      flex: 0,
      renderCell: ({ row }) => (
        <div>
          <IconButton onClick={() => delBooks(row.id)}>
            <DeleteIcon />
          </IconButton>

          <IconButton
            onClick={() =>
              putOn(
                row.id,
                row.fk_autor,
                row.fk_categoria,
                row.titulo,
                row.ano,
                row.disponiveis,
                row.estoque,
                row.capa
              )
            }
          >
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  //Mapeando cada item da lista, e o valor de cada item é dado como categoria
  const rows = books.map((livro) => ({
    id: livro.id_livro,
    fk_autor: livro.fk_autor,
    fk_categoria: livro.fk_categoria,
    titulo: livro.titulo,
    ano: livro.ano,
    disponiveis: livro.disponiveis,
    estoque: livro.estoque,
    capa: livro.capa,
  }));

  return (
    <Box>
      <MiniDrawer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: 35,
          marginTop: 10,
          gap: 5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Livros
            </AccordionSummary>
            <AccordionDetails>
              Olá! <br />
              Explicando os membros <br />
              <strong> Id:</strong> Se trata do <strong> código único </strong>{" "}
              que cada membro tem, assim como um <strong> CPF! </strong> <br />
              <Divider />
              <strong>Nome:</strong> Se trata do <strong>Usuario</strong> no
              qual o membro se cadastrou. <br />
              <Divider />
              <strong>Senha:</strong> Se trata da <strong>Senha</strong> no qual
              o membro utiliza. <br />
              <Divider />
              <strong>Cpf:</strong> Se trata do{" "}
              <strong>Cadastro de Pessoa Fisica</strong> no qual o membro possui
              registrado. <br />
              <Divider />
              <strong>Telefone:</strong> Se trata do{" "}
              <strong>número de telefone</strong> pessoal do membro <br />
              <Divider />
              <strong>Data-ingresso:</strong> Se trata da <strong>data</strong>{" "}
              no qual o membro se cadastrou.
              <br /> <Divider />
              <strong>ADM:</strong> Se trata da{" "}
              <strong> hierarquia administrativa </strong> no qual os membros
              possuem:
              <br />
              <strong>
                false = Não é um moderador <br />
                true = É um moderador{" "}
              </strong>
              <br /> <Divider />
              <strong>Status:</strong> Se trata da <strong>atividade</strong> no
              na qual a conta do membro está: <br />
              <strong>
                {" "}
                false = Conta desativada <br />
                true = Conta ativada
              </strong>{" "}
              <br />
            </AccordionDetails>
          </Accordion>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            onClick={addOn}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
          >
            Adicionar
          </Button>
        </Stack>
        <Box sx={GridStyle}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[6]}
          />
        </Box>

        <Modal //Modal ADICIONAR
          open={adopen}
          onClose={addOf}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Novo livro
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher nome
                id="outlined-helperText"
                label="Id-autor"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_autor}
                onChange={(e) => setFk_autor(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Id-categoria"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_categoria}
                onChange={(e) => setFk_categoria(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Titulo"
                defaultValue=""
                helperText="Obrigatório"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Ano"
                defaultValue=""
                helperText="Obrigatório"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Disponíveis"
                defaultValue=""
                helperText="Obrigatório"
                value={disponiveis}
                onChange={(e) => setDisponiveis(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Estoque"
                defaultValue=""
                helperText="Obrigatório"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
              />
              <input
                type="file"
                id="capa"
                placeholder="capa"
                onChange={(e) => Convert(e.target.files?.[0])}
              />
              <Button
                onClick={postBooks}
                variant="outlined"
                startIcon={<DoneIcon />}
              >
                Cadastrar
              </Button>
            </Typography>
          </Box>
        </Modal>

        <Modal //Modal EDITAR
          open={popen}
          onClose={putOf}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar livro
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher nome
                id="outlined-helperText"
                label="Id-autor"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_autor}
                onChange={(e) => setFk_autor(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Id-categoria"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_categoria}
                onChange={(e) => setFk_categoria(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Titulo"
                defaultValue=""
                helperText="Obrigatório"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Ano"
                defaultValue=""
                helperText="Obrigatório"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Disponíveis"
                defaultValue=""
                helperText="Obrigatório"
                value={disponiveis}
                onChange={(e) => setDisponiveis(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Estoque"
                defaultValue=""
                helperText="Obrigatório"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
              />
              <input
                type="file"
                id="capa"
                placeholder="capa"
                onChange={(e) => Convert(e.target.files?.[0])}
              />
              <Button
                onClick={putBooks}
                variant="outlined"
                startIcon={<DoneIcon />}
              >
                Cadastrar
              </Button>
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Livros;

//   return (
//     <div>
//       <h1>Aqui estão os autores dos seus livros favoritos:</h1>
//       <h2>use com sabedoria</h2>
//       <h3>Separamos a obra do autor {`>:(`}</h3>
//       {books && books?.length > 0 ? books.map((livro) =>
//         (
//           <div
//             key={livro.id_livro}
//             style={{
//               display: 'flex',
//               border: '1px solid #ff0',
//               flexDirection: 'column',
//               gap: '10px',
//               alignItems: 'center'
//             }}>

//             <span>Id_livro {livro.id_livro}</span>
//             <span>Nome {livro.titulo}</span>
//             <img src={livro.capa} title="Image" alt="OI" style={{ width: 100, height: 100, objectFit: 'cover' }} />
//             <button onClick={() => putBooks(livro.id_livro)}>Alterar livro</button>
//             <button onClick={() => delBooks(livro.id_livro)}>Deletar livro</button>
//           </div>
//         )) :
//         (
//           <h1>Carregando...</h1>
//         )
//       }

//       <input
//         type="text"
//         id="id_autor"
//         placeholder='Id_autor'
//         value={fk_autor}
//         onChange={(e) => setFk_autor(e.target.value)}
//       />

//       <input
//         type="text"
//         id="titulo"
//         placeholder='titulo'
//         value={titulo}
//         onChange={(e) => setTitulo(e.target.value)}
//       />

//       <input
//         type="text"
//         id="ano"
//         placeholder='ano'
//         value={ano}
//         onChange={(e) => setAno(e.target.value)}
//       />

//       <input
//         type="text"
//         id="disponiveis"
//         placeholder='disponiveis'
//         value={disponiveis}
//         onChange={(e) => setDisponiveis(e.target.value)}
//       />

//       <input
//         type="text"
//         id="estoque"
//         placeholder='estoque'
//         value={estoque}
//         onChange={(e) => setEstoque(e.target.value)}
//       />

//       <input
//         type="file"
//         id="capa"
//         placeholder='capa'
//         onChange={(e) => Convert(e.target.files[0])}
//       />

//       <input
//         type="text"
//         id="fk_categoria"
//         placeholder='fk_categoria'
//         value={fk_categoria}
//         onChange={(e) => setFk_categoria(e.target.value)}
//       />

//       <button onClick={postBooks}>Adicionar Livro</button>
//     </div>
//   );
// }

// export default Livros;
