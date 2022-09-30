import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PetForm = ({ formId, petForm, forNewPet = true }) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: petForm.name,
    owner_name: petForm.owner_name,
    species: petForm.species,
    age: petForm.age,
    huggable: petForm.huggable,
    diet: petForm.diet,
    image_url: petForm.image_url,
    likes: petForm.likes,
    dislikes: petForm.dislikes,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/pets/${id}`, data, false); // Update the local data without a revalidation
      router.push('/pet-store');
    } catch (error) {
      setMessage('Failed to update pet');
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/pet-store');
    } catch (error) {
      setMessage('Failed to add pet');
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.name === 'huggable' ? target.checked : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {};
    if (!form.name) err.name = 'Name is required';
    if (!form.owner_name) err.owner_name = 'Owner is required';
    if (!form.species) err.species = 'Species is required';
    if (!form.image_url) err.image_url = 'Image URL is required';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewPet ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <Container className='d-flex flex-column justify-content-center mt-5'>
        <Row>
          <Col md={{ span: 12 }}>
            <h1>Pet Store App</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8 }} lg={{ span: 6 }}>
            <Form id={formId} onSubmit={handleSubmit}>
              <Form.Group className='mb-2'>
                <Form.Label htmlFor='name'>Name</Form.Label>
                <Form.Control
                  type='text'
                  maxLength='20'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-2'>
                <Form.Label htmlFor='owner_name'>Owner</Form.Label>
                <Form.Control
                  type='text'
                  maxLength='20'
                  name='owner_name'
                  value={form.owner_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-2'>
                <Form.Label htmlFor='species'>Species</Form.Label>
                <Form.Control
                  type='text'
                  maxLength='30'
                  name='species'
                  value={form.species}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-2'>
                <Form.Label htmlFor='age'>Age</Form.Label>
                <Form.Control
                  type='number'
                  name='age'
                  value={form.age}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className='mb-2'>
                <Form.Label htmlFor='huggable'>Can be hugged</Form.Label>
                <Form.Check
                  type='checkbox'
                  label='huggable RB'
                  name='huggable'
                  checked={form.huggable}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className='mb-2'>
                <Form.Label htmlFor='diet'>Diet</Form.Label>
                <Form.Control
                  name='diet'
                  maxLength='60'
                  value={form.diet}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className='mb-2'>
                <Form.Label htmlFor='image_url'>Image URL</Form.Label>
                <Form.Control
                  type='url'
                  name='image_url'
                  value={form.image_url}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-2'>
                <Form.Label htmlFor='likes'>Likes</Form.Label>
                <Form.Control
                  name='likes'
                  maxLength='60'
                  value={form.likes}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className='mb-2'>
                <Form.Label htmlFor='dislikes'>Dislikes</Form.Label>
                <Form.Control
                  name='dislikes'
                  maxLength='60'
                  value={form.dislikes}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type='submit' variant='primary' className='btn px-4'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          <p>{message}</p>
          <div>
            {Object.keys(errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default PetForm;
