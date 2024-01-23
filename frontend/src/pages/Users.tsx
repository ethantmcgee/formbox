import React from 'react';
import AuthGuard from '../components/AuthGuard'
import ManageUsers from '../components/user/ManageUsers'

export default function Users() {
  return (
    <AuthGuard>
      <ManageUsers />
    </AuthGuard>
    );
}