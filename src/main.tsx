import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ConfigProvider } from 'antd';
import './GlobalStyle/style.css'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider direction='rtl' theme={{
    token:{
      //
    }
  }}>
    <RouterProvider router={router} />
  </ConfigProvider>,
)
