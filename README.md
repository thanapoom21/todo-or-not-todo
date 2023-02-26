## Simple apps using NextJS and MongoDB

While the Bootstrap CSS can be used with any framework, the Bootstrap JavaScript is not fully compatible with JavaScript frameworks like React, Vue, and Angular which assume full knowledge of the DOM. Both Bootstrap and the framework may attempt to mutate the same DOM element, resulting in bugs like dropdowns that are stuck in the “open” position. `.active` is not automatically added when implementing scrollspy. I assumed that it has something to do with the lack of bootstrap.js file since it is not fully compatible with UI framework like React.

[NextJS](https://nextjs.org/) is a flexible React framework that will help you create a web application in no time. However, you have to be patient with it if you do not have some experience with any framework before. It will be confusing at first but you'll get better when you learn more about it.

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app. Mongoose is installed in this repo to help with Schema and Models of the database. First of all, you're gonna need to know the difference of database, collection, and document, how to connect to a certain project and database, how mongoose know which collection to use, how Schema works, and many more. Then how can you GET, POST, PUT or edit, DELETE data on the database with CRUD operations

[Mongoose](https://mongoosejs.com/) provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.

## Deployment

Once you have access to the environment variables you'll need, deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-mongodb&project-name=with-mongodb&repository-name=with-mongodb&env=MONGODB_URI&envDescription=Required%20to%20connect%20the%20app%20with%20MongoDB)

## Configuration

To build this image from Dockerfile, I use a template provided by one of the NextJS examples. They created multi-stage builds which help eliminate potential errors that might occur in the process of building and avoid leaking sensitive information. Also, we can use a bigger Docker base image to install our necessary dependencies, compile any native npm packages if needed, most importantly duplicate those artifacts into a small production base image.

### Set up environment variables

create `.env.local` (which will be ignored by Git):

This repo uses the MongoDB's native drivers to connect the app to Mongo cluster.

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<projectname>.2cspo.mongodb.net/<databasename>?retryWrites=true&w=majority
```

#### To build an image with Dockerfile

Build docker image from Dockerfile in this repo. Tag name can be changed and `--build-arg` is only for initial container creation.

```bash
docker build -t name-of-the-image-you-wanna-use --build-arg "MONGODB_URI=mongodb+srv://<username>:<password>@<projectname>.2cspo.mongodb.net/<databasename>?retryWrites=true&w=majority" .
```

#### To run this repo on Docker container

I'd recommend wrap the environment name and value in quotes and don't forget to replace (`<username>`, `<password>`, `<projectname>`, `<databasename>`) to match your values. 

```base
docker run -dp 3333:3000 name-of-the-image-you-wanna-use
```

> If --build-arg is not specified, 500 server error might occur when buiding a docker image.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

### Build Next.js for production

```bash
npm run build
npm start

# or

yarn build
yarn start
```

### UI

Apparently, [React-Bootstrap](https://react-bootstrap.github.io/) & [Bootstrap-Icons](https://icons.getbootstrap.com/) are good options for displaying icons and styling your particular project. Bootstrap has a big community and has been helping many designers & developers for such a long time. There are many options out there that you can use & implement with your projects. So choose wisely and read the documentation thoroughly.

### Formatting & Linting

Obviously, Prettier & ESLint are the best options as of today. However, the configuration is key and it can be a mess if you do not configure it well enough.

#### Starting from `order of precedence`

- A "prettier" key in your package.json file.
- A .prettierrc file written in JSON or YAML.
- A .prettierrc.json, .prettierrc.yml, .prettierrc.yaml, or .prettierrc.json5 file.
- A .prettierrc.js, .prettierrc.cjs, prettier.config.js, or prettier.config.cjs file that exports an object using module.exports.
- A .prettierrc.toml file.

### Challenges

The UI will not re-render if the component state does not change. In order to fix it, I tried to debug and log every single possible variables. It took me a couple of days due to a lack of knowledge in the backend, server, mongoose, mongodb terms and et cetera.

Eventually, I found that I did not extract data correctly after `.then` chaining method. Some of the code I borrowed from a outdated project but I want to use it with latast technologies and a newest version of UI library. So I mixed thigs up and made it worst for myself. To assist future junior devs, I would recommend you to stick with a few technologies at a time if it does not provide the tool you need, try to look on a place like `stackoverflow` or `github` repo discussion of a specific project or library. If still not succeed, give up that idea and find something else to do ASAP. Do not waste you time on just one little detail. Finish other tasks and by the time you are completing a task or a project, it will come to your mind surprisingly out of nowhere.

Sometimes, I forgot to and a set of parentheses after `.json`. Also, I accidentally used curly braces without an explicit return keyword to render a component and I didn't know why nothing showed up on the screen. There was no errors whatsoever so I decided to remove the code that map over an array and here we go I found the culprit. It's the braces.

Promise with async & await could be the culprit some time if you forget to add the keywords.

### Questions & Answers

1. How can I update the running container without killing it?
2. Is multi-stage build necessary for most projects?
3. For personal project or app, would you recommend using Bind Mount to Volume?
4. Can I build an app that has multiple services without using docker-compose?
5. Why do we need CMD instruction at the end of the Dockerfile?
6. Is USER instruction necessary in every node application?
