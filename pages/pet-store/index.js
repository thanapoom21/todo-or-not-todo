import Link from 'next/link';
import dbConnect from '../../lib/dbConnect';
import Pet from '../../models/Pet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';

const PetStore = ({ pets }) => {
  const router = useRouter();

  return (
    <>
      <Container className='d-flex flex-column justify-content-center mt-5'>
        <Row>
          <Col md={{ span: 12 }}>
            <h1>Pet Store App - Connected with MongoDB with Mongoose</h1>
            <hr />
          </Col>
        </Row>

        {pets.length > 8 ? (
          <>
            <Row>
              <Col>
                <Link href='/new'>
                  <Button variant='outline-secondary' disabled>
                    Add New Pet
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row className='my-2 gy-2'>
              <Col md={{ span: 12 }}>
                <h2>
                  Sorry for the inconvenience, our store is currently full.
                </h2>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col>
                <Link href='/new'>
                  <Button variant='outline-primary'>Add New Pet</Button>
                </Link>
              </Col>
            </Row>

            <Row xs={1} md={2} xl={4} className='my-2 gy-2'>
              {/* Create a card for each pet */}
              {pets.map((pet) => (
                <Col key={pet._id}>
                  <Card>
                    <Card.Img variant='top' src={pet.image_url} />
                    <Card.Body>
                      <Card.Title className='pet-name'>
                        Name: {pet.name}
                      </Card.Title>
                      <div className='main-content'>
                        <p className='owner'>Owner: {pet.owner_name}</p>

                        {/* Extra Pet Info: Likes and Dislikes */}
                        <div className='likes info'>
                          <p className='label'>Likes</p>
                          <ul>
                            {pet.likes.map((data, index) => (
                              <li key={index}>{data} </li>
                            ))}
                          </ul>
                        </div>
                        <div className='dislikes info'>
                          <p className='label'>Dislikes</p>
                          <ul>
                            {pet.dislikes.map((data, index) => (
                              <li key={index}>{data} </li>
                            ))}
                          </ul>
                        </div>

                        <div className='btn-container d-flex justify-content-between'>
                          <Link
                            href='/pet-store/[id]/edit'
                            as={`/pet-store/${pet._id}/edit`}
                          >
                            <Button
                              variant='outline-danger'
                              className='btn edit px-4'
                            >
                              Edit
                            </Button>
                          </Link>
                          <Link
                            href='/pet-store/[id]'
                            as={`/pet-store/${pet._id}`}
                          >
                            <Button variant='primary' className='btn view px-4'>
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
        <Row>
          <Col md={{ span: 12 }}>
            <hr />
            <Button variant='outline-primary' onClick={() => router.push('/')}>
              Go Back
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

/* Retrieves pet(s) data from mongodb database */
export const getServerSideProps = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await Pet.find({});
  const pets = result.map((doc) => {
    const pet = doc.toObject();
    pet._id = pet._id.toString();
    return pet;
  });

  return { props: { pets: pets } };
};

export default PetStore;
