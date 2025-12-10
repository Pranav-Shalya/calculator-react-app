# React Scientific Calculator

A fully responsive, themeable scientific calculator built with **Create React App** and deployed on **Vercel**.  
It supports basic arithmetic, scientific functions, memory operations, keyboard input, calculation history, and light/dark themes.

## Live Demo

- Production: https://calculator-react-app-self.vercel.app/
- Main branch preview: https://calculator-react-app-git-main-pranav-shalyas-projects.vercel.app/
- Older preview: https://calculator-react-1v9o9y7b0-pranav-shalyas-projects.vercel.app/

## Features

- Basic operations: addition, subtraction, multiplication, division
- Scientific mode: square root, square, percentage, reciprocal, power
- Memory operations: MC, MR, M+, M−
- Calculation history with click‑to‑recall results
- Keyboard support for digits, operators, Enter, Escape, and clear
- Light/Dark theme toggle
- Responsive design suitable for desktop and mobile

## Screenshots

### Basic Layout

![Calculator basic view](image-1.jpg)

### Scientific Mode

![Calculator scientific mode](image-2.jpg)

### History Panel

![Calculator history panel](image-3.jpg)

## Tech Stack

- React (Create React App)
- CSS for styling and responsiveness
- Vercel for deployment and hosting

## Getting Started

Install dependencies
npm install

Run development server
npm start

The app will be available at `http://localhost:3000`.

## Build and Deploy

Create production build
npm run build


The `build` folder can be deployed to any static hosting provider.  
This project is currently deployed using Vercel; you can import the GitHub repository into Vercel and connect a project to enable automatic deployments on every push.

## Project Structure

- `src/App.js` – main calculator logic and UI
- `src/App.css` – styling, themes, responsive layout

## Possible Improvements

- Add support for parentheses and more advanced expressions
- Add unit tests for calculator operations
- Internationalization and different number formats
