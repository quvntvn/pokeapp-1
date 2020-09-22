# PokeApp 

## Intro (pour s'échauffer...) :man_cartwheeling:

### Récupérer le nom de l’utilisateur

- Pour l’envoyer, ajouter `?name=quentin` lors de la connexion au serveur dans `index.html` (client)
- Pour le récupérer, utiliser `socket.handshake.query.name` dans `index.js` (serveur) 
- Changer dans les `console.log()`, `someone` par le nom récupéré
- Rendre le nom aléatoire (côté client) pour qu’il ait la forme : `quentin-32929`

```js
Math.random(); // Nombre flottant [0,1[
Math.floor(number); // Pour tronquer à l'entier inférieur
```

### Sauvegarder les joueurs connectés

- Créer une variable globale : `const players = [];`. Elle servira à stocker les joueurs. A chaque nouvelle connexion, ajouter un objet représentant un joueur de la forme : `{ name, socket, pokemon: null }`.
- Empêcher à un 3e joueur de se connecter, lui envoyer un message “connexion refusée” et fermer sa connexion

### Préparation du jeu

- Créer une variable globale : `const config = { turn: 0 };` qui servira à déterminer l’index du joueur qui joue

_On fait un petit commit ici !_

## Le jeu :joystick:

- Créer un fichier `game.js`
- Ajouter à l'intérieur :

```js
import pokemons from './pokemons';

export const startGame = (players, config) => {
    console.log('Game starting...');

    // TODO
};

export const terminateGame = (socket, players) => {
    console.log('Game terminating...');

    // TODO
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
```

- Importer les fonctions exportées dans `index.js` : 

```js
import { startGame, terminateGame, handleMove } from './game';
```

- Appeler `startGame` au bon moment (quand le jeu doit démarrer...)
- Vérifier que le message "Game starting..." est bien en console lorsque deux joueurs sont connectés

### Coder la fonction `startGame`

- Attribuer à chaque joueur un pokémon (dans un `for`)
- Décider aléatoirement du premier joueur (set `config.turn` à 0 ou 1)
- Émettre un événement `started` à chaque joueur (dans un autre `for`) contenant un objet de la forme :

```js
{
    you: { name, pokemon },
    opponent: { name, pokemon },
    turn: i === config.turn ? 'you' : 'opponent',
}
```

- Vérifier que ça loggue bien dans la console de votre navigateur

### Coder la fonction `terminateGame`

_Fonction appelée si un joueur se déco avant la fin normale du jeu._

- Utiliser la socket passée en paramètre (il s'agit de celle du joueur qui s'est déconnecté) pour supprimer le joueur du tableau des joueurs (pour trouver le joueur à supprimer vous pouvez comparer avec `socket.id`)
- Remettre à `null` le pokémon du joueur restant
- Émettre un événement `terminated` au joueur restant
- Vérifier que ça loggue bien dans la console de votre navigateur

### Coder la fonction `handleMove`

- Déterminer qui est le joueur actif en fonction de `config.turn`
- Déterminer qui est l'adversaire de la même manière
- Récupérer l'action effectuée grâce au `moveId` passé en paramètre
- Décommenter les `console.log()`
- Baisser les hp du pokémon adverse
    - Si la partie est finie, appeler `endGame(players)`
    - Sinon appeler `updateGame(moveId, players, config)`

### Coder la fonction `updateGame`

- Mettre à jour `config.turn` pour que ce soit à l'adversaire de jouer
- Émettre un événement `moved` à chaque joueur (dans un `for`) contenant un objet de la forme :

```js
{
    you: { name, pokemon },
    opponent: { name, pokemon },
    movedId,
    turn: i === config.turn ? 'you' : 'opponent',
}
```

- Vérifier que ça loggue bien dans la console de votre navigateur

### Coder la fonction `endGame`

- Déterminer le gagnant et le perdant
- Émettre un événement `ended` à chaque joueur (dans un `for`) contenant un objet de la forme : 

```js
{
    you: { name, pokemon },
    opponent: { name, pokemon },
    win: i === winnerIndex,
}
```

## Bonus :unicorn:

1. Permettre aux joueurs de sélectionner un pokémon parmi 3 choix plutôt que de leur en imposer un aléatoirement
2. Récupérer les pokémons depuis l'API https://pokeapi.co/ (tout en anglais dans un 1er temps, puis me demander pour comment les avoir en français)

Puis si vous en voulez encore, au choix :
- Améliorer la mécanique de combat (à vous d'être créatif)
- Gérer le classement (vous pouvez utiliser Sequelize + sqlite pour ça)
