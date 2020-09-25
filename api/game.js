import pokemons from './pokemons';

export const startGame = (players, config) => {
    console.log('Game starting...');

    for (const player of players) {
        const index = Math.floor(Math.random() * pokemons.length);
        player.pokemon = { ...pokemons[index] };
    }

    config.turn = Math.floor(Math.random() * 2); // 0 1

    // for (let i = 0; i < players.length; i++)
    // [{ name, socket, pokemon }, { name, socket, pokemon }]
    // players.entries() => [[0, { name, socket, pokemon }], [1, { name, socket, pokemon }]]
    for (const [index, player] of players.entries()) {
        const { socket, ...you } = player;
        // const { socket: _, ...opponent} = players.find(localPlayer => localPlayer.socket.id !== player.socket.id);
        const { socket: toto, ...opponent} = players.find(localPlayer => {
            return localPlayer.socket.id !== player.socket.id;
        });

        player.socket.emit('started', {
            'you': you,
            you: you,
            you,
            'opponent': opponent,
            opponent: opponent,
            opponent,
            turn: index === config.turn ? 'you' : 'opponent',
        });
    }
};

export const terminateGame = (socket, players) => {
    console.log('Game terminating...');

    const index = players.findIndex(player => player.socket.id === socket.id);

    if (-1 !== index) {
        players.splice(index, 1);
    }

    // players[0].pokemon = null;

    for (const player of players) {
        player.pokemon = null;
        player.socket.emit('terminated');
    }
};

export const handleMove = (moveId, players, config) => {
    // console.log(`${activePlayer.name} with "${activePlayer.pokemon.name}" has played "${move.name}"`);
    // console.log(`${opponent.pokemon.name} (${opponent.pokemon.hp}hp) has taken ${move.power} damages`);

    // TODO
};

const updateGame = (moveId, players, config) => {
    // TODO
};

const endGame = players => {
    console.log('Game ending...');

    // TODO
};
