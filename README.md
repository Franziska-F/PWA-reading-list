# a readingList

## Description

The readingList is a simple progressive web app to help you to remember what you want to read next and to keep track of all the wonderfull books you have read.

It is a fullstack application, built with React and Next.js, written in JavaScript and TypeScript. The application is mobile first and styled with Tailwind CSS.

## Features

- Registration and log in
- Passwords are stored as hash
- Session tokens,
- Book search, using google books API
- Dynamic generated pages
- A reading List
- A list for books you have read
- Secure API routes

## Possible Features

- Sending a book to a friend
- Show the latest search requests
- Show bestsellers

## Technologies

- Next.js
- React
- TypeScript
- JavaScript
- PostgreSQL
- Tailwind CSS

## Libarys

## Resources

Wireframe on Figma: https://www.figma.com/file/SYfXvT5mK4BuG1Fpm3gLbX/Reading-List?node-id=0%3A1

## Setup instructions

- Clone the repository with `git clone <repo>`
- Setup the database by downloading and installing PostgreSQL
- Create a user and a database
- Create a new file `.env`
- Copy the environment variables from `.env-example` into `.env`
- Replace the placeholders xxxxx with your username, password and name of database
- Install dotenv-cli with `yarn add dotenv-cli`
- Run `yarn install` in your command line
- Run the migrations with `yarn migrate up`
- Start the server by running `yarn dev`
