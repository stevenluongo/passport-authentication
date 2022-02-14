import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

export const ColorButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(56deg, rgba(89,110,213,1) 0%, rgba(80,49,177,1) 100%)',
  fontSize: '14px',
  textTransform: 'initial',
  fontFamily: 'Inter, sans-serif',
}));

export const GithubButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  background: '#424242',
  fontSize: '14px',
  textTransform: 'initial',
  fontFamily: 'Inter, sans-serif',
  borderRadius: 5,
  "&:hover" : {
      background: '#525252'
  }
}));

export const GithubLoadingButton = styled(LoadingButton)({
  color: "#fff",
  background: '#424242',
  fontSize: '14px',
  textTransform: 'initial',
  fontFamily: 'Inter, sans-serif',
  borderRadius: 5,
  "&:hover" : {
      background: '#525252'
  }

})

export const StyledMenu = styled((props) => (
  <Menu
    elevation={2}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
    top: 0,
    left: 0,
    minWidth: 200,
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
      },
    },
  },
}));

export const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#868686',
  },
  '& .MuiFormLabel-root': {
    fontSize: '14px',
    color: "#bdbdbd",
  },
  '& .MuiInputLabel-shrink': {
    color: '#bdbdbd',
    fontSize: '16px',
  },

  '& .MuiInputBase-input': {
    color: '#FFF',
    fontSize: '14px',
    padding: '1rem'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #868686',
      transition: 'border-color 0.5s ease',
    },
    '&:hover fieldset': {
      borderColor: '#b1b1b1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#868686',
    },
  },
});

export const LoadingBtn = styled(LoadingButton)({
  color: '#cfc4ff',
  backgroundColor: 'var(--primary-text-accent)',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#472cac',
  },

})

export const PrimaryButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  background: 'linear-gradient(56deg, #7650ff 0%, #7650ff 100%)',
  fontSize: '0.9em',
  textTransform: 'initial',
  fontFamily: 'Inter, sans-serif',
  width: 200,
  padding: 12,
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  background: '#222222',
  fontSize: '0.9em',
  textTransform: 'initial',
  fontFamily: 'Inter, sans-serif',
  width: 200,
  padding: 12,
  '&:hover': {
    backgroundColor: '#7650ff',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
}));