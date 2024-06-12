import Snackbar from '@mui/material/Snackbar';
import Alert    from '@mui/material/Alert';

interface PAlertProps {
  open: boolean
  isError: boolean
  text: string
}

const PAlert = ({open, isError, text}:PAlertProps) => {
  return (
    <Snackbar open={open}  autoHideDuration={3000} >
        <Alert
          severity = {isError ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {text}
        </Alert>
    </Snackbar>
  )
}

export default PAlert



