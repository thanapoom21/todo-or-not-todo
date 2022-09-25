import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const PokemonList = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadPokemonEndpoint, setLoadPokemonEndpoint] = useState(
    `https://pokeapi.co/api/v2/pokemon?limit=3`,
  );

  const getPokemons = () => {
    fetch(loadPokemonEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setLoadPokemonEndpoint(data.next);
        createPokemonObject(data.results);
      });

    function createPokemonObject(result) {
      result.forEach((pokemon) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .then((res) => res.json())
          .then((data) => {
            setAllPokemons((currentPokemons) => [...currentPokemons, data]);
          });
      });
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <Container className='d-flex flex-column justify-content-center mt-5'>
      <Row>
        <Col md={{ span: 12 }}>
          <h1>Pokemon List App</h1>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant='outline-primary' onClick={() => getPokemons()}>
            Get Pokemon
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={6} className='my-2 gy-2'>
        {allPokemons.map((pokemon, index) => {
          const { id, name, sprites, types, abilities } = pokemon;
          return (
            <PokemonCard
              key={index}
              id={id}
              name={name}
              image={sprites.other['official-artwork'].front_default}
              type={types[0].type.name}
              abilities={abilities}
            />
          );
        })}
      </Row>
    </Container>
  );
};

const PokemonCard = ({ id, name, image, type, abilities }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card>
        <Card.Img variant='top' src={image} alt={name} />
        <Card.Body>
          <Card.Title className='fs-6'>{name.toUpperCase()}</Card.Title>
          <Card.Text>Type : {type}</Card.Text>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          {abilities.map((obj, i) => {
            return (
              <ListGroup.Item key={i}>
                Ability: {obj.ability.name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        {/* <Card.Body>
          <Card.Link href='#'>Learn More</Card.Link>
        </Card.Body> */}
      </Card>
    </Col>
  );
};

export default PokemonList;
