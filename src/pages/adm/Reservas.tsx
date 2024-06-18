import React, { useState, useEffect } from "react";
import { ReserveVO } from "../../services/types";
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

const Reservas = () => {
  const [reserves, setReserves] = useState<ReserveVO[]>([]); //Arruma isso imediatamente Maria Joana
  const [reserveId, setReserveId] = useState("");
  const [fk_livro, setFk_livro] = useState("");
  const [fk_membro, setFk_membro] = useState("");
  const [data_reserva, setData_reserva] = useState("");
  const [data_retirada, setData_retirada] = useState("");
  const [status_reserva, setStatus_reserva] = useState("1"); //estava 1
  const [status_retirada, setStatus_retirada] = useState("0"); //estava 0

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
    data_reserva: string,
    data_retirada: string,
    status_reserva: string,
    status_retirada: string
  ) => {
    setReserveId(id);
    setFk_livro(fk_livro);
    setFk_membro(fk_membro);
    setData_reserva(data_reserva);
    setData_retirada(data_retirada);
    setStatus_reserva(status_reserva);
    setStatus_retirada(status_retirada);

    setPOpen(true);
  };
  const putOf = () => setPOpen(false);

  //----------------------------------------------------------
  async function getReserve() {
    try {
      const response = await axios.get("http://localhost:3000/reserva");
      setReserves(response.data.reservas);
    } catch (error: any) {
      console.log("Erro na requisição:", error.response.data);
    }
  }

  async function postReserve() {
    try {
      const response = await axios.post("http://localhost:3000/reserva", {
        fk_livro,
        fk_membro,
        data_reserva,
        data_retirada,
        status_reserva,
        status_retirada,
      });
      getReserve();
      if (response.status === 200) alert("reserva cadastro com sucesso!");
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data); // Log detalhado do erro
    } finally {
      addOf();
    }
  }

  async function putReserve() {
    try {
      const response = await axios.put(
        `http://localhost:3000/reserva?id=${reserveId}`,
        {
          fk_livro,
          fk_membro,
          data_reserva,
          data_retirada,
          status_reserva,
          status_retirada,
        }
      );
      if (response.status === 200) alert("reserva atualizado com sucesso!");
      getReserve();
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data);
    } finally {
      putOf();
    }
  }

  async function delReserve(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/reserva?id=${id}`
      );
      getReserve();
      if (response.status === 200) alert("reserva atualizado com sucesso!");
    } catch (error: any) {
      new Error(error);
    }
  }
  //------------------------------------------------------
  useEffect(() => {
    getReserve();
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", align: "left", type: "string", flex: 0 },
    {
      field: "fk_livro",
      headerName: "Id-livro",
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
      field: "data_reserva",
      headerName: "Data-reserva",
      editable: false,
      flex: 0,
    },
    {
      field: "data_retirada",
      headerName: "Data-retirada",
      editable: false,
      flex: 0,
    },
    {
      field: "status_reserva",
      headerName: "Status-reserva",
      editable: false,
      flex: 0,
    },
    {
      field: "status_retirada",
      headerName: "Status-retirada",
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
          <IconButton onClick={() => delReserve(row.id)}>
            <DeleteIcon />
          </IconButton>

          <IconButton
            onClick={() =>
              putOn(
                row.id,
                row.fk_livro,
                row.fk_membro,
                row.data_reserva,
                row.data_retirada,
                row.status_reserva,
                row.status_retirada
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
  const rows = reserves.map((reserva) => ({
    id: reserva.id_reserva,
    fk_livro: reserva.fk_livro,
    fk_membro: reserva.fk_membro,
    data_reserva: reserva.data_reserva,
    data_retirada: reserva.data_retirada,
    status_reserva: reserva.status_reserva,
    status_retirada: reserva.status_retirada,
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
              Reservas
            </AccordionSummary>
            <AccordionDetails>
              Olá! <br />
              Explicando os pagamentos <br />
              <strong> Id:</strong> Se trata do <strong> código único </strong>{" "}
              que cada pagamento efetuado tem, assim como um{" "}
              <strong> CPF! </strong> <br />
              <Divider />
              <strong>Id-membro:</strong> Se trata do{" "}
              <strong>codigo do usuario</strong> no qual fez o pagamento. <br />
              <Divider />
              <strong>id-multa:</strong> Se trata do{" "}
              <strong>codigo da multa</strong> na o pagamento foi feito sobre.{" "}
              <br />
              <Divider />
              <strong>Data-pagamento:</strong> Se trata da <strong>Data</strong>{" "}
              no qual o pagamento foi efetuado <br />
              <Divider />
              <strong>Valor:</strong> Se trata do <strong>montante </strong>{" "}
              sobre a multa imposta no membro
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
              Nova reserva
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher nome
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
                label="Data-resera"
                defaultValue=""
                helperText="Obrigatório"
                value={data_reserva}
                onChange={(e) => setData_reserva(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Data-retirada"
                defaultValue=""
                helperText="Obrigatório"
                value={data_retirada}
                onChange={(e) => setData_retirada(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={status_reserva}
                label="Status"
                onChange={(e) => setStatus_reserva(e.target.value)}
              >
                <MenuItem value={0}>Não reservado </MenuItem>
                <MenuItem value={1}>Reservado </MenuItem>
              </Select>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={status_retirada}
                label="Status"
                onChange={(e) => setStatus_retirada(e.target.value)}
              >
                <MenuItem value={0}>Não retirado</MenuItem>
                <MenuItem value={1}>Retirado </MenuItem>
              </Select>
              <Button
                onClick={postReserve}
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
              Editar pagamento
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher nome
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
                label="Data-resera"
                defaultValue=""
                helperText="Obrigatório"
                value={data_reserva}
                onChange={(e) => setData_reserva(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Data-retirada"
                defaultValue=""
                helperText="Obrigatório"
                value={data_retirada}
                onChange={(e) => setData_retirada(e.target.value)}
              />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={status_reserva}
                label="Status-reserva"
                onChange={(e) => setStatus_reserva(e.target.value)}
              >
                <MenuItem value={0}>Não reservado </MenuItem>
                <MenuItem value={1}>Reservado </MenuItem>
              </Select>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={status_retirada}
                label="Status-retirada"
                onChange={(e) => setStatus_retirada(e.target.value)}
              >
                <MenuItem value={0}>Não retirado</MenuItem>
                <MenuItem value={1}>Retirado </MenuItem>
              </Select>
              <Button
                onClick={putReserve}
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

export default Reservas;

//   return (
//     <div>
//       <h1> Aqui estão os autores dos seus livros favoritos: </h1>
//       <h2> use com sabedoria </h2>
//       <h3> Separamos a obra do autor {`>:(`} </h3>
//       {reserves && reserves?.length > 0 ? (
//         reserves.map((reserva) => (
//           <div
//             key={reserva.id_reserva}
//             style={{
//               display: "flex",
//               border: "1px solid #ff0",
//               flexDirection: "column",
//               gap: "10px",
//               alignItems: "center",
//             }}
//           >
//             <span> Id_reserva {reserva.id_reserva} </span>
//             <span> Data {reserva.status_reserva} </span>
//             <button onClick={() => putReserve(reserva.id_reserva)}>
//               {" "}
//               Alterar reserva{" "}
//             </button>
//             <button onClick={() => delReserve(reserva.id_reserva)}>
//               {" "}
//               Deletar reserva{" "}
//             </button>
//           </div>
//         ))
//       ) : (
//         <h1>Carregando...</h1>
//       )}

//       <input
//         type="text"
//         id="fk_livro"
//         placeholder="fk_livro"
//         value={fk_livro}
//         onChange={(e) => setFk_livro(e.target.value)}
//       />

//       <input
//         type="text"
//         id="fk_membro"
//         placeholder="fk_membro"
//         value={fk_membro}
//         onChange={(e) => setFk_membro(e.target.value)}
//       />

//       <input
//         type="text"
//         id="data_reserva"
//         placeholder="data_reserva"
//         value={data_reserva}
//         onChange={(e) => setData_reserva(e.target.value)}
//       />

//       <input
//         type="text"
//         id="data_retirada"
//         placeholder="data_retirada"
//         value={data_retirada}
//         onChange={(e) => setData_retirada(e.target.value)}
//       />

//       <input
//         type="text"
//         id="status_reserva"
//         placeholder="status_reserva"
//         value={status_reserva}
//         onChange={(e) => setStatus_reserva(Number(e.target.value))}
//       />

//       <input
//         type="text"
//         id="status_retirada"
//         placeholder="status_retirada"
//         value={status_retirada}
//         onChange={(e) => setStatus_retirada(Number(e.target.value))}
//       />

//       <button onClick={postReserve}> Adicionar Reserca </button>
//     </div>
//   );
// };
