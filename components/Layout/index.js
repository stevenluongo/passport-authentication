import Navbar from '../Navbar';
import { options } from './data';
import Particles from 'react-tsparticles';
import AuthModal from '../AuthModal';

function Layout({ children }) {
  return (
    <div className="layout">
      <Particles
        options={options}
        id="tsparticles"
        width="100vw"
        height="100vh"
      />
      <div className="layout_content_wrapper">
        <div className="layout_content">
          <Navbar />
          <AuthModal />
          <div className="layout_body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
