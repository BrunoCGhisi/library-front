import { useState, useEffect } from "react";
import * as React from "react";
import { LoanVO } from "../../services/types";
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
  MenuItem
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

const Emprestimos = () => {
  const [loans, setLoans] = useState<LoanVO[]>([]);
  const [loanId, setLoanId] = useState("");
  const [fk_livro, setFk_livro] = useState("");
  const [fk_membro, setFk_membro] = useState("");
  const [data_emprestimo, setData_emprestimo] = useState("");
  const [data_retorno, setData_retorno] = useState("");
  const [fk_status, setFk_status] = useState("");

  //Modal ADD
  const [adopen, setAdOpen] = React.useState(false);
  const addOn = () => setAdOpen(true);
  const addOf = () => setAdOpen(false);

  //Modal Put
  const [popen, setPOpen] = React.useState(false);
  const putOn = (
    id: string,
    fk_livro: string,
    fk_membro: string,
    data_emprestimo: string,
    data_retorno: string,
    fk_status: string
  ) => {
    setLoanId(id);
    setFk_livro(fk_livro);
    setFk_membro(fk_membro);
    setData_emprestimo(data_emprestimo);
    setData_retorno(data_retorno);
    setFk_status(fk_status);
    setPOpen(true);
  };
  const putOf = () => setPOpen(false);

  //----------------------------------------------------------
  async function getLoan() {
    try {
      const response = await axios.get("http://localhost:3000/emprestimo");
      setLoans(response.data.emprestimos);
    } catch (error: any) {
      console.log("Erro na requisição:", error.response.data);
    }
  }

  async function postLoan() {
    try {
      const response = await axios.post("http://localhost:3000/emprestimo", {
        fk_livro: fk_livro,
        fk_membro: fk_membro,
        data_emprestimo: data_emprestimo,
        data_retorno: data_retorno,
        fk_status: fk_status,
      });
      getLoan();
      if (response.status === 200) alert("reserva cadastro com sucesso!");
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data); // Log detalhado do erro
    } finally {
      addOf();
    }
  }

  async function putLoan() {
    try {
      const response = await axios.put(
        `http://localhost:3000/emprestimo?id=${loanId}`,
        {
          fk_livro: fk_livro,
          fk_membro: fk_membro,
          data_emprestimo: data_emprestimo,
          data_retorno: data_retorno,
          fk_status: fk_status,
        }
      );
      if (response.status === 200) alert("reserva atualizado com sucesso!");
      getLoan();
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data);
    } finally {
      putOf();
    }
  }

  async function delLoan(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/emprestimo?id=${id}`
      );
      getLoan();
      if (response.status === 200) alert("reserva atualizado com sucesso!");
    } catch (error: any) {
      new Error(error);
    }
  }

  //------------------------------------------------------
  useEffect(() => {
    getLoan();
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", align: "left", type: "string", flex: 0 },
    {
      field: "fk_livro",
      headerName: "id-livro",
      editable: false,
      flex: 0,
    },
    {
      field: "fk_membro",
      headerName: "id-membro",
      editable: false,
      flex: 0,
    },
    {
      field: "data_emprestimo",
      headerName: "data-entrada",
      editable: false,
      flex: 0,
    },
    {
      field: "data_retorno",
      headerName: "data-retorno",
      editable: false,
      flex: 0,
    },
    {
      field: "fk_status",
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
          <IconButton onClick={() => delLoan(row.id)}>
            <DeleteIcon />
          </IconButton>

          <IconButton
            onClick={() =>
              putOn(
                row.id,
                row.fk_livro,
                row.fk_membro,
                row.data_emprestimo,
                row.data_retorno,
                row.fk_status
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
  const rows = loans.map((emprestimo) => ({
    id: emprestimo.id_emprestimo,
    fk_livro: emprestimo.fk_livro,
    fk_membro: emprestimo.fk_membro,
    data_emprestimo: emprestimo.data_emprestimo,
    data_retorno: emprestimo.data_retorno,
    fk_status: emprestimo.fk_status,
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
              Empréstimos
            </AccordionSummary>
            <AccordionDetails>
              Olá! <br />
              Explicando os empréstimos <br />
              <Divider />
              <strong> Id:</strong> Se trata do <strong> código único </strong>{" "}
              que cada empréstimo tem, assim como um <strong> CPF! </strong>{" "}
              <br />
              <Divider />
              <strong>Id-Livro:</strong> Se trata do{" "}
              <strong>id do livro</strong> no qual o empréstimo foi feito.{" "}
              <strong>
                <br />
                exemplo: 1 = 1984{" "}
              </strong>{" "}
              <br />
              <Divider />
              <strong>Id-Membro:</strong> Se trata do{" "}
              <strong>Id do membro</strong> no qual o empréstimo foi feito.{" "}
              <strong>
                <br />
                exemplo: 1 = Belone{" "}
              </strong>{" "}
              <br />
              <Divider />
              <strong>Data-entrada:</strong> Se trata da <strong>data</strong>{" "}
              no qual o empréstimo foi feito. <br />
              <Divider />
              <strong>Data-retorno:</strong> Se trata da <strong>data</strong>{" "}
              no qual o livro foi retornado <br />
              <Divider />
              <strong>Status:</strong> Se trata do <strong>status</strong> no
              qual o empréstimo está. <br />
              <strong>
                {" "}
                1 = Emprestado <br />
                2 = Retornado <br />3 = Atrasado{" "}
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
              Novo empréstimo
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher fk_livro
                id="outlined-helperText"
                label="Id-livro"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_livro}
                onChange={(e) => setFk_livro(e.target.value)}
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
                label="Data-emprestimo"
                defaultValue=""
                helperText="Obrigatório"
                value={data_emprestimo}
                onChange={(e) => setData_emprestimo(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Data-retorno"
                defaultValue=""
                helperText="Obrigatório"
                value={data_retorno}
                onChange={(e) => setData_retorno(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={fk_status}
                label="Status"
                onChange={(e) => setFk_status(e.target.value)}
              >
                <MenuItem value={1}>Emprestado</MenuItem>
                <MenuItem value={2}>Retornado </MenuItem>
                <MenuItem value={3}>Atrasado </MenuItem>
              </Select>
              <Button
                onClick={postLoan}
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
              Editar emprestimo
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher fk_livro
                id="outlined-helperText"
                label="Id-livro"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_livro}
                onChange={(e) => setFk_livro(e.target.value)}
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
                label="Data-emprestimo"
                defaultValue=""
                helperText="Obrigatório"
                value={data_emprestimo}
                onChange={(e) => setData_emprestimo(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Data-retorno"
                defaultValue=""
                helperText="Obrigatório"
                value={data_retorno}
                onChange={(e) => setData_retorno(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={fk_status}
                label="Status"
                onChange={(e) => setFk_status(e.target.value)}
              >
                <MenuItem value={1}>Emprestado</MenuItem>
                <MenuItem value={2}>Retornado </MenuItem>
                <MenuItem value={3}>Atrasado </MenuItem>
              </Select>
              <Button
                onClick={putLoan}
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

export default Emprestimos;

// return(

// <div>

//     <h1> Aqui estão os autores dos seus livros favoritos: </h1>
//     <h2> use com sabedoria </h2>
//     <h3> Separamos a obra do autor {`>:(`} </h3>
//     {loans && loans?.length > 0 ? loans.map((emprestimo) =>
//         (
//             <div
//                 key={emprestimo.id_emprestimo}
//                 style={{
//                 display: 'flex',
//                 border: '1px solid #ff0',
//                 flexDirection: 'column',
//                 gap: '10px',
//                 alignItems: 'center'
//                 }}>

//                 <span> Id_emprestimo {emprestimo.id_emprestimo}  </span>
//                 <span> Data    {emprestimo.data_emprestimo}     </span>
//                 <button onClick={ () => putLoan(emprestimo.id_emprestimo)}> Alterar emprestimo </button>
//                 <button onClick={ () => delLoan(emprestimo.id_emprestimo)}> Deletar emprestimo </button>
//             </div>
//         )) :
//         (
//             <h1>Carregando...</h1>
//         )
//     }

//     <input
//       type="text"
//       id  ="fk_livro"
//       placeholder='fk_livro'
//       value ={fk_livro}
//       onChange ={(e) => setFk_livro(e.target.value)}
//     />

//     <input
//       type="text"
//       id  ="fk_membro"
//       placeholder='fk_membro'
//       value ={fk_membro}
//       onChange ={(e) => setFk_membro(e.target.value)}
//     />

//     <input
//       type="text"
//       id  ="data_emprestimo"
//       placeholder='data_emprestimo'
//       value ={data_emprestimo}
//       onChange ={(e) => setData_emprestimo(e.target.value)}
//     />

//     <input
//       type="text"
//       id  ="data_retorno"
//       placeholder='data_retorno'
//       value ={data_retorno}
//       onChange ={(e) => setData_retorno(e.target.value)}
//     />

//     <input
//       type="text"
//       id  ="fk_status"
//       placeholder='fk_status'
//       value ={fk_status}
//       onChange ={(e) => setFk_status(Number(e.target.value))}
//     />

//     <button onClick={postLoan}> Adicionar Emprestimo </button>
// </div>

// )

//
