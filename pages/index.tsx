import Head from 'next/head';
import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '../components/button';
import { Body, Header, SubHeader } from '../components/headers';
import { useGlobalContext } from '../context/globalContext';

const Landing: FC = () => {
  const headerRef = React.useRef<HTMLHeadingElement>(null);
  const subheaderRef = React.useRef<HTMLHeadingElement>(null);
  const bodyRef = React.useRef<HTMLParagraphElement>(null);
  const buttonRef = React.useRef<HTMLDivElement>(null);

  const { user } = useGlobalContext();

  const [transition, setTransition] = React.useState<{
    primary: boolean;
    secondary?: boolean;
  }>({ primary: false, secondary: false });

  React.useEffect(() => {
    setTimeout(() => {
      setTransition({ primary: true });
    }, 100);
    setTimeout(() => {
      setTransition({ primary: true, secondary: true });
    }, 500);
  }, [user]);

  return (
    <div className="landing">
      <Head>
        <title>Home | Passport Authentication</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CSSTransition
        in={transition.primary}
        nodeRef={headerRef}
        timeout={3000}
        classNames="header-transition"
      >
        <Header ref={headerRef} />
      </CSSTransition>
      <CSSTransition
        in={transition.primary}
        nodeRef={subheaderRef}
        timeout={3000}
        classNames="subheader-transition"
      >
        <SubHeader ref={subheaderRef} />
      </CSSTransition>
      <CSSTransition
        in={transition.secondary}
        nodeRef={bodyRef}
        timeout={3000}
        classNames="body-transition"
      >
        <Body ref={bodyRef} />
      </CSSTransition>
      <CSSTransition
        in={transition.secondary}
        nodeRef={buttonRef}
        timeout={3000}
        classNames="button-transition"
      >
        <Button ref={buttonRef} />
      </CSSTransition>
    </div>
  );
};

export default Landing;
