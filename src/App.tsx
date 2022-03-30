import { createElement, lazy, Suspense, useState } from 'react';
import styles from './App.module.less';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from './route';

const NavBar = lazy(() => import('./views/nav-bar'));
const Error404 = lazy(() => import('./components/error/404'));

function App() {
  return (
    <ConfigProvider csp={{ nonce: 'YourNonceCode' }} locale={zhCN}>
      <Routes>
        <Route
          path="/nav-bar"
          element={
            <Suspense
              fallback={
                <div className={styles.example}>
                  <Spin size="large" />
                </div>
              }
            >
              <NavBar />
            </Suspense>
          }
        ></Route>
        {routeConfig?.map?.((p) => (
          <Route
            key={p.name}
            path={p.path}
            element={
              <Suspense
                fallback={
                  <div className={styles.example}>
                    <Spin size="large" />
                  </div>
                }
              >
                {createElement(p.component)}
              </Suspense>
            }
          ></Route>
        ))}

        <Route
          path="*"
          element={
            <Suspense
              fallback={
                <div className={styles.example}>
                  <Spin size="large" />
                </div>
              }
            >
              <Error404 />
            </Suspense>
          }
        />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
