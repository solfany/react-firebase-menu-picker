import React from 'react';
import Layout from './pages/Layout';
import AppRoutes from './routes/AppRoutes';
import { VoteProvider } from './context/VoteProvider';
import { ToastProvider } from './context/ToastProvider';
import DefaultToast from './components/toast/DefaultToast/DefaultToast';

const App = () => {
  return (
    <VoteProvider>
      <ToastProvider>
        <Layout>
          <AppRoutes />
          <DefaultToast />
        </Layout>
      </ToastProvider>
    </VoteProvider>
  );
};

export default App;
