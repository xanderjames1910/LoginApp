import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const FETCH_DAILY_DATA_QUERY = gql`
  {
    getDataDiaria {
      id
      COMPLETAMIENTO
      FECHA
      PD_PETROLEO
      PD_GAS
      PD_AGUA
    }
  }
`;

export const FETCH_USERS_DATA_QUERY = gql`
  {
    getUsers {
      id
      nombre
      cedula
      telefono
      username
      email
      genero
      perfil
      direccion
    }
  }
`;
