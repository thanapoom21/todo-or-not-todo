import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import dbConnect from '../lib/dbConnect';

export default function Home({ isConnected }) {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Container className='landing'>
          <h1 className='title'>
            Welcome to Play Area
          </h1>

          {isConnected ? (
            <h2 className='subtitle'>You are connected to MongoDB</h2>
          ) : (
            <h2 className='subtitle'>
              You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
              for instructions.
            </h2>
          )}

          <Row>
            <Col md={6} lg={4}>
              <Link href='/todo' passHref>
                <a className='card'>
                  <h3>Todo App &rarr;</h3>
                  <p>
                    Just a simple todo app with toggling, adding, and removing features. 10 items limited.
                  </p>
                </a>
              </Link>
            </Col>
            <Col md={6} lg={4}>
              <Link href='/pokemon-list' passHref>
                <a className='card'>
                  <h3>Pokemon App &rarr;</h3>
                  <p>
                    Just a simple Pokemon app that shows its name, type and cute image.
                  </p>
                </a>
              </Link>
            </Col>
            <Col md={6} lg={4}>
              <a className='card disabled-item'>
                <h3>Upcoming App &rarr;</h3>
                <p>
                  Third App can be anything deploy your Next.js site to a public URL with Mercol.
                </p>
              </a>
            </Col>
            <Col md={6} lg={4}>
              <a className='card disabled-item'>
                <h3>Upcoming App &rarr;</h3>
                <p>
                  Fouth Software Meteor.js site to a public URL with love and happiness for you.
                </p>
              </a>
            </Col>
            <Col md={6} lg={4}>
              <a className='card disabled-item'>
                <h3>Upcoming App &rarr;</h3>
                <p>
                  Third App can be anything deploy your Next.js site to a public URL with Mercol.
                </p>
              </a>
            </Col>
            <Col md={6} lg={4}>
              <a className='card disabled-item'>
                <h3>Upcoming App &rarr;</h3>
                <p>
                  Fouth Software Meteor.js site to a public URL with love and happiness for you.
                </p>
              </a>
            </Col>
          </Row>
        </Container>
      </main>

      <footer>
        <p>
          Powered by musii
        </p>
      </footer>

    </Container>
  )
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
