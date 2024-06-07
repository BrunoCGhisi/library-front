import * as React from 'react' ;
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const AdmDrawer = () => {
    const [open, setOpen] = React.useState(false);
  
    const  manipulatorDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };

const menuDrawer = (
  <Box sx={{ width: 250 }} role="presentation" onClick={manipulatorDrawer(false)}>
    <List>
      {['Autores','Categorias', 'Membros'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
  );

  return (
    <div>
      <Button onClick={manipulatorDrawer(true)}>Dashbord</Button>
      <Drawer open={open} onClose={manipulatorDrawer(false)}>
        {menuDrawer}
      </Drawer>
    </div>
  );
}

export default AdmDrawer