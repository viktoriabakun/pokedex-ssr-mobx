import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@components/footer';
import Header from '@components/header';
import type { SSRLayoutComponent } from '@interfaces/ssr-component';

const Common: SSRLayoutComponent = () => (
  <div className="appContainer">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Common;
