# Todo App

Todo app using ReactJS and Firebase.

## Prerequisites

- [NodeJs v16.15.1](https://nodejs.org/en/blog/release/v16.15.1/)
- [yarn v1.22.18](https://github.com/yarnpkg/yarn/releases/tag/v1.22.18) If you want to use other package manager(npm or
  pnpm), Delete [yarn.lock](https://github.com/dluismendezpy/todo-firebase/blob/master/yarn.lock) file.

## Setup

**Clone repo**

    https://github.com/dluismendezpy/todo-firebase.git

**Install Dependencies**

    yarn install

**Add your firebase config values
at** [globalValues.js](https://github.com/dluismendezpy/todo-firebase/blob/master/src/globalValues.js)

Click [here](https://firebase.google.com/docs/firestore/quickstart#initialize) to get more info.

    const firebaseConfig = {
        apiKey: <FIREBASE_API_KEY>,
        authDomain: <FIREBASE_AUTH_DOMAIN>,
        projectId: <FIREBASE_PROJECT_ID>,
        storageBucket: <FIREBASE_STORAGE_BUCKET>,
        messagingSenderId: <FIREBASE_MESSAGING_SENDER_ID>,
        appId: <FIREBASE_APP_ID>,
    };

**Run project**

    yarn start

## Firestore database structure

- #### Projects collection

| Field | Type    |
|-------|---------|
| name  | string  |

- #### Todos collection

| Field       | Type    |
|-------------|---------|
| text        | string  |
| checked     | boolean |
| color       | string  |
| day         | string  |
| time        | string  |
| projectName | string  |
| date        | string  |

## Notes

This project is [Apache-2.0](https://github.com/dluismendezpy/todo-firebase/blob/master/LICENSE) licenced.
