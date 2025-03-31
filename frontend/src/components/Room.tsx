import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Room = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userName = searchParams.get('fullName');

  useEffect(() => {}, [userName]);
  return (
    <>
      <div>
        <div>Room Page</div>
        <div>userName: {userName}</div>
      </div>
    </>
  );
};

export default Room;
