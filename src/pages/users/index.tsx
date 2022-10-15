import React from 'react';
import InitialProps from '@helpers/initial-props';
import type { SSRComponent } from '@interfaces/ssr-component';
import type { StoreProps } from './index.stores';
import stores from './index.stores';

type IUsers = StoreProps;

const Users: SSRComponent<IUsers> = ({ usersStore: { users } }) => (
  <div style={{ fontSize: '2rem' }}>
    <h1>Users</h1>
    <a href="https://jsonplaceholder.typicode.com/users" target="_blank">
      https://jsonplaceholder.typicode.com/users
    </a>

    <ul>
      {users?.map(({ name, phone, email, company, id }) => (
        <li key={id} style={{ fontSize: '2rem' }}>
          <h2>{name}</h2>
          <p>{phone}</p>
          <p>{email}</p>
          <p>{company.name}</p>
        </li>
      ))}
    </ul>
  </div>
);

Users.getInitialProps = InitialProps(async ({ usersStore: { getUsers } }) => {
  await getUsers();
}, stores);

export default Users;
