import Navbar from "../Navbar";
import AuthModal from "../AuthModal";

function Layout({ children }) {
  return (
    <div className="layout">
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
