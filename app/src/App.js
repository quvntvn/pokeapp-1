import React, { useEffect, useState } from 'react';
import GameView from './views/GameView';
import LoginView from './views/LoginView';
import WelcomeView from './views/WelcomeView';
import ChooseView from './views/ChooseView';
import io from 'socket.io-client';

export default () => {
    const [name, setName] = useState();
    const [socket, setSocket] = useState();
    const [data, setData] = useState();
    const [status, setStatus] = useState('waiting'); // waiting playing terminated ended

    useEffect(() => {
        if (!name) {
            return;
        }

        setSocket(io(`http://localhost:3000?name=${name}`));
    }, [name]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('started', localData => {
            console.log(localData);
            setData(localData);
            setStatus('playing');
        });
    }, [socket]);

    return (
        <div className="c-app">
            {name && <GameView data={data} socket={socket} status={status} />}
            {!name && <LoginView setName={setName} />}
            {/* <WelcomeView /> */}
            {/* <ChooseView /> */}
        </div>
    );
};
