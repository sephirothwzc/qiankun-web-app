import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { BrowserRouter } from 'react-router-dom';

/**
 * 加载微应用
 * @param props
 */
function render(props: any) {
  const { container } = props;
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
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
    console.log(process.env.NODE_ENV);
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
  render({});
}
