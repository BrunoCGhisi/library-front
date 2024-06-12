import { useState, useEffect }  from 'react'
import { LoanVO }               from '../../services/types'

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


//Modal ADD
const [adopen, setAdOpen] = React.useState(false);
const addOn = () => setAdOpen(true);
const addOf = () => setAdOpen(false);

//Modal Put
const [put, setPut]      = React.useState("")
const [popen, setPOpen]  = React.useState(false);
const putOn = () => setPOpen(true);
const putOf = () => setPOpen(false);


const Emprestimos = () => {

  const [loans, setLoans]                     = useState<LoanVO[]>() 
  const [fk_livro, setFk_livro]               = useState("");
  const [fk_membro, setFk_membro]             = useState("");
  const [data_emprestimo, setData_emprestimo] = useState("");
  const [data_retorno, setData_retorno]       = useState("");
  const [fk_status, setFk_status]             = useState(0);

    const [open, setOpen] = useState(false);
    const addOn = () => setOpen(true);
    const addOf = () => setOpen(false);

//----------------------------------------------------------
    async function getLoan(){
        try {

            const response = await axios.get("http://localhost:3000/emprestimo");
            setLoans(response.data.emprestimos)   

        } catch (error: any) {
            console.log("Erro na requisição:", error.response.data); 
        }
    }
        
    async function postLoan() {
        
        try {
            const response = await axios.post('http://localhost:3000/emprestimo', {
                fk_livro: fk_livro,
                fk_membro: fk_membro,
                data_emprestimo: data_emprestimo,
                data_retorno: data_retorno,
                fk_status: fk_status
            });
            getLoan();
            if (response.status === 200) alert("reserva cadastro com sucesso!");

        } catch (error: any) {
            console.error("Erro na requisição:", error.response.data); // Log detalhado do erro 
        }
    }

    async function putLoan(id:string) {
        try {
            const response = await axios.put(`http://localhost:3000/emprestimo?id=${id}`, {
                fk_livro: fk_livro,
                fk_membro: fk_membro,
                data_emprestimo: data_emprestimo,
                data_retorno: data_retorno,
                fk_status: fk_status
        });
            if (response.status === 200) alert("reserva atualizado com sucesso!");
            getLoan(); 
        } catch (error: any) {
            console.error("Erro na requisição:", error.response.data);
        }
    }

    async function delLoan(id:string) {
        try {
            const response = await axios.delete(`http://localhost:3000/emprestimo?id=${id}`);
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

return(
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
              Explicando os empréstimos <br />
              <strong> Id:</strong> Se trata do <strong> código </strong> que
              cada empréstimo tem, assim como um <strong> CPF! </strong> <br />
              <strong>Livro:</strong> Se trata do <strong> código</strong> pessoal do autor
              categoria. <strong>Belone, Daniel</strong> <br />
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
 
         <Modal        //Modal ADICIONAR
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
                  onClick={postLoan}
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

}

export default Emprestimos;

