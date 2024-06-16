import * as React from "react";
import { useState, useEffect } from "react";
import { MembersVO } from "../../services/types";
import axios from "axios";

import { MiniDrawer } from "./components";
//Material UI

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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

//Estilos

import { ModalStyle } from "./styles";
import { GridStyle } from "./styles";

const Membros = () => {
  const [members, setMembers] = useState<MembersVO[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [data_ingresso, setData_ingresso] = useState("");
  const [is_adm, setIs_adm] = useState("");
  const [status, setStatus] = useState("");

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

  async function getMembers() {
    try {
      const response = await axios.get("http://localhost:3000/membro");
      setMembers(response.data.membros);
    } catch (error: any) {
      new Error(error);
    }
  }

  async function postMembers() {
    try {
      const response = await axios.post("http://localhost:3000/membro", {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        telefone: telefone,
        data_ingresso: data_ingresso,
        is_adm: is_adm,
        status: status,
      });
      getMembers();
      if (response.status === 200) alert("membro cadastro com sucesso!");
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data); // Log detalhado do erro
    }
  }

  async function putMembers(id: string) {
    try {
      const response = await axios.put(
        `http://localhost:3000/membro?id=${id}`,
        {
          nome: nome,
          email: email,
          senha: senha,
          cpf: cpf,
          telefone: telefone,
          data_ingresso: data_ingresso,
          is_adm: is_adm,
          status: status,
        }
      );
      if (response.status === 200) alert("membro atualizado com sucesso!");
      getMembers();
    } catch (error: any) {
      console.error("Erro na requisição:", error.response.data);
    }
  }

  async function delMembers(id: string) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/membro?id=${id}`
      );
      getMembers();
      if (response.status === 200) alert("membro atualizado com sucesso!");
    } catch (error: any) {
      new Error(error);
    }
  }

  //------------------------------------------------------

  useEffect(() => {
    getMembers();
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", align: "left", type: "string", flex: 0 },
    {
      field: "nome",
      headerName: "Nome",
      editable: false,
      flex: 0,
    },
    {
      field: "email",
      headerName: "Email",
      editable: false,
      flex: 0,
    },
    {
      field: "senha",
      headerName: "Senha",
      editable: false,
      flex: 0,
    },
    {
      field: "cpf",
      headerName: "cpf",
      editable: false,
      flex: 0,
    },
    {
      field: "telefone",
      headerName: "Telefone",
      editable: false,
      flex: 0,
    },
    {
      field: "data_ingresso",
      headerName: "Data-ingresso",
      editable: false,
      flex: 0,
    },
    {
      field: "is_adm",
      headerName: "ADM",
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
          <IconButton onClick={() => delMembers(row.id)}>
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
  const rows = members.map((membro) => ({
    id: membro.id_membro,
    nome: membro.nome,
    email: membro.email,
    senha: membro.senha,
    cpf: membro.cpf,
    telefone: membro.telefone,
    data_ingresso: membro.data_ingresso,
    is_adm: membro.is_adm,
    status: membro.status,
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
              Membros
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
              Novo membro
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
        </Modal>
      </Box>
    </Box>
  );
};

export default Membros;
