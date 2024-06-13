import React, { useState, useEffect } from 'react';
import { FinesVO }              from '../../services/types'
import  axios                   from 'axios';



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
import Divider from '@mui/material/Divider';

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


const Multas = () => {

  const [fines, setFines]    = useState<FinesVO[]>();

  const [fk_emprestimo, setFk_emprestimo]   = useState("");
  const [fk_membro, setFk_membro]           = useState("");
  const [data_multa, setData_multa]         = useState("");
  const [data_prazo, setData_prazo]         = useState("");
  const [valor, setValor]         = useState("");
  const [status, setStatus]                 = useState(0);

//----------------------------------------------------------
    async function getFine(){
        try {

            const response = await axios.get("http://localhost:3000/multa");
            setFines(response.data.multas)   

        } catch (error: any) {
            console.log(error.response?.data || error.message); 
        }
    }
        
    async function postFine() {
        
        try {
            const response = await axios.post('http://localhost:3000/multa', {
                fk_emprestimo: fk_emprestimo,
                fk_membro: fk_membro,
                data_multa: data_multa,
                data_prazo: data_prazo,
                valor: valor,
                status: status
            });
            getFine();
            if (response.status === 200) alert("multa cadastro com sucesso!");

        } catch (error: any) {
            console.log("aa", error.response?.data || error.message);  // Log detalhado do erro 
        }
    }

    async function putFine(id:string) {
        try {
            const response = await axios.put(`http://localhost:3000/multa?id=${id}`, {
                fk_emprestimo: fk_emprestimo,
                fk_membro: fk_membro,
                data_multa: data_multa,
                data_prazo: data_prazo,
                valor: valor,
                status: status
        });
            if (response.status === 200) alert("multa atualizado com sucesso!");
            getFine(); 
        } catch (error: any) {
            console.error("Erro na requisição:", error.response.data);
        }
    }

    async function delFine(id:string) {
        try {
            const response = await axios.delete(`http://localhost:3000/multa?id=${id}`);
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

return(

    <div>
        <h1> Aqui estão os autores dos seus livros favoritos: </h1>
        <h2> use com sabedoria </h2>
        <h3> Separamos a obra do autor {`>:(`} </h3>
        {fines && fines?.length > 0 ? fines.map((multa) => 
            ( 
                <div
                    key={multa.id_multa}
                    style={{
                    display: 'flex',
                    border: '1px solid #ff0',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center'
                    }}> 

                    <span> Id_multa {multa.id_multa}  </span>
                    <span> Data    {multa.valor}     </span>
                    <button onClick={ () => putFine(multa.id_multa)}> Alterar multa </button>
                    <button onClick={ () => delFine(multa.id_multa)}> Deletar multa </button>
                </div>
            )) : 
            (
                <h1>Carregando...a</h1>
                
            )
        }
         
        <input 
          type="text"
          id  ="fk_membro"
          placeholder='fk_membro'
          value ={fk_membro}
          onChange ={(e) => setFk_membro(e.target.value)}
        />

        <input 
          type="text"
          id  ="fk_emprestimo"
          placeholder='fk_emprestimo'
          value ={fk_emprestimo}
          onChange ={(e) => setFk_emprestimo(e.target.value)}
        />

        <input 
          type="text"
          id  ="data_multa"
          placeholder='data_multa'
          value ={data_multa}
          onChange ={(e) => setData_multa(e.target.value)}
        />

        <input 
          type="text"
          id  ="data_prazo"
          placeholder='data_prazo'
          value ={data_prazo}
          onChange ={(e) => setData_prazo(e.target.value)}
        />

        <input 
          type="text"
          id  ="valor"
          placeholder='valor'
          value ={valor}
          onChange ={(e) => setValor(e.target.value)}
        />

    <input 
          type="text"
          id  ="status"
          placeholder='status'
          value ={status}
          onChange ={(e) => setStatus(Number(e.target.value))}
        />


        <button onClick={postFine}> Adicionar Status </button>
        <button onClick={getFine}> Get Status </button>
    </div>
)}

export default Multas;