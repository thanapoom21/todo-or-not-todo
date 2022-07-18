import Head from 'next/head';
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';

export default function Home({  }) {
  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className='grid'>
          <h1 className='title'>
            Welcome to Play Area
          </h1>

          {/* {isConnected ? (
            <h2 className='subtitle'>You are connected to MongoDB</h2>
          ) : (
            <h2 className='subtitle'>
              You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
              for instructions.
            </h2>
          )} */}
        </div>

        <div className='grid'>
          <Link href='/todo' passHref>
            <a className='card'>
              <h3>Todo App &rarr;</h3>
              <p>
                Just a simple todo app with toggling, adding, and removing features.
              </p>
            </a>
          </Link>
          <Link href='/pokemon-list' passHref>
            <a className='card'>
              <h3>PokemonList App &rarr;</h3>
              <p>
                Just a simple Pokemon app that shows its name, type and cute image.
              </p>
            </a>
          </Link>

          <a className='card'>
            <h3>Upcoming App &rarr;</h3>
            <p>
              Third App can be anything deploy your Next.js site to a public URL with Mercol.
            </p>
          </a>

          <a className='card'>
            <h3>Upcoming App &rarr;</h3>
            <p>
              Fouth Software Meteor.js site to a public URL with love and happiness for you.
            </p>
          </a>
          
          <a className='card'>
            <h3>Upcoming App &rarr;</h3>
            <p>
              Third App can be anything deploy your Next.js site to a public URL with Mercol.
            </p>
          </a>

          <a className='card'>
            <h3>Upcoming App &rarr;</h3>
            <p>
              Fouth Software Meteor.js site to a public URL with love and happiness for you.
            </p>
          </a>

        </div>
      </main>

      <footer>
        <p>
          Powered by musii
        </p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #F25F5C;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 2rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #F25F5C;
          border-color: #F25F5C;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 767px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await dbConnect();
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
