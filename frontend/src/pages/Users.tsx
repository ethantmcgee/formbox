import React from 'react';
import AuthGuard from '../components/AuthGuard'

export default function Users() {
  return (
    <AuthGuard>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold underline">
          Users
        </h1>
      </div>
    </AuthGuard>
    );
}