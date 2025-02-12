import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Tài khoản demo
  const ADMIN_ACCOUNTS = [
    {
      username: 'admin',
      password: '1',
      role: 'admin',
      fullName: 'Administrator'
    },
    {
      username: 'staff1',
      password: '1',
      role: 'staff',
      fullName: 'Staff Member 1'
    },
    {
      username: 'staff2',
      password: '1',
      role: 'staff',
      fullName: 'Staff Member 2'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = ADMIN_ACCOUNTS.find(
      account => account.username === formData.username && 
                account.password === formData.password
    );

    if (user) {
      // Lưu thông tin đăng nhập
      localStorage.setItem('adminUser', JSON.stringify({
        username: user.username,
        role: user.role,
        fullName: user.fullName
      }));
      
      // Chuyển hướng đến trang admin
      navigate('/admin');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="max-w-md w-full bg-slate-700 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">
          <div className="flex items-end justify-center gap-1">
            <div className="text-4xl font-bold text-white">SKYN</div>
            <div className="text-sm text-gray-400 mb-1">ADMIN</div>
          </div>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-slate-600 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 bg-slate-600 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {error && (
            <div className="text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;