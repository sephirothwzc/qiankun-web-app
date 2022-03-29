import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

/**
 * 加载微应用
 * @param props
 */
function render(props: any) {
  const { container } = props;
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container ? container.querySelector('#root') : document.getElementById('root')
  );
}

renderWithQiankun({
  mount(props) {
    console.log('mount');
    render(props as any);
  },
  bootstrap() {
    console.log('bootstrap');
  },
  unmount(props: any) {
    console.log('unmount');
    const { container } = props;
    const mountRoot = container?.querySelector('#root');
    ReactDOM.unmountComponentAtNode(mountRoot || document.querySelector('#root'));
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('我正在作为独立应用运行');
  render(document.getElementById('root') as any);
}
