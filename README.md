# UF Scheduler

A small project to help you visually understand how your classes line up with each other, time-wise.

## Getting started via Docker

This project contains Docker configuration files to help developers get their environment setup easily.

Assuming you have the proper Docker installation, execute the following command to start the development server.

```sh
$ docker-compose up -d
```

The `-d` option detaches the active terminal from the output of the containers. You may leave it out if you do not want this behavior.

The project will be available at the URL `http://scheduler.localhost`. If you cannot connect, please verify your browser supports virtual hosts on `localhost`.

Verified browsers include:
- Google Chrome
- Mozilla Firefox (add'l configuration required)
- Microsoft Edge
- Microsoft Edge Legacy (add'l configuration required)

## Commands available inside `ui` container

### Standard npm commands

```sh
$ npm install
$ npm update

...etc
```

### Compiles and minifies for production

```sh
$ npm run build
```

### Run your unit tests

```sh
$ npm run test:unit
```

### Run your end-to-end tests

```sh
$ npm run test:e2e
```

### Lints and fixes files

```sh
$ npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
