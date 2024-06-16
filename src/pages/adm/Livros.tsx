import React, { useState, useEffect } from "react";
import { BooksVO } from "../../services/types";
import axios from "axios";

import { MiniDrawer } from "./components";


//Material UI

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

//Relacionados ao Grid
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

//Icones
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import BookIcon from '@mui/icons-material/Book';

//Estilos

import { ModalStyle } from "./styles";
import { GridStyle } from "./styles";
import styled from "@emotion/styled";

const Livros = () => {
  const [books, setBooks] = useState<BooksVO[]>([]);
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
  const putOn = () => setPOpen(true);
  const putOf = () => setPOpen(false);

  //------------------------------------------------------

  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:3000/livro');
      setBooks(response.data.livros);
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

              fileReader.onerror = error => {
                  reject(error);
              };
          });
      }
  }
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

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

          <IconButton onClick={putOn}>
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
    capa: livro.capa
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
            <AccordionActions>
              <Button>Ok, entendido!</Button>
            </AccordionActions>
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

          <Button variant="outlined" startIcon={<SearchIcon />}>
            Pesquisar
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
            checkboxSelection
            disableRowSelectionOnClick
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

            <Typography id="modal-modal-description" sx={{mt: 2}}>
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
                  placeholder='capa'
                  onChange={(e) => Convert(e.target.files?.[0])}
              />
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<BookIcon />}
                      >
                  Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            <Button
                onClick={postBooks}
                variant="outlined"
                startIcon={<DoneIcon/>}
            >
              Cadastrar
            </Button>
          </Typography>
      </Box>
    </Modal>

{/*<Modal //Modal EDITAR
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
                label="Nome"
                defaultValue=""
                helperText="Obrigatório"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Email"
                defaultValue=""
                helperText="Obrigatório"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Senha"
                defaultValue=""
                helperText="Obrigatório"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Cpf"
                defaultValue=""
                helperText="Obrigatório"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Telefone"
                defaultValue=""
                helperText="Obrigatório"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Data-ingresso"
                defaultValue=""
                helperText="Obrigatório"
                value={data_ingresso}
                onChange={(e) => setData_ingresso(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={is_adm}
                label="Cargo"
                onChange={(e) => setIs_adm(e.target.value)}
              >
                <MenuItem value={0}>Membro</MenuItem>
                <MenuItem value={1}>Cargo </MenuItem>
              </Select>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={0}>Desativado</MenuItem>
                <MenuItem value={1}>Ativado </MenuItem>
              </Select>
              <Button
                onClick={postMembers}
                variant="outlined"
                startIcon={<DoneIcon />}
              >
                Cadastrar
              </Button>
            </Typography>
          </Box>
        </Modal>*/}
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
