import React, { useState, useEffect } from 'react';
import css from './style.scss';
import axios from 'axios';
import dayjs from 'dayjs';

import { Dashboard } from '../../layouts/Dashboard';
import { Table, Td, Tr, Th } from '../../components/Table';

export const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data: { data }} = await axios.get('/users');
      setUsers(data);
    }
    fetchUsers()
  }, []);

  return (
    <Dashboard>
      <h1>Lista użytkowników</h1>
      <Table className={css.users_table}>
        <thead>
          <tr>
            <Th>Id</Th>
            <Th>Email</Th>
            <Th>Grupa</Th>
            <Th>Utworzony</Th>
            <Th>Zaaktualizowany</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <Tr key={user.id} className={css.users_row}>
              <Td>{user.id}</Td>
              <Td>{user.email}</Td>
              <Td className={css.user_group}>
                {user.group}
              </Td>
              <Td>{dayjs(user.createdAt).fromNow()}</Td>
              <Td>{dayjs(user.updatedAt).fromNow()}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Dashboard>
  )
}