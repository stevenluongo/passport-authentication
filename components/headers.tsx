import React from 'react';
import { useGlobalContext } from '../context/globalContext';

export const Header = React.forwardRef<HTMLHeadingElement>((props, ref) => {
  const { user } = useGlobalContext();
  return (
    <h1 ref={ref} className="landing__header">
      {user ? 'Welcome Back, ' : 'Passport'}
    </h1>
  );
});

export const SubHeader = React.forwardRef<HTMLHeadingElement>((props, ref) => {
  const { user } = useGlobalContext();
  return (
    <h1 ref={ref} className="landing__subheader">
      {user
        ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
        : 'Authentication'}
    </h1>
  );
});

export const Body = React.forwardRef<HTMLParagraphElement>((props, ref) => {
  const { user } = useGlobalContext();

  return (
    !user && (
      <p ref={ref} className="landing__body">
        Cloud-based authentication system built with a clean-architecture
        approach, abstracting away frameworks and persistence methods.
      </p>
    )
  );
});

Header.displayName = 'Header';
SubHeader.displayName = 'Subheader';
Body.displayName = 'Body';
