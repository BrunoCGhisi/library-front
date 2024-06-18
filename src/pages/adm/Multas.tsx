import React, { useState, useEffect } from "react";
import { FinesVO } from "../../services/types";
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
  InputLabel,
  Select,
  MenuItem,
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

const Multas = () => {
  const [fines, setFines] = useState<FinesVO[]>([]);

  const [fineId, setFineId] = useState("");
  const [fk_emprestimo, setFk_emprestimo] = useState("");
  const [fk_membro, setFk_membro] = useState("");
  const [data_multa, setData_multa] = useState("");
  const [data_prazo, setData_prazo] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("");

  const [adopen, setAdOpen] = React.useState(false);
  const addOn = () => setAdOpen(true);
  const addOf = () => setAdOpen(false);

  //Modal Put
  const [popen, setPOpen] = React.useState(false);
  const putOn = (
    id: string,
    fk_emprestimo: string,
    fk_membro: string,
    data_multa: string,
    data_prazo: string,
    valor: string,
    status: string
  ) => {
    setFineId(id);
    setFk_emprestimo(fk_emprestimo);
    setFk_membro(fk_membro);
    setData_multa(data_multa);
    setData_prazo(data_prazo);
    setValor(valor);
    setStatus(status);

    setPOpen(true);
  };
  const putOf = () => setPOpen(false);
  //----------------------------------------------------------
  async function getFine() {
    try {
      const response = await axios.get("http://localhost:3000/multa");
      setFines(response.data.multas);
    } catch (error: any) {
      console.log(error.response?.data || error.message);
    }
  }

  async function postFine() {
    try {
      const response = await axios.post("http://localhost:3000/multa", {
        fk_emprestimo,
        fk_membro,
        data_multa,
        data_prazo,
        valor,
        status,
      });
      getFine();
      if (response.status === 200) alert("multa cadastro com sucesso!");
    } catch (error: any) {
      console.log("aa", error.response?.data || error.message); // Log detalhado do erro
    } finally {
      addOf();
    }
  }

  async function putFine() {
    try {
      const response = await axios.put(
        `http://localhost:3000/multa?id=${fineId}`,
        {
          fk_emprestimo,
          fk_membro,
          data_multa,
          data_prazo,
          valor,
          status,
        }
      );
      if (response.status === 200) alert("multa atualizado com sucesso!");
      getFine();
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data);
    } finally {
      putOf();
    }
  }

  async function delFine(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/multa?id=${id}`
      );
      getFine();
      if (response.status === 200) alert("multa atualizado com sucesso!");
    } catch (error: any) {
      new Error(error);
    }
  }
  //------------------------------------------------------
  useEffect(() => {
    getFine();
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", align: "left", type: "string", flex: 0 },
    {
      field: "fk_emprestimo",
      headerName: "Id-emprestimo",
      editable: false,
      flex: 0,
    },
    {
      field: "fk_membro",
      headerName: "Id-membro",
      editable: false,
      flex: 0,
    },
    {
      field: "data_multa",
      headerName: "Data-multa",
      editable: false,
      flex: 0,
    },
    {
      field: "data_prazo",
      headerName: "Data-prazo",
      editable: false,
      flex: 0,
    },
    {
      field: "valor",
      headerName: "Valor",
      editable: false,
      flex: 0,
    },
    {
      field: "status",
      headerName: "Status",
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
          <IconButton onClick={() => delFine(row.id)}>
            <DeleteIcon />
          </IconButton>

          <IconButton
            onClick={() =>
              putOn(
                row.id,
                row.fk_emprestimo,
                row.fk_membro,
                row.data_multa,
                row.data_prazo,
                row.valor,
                row.status
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
  const rows = fines.map((multa) => ({
    id: multa.id_multa,
    fk_emprestimo: multa.fk_emprestimo,
    fk_membro: multa.fk_membro,
    data_multa: multa.data_multa,
    data_prazo: multa.data_prazo,
    valor: multa.valor,
    status: multa.status,
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
              Multas
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
              Nova multa
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher nome
                id="outlined-helperText"
                label="Id-emprestimo"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_emprestimo}
                onChange={(e) => setFk_emprestimo(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Id-membro"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_membro}
                onChange={(e) => setFk_membro(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Data-aplicada"
                defaultValue=""
                helperText="Obrigatório"
                value={data_multa}
                onChange={(e) => setData_multa(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Data-prazo"
                defaultValue=""
                helperText="Obrigatório"
                value={data_prazo}
                onChange={(e) => setData_prazo(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Valor"
                defaultValue=""
                helperText="Obrigatório"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={0}>Pendente</MenuItem>
                <MenuItem value={1}>Efetuada</MenuItem>
              </Select>
              <Button
                onClick={postFine}
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
              Editar membro
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher nome
                id="outlined-helperText"
                label="Id-emprestimo"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_emprestimo}
                onChange={(e) => setFk_emprestimo(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Id-membro"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_membro}
                onChange={(e) => setFk_membro(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Data-aplicada"
                defaultValue=""
                helperText="Obrigatório"
                value={data_multa}
                onChange={(e) => setData_multa(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Data-prazo"
                defaultValue=""
                helperText="Obrigatório"
                value={data_prazo}
                onChange={(e) => setData_prazo(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Valor"
                defaultValue=""
                helperText="Obrigatório"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={0}>Pendente</MenuItem>
                <MenuItem value={1}>Efetuada</MenuItem>
              </Select>
              <Button
                onClick={putFine}
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

export default Multas;
// return(

//     <div>
//         <h1> Aqui estão os autores dos seus livros favoritos: </h1>
//         <h2> use com sabedoria </h2>
//         <h3> Separamos a obra do autor {`>:(`} </h3>
//         {fines && fines?.length > 0 ? fines.map((multa) =>
//             (
//                 <div
//                     key={multa.id_multa}
//                     style={{
//                     display: 'flex',
//                     border: '1px solid #ff0',
//                     flexDirection: 'column',
//                     gap: '10px',
//                     alignItems: 'center'
//                     }}>

//                     <span> Id_multa {multa.id_multa}  </span>
//                     <span> Data    {multa.valor}     </span>
//                     <button onClick={ () => putFine(multa.id_multa)}> Alterar multa </button>
//                     <button onClick={ () => delFine(multa.id_multa)}> Deletar multa </button>
//                 </div>
//             )) :
//             (
//                 <h1>Carregando...a</h1>

//             )
//         }

//         <input
//           type="text"
//           id  ="fk_membro"
//           placeholder='fk_membro'
//           value ={fk_membro}
//           onChange ={(e) => setFk_membro(e.target.value)}
//         />

//         <input
//           type="text"
//           id  ="fk_emprestimo"
//           placeholder='fk_emprestimo'
//           value ={fk_emprestimo}
//           onChange ={(e) => setFk_emprestimo(e.target.value)}
//         />

//         <input
//           type="text"
//           id  ="data_multa"
//           placeholder='data_multa'
//           value ={data_multa}
//           onChange ={(e) => setData_multa(e.target.value)}
//         />

//         <input
//           type="text"
//           id  ="data_prazo"
//           placeholder='data_prazo'
//           value ={data_prazo}
//           onChange ={(e) => setData_prazo(e.target.value)}
//         />

//         <input
//           type="text"
//           id  ="valor"
//           placeholder='valor'
//           value ={valor}
//           onChange ={(e) => setValor(e.target.value)}
//         />

//     <input
//           type="text"
//           id  ="status"
//           placeholder='status'
//           value ={status}
//           onChange ={(e) => setStatus(Number(e.target.value))}
//         />

//         <button onClick={postFine}> Adicionar Status </button>
//         <button onClick={getFine}> Get Status </button>
//     </div>
// )}
