import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { AuthContext } from '../context/AuthContext';
import { signup } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

const SignUpPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
      bio: formData.get('bio') || '',
      profileImageUrl: formData.get('profileImageUrl') || '',
    };

    try {
      const response = await signup(data);
      login({ userId: response.userId }, response.token);
      
      navigate('/');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {error && <Message type="error" message={error} />}
          <AuthForm type="signup" onSubmit={handleSubmit} error={null} loading={loading} />
        </>
      )}
    </div>
  );
};

export default SignUpPage;