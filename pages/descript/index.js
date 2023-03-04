import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const fruits = [
  {
    id: 'apple',
    name: 'Apple',
    description: `Apple (Malus sp., Rosaceae) is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus. The apple tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today. Apples have been grown for thousands of years in Asia and Europe, and were brought to North America by European colonists. Apples are popular because of the many ways that they can be consumed and because of their convenience and durability. Apples can be processed into sauce, slices, or juice and are favored for pastries, cakes, tarts, and pies. The apple pulp has been processed into candies (fruit leathers) and used as a source of pectin. The apple juice can be consumed fresh, either natural or filtered, fermented into alcoholic beverages such as cider or wine, distilled into brandy, or transformed into vinegar`,
    varieties: [
      {
        id: 'fuji-apple',
        name: 'Fuji Apple',
        description: `The Fuji apple is an apple cultivar developed by growers at Tohoku Research Station (農林省園芸試験場東北支場) in Fujisaki, Aomori, Japan, in the late 1930s, and brought to market in 1962. It originated as a cross between two American apple varieties—the Red Delicious and old Virginia Ralls Janet (sometimes cited as "Rawls Jennet") apples. According to the US Apple Association website it is one of the nine most popular apple cultivars in the United States. Its name is derived from the first part of the town where it was developed: Fujisaki.`,
      },
      {
        id: 'gala-apple',
        name: 'Gala Apple',
        description: `Gala is an apple cultivar with a sweet, mild flavour, a crisp but not hard texture, and a striped or mottled orange or reddish appearance. Originating from New Zealand in the 1930s, similar to most named apples, it is clonally propagated. In 2018, it surpassed Red Delicious as the apple cultivar with the highest production in the United States, according to the US Apple Association. It was the first time in over 50 years that any cultivar was produced more than Red Delicious.`,
      },
    ],
  },
  {
    id: 'banana',
    name: 'Banana',
    description: `The banana is an edible fruit produced by several kinds of large herbaceous flowering plants in the genus Musa. Bananas are vital for food security in many African countries, tropical and subtropical countries and the most popular fruits in industrialized countries. As such, bananas constitute a fundamental source of energy, vitamins and minerals for tropical countries.`,
  },
  {
    id: 'cherries',
    name: 'Cherries',
    description: `Apple (Malus sp., Rosaceae) is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus. The apple tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today. Apples have been grown for thousands of years in Asia and Europe, and were brought to North America by European colonists. Apples are popular because of the many ways that they can be consumed and because of their convenience and durability. Apples can be processed into sauce, slices, or juice and are favored for pastries, cakes, tarts, and pies. The apple pulp has been processed into candies (fruit leathers) and used as a source of pectin. The apple juice can be consumed fresh, either natural or filtered, fermented into alcoholic beverages such as cider or wine, distilled into brandy, or transformed into vinegar`,
    varieties: [
      {
        id: 'rainier-cherries',
        name: 'Rainier Cherries',
        description: `Rainier (/reɪˈnɪər/ ray-NEER) is a cultivar of cherry. It was developed in 1952 at Washington State University by Harold Fogle, and named after Mount Rainier. It is a cross between the 'Bing' and 'Van' cultivars. 'Rainiers' are considered a premium type of cherry. They are sweet with a thin skin and thick creamy-yellow flesh. The cherries are susceptible to temperature, wind, and rain, and the flesh is generally more watery than other sweet cherries.`,
      },
      {
        id: 'morello-cherries',
        name: 'Morello Cherries',
        description: `A morello cherry is a sour cherry cultivar. Morellos are distinguished by their very dark skin, flesh, and juice. They are extremely popular for things like cherry pie, cherry jam, and cherry preserves, and they are also used in an assortment of other desserts. The rich, complex flavor of the morello cherry complements an assortment of ingredients, especially chocolate. You may be able to find morello cherries at a market in season, and they are often available frozen; you can also try growing them, if you live in USDA zones four through eight.`,
      },
    ],
  },
];

const ScrollspyNavItem = ({ fruit }) => {
  return (
    <>
      <a className='nav-link' href={`#${fruit.id}`}>
        {fruit.name}
      </a>
      {fruit.varieties &&
        fruit.varieties.map((variety, index) => {
          return (
            <nav key={index} className='nav nav-pills flex-column'>
              <a className='nav-link ms-3 my-1' href={`#${variety.id}`}>
                {variety.name}
              </a>
            </nav>
          );
        })}
    </>
  );
};

const ScrollspySideNav = ({ fruits }) => {
  return (
    <>
      {fruits &&
        fruits.map((fruit, index) => {
          return <ScrollspyNavItem fruit={fruit} key={index} />;
        })}
    </>
  );
};

const FruitItem = ({ fruit }) => {
  return (
    <>
      <div id={fruit.id}>
        <h3>{fruit.name}</h3>
        <p>{fruit.description}</p>
      </div>
      {fruit.varieties &&
        fruit.varieties.map((variety, index) => {
          return (
            <div key={index} id={variety.id}>
              <h5>{variety.name}</h5>
              <p>{variety.description}</p>
            </div>
          );
        })}
    </>
  );
};

const Descript = () => {
  return (
    <Container className='d-flex flex-column justify-content-center mt-5'>
      <Row>
        <Col md={{ span: 12 }}>
          <h1>Descript App</h1>
          <hr />
        </Col>
      </Row>
      <Row className='my-2 gy-2'>
        <Col lg={{ span: 12 }}>
          <Navbar
            collapseOnSelect
            expand='lg'
            bg='dark'
            variant='dark'
            id='descript-navbar'
          >
            <Container>
              <Navbar.Brand href='/descript'>Descript</Navbar.Brand>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto'>
                  <Nav.Link href='/descript/movies'>Movies</Nav.Link>
                  <Nav.Link href='/descript/sports'>Sports</Nav.Link>
                  <Nav.Link href='/descript/countries'>Countries</Nav.Link>
                  <NavDropdown title='Categories' id='collasible-nav-dropdown'>
                    <NavDropdown.Item href='/descript/fruits'>Fruits</NavDropdown.Item>
                    <NavDropdown.Item href='/descript/animals'>Animals</NavDropdown.Item>
                    <NavDropdown.Item href='/descript/cars'>Cars</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='/descript/others'>Others</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  <Nav.Link href='/descript/synonym'>Synonym</Nav.Link>
                  <Nav.Link eventKey={2} href='/descript/antonym'>
                    Antonym
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>

        <Col xs={12} md={8}>
          <div
            data-bs-spy='scroll'
            data-bs-target='#navbar-example3'
            data-bs-smooth-scroll='true'
            data-bs-offset='0'
            className='scrollspy-example'
            style={{
              position: 'relative',
              height: '600px',
              overflow: 'scroll',
            }}
            tabIndex='0'
          >
            {fruits &&
              fruits.map((fruit, index) => {
                return <FruitItem key={index} fruit={fruit} />;
              })}
          </div>
        </Col>

        <Col>
          <nav
            id='navbar-example3'
            className='h-100 flex-column align-items-stretch pe-4 border-end d-none d-md-block'
          >
            <nav className='nav nav-pills flex-column'>
              <ScrollspySideNav fruits={fruits} />
            </nav>
          </nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Descript;
