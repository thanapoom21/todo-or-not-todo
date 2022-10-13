import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dbConnect from '../../lib/dbConnect';
import Pet from '../../models/Pet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

/* Allows you to view pet card info and delete pet card*/
const PetPage = ({ pet }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const handleDelete = async () => {
    const petID = router.query.id;

    try {
      await fetch(`/api/pets/${petID}`, {
        method: 'Delete',
      });
      router.push('/');
    } catch (error) {
      setMessage('Failed to delete the pet.');
    }
  };

  return (
    <Container className='d-flex flex-column justify-content-center mt-5'>
      <Row>
        <Col></Col>
        <Col xs={8}>
          <Card>
            <Card.Img variant='top' src={pet.image_url} />
            <Card.Body>
              <Card.Title className='pet-name'>Name: {pet.name}</Card.Title>
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
                  <Link href='/[id]/edit' as={`/${pet._id}/edit`}>
                    <Button variant='outline-danger' className='btn edit px-4'>
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant='danger'
                    className='btn delete px-4'
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card.Body>
            {message && <p>{message}</p>}
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const pet = await Pet.findById(params.id).lean();
  pet._id = pet._id.toString();

  return { props: { pet } };
}

export default PetPage;
