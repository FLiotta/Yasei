# Yasei [WIP]

Yasei is a social network made in the MERN stack.

![alt text](display.gif)

### Config

Create a "config.js" file on the server dir, it must contains the next:

```js
module.exports = {
    'MONGO_URI': MONGO_URI,
    'SECRET_KEY': PRIVATE KEY, IT WILL BE USED FOR OUR JWT's
}
```

### Start

Install all the dependencies on the client and the server folder, also in the main directory, so you can just ```npm start``` and it will start both concurrently.

### Demo

https://yaseisocial.herokuapp.com/
