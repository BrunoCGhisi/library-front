import * as React from "react";
import { useEffect, useState } from "react";
import { CategoryVO } from "../../services/types";
import { getCategories } from "../../services";

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
import { GridStyle, ModalStyle } from "./styles";

const Categorias = () => {
  //UseState esta recebendo o tipo CategoryVO, pois vamos utilziar ele
  const [categories, setCategories] = useState<CategoryVO[]>([]);
  //UseStates relacionados ao post
  const [categoria, setCategoria] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  //Const Alerts
  //const [openPAlert, setOpenPAlert] = useState<boolean | undefined>(undefined);

  //Modal ADD
  const [adopen, setAdOpen] = React.useState(false);
  const addOn = () => setAdOpen(true);
  const addOf = () => setAdOpen(false);

  //Modal Put
  const [popen, setPOpen] = React.useState(false);
  const putOn = (id: string, categoria: string) => {
    setCategoria(categoria);
    setCategoriaId(id);
    setPOpen(true);
  };
  const putOf = () => setPOpen(false);

  //Função assincrona findCategories que cria a variável response que complementa o GetCategories
  async function findCategories() {
    const response = await getCategories();
    setCategories(response);
  }

  useEffect(() => {
    findCategories(); //retorna uma lista de categorias
  }, []); //dependecias (controla a execução do useEffect), então nesse caso TODA vez que CATEGORIES for alterado, vai executar novamente
  console.debug(categories);

  //Criando uma função assincrona Post
  async function postCategory() {
    try {
      const response = await axios.post("http://localhost:3000/categoria", {
        categoria: categoria,
      });
      if (response.status === 200) alert("Categoria criado com sucesso!");
      //setOpenPAlert(true);
      findCategories();
    } catch (error: any) {
      //setOpenPAlert(false);
      new Error(error);
    } finally {
      addOf();
    }
  }

  //Criando uma função assincrona Put
  async function putCategory() {
    //Precisa de um argumento, nesse caso o ID para alterar a tabela X
    try {
      const response = await axios.put(
        `http://localhost:3000/categoria?id=${categoriaId}`,
        {
          //Vai procurar pelo argumento
          categoria: categoria, //A unica informação além do Id_categoria dentro do Banco
        }
      );
      console.debug(response);
      if (response.status === 200) alert("Categoria alterado com sucesso!"); //Se a alteração ocorrer, pop up,
      findCategories(); //refresh nas categorias
    } catch (error: any) {
      new Error(error);
    } finally {
      putOf();
    }
  }
  //Criando uma função assincrona Put
  async function deleteCategory(id: string) {
    //Precisa de um argumento, nesse caso o ID para alterar a tabela X
    try {
      const response = await axios.delete(
        `http://localhost:3000/categoria?id=${id}`
      ); //Vai procurar pelo argumento
      console.log(response);
      if (response.status === 200) alert("Categoria deletada com sucesso!"); //Se o delete ocorrer, pop up,
      findCategories(); //refresh nas categorias
    } catch (error: any) {
      new Error(error);
    }
  }

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", align: "left", type: "string", flex: 0 },
    {
      field: "categoria",
      headerName: "Categoria",
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
          <IconButton onClick={() => deleteCategory(row.id)}>
            <DeleteIcon />
          </IconButton>

          <IconButton onClick={() => putOn(row.id, row.categoria)}>
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  //Mapeando cada item da lista, e o valor de cada item é dado como categoria
  const rows = categories.map((categoria) => ({
    id: categoria.id_categoria,
    categoria: categoria.categoria,
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
              Categorias
            </AccordionSummary>
            <AccordionDetails>
              Olá! <br />
              Explicando suas categorias <br />
              <strong> Id:</strong> Se trata do <strong> código </strong> que
              cada categoria tem, assim como um <strong> CPF! </strong> <br />
              <Divider />
              <strong>Categoria:</strong> Se trata do <strong>tipo</strong> de
              categoria. <strong>Romance, ficção</strong> <br />
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
              Nova categoria
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Categoria"
                defaultValue=""
                helperText="Obrigatório"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
              <Button
                onClick={postCategory}
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
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Categoria"
                defaultValue=""
                helperText="Obrigatório"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
              <Button
                onClick={putCategory}
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

export default Categorias;
