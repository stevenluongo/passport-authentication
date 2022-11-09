import { FC } from 'react';
import { Modal } from './modal';
import { Navbar } from './navbar';

export const Layout: FC = ({ children }) => (
  <div className="layout">
    <Modal />
    <Navbar />
    {children}
  </div>
);
