# Interview Scheduler

## Table Of Contents

- [Project Overview](#project-overview)
  - [Overview](#what-it-is)
  - [Technical Details](#technical-details)
  - [Features](#features)
- [Pictures](#pictures)
  - [Creating Interview](#creating-interview)
  - [Saving Interview](#saving)
  - [Save Error](#save-error)
  - [Main Page](#main-page)
  - [Editing Interview](#editing-interview)
  - [Deleting Interview](#deleting)
  - [Deleting Status](#deleting-status)
  - [Delete Error](#delete-error)
  - [Websockets Demo 1](#websockets-1)
  - [Websockets Demo 2](#websockets-2)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)

## Project Overview

# [Click Here to view Netlify/Heroku Deployment](https://zealous-chandrasekhar-b32d76.netlify.app/)

### What it is

A front end SPA react app for scheduling interviews

### Technical details

- React SPA
- This app is functionally complete (This doesnt mean its deployable)
- Use of promises for server requests
- Proficiant use of States and Reducers

## Features

- Interview Slots
  - View
  - Update
  - Create
  - Delete
- Day Selector
  - Shows Available spots
  - Shows days based on database response

## Pictures

---

### Creating Interview

> ![Creating Interview](/readmefiles/imgs/Creating.webp)

---

### Saving

> ![Saving Status](/readmefiles/imgs/Saving.gif)

---

### Save Error

> ![Save Error](/readmefiles/imgs/Save%20Error.webp)

---

### Main Page

> ![Main Page](/readmefiles/imgs/Scheduled.webp)

---

### Editing Interview

> ![Editing Interview](/readmefiles/imgs/Editing.webp)

---

### Deleting

> ![Deleting](/readmefiles/imgs/Deleting.webp)

---

### Deleting Status

> ![Deleting Status](/readmefiles/imgs/Deleting.gif)

---

### Delete Error

> ![Delete Error](/readmefiles/imgs/Delete%20Error.webp)

---

### WebSockets Demo 1

> ![WebSockets 1](/readmefiles/imgs/WebSockets1.gif)

---

### WebSockets Demo 2 (Shows spots being updated)

> ![WebSockets 2](/readmefiles/imgs/WebSockets2.gif)

---

## Getting Started

1. Clone the repo `git clone git@github.com:JoshuaOLoduca/lhl-scheduler-assignment.git`
2. Install dependencies: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. [Download API server and set it up](https://github.com/JoshuaOLoduca/scheduler-api)
5. Run the server: `npm start`

6. Visit `http://localhost:8000/`

## Dependencies

- Required
  - [Node 15.14 (DOESNT ON NODE 16)](https://nodejs.org/en/)
  - [React 16.9.0](https://www.npmjs.com/package/react)
    - [React-DOM 16.9.0](https://www.npmjs.com/package/react-dom)
    - [React-scripts 3.0.0](https://www.npmjs.com/package/react-scripts)
  - [classnames 2.2.6 or Above](https://www.npmjs.com/package/classnames)
  - [axios 0.26.0 or above](https://www.npmjs.com/package/axios)
  - [normalize.css 8.0.1 or above](https://www.npmjs.com/package/normalize.css)
- Dev
  - [babel-loader 8.0.5 Or Above](https://www.npmjs.com/package/babel-loader)
    - [@babel/core 7.4.3 Or Above](https://www.npmjs.com/package/@babel/core)
  - [@storybook/react 5.0.10 Or Above](https://www.npmjs.com/package/@storybook/react)
    - [@storybook/addon-actions 5.0.10 Or Above](https://www.npmjs.com/package/@storybook/addon-actions)
    - [@storybook/addon-backgrounds 5.0.10 Or Above](https://www.npmjs.com/package/@storybook/addon-backgrounds)
    - [@storybook/addon-links 5.0.10 Or Above](https://www.npmjs.com/package/@storybook/addon-links)
    - [@storybook/addons 5.0.10 Or Above](https://www.npmjs.com/package/@storybook/addons)
  - [@testing-library/react 8.0.7 Or Above](https://www.npmjs.com/package/@testing-library/react)
  - [@testing-library/react-hooks 7.0.2 Or Above](https://www.npmjs.com/package/@testing-library/react-hooks)
  - [@testing-library/jest-dom 4.0.0 Or Above](https://www.npmjs.com/package/@testing-library/jest-dom)
  - [cypress 9.5.1 Or Above](https://www.npmjs.com/package/cypress)
  - [node-sass 4.14.0 Or Above](https://www.npmjs.com/package/node-sass)
  - [prop-types 15.8.1 Or Above](https://www.npmjs.com/package/prop-types)
  - [react-test-renderer 16.9.0 Or Above](https://www.npmjs.com/package/react-test-renderer)
