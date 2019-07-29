import React, { useState, useEffect } from 'react';
import css from './style.scss';
import axios from 'axios';
import dayjs from 'dayjs';
import { usePermissionCheck } from '../../common/hooks';
import { debounce } from '../../common/utils';
import { Helmet } from 'react-helmet';

import { Table, Td, Tr, Th } from '../../components/Table';
import { BasicInput } from '../../components/BasicInput';
import { Heading } from '../../components/Heading';
import { ListPlaceholder } from '../../components/Placeholders';

export const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const canEditPoints = usePermissionCheck('admin');

  useEffect(() => {
    async function fetchUsers() {
      const { data: { data }} = await axios('/users');
      setUsers(data);
      setIsLoading(false);
    }
    fetchUsers();
  }, []);


  function handleUserPointsUpdate(points, userId) {
    if (points >= 1000) points = 999;
    if (points < 0) points = 0;

    setUsers(users => 
      users.map(user => user.id === userId
        ?  { ...user, points }
        : user
      )
    );

    debounce(() => axios.patch(`/users/${userId}`, { points }));
  }

  return (
    <>
      <Helmet>
        <title>Użytkownicy</title>
      </Helmet>
      <Heading
        title="Użytkownicy"
      />
      <Table className={css.users_table}>
        <thead>
          <tr>
            <Th>Id</Th>
            <Th>Email</Th>
            <Th>Grupa</Th>
            <Th>Punkty</Th>
            <Th>Polubione karty</Th>
            <Th>Aktualizacja</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Tr>
              <td colSpan={6}>
                <ListPlaceholder length={6} />
              </td>
            </Tr>
          ) : users.map(user => (
            <Tr key={user.id} className={css.users_row}>
              <Td>{user.id}</Td>
              <Td>{user.email}</Td>
              <Td className={css.user_group}>
                {user.group}
              </Td>
              <Td>
                {canEditPoints ? (
                  <BasicInput
                    type="number"
                    align="center"
                    value={user.points}
                    placeholder="Punkty"
                    onChange={(e) => handleUserPointsUpdate(
                      Number(e.target.value),
                      user.id
                    )}
                  />
                ) : user.points}
              </Td>
              <Td>{user.cardsCount}</Td>
              <Td>{dayjs(user.updatedAt).format('HH:mm MM/D')}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}