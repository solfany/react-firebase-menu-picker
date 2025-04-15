import React from 'react';
import Layout from './pages/Layout';
import AppRoutes from './routes/AppRoutes';
import { VoteProvider } from './context/VoteProvider';
import Toast from './components/toast/Toast';

const App = () => {
  return (
    <VoteProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </VoteProvider>
  );
};

export default App;
