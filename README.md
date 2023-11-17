# Fact Checker Frontend Documentation

**IMPORTANT:** For the Clean Code Contribution please refer to src/pages/scores. This feature contains a better atomic commit history, tests and cleaner code and should be regarded as the contribution to the assessment.

**Table of Contents**

- [Setup](craftdocs://open?blockId=DDD6FD0A-A264-4611-A992-612389F75C73&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Glossary](craftdocs://open?blockId=5FD3F794-9B4B-4C19-AC1C-3A49BD43078E&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Introduction](craftdocs://open?blockId=21B98BAC-F478-44B2-B3C0-170B1F996815&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Infrastructure](craftdocs://open?blockId=5A639987-829D-4686-B087-DF50758C8FC3&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Roles](craftdocs://open?blockId=B17987A4-66B8-477F-9971-DE410A2599E2&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Pages](craftdocs://open?blockId=B293E7A2-41FF-4BC1-B633-EAAA5F09FEEE&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Folder Structure](craftdocs://open?blockId=89BDCD57-B3AB-4E01-90C2-801F96749F60&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)

## Setup

Prerequisites:

- [Node](https://nodejs.org/en) Installed on system
- Backend Installed on System

Installation

Create File **.env.local** and add this line:

```javascript
NEXT_PUBLIC_API_URL = "http://localhost:3005";
```

Install All Packages by executing this command inside the project directory:

```dart
npm i
```

Start Development Server

```dart
npm run dev
```

Then visit the url `http://localhost:3005`

## Glossary

| **Term**  | **Meaning**                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| Claim     | Information that can be either true or false                                                                              |
| Statement | Commentary on a claim where a user can state their opinion wether a claim is true or false                                |
| Comment   | Same Meaning as Statement                                                                                                 |
| Source    | Information that gives the Claim/Statement/Comment context, referring to where the user has received the information from |

## Introduction

The Fact Checker Web App provides users a platform to find the validity of claims/supposed facts made all around the internet. Users are able to look at Trending claims and are able to see the the answers of other users, and their statements, of why the claim might be false or true.

## Infrastructure

Programming Language: **Typescript (Transpiled to Javascript)** Framework: **NextJS** Linting: **ESLint**

Notable Libraries:

- Tailwind for Styling
- Fontawesome for Icons
- Cypress for End-to-End Testing
- React Testing Library for Testing
- Jest for Testing

## Roles

All Roles also have permissions from roles above.

| **Role**  | **Description**                                                               | **Permissions**                                                                      |
| --------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Anonymous | Anynomous user that doesn't have a role                                       | View Limited Nr. of Pages; Login/Register;                                           |
| User      | User that is logged in and has a valid JWT token stored in a http-only cookie | Create Claims and Statements; View Profile Pages; View Claims Created by Themselves; |
| Admin     | Typically only one admin                                                      | Delete other users Claims and Statements; Delete other users;                        |

## Pages

| **Route**                     | **Description**                                                                                                                | **Required Role** |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| /                             | Shows all verified claims by all Users                                                                                         | \-                |
| /requests                     | Shows all Claims that user which is logged in has submitted                                                                    | User              |
| /create-claim                 | Lets user create a claim themselves                                                                                            | User              |
| /profile                      | Gives user options to change their avatar, biography and password and request account deletion                                 | User              |
| /login                        | Lets Users Login                                                                                                               | \-                |
| /register                     | Lets Users Register                                                                                                            | \-                |
| /logout                       | Lets Users Logout                                                                                                              | User              |
| /view-single-claim/[claim Id] | Page for Viewing a claim and all statements made on it                                                                         | \-                |
| /scores/[user Id]             | Page for Viewing a users contributions, scores, name, avatar and date of joining;<br>Provides ability to send message to user; | User              |

## Folder Structure

![Image.png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/B85592C0-D78F-4580-B2A8-DCA6A1A8AC60/5839BDCF-93FE-4C1F-B40D-0DA72BC22E84_2/UItvgCllJ6gaXMWieNgFSWBO6utU4A6WyzPPRLWhY1Uz/Image.png)

| **Folder** | **Contents**                         |
| ---------- | ------------------------------------ |
| assets     | Constants                            |
| components | React Components                     |
| helpers    | Various Helper Functions             |
| hooks      | Custom Hooks for Data Fetching       |
| pages      | Pages and NextJS Proprietary Widgets |
| state      | Context for State Management         |
| styles     | Style Sheets                         |
| types      | Interfaces for Typing                |
| utils      | Various Utility Functions            |
