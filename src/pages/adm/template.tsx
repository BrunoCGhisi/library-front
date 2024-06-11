import { useState, useEffect }  from 'react'
import { CategoryVO }           from '../../services/types'
import { getCategories }        from '../../services/CategoryService'
import { MiniDrawer }           from './components'
import {DrawerHeader}           from './components'
import  axios                   from 'axios';


import * as React from 'react';
//Material UI 
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
//Relacionados ao Grid
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'

import Link             from '@mui/material/Link';
import MuiDrawer        from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar          from '@mui/material/Toolbar';
import List             from '@mui/material/List';
import CssBaseline      from '@mui/material/CssBaseline';
import Typography       from '@mui/material/Typography';
import Divider          from '@mui/material/Divider';
import IconButton       from '@mui/material/IconButton';
import MenuIcon         from '@mui/icons-material/Menu';
import ChevronLeftIcon  from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem         from '@mui/material/ListItem';
import ListItemButton   from '@mui/material/ListItemButton';
import ListItemIcon     from '@mui/material/ListItemIcon';
import ListItemText     from '@mui/material/ListItemText';



//Icones
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search'; 
import DeleteIcon   from    '@mui/icons-material/Delete';
import EditIcon     from    '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

//Estilos

import { ModalStyle } from './styles'
import { GridStyle }  from './styles'

//Componentes

import { PAlertTrue, PAlertFalse} from './components/Alert'





const Template = () => {
    //UseState esta recebendo o tipo CategoryVO, pois vamos utilziar ele
    const [categories, setCategories] = useState<CategoryVO[]>([]);
    //UseStates relacionados ao post
    const [categoria, setCategoria]         = useState("");
    //Const Alerts
    const [PAlert, setPAlert] = useState<boolean | null>(null)


    const [open, setOpen] = React.useState(false);
    const addOn = () => setOpen(true);
    const addOf = () => setOpen(false);



    


    //Função assincrona findCategories que cria a variável response que complementa o GetCategories
    async function findCategories() {
      const response = await getCategories()
      setCategories(response)
    }
  
    useEffect(() => {
      findCategories();     //retorna uma lista de categorias
    }, []);                 //dependecias (controla a execução do useEffect), então nesse caso TODA vez que CATEGORIES for alterado, vai executar novamente
    console.debug(categories)
    
    //Criando uma função assincrona Post
    async function postCategory() {
      try {
        const response = await axios.post('http://localhost:3000/categoria', {
          categoria: categoria,
      });
      if (response.status === 200) alert("usuário criado com sucesso!");
      setPAlert(true)
      findCategories()
      } catch (error: any) {
        setPAlert(false)
        new Error(error);
      }
    }
  
    //Criando uma função assincrona Put
    async function putCategory(id:string) { //Precisa de um argumento, nesse caso o ID para alterar a tabela X
      try {
        const response = await axios.put(`http://localhost:3000/categoria?id=${id}`, { //Vai procurar pelo argumento
          categoria: categoria //A unica informação além do Id_categoria dentro do Banco
        });
        console.log(response)
        if (response.status === 200) alert("usuário alterado com sucesso!"); //Se a alteração ocorrer, pop up, 
          findCategories(); //refresh nas categorias
      } catch (error: any) {
        new Error(error)
      }
    }
    //Criando uma função assincrona Put
    async function deleteCategory(id:string) { //Precisa de um argumento, nesse caso o ID para alterar a tabela X
      try {
        const response = await axios.delete(`http://localhost:3000/categoria?id=${id}`); //Vai procurar pelo argumento
        console.log(response)
        if (response.status === 200) alert("usuário deletado com sucesso!"); //Se o delete ocorrer, pop up,
          findCategories(); //refresh nas categorias
      } catch (error: any) {
        new Error(error)
      }
    }

    const columns: GridColDef<(typeof rows)[number]>[] = [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
      },
      {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
      },
      {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      },
    ];
    
    const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

      return (
        <Box>
        <MiniDrawer />
        <Box sx={{ display: 'flex', flexDirection:'column', marginLeft: 25, marginTop: 15, gap:5}}>
        {
          PAlert === true ? 
          <PAlertTrue  /> : 
          <PAlertFalse />
        }
                <Box sx={{ display: 'flex', flexDirection:'row'}}> 
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Categorias?
                    </AccordionSummary>
                    <AccordionDetails>
                        Olá! <br />
                        Explicando suas categorias <br />
                        <strong> Id:</strong> Se trata do <strong> código </strong> que cada categoria tem, assim como um <strong> CPF! </strong> <br />
                        <strong>Categoria:</strong> Se trata do <strong>tipo</strong> de categoria. <strong>Romance, ficção</strong> <br />
                    </AccordionDetails>
                    <AccordionActions>
                        <Button>Ok, entendido!</Button>
                    </AccordionActions>
                </Accordion>
                </Box>

                <Box sx={{ display: 'flex', flexDirection:'row'}}> 
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={categories.map(category => category.categoria)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Categoria" />}
                    />
                </Box>
                
                <Stack direction="row" spacing={2}>
                    <Button onClick={addOn} variant="outlined" startIcon={<AddCircleOutlineIcon />  }>
                        Adicionar
                    </Button>
                    <Modal
                        open={open}
                        onClose={addOf}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                    <Box sx={ModalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Nova categoria
                        </Typography>
                        
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}> 
                          
                          <TextField    //Prencher Categoria
                            id="outlined-helperText"
                            label="Categoria"
                            defaultValue=""
                            helperText="Obrigatório"
                            value = {categoria}
                            onChange ={(e) => setCategoria(e.target.value)}
                          />
                        <Button onClick={postCategory} variant="outlined" startIcon={<DoneIcon />  }>
                          Finalizar
                        </Button>
                        </Typography>
                        </Box>
                    </Modal>
                    <Button variant="outlined" startIcon={<SearchIcon   />}>
                        Pesquisar
                    </Button>
                </Stack>
                {categories && categories?.map((categoria) => (
                  <Box key={categoria.id_categoria} sx={GridStyle} > 
                    <DataGrid 
                    rows={rows} 
                    columns={columns} 
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                  /> 
                </Box>
                )
              )}
            </Box>
        </Box>
          
        )
  
        
  }
  
  export default Template

/* botoes delete e alterar
  <Stack direction="row" spacing={2}>
    <Button variant="outlined" startIcon={<DeleteIcon />}>
      Deletar
    </Button>
    <Button variant="outlined" startIcon={<EditIcon />}>
      Editar
    </Button>
  </Stack>


  
*/