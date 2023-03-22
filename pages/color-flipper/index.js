import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Descript = () => {
  const [randomHex1, setRandomHex1] = useState('');
  const [randomHex2, setRandomHex2] = useState('');
  const [randomHex3, setRandomHex3] = useState('');
  const router = useRouter();

  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  const getHex = () => {
    let hexColor1 = '#';
    let hexColor2 = '#';
    let hexColor3 = '#';

    for (let i = 0; i < 6; i++) {
      hexColor1 += hex[getRandomNumber()];
      hexColor2 += hex[getRandomNumber()];
      hexColor3 += hex[getRandomNumber()];
    }
    setRandomHex1(hexColor1);
    setRandomHex2(hexColor2);
    setRandomHex3(hexColor3);
  };

  const getRandomNumber = () => Math.floor(Math.random() * hex.length);

  return (
    <Container className='d-flex flex-column justify-content-center mt-5'>
      <Row>
        <Col md={{ span: 12 }}>
          <h1>Color Flipper</h1>
          <hr />
        </Col>
      </Row>
      <Row className='my-2 gy-2'>
        <Container className='d-flex flex-column justify-content-center'>
          <Stack gap={3}>
            <Button variant='danger' onClick={() => getHex()} size='lg'>
              Flip
            </Button>

            <Stack direction='horizontal' gap={3}>
              <Alert variant='dark' style={{ backgroundColor: randomHex1 ? randomHex1 : 'darksalmon', color: 'white' }}>
                <Alert.Heading>Egestas erat!</Alert.Heading>
                <p>
                  Nulla pharetra diam sit amet. Quam nulla porttitor massa id
                  neque aliquam vestibulum morbi blandit. Urna et pharetra
                  pharetra massa massa ultricies mi. Aliquam etiam erat velit
                  scelerisque.
                </p>
                <hr />
                {randomHex1 ? <Button>{randomHex1}</Button> : <Button>Hex Code</Button>}
              </Alert>
              <div className='vr' />
              <Alert variant='success' style={{ backgroundColor: randomHex2 ? randomHex2 : 'darksalmon', color: 'white' }}>
                <Alert.Heading>Egestas erat!</Alert.Heading>
                <p>
                  Nulla pharetra diam sit amet. Quam nulla porttitor massa id
                  neque aliquam vestibulum morbi blandit. Urna et pharetra
                  pharetra massa massa ultricies mi. Aliquam etiam erat velit
                  scelerisque.
                </p>
                <hr />
                {randomHex2 ? <Button>{randomHex2}</Button> : <Button>Hex Code</Button>}
              </Alert>
              <div className='vr' />
              <Alert variant='danger' style={{ backgroundColor: randomHex3 ? randomHex3 : 'darksalmon', color: 'white' }}>
                <Alert.Heading>Egestas erat!</Alert.Heading>
                <p>
                  Nulla pharetra diam sit amet. Quam nulla porttitor massa id
                  neque aliquam vestibulum morbi blandit. Urna et pharetra
                  pharetra massa massa ultricies mi. Aliquam etiam erat velit
                  scelerisque.
                </p>
                <hr />
                {randomHex3 ? <Button>{randomHex3}</Button> : <Button>Hex Code</Button>}
              </Alert>
            </Stack>
          </Stack>
        </Container>
      </Row >
      <Row>
        <Col md={{ span: 12 }}>
          <hr />
          <Button variant='outline-primary' onClick={() => router.push('/')}>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container >
  );
};

export default Descript;
