import Register from '../components/Register';
import csrf from '../utils/csrf';

export default function RegisterWrapper(props) {
  return <Register {...props} />;
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  await csrf(req, res);
  return {
    props: { csrf_token: req.csrfToken() },
  };
}
