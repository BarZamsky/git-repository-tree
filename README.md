<p align="center">
  Git Repository Tree
</p>

## Description

Allow users to retrieve a JSON object contains given repository file tree from github.

The response is in the following model:

```
{
    "owner": string,
    "repositoryName": string,
    "tree": [
        {
            "file": {
                "path": string,
                "mode": string,
                "type": string,
                "sha": string,
                "size": number,
                "url": string
            },
            "isDir": boolean,
            "tree"?: file[]
        }
      ]
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run with docker

run the following command in order to run the project on a docker container

```
$ sh run_me.sh
```

## Test

```bash
# unit tests
$ npm run test
```
