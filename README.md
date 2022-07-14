## Todo app using NextJS and MongoDB

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Deploy your own

Once you have access to the environment variables you'll need, deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-mongodb&project-name=with-mongodb&repository-name=with-mongodb&env=MONGODB_URI&envDescription=Required%20to%20connect%20the%20app%20with%20MongoDB)

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

#### UI 

Apparently, react-bootstrap and bootstrap-icons are good options for displaying icons and setting the basic styling for this particular project.

#### Challenges

The UI will not re-render if the component state does not change. In order to fix it, I tried to debug and log every single possible variables. It took me a couple of days due to a lack of knowledge in the backend, server, mongoose, mongodb terms and et cetera. Eventually, I found that I did not extract data correctly after `.then` chaining method. Some of the code I borrowed from a dated project but I want to use it with latast technologies and a newest version of UI library. So I mixed thigs up and made it worst for myself. To assist future junior devs, I would recommend you to stick with a few technologies at a time if it does not provide the tool you need, try to look on a place like `stackoverflow` or github repo discussion of a specific project or library. If still not succeed, give up that idea and find something else to do ASAP. Do not waste you time on just one little detail. Finish other tasks and by the time you are completing other tasks, it will come to your mind surprisingly out of nowhere. 