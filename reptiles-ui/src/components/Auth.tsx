import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if(tokenString != null) {
        const userToken = JSON.parse(tokenString);
        return userToken;
    } else {
        return undefined;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}