import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Variables
const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /\d[x/+‑]{1}‑$/,
  clearStyle = { background: '#ac3939' },
  operatorStyle = { background: '#bbb' },
  equalsStyle = {
    background: '#e19200',
  };

// Main app
const Calculator = () => {
  const [currentVal, setCurrentVal] = useState('0');
  const [prevVal, setPrevVal] = useState('0');
  const [formula, setFormula] = useState('');
  const [currentSign, setCurrentSign] = useState('pos');
  const [lastClicked, setLastClicked] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  // warn user that they cannot add more digit
  const maxDigitWarning = () => {
    setCurrentVal('Digit Limit Met');
    setPrevVal(currentVal);

    setTimeout(() => {
      setCurrentVal(prevVal);
    }, 3000);
  };

  const handleEvaluate = () => {
    if (!currentVal.includes('Limit')) {
      let expression = formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, '*')
        .replace(/‑/g, '-')
        .replace('--', '+0+0+0+0+0+0+');

      // eval() is not recommended and should be replaced with other method.
      let answer =
        Math.round(1000000000000 * Function(expression)) / 1000000000000;

      setCurrentVal(answer.toString());
      setFormula(
        expression
          .replace(/\*/g, '⋅')
          .replace(/-/g, '‑')
          .replace('+0+0+0+0+0+0+', '‑-')
          .replace(/(x|\/|\+)‑/, '$1-')
          .replace(/^‑/, '-') +
          '=' +
          answer,
      );
      setPrevVal(answer);
      setEvaluated(true);
    }
  };

  const handleOperators = (e) => {
    if (!currentVal.includes('Limit')) {
      const value = e.target.value;
      setCurrentVal(value);
      setEvaluated(false);

      if (evaluated) {
        setFormula(prevVal + value);
      } else if (!endsWithOperator.test(formula)) {
        setPrevVal(formula);
        setFormula(formula + value);
      } else if (!endsWithNegativeSign.test(formula)) {
        setFormula(
          (endsWithNegativeSign.test(formula + value) ? formula : prevVal) +
            value,
        );
      } else if (value !== '‑') {
        setFormula(prevVal + value);
      }
    }
  };

  const handleNumbers = (e) => {
    if (!currentVal.includes('Limit')) {
      const value = e.target.value;

      setEvaluated(false);

      if (currentVal.length > 21) {
        maxDigitWarning();
      } else if (evaluated) {
        setCurrentVal(value);
        setFormula(value !== '0' ? value : '');
      } else {
        setCurrentVal(
          currentVal === '0' || isOperator.test(currentVal)
            ? value
            : currentVal + value,
        );
        setFormula(
          currentVal === '0' && value === '0'
            ? formula === ''
              ? value
              : formula
            : /([^.0-9]0|^0)$/.test(formula)
            ? formula.slice(0, -1) + value
            : formula + value,
        );
      }
    }
  };

  const handleDecimal = () => {
    if (evaluated === true) {
      setCurrentVal('0.');
      setFormula('0.');
      setEvaluated(false);
    } else if (!currentVal.includes('.') && !currentVal.includes('Limit')) {
      setEvaluated(false);
      if (currentVal.length > 21) {
        maxDigitWarning();
      } else if (
        endsWithOperator.test(formula) ||
        (currentVal === '0' && formula === '')
      ) {
        setCurrentVal('0.');
        setFormula('0.');
      } else {
        setCurrentVal(formula.match(/(-?\d+\.?\d*)$/)[0] + '.');
        setFormula(formula + '.');
      }
    }
  };

  const initialize = () => {
    setCurrentVal('0');
    setPrevVal('0');
    setFormula('');
    setCurrentSign('pos');
    setLastClicked('');
  };

  return (
    <Container className='d-flex flex-column justify-content-center mt-5'>
      <Row>
        <Col md={{ span: 12 }}>
          <h1>Calculator App</h1>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col className='col-md-6 align-self-center'>
          <div className='calculator'>
            <Formula formula={formula.replace(/x/g, '⋅')} />
            <Output currentValue={currentVal} />
            <Buttons
              decimal={handleDecimal}
              evaluate={handleEvaluate}
              initialize={initialize}
              numbers={handleNumbers}
              operators={handleOperators}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Buttons = ({ evaluate, initialize, decimal, numbers, operators }) => {
  return (
    <div>
      <Row className='first-row'>
        <Col className='d-flex flex-row'>
          <button
            className='flex-grow-1'
            id='clear'
            onClick={initialize}
            style={clearStyle}
            value='AC'
          >
            AC
          </button>
          <button
            className='flex-grow-0'
            id='divide'
            onClick={operators}
            style={operatorStyle}
            value='/'
          >
            /
          </button>
          <button
            className='flex-grow-0'
            id='multiply'
            onClick={operators}
            style={operatorStyle}
            value='x'
          >
            x
          </button>
        </Col>
      </Row>
      <Row className='second-row'>
        <Col className='d-flex flex-row'>
          <button id='seven' onClick={numbers} value='7'>
            7
          </button>
          <button id='eight' onClick={numbers} value='8'>
            8
          </button>
          <button id='nine' onClick={numbers} value='9'>
            9
          </button>
          <button
            id='subtract'
            onClick={operators}
            style={operatorStyle}
            value='‑'
          >
            ‑
          </button>
        </Col>
      </Row>
      <Row className='third-row'>
        <Col className='d-flex flex-row'>
          <button id='four' onClick={numbers} value='4'>
            4
          </button>
          <button id='five' onClick={numbers} value='5'>
            5
          </button>
          <button id='six' onClick={numbers} value='6'>
            6
          </button>
          <button id='add' onClick={operators} style={operatorStyle} value='+'>
            +
          </button>
        </Col>
      </Row>
      <Row className='fourth-row'>
        <Col className='d-flex flex-row flex-wrap'>
          <button className='flex-grow-0' id='one' onClick={numbers} value='1'>
            1
          </button>
          <button className='flex-grow-0' id='two' onClick={numbers} value='2'>
            2
          </button>
          <button
            className='flex-grow-0'
            id='three'
            onClick={numbers}
            value='3'
          >
            3
          </button>
          <button
            className='flex-grow-0'
            id='equals'
            onClick={evaluate}
            style={equalsStyle}
            value='='
          >
            =
          </button>
          <button className='flex-grow-1' id='zero' onClick={numbers} value='0'>
            0
          </button>
          <button
            className='flex-grow-0'
            id='decimal'
            onClick={decimal}
            value='.'
          >
            .
          </button>
        </Col>
      </Row>
    </div>
  );
};

const Output = ({ currentValue }) => (
  <div className='outputScreen' id='display'>
    {currentValue}
  </div>
);

const Formula = ({ formula }) => <div className='formulaScreen'>{formula}</div>;

export default Calculator;
