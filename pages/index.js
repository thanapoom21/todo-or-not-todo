import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import dbConnect from '../lib/dbConnect';

export default function Home({ isConnected }) {
  return (
    <>
      <Head>
        <title>Todo or Not Todo Sandbox</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Container className='landing d-flex flex-column justify-content-center mt-5'>
          <h1 className='title'>Welcome to Sandbox</h1>

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
              <Link href='/todo' passHref legacyBehavior>
                <a className='card'>
                  <h3>Todo App &rarr;</h3>
                  <p>
                    Just a simple todo app with toggling, adding, and removing
                    features. 10 items limited.
                  </p>
                </a>
              </Link>
            </Col>
            <Col md={6} lg={4}>
              <Link href='/pokemon-list' passHref legacyBehavior>
                <a className='card'>
                  <h3>Pokemon App &rarr;</h3>
                  <p>
                    Just a simple Pokemon app that shows its name, type and cute
                    image.
                  </p>
                </a>
              </Link>
            </Col>
            <Col md={6} lg={4}>
              <Link href='/calculator' passHref legacyBehavior>
                <a className='card'>
                  <h3>Calculator App &rarr;</h3>
                  <p>
                    Just a simple calculator app that shows its operation,
                    results and other features.
                  </p>
                </a>
              </Link>
            </Col>
            <Col md={6} lg={4}>
              <Link href='/clock' passHref legacyBehavior>
                <a className='card'>
                  <h3>Clock App &rarr;</h3>
                  <p>
                    Just a simple calculator app that shows its operation,
                    results and other features.
                  </p>
                </a>
              </Link>
            </Col>
            <Col md={6} lg={4}>
              <Link href='/tictactoe' passHref legacyBehavior>
                <a className='card'>
                  <h3>Tic Tac Toe App &rarr;</h3>
                  <p>
                    Just a simple calculator app that shows its operation,
                    results and other features.
                  </p>
                </a>
              </Link>
            </Col>
            <Col md={6} lg={4}>
              <Link href='/pet-store' passHref legacyBehavior>
                <a className='card'>
                  <h3>Pet Store App &rarr;</h3>
                  <p>
                    Just a simple calculator app that shows its operation,
                    results and other features.
                  </p>
                </a>
              </Link>
            </Col>
          </Row>
        </Container>
      </main>

      <footer className='justify-content-center d-flex'>
        <p>Powered by musii with love, sweat, and pain.</p>
      </footer>
    </>
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
