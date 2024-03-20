# Micro-Service: Score

An example of micro-service to be used in cooperation with the [tic-tac-toe service](https://github.com/scalablebackend/tic-tac-toe-service).

It's made with [Express](https://expressjs.com) (and [TypeScript](https://www.typescriptlang.org)), and receives events through [kafka](https://kafka.apache.org). It uses an in-memory implementation as a database.

Its goal is to store the score of a won tic-tac-toe game, with the winner, final board, and date.

## Installation

- Install dependencies (recommended with `yarn`).
- Copy `.env.example` to `.env`.
- Start a kafka instance (available with `docker-compose` inside the [tic-tac-toe service](https://github.com/scalablebackend/tic-tac-toe-service)).
- Start the score service with `yarn dev`.
- Also, start the [tic-tac-toe service](https://github.com/scalablebackend/tic-tac-toe-service)

## Learn micro-services in-depth

If you want to learn how we use micro-services in the real world, feel free to have a look at:

- The theory behind micro-services ([free articles](https://blog.scalablebackend.com))
- How we create micro-services in a professional environment ([practical course](https://www.scalablebackend.com/courses/micro-services-in-practice-how-to-properly-split-a-monolith))

## Usage

- Win a game of tic-tac-toe from the [tic-tac-toe service](https://github.com/scalablebackend/tic-tac-toe-service), connected to the same kafka instance
- Send a GET request to `http://localhost:4001/score` to see the list of game won.