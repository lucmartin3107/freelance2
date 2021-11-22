cmd
yarn init

yarn add express yup config cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid

npm install ts-node
npx tsc --init

{
    "restartable": "rs",
    "ignore": [".git", "node_modules/","dist/", "coverage/"],
    "watch": ["src/"],
    "execMap": {
        "ts": "node -r ts-node/register"
    },
    "env": {
        "NODE_ENV": "development"
    },
    "ext": "js, json, ts"

}