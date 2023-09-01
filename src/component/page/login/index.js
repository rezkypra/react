import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

let Login = () => {
    const [status, setStatus] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const  onSubmit = () => {


        let data = {
            "email": email,
            "password": password
        }

        axios({
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            url: "http://localhost:8088/api/user/login",
            data:JSON.stringify(data)
        }).then((response) => {
            if(response.data.status === 200){
                setStatus(true)
                console.log(response.data)
                console.log(data)
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setStatus(false)
        })
    }
    return (
        <>
            <Container>

                <Card style={{ width: '18rem' }} >    
                    {/* <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" id="email"  onChange={e => setEmail(e.target.value)}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id="password"  onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={onSubmit}>
                            Submit
                        </Button>
                    </Form> */}
                    <label for="email"> email:</label>
                    <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                        
                    <label for="password"> password:</label>
                    <input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} ></input>
                    <button onClick={onSubmit}>submit</button>
                </Card>

            </Container>
        </>
    )
}

export default Login