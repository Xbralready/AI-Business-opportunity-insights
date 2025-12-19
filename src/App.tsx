import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CustomerList from './pages/CustomerList';
import CustomerDetail from './pages/CustomerDetail';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/customers" replace />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<PlaceholderPage title="个人中心" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-500 mt-2">该模块正在开发中...</p>
      </div>
    </div>
  );
}

export default App;
