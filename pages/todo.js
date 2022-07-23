import { useState, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import dbConnect from '../lib/dbConnect';
import Item from '../models/Item';

const Todo = ({ todos }) => {
  return (
    <Container className='d-flex flex-column justify-content-center mt-5'>
      <Row>
        <Col md={{ span: 12 }}>
          <h1>Todo App - Connected with MongoDB with Mongoose</h1>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md={{ offset: 3, span: 6 }}>
          <TodoListCard todoItems={todos} />
        </Col>
      </Row>
    </Container>
  );
};

const TodoListCard = ({ todoItems }) => {
  const [items, setItems] = useState(todoItems);

  const onNewItem = useCallback(
    (newItem) => {
      setItems([...items, newItem]);
    },
    [items],
  );

  const onItemUpdate = useCallback(
    (item) => {
      const index = items.findIndex((i) => i._id === item._id);
      setItems([...items.slice(0, index), item, ...items.slice(index + 1)]);
    },
    [items],
  );

  const onItemRemoval = useCallback(
    (item) => {
      const index = items.findIndex((i) => i._id === item._id);
      setItems([...items.slice(0, index), ...items.slice(index + 1)]);
    },
    [items],
  );

  if (items === null) return 'Loading...';

  return (
    <>
      {items.length <= 10 ? (
        <AddItemForm onNewItem={onNewItem} />
      ) : (
        <h1 className='text-center'>You have too many items!</h1>
      )}
      {items.length === 0 && (
        <p className='text-center'>No items yet! Add one above!</p>
      )}
      {items.map((item) => (
        <ItemDisplay
          item={item}
          key={item._id}
          onItemUpdate={onItemUpdate}
          onItemRemoval={onItemRemoval}
        />
      ))}
    </>
  );
};

const AddItemForm = ({ onNewItem }) => {
  const [newItem, setNewItem] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submitNewItem = (e) => {
    e.preventDefault();
    setSubmitting(true);
    fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify({ name: newItem }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((item) => {
        onNewItem(item.data);
        setSubmitting(false);
        setNewItem('');
      });
  };

  return (
    <Form onSubmit={submitNewItem}>
      <InputGroup className='mb-3'>
        <Form.Control
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type='text'
          placeholder='New Item'
          aria-describedby='basic-addon1'
        />
        <Button
          type='submit'
          variant='success'
          disabled={!newItem.length}
          className={submitting ? 'disabled' : ''}
        >
          {submitting ? 'Adding...' : 'Add Item'}
        </Button>
      </InputGroup>
    </Form>
  );
};

const ItemDisplay = ({ item, onItemUpdate, onItemRemoval }) => {
  const toggleCompletion = () => {
    fetch(`/api/items/${item._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: item.name,
        completed: !item.completed,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((r) => onItemUpdate(r.data));
  };

  const removeItem = () => {
    fetch(`/api/items/${item._id}`, { method: 'DELETE' }).then(() =>
      onItemRemoval(item),
    );
  };

  return (
    <Container fluid className={`item ${item.completed && 'completed'}`}>
      <Row>
        <Col xs={1} className='text-center'>
          <Button
            className='toggles'
            size='sm'
            variant='link'
            onClick={toggleCompletion}
            aria-label={
              item.completed
                ? 'Mark item as incomplete'
                : 'Mark item as complete'
            }
          >
            {item.completed ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-check-square'
                viewBox='0 0 16 16'
              >
                <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
                <path d='M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-square'
                viewBox='0 0 16 16'
              >
                <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
              </svg>
            )}
          </Button>
        </Col>
        <Col xs={10} className='name'>
          {item.name}
        </Col>
        <Col xs={1} className='text-center remove'>
          <Button
            size='sm'
            variant='link'
            onClick={removeItem}
            aria-label='Remove Item'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='red'
              className='bi bi-trash-fill'
              viewBox='0 0 16 16'
            >
              <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z' />
            </svg>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export const getServerSideProps = async () => {
  await dbConnect();

  /* find all the data in our database */
  const result = await Item.find({});
  const items = result.map((doc) => {
    const item = doc.toObject();
    item._id = item._id.toString();
    return item;
  });

  return { props: { todos: JSON.parse(JSON.stringify(items)) } };
};

export default Todo;
