import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import axios from '../axios';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '', // Changed to identifier instead of email
    password: '',
  });

  const { identifier, password } = formData; // Changed from email to identifier
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const { login } = useAuthStore();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await axios.post('/auth/login', formData); 
      login(res.data);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
    finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="identifier">Email or Username</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlineMail className="text-gray-600 mr-2" />
            <input
              type="text"
              name="identifier"
              value={identifier}
              onChange={onChange}
              required
              className="w-full outline-none"
              placeholder="Enter your email or username"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlineLock className="text-gray-600 mr-2" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="w-full outline-none"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-300 font-bold text-blue-800 border-2 border-blue-800 py-2 rounded-md hover:bg-blue-400 transition duration-200">
          {loading ? 'Loging in...' : 'Login'}
        </button>
        <p className="pt-5">
          <Link to="/forgotpass" className='text-blue-600 hover:text-blue-400 underline '>Forgot Password ?</Link>
        </p>
        <p className="ml-7 lg:ml-9 xl:ml-9 mt-5 ">
          Not registered yet?{" "}
          <a
            onClick={() => navigate("/signup")}
            className="text-blue-700 hover:underline hover:text-green-700 "
          >
            signup{" "}
          </a>
          here.
        </p>
      </form>
    </div>
  );
};

export default Login;
