import { useState, useEffect } from "react";
import { AuthorsVO } from "../../services/types";
import { MiniDrawer } from "./components";

import axios from "axios";
import * as React from "react";
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

//Estilos

import { ModalStyle } from "./styles";
import { GridStyle } from "./styles";
const Autores = () => {
  //UseState esta recebendo o tipo CategoryVO, pois vamos utilziar ele
  const [authors, setAuthors] = useState<AuthorsVO[]>([]);

  //UseStates variaveis da tabela
  const [nome, setNome] = useState("");

  //Modal ADD
  const [adopen, setAdOpen] = React.useState(false);
  const addOn = () => setAdOpen(true);
  const addOf = () => setAdOpen(false);

  //Modal Put
  const [put, setPut] = React.useState("");
  const [popen, setPOpen] = React.useState(false);
  const putOn = () => setPOpen(true);
  const putOf = () => setPOpen(false);

  //------------------------------------------------------

  async function getAuthors() {
    try {
      const response = await axios.get("http://localhost:3000/autor");
      setAuthors(response.data.autores); // aqui pe o nome que vem do back antona burra
    } catch (error: any) {
      new Error(error);
    }
  }

  async function postAuthors() {
    try {
      const response = await axios.post("http://localhost:3000/autor", {
        nome: nome,
      });
      getAuthors();
      if (response.status === 200) alert("Autor cadastro com sucesso!");
    } catch (error: any) {
      new Error(error);
    }
  }

  async function putAuthors(id: string) {
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

  async function delAuthors(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/autor?id=${id}`
      );
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

  //------------------------------------------------------

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", align: "left", type: "string", flex: 0 },
    {
      field: "nome",
      headerName: "Nome",
      editable: false,
      flex: 0,
    },
    {
      field: "acoes",
      headerName: "Ações",
      width: 150,
      editable: false,
      align: "center",
      type: "actions",
      flex: 0,
      renderCell: ({ row }) => (
        <div>
          <IconButton onClick={() => delAuthors(row.id)}>
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
  const rows = authors.map((autor) => ({
    id: autor.id_autor,
    nome: autor.nome,
  }));

  //------------------------------------------------------

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
              Autores
            </AccordionSummary>
            <AccordionDetails>
              Olá! <br />
              Explicando seus autores
              <br />
              <strong> Id:</strong> Se trata do <strong> código </strong> que
              cada autor tem, assim como um <strong> CPF! </strong> <br />
              <strong>Nome:</strong> Se trata do <strong>nome</strong> pessoal
              do autor categoria. <strong>Belone, Daniel</strong> <br />
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
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 6,
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
              Novo autor
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Nome"
                defaultValue=""
                helperText="Obrigatório"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Button
                onClick={postAuthors}
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
              Editar categoria
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher Autor
                id="outlined-helperText"
                label="Nome"
                defaultValue=""
                helperText="Obrigatório"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Button
                onClick={postAuthors}
                variant="outlined"
                startIcon={<DoneIcon />}
              >
                Alterar
              </Button>
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Autores;
