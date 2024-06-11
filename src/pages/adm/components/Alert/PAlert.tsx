import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function PAlertTrue() {
    <Snackbar autoHideDuration={6000} >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
}



export function PAlertFalse() {
    <Snackbar autoHideDuration={6000} >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          This is a Error Alert inside a Snackbar!
        </Alert>
      </Snackbar>
}