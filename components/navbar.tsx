import Link from 'next/link';
import { FC } from 'react';
import { useGlobalContext } from '../context/globalContext';

export const Navbar: FC = () => {
  const { setModalOpen } = useGlobalContext();
  const onClickHandler = () => {
    setModalOpen(true);
  };
  return (
    <nav className="navbar">
      <Link href="/">
        <h1 className="navbar__brand">JUXTA</h1>
      </Link>
      <span className="navbar__left">
        <p onClick={onClickHandler}>Log In</p>
        <Link href="/register">
          <p>Sign Up</p>
        </Link>
      </span>
    </nav>
  );
};
