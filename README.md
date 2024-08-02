# Welcome to the Remix Template!

## Development

### Docker

To start the app (frontend and backend):

`docker-compose up`

To tear down the app

`docker-compose down`

To force a rebuild (for npm or requirements changes)

`docker-compose build`

### Frontend

Ensure all packages are installed by running:

```sh
npm install
```

Run

```sh
npm run dev
```

Local site: [http://localhost:5173](http://localhost:5173). Keyboard shortcut `o` + `enter` opens local site in browser.

## Deployment

### Site is deployed to Netlify when code is pushed to gitlab.

- master: Deploy Production: https://snyking.netlify.app
