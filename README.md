# Todo App

Todo app using ReactJS and Firebase.

## Setup

**Clone repo**

    https://github.com/dluismendezpy/todo-firebase.git

**Install Dependencies**

    yarn install

**Override and add your firebase config values
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

## Important look at this

- **This app was build using:**
  - [NodeJs v16.15.1](https://nodejs.org/en/blog/release/v16.15.1/)
  - [yarn v1.22.18](https://github.com/yarnpkg/yarn/releases/tag/v1.22.18) If you want to use other package manager(npm or
    pnpm), Delete [yarn.lock](https://github.com/dluismendezpy/todo-firebase/blob/master/yarn.lock) file.

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

## Examples
![Example2](./src/assets/images/MD/example2.png)
![Example1](./src/assets/images/MD/example1.png)
![Example3](./src/assets/images/MD/example3.png)

## Notes

- This project is [Apache-2.0](https://github.com/dluismendezpy/todo-firebase/blob/master/LICENSE) licenced.
- This project is inspired by CodeExplained TodoProj.
- This app isn't using env variables for testing purposes.
- Check [package.json/scripts](https://github.com/dluismendezpy/todo-firebase/blob/master/package.json#L25) to see eslint and prettier shortcuts commands.
