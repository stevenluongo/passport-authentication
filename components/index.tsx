import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const GithubLoadingButton = styled(LoadingButton)({
  textDecoration: 'none',
  color: '#fff',
  width: '100%',
  padding: '.8rem',
  background: '#00000066',
  fontSize: '14px',
  textTransform: 'initial',
  fontFamily: 'Inter, sans-serif',
  borderRadius: 5,
  '&:hover': {
    background: '#00000088',
  },
});

export const CssTextField = styled(TextField)({
  width: '100%',
  marginBottom: '1.5rem',
  '& label.Mui-focused': {
    color: '#FFF',
  },
  '& .MuiFormLabel-root': {
    fontSize: '14px',
    color: '#bdbdbd',
  },
  '& .MuiInputLabel-shrink': {
    color: '#9b9b9b',
    fontSize: '16px',
  },

  '& .MuiInputBase-input': {
    color: '#FFF',
    fontSize: '14px',
    padding: '1rem',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #9b9b9b',
      transition: 'border-color 0.5s ease',
    },
    '&:hover fieldset': {
      borderColor: '#9b9b9b',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFF',
    },
  },
});

export const LoadingBtn = styled(LoadingButton)({
  background:
    'linear-gradient(90deg,rgba(116, 137, 228, 1) 0%,rgba(28, 193, 251, 1) 53%,rgba(152, 255, 211, 1) 100%)',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#472cac',
  },
});
