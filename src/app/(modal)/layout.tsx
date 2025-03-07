import type { PropsWithChildren } from 'react';
import React from 'react';

const Layout: React.FC<PropsWithChildren<{ modal: React.ReactNode }>> = ({
  children,
  modal,
}) => {
  console.log('modal', !!modal);
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default Layout;
