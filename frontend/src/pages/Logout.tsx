import React from 'react';
import AuthGuard from '../components/AuthGuard'

export default function App() {
  return (
    <AuthGuard>
      <h1 className="text-3xl font-bold underline">
        Logout
      </h1>
    </AuthGuard>
    );
}