
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Container from 'react-bootstrap/Container';





import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

let Home = (props) =>{
    return(
        <>
        {/* <div  className="header">
            <label className="label-header"> 
                {props.labelHeader}
                <a href="https://react.dev/blog/2023/03/16/introducing-react-dev" className="label-goto">{props.labelGoto}</a>
            </label>
        </div> */}
        

        <Container mt-3>
            <div className='jumbotron jumbotron-fluid p-5'>
                <h1 className='mb-3'>React</h1>
                <h4 className='mb-3'>A JavaScript library for building user interfaces</h4>
                <a className='jumbotron-a-1' href='#' role='button'>
                Get started
                </a>
                <a className='jumbotron-a-2' style={{color:"#61DAFB"}} href='#'>  Take the tutorial </a>
            </div>

            
                <div className='content'>
                    <Card className='card' style={{ width: '18rem' }}>
                        <Card.Body className='card-body'>
                            <Card.Title>Declarative</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                            <Card.Text>
                            <p>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p>
                            <p>Declarative views make your code more predictable and easier to debug.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.                Some quick example text to build on the card title and make up the
                            bulk of the card's content.                Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.                Some quick example text to build on the card title and make up the
                            bulk of the card's content.                Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>

                <div className='component'>
                    <h3>
                        A Simple Component 
                    </h3>
                    <p>React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by render() via this.props.JSX is optional and not required to use React. Try the Babel REPL to see the raw JavaScript code produced by the JSX compilation step.</p>
                    {/* <Row>
                        <Col xs={6} md={4}>
                        <Image src="https://www.freepik.com/free-photo/programming-background-collage_34089142.htm#query=java%20script&position=11&from_view=search&track=ais" rounded />
                        </Col>
                    </Row> */}
                </div>
                <div className='component'>
                    <h3>
                        A Simple Component 
                    </h3>
                </div>
                <div className='component'>
                    <h3>
                        A Simple Component 
                    </h3>
                </div>
            </Container>    
        </>
    )
}
export default Home