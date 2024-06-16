import React, { useState, useEffect } from "react";

import { PaymentsVO } from "../../services/types";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

//Estilos

import { ModalStyle } from "./styles";
import { GridStyle } from "./styles";

const Pagamentos = () => {
  const [payments, setPayments] = useState<PaymentsVO[]>([]);
  const [fk_membro, setFk_membro] = useState("");
  const [fk_multa, setFk_multa] = useState("");
  const [data_pagamento, setData_pagamento] = useState("");
  const [valor, setValor] = useState("");

  //Modal ADD
  const [adopen, setAdOpen] = React.useState(false);
  const addOn = () => setAdOpen(true);
  const addOf = () => setAdOpen(false);

  //Modal Put
  const [popen, setPOpen] = React.useState(false);
  const putOn = () => setPOpen(true);
  const putOf = () => setPOpen(false);
  //------------------------------------------------------

  async function getPayments() {
    try {
      const response = await axios.get("http://localhost:3000/pagamento");
      setPayments(response.data.pagamentos);
    } catch (error: any) {
      new Error(error);
    }
  }

  async function postPayments() {
    try {
      const response = await axios.post("http://localhost:3000/pagamento", {
        fk_membro,
        fk_multa,
        data_pagamento,
        valor,
      });
      getPayments();
      if (response.status === 200) alert("membro cadastro com sucesso!");
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data); // Log detalhado do erro
    }
  }

  async function putPayments(id: string) {
    try {
      const response = await axios.put(
        `http://localhost:3000/pagamento?id=${id}`
      );
      if (response.status === 200) alert("membro atualizado com sucesso!");
      getPayments();
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data);
    }
  }

  async function delPayments(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/pagamento?id=${id}`
      );
      getPayments();
      if (response.status === 200) alert("membro atualizado com sucesso!");
    } catch (error: any) {
      new Error(error);
    }
  }

  //------------------------------------------------------

  useEffect(() => {
    getPayments();
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", align: "left", type: "string", flex: 0 },
    {
      field: "fk_membro",
      headerName: "Id-membro",
      editable: false,
      flex: 0,
    },
    {
      field: "fk_multa",
      headerName: "Id-Multa",
      editable: false,
      flex: 0,
    },
    {
      field: "data_pagamento",
      headerName: "Data-pagamento",
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
      field: "acoes",
      headerName: "Ações",
      editable: false,
      align: "center",
      type: "actions",
      flex: 0,
      renderCell: ({ row }) => (
        <div>
          <IconButton onClick={() => delPayments(row.id)}>
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
  const rows = payments.map((pagamento) => ({
    id: pagamento.id_pagamento,
    fk_membro: pagamento.fk_membro,
    fk_multa: pagamento.fk_multa,
    data_pagamento: pagamento.data_pagamento,
    valor: pagamento.valor,
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
              Pagamentos
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
              Novo pagamento
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField //Prencher nome
                id="outlined-helperText"
                label="Id-membro"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_membro}
                onChange={(e) => setFk_membro(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Id-multa"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_multa}
                onChange={(e) => setFk_multa(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Data-pagamento"
                defaultValue=""
                helperText="Obrigatório"
                value={data_pagamento}
                onChange={(e) => setData_pagamento(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Valor"
                defaultValue=""
                helperText="Obrigatório"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
              <Button
                onClick={postPayments}
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
                label="Nome"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_membro}
                onChange={(e) => setFk_membro(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Id-Multa"
                defaultValue=""
                helperText="Obrigatório"
                value={fk_multa}
                onChange={(e) => setFk_multa(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Senha"
                defaultValue=""
                helperText="Obrigatório"
                value={data_pagamento}
                onChange={(e) => setData_pagamento(e.target.value)}
              />
              <TextField //Prencher Categoria
                id="outlined-helperText"
                label="Cpf"
                defaultValue=""
                helperText="Obrigatório"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
              <Button
                onClick={postPayments}
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

export default Pagamentos;

//   return (
//     <div>
//       <h1> Aqui estão os autores dos seus livros favoritos: </h1>
//       <h2> use com sabedoria </h2>
//       <h3> Separamos a obra do autor {`>:(`} </h3>
//       {payments && payments?.length > 0 ? (
//         payments.map(
//           (
//             pagamento // tirei o ?
//           ) => (
//             <div
//               key={pagamento.id_pagamento}
//               style={{
//                 display: "flex",
//                 border: "1px solid #ff0",
//                 flexDirection: "column",
//                 gap: "10px",
//                 alignItems: "center",
//               }}
//             >
//               <span> Id_pagamento {pagamento.id_pagamento} </span>
//               <span> Valor {pagamento.valor} </span>
//               <button onClick={() => putPayments(pagamento.id_pagamento)}>
//                 {" "}
//                 Alterar pagamento{" "}
//               </button>
//               <button onClick={() => delPayments(pagamento.id_pagamento)}>
//                 {" "}
//                 Deletar pagamento{" "}
//               </button>
//             </div>
//           )
//         )
//       ) : (
//         <h1>Carregando...</h1>
//       )}

//       <input
//         type="text"
//         id="fk_membro"
//         placeholder="fk_membro"
//         value={fk_membro}
//         onChange={(e) => setFk_membro(e.target.value)}
//       />

//       <input
//         type="text"
//         id="fk_multa"
//         placeholder="fk_multa"
//         value={fk_multa}
//         onChange={(e) => setFk_multa(e.target.value)}
//       />

//       <input
//         type="text"
//         id="data_pagamento"
//         placeholder="data_pagamento"
//         value={data_pagamento}
//         onChange={(e) => setData_pagamento(e.target.value)}
//       />

//       <input
//         type="text"
//         id="valor"
//         placeholder="valor"
//         value={valor}
//         onChange={(e) => setValor(e.target.value)}
//       />

//       <button onClick={postPayments}> Adicionar Membro </button>
//     </div>
//   );
// };

// export default Pagamentos;
