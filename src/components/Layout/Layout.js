import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  // console.log(props.data)
  const name=props.data;

  return (
    <>
      <Fragment>
      <MainNavigation data={name}  />
      <main>{props.children}</main>
    </Fragment>
    </>
  );
};

export default Layout;
