# deploy-cc
Provisionning server for Clever Cloud

🚧 ⚠️ use with caution | deployment of this application could be longer than usual

## What

This is a kind of REST server for provisionning (and more) applications and addons on Clever Cloud with a simple http operation, eg:

```bash
curl -H "Content-Type: application/json" -H "Token: yopyop" -X POST -d '{"shell": "clever addon create redis-addon yoaddon -p s -o wey-yu  -y"}' http://deploy-cc.cleverapps.io/api/deploy
```

It could be useful with your CI server (eg, in a Jenkinsfile to provision a VM from a feature branch, etc...)

## Setup

- you need to install the [Clever CLI](https://github.com/CleverCloud/clever-tools) on your laptop/desktop to get your credentials
- clone this repository and deploy it to Clever-Cloud (see documentation):
  - run-time: NodeJS
  - Environment variables:
    - `DEPLOY_TOKEN=<here-define-a-token>` (whatever you want, it's about security)
    - `CC_TOKEN=<the-clever-token>`
    - `CC_SECRET=<the-clever-secret>`

### Where to find token and secret

Once you have installed the [Clever CLI](https://github.com/CleverCloud/clever-tools), you can find a file `~/.config/clever-cloud` with these informations


## Samples

### Create a nodejs application

```bash
curl -H "Content-Type: application/json" -H "Token: yopyop" -X POST -d '{"shell": "clever create -t node mykillerapp -o wey-yu -a mykillerapp"}' http://deploy-cc.cleverapps.io/api/deploy
```