import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import "bootstrap/dist/css/bootstrap.min.css";



let League = () => {
    const [data, setData] = useState([{}])

    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [status, setStatus] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        
        axios({
            method: "GET",
            url: "http://localhost:8088/api/League"
        }).then((response) => {
            setData(response.data.data)
            console.log()
        }).catch((error) => {
            console.log()
        })
    }, [status])

    const  onSubmit = () => {
        handleClose();

        let data = {
            "league_id": 0,
            "name": name
        }

        axios({
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            url: "http://localhost:8088/api/League",
            data:JSON.stringify(data)
        }).then((response) => {
            if(response.data.status === 200){
                setStatus(true)
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setStatus(false)
        })
    }


    return (
        <div>
            {/* <button onClick={handleShow}>Create</button> */}
            <Button variant="primary" onClick={handleShow}>
                Create
            </Button>

            {/* table */}
            <table className="table">
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>ACTION</th>
                </thead>
                <tbody>
                    {data.map(x =>{
                        return (
                            <tr key={x.league_id}>
                                <td>{x.league_id}</td>
                                <td>{x.name}</td>
                                <td>
                                    <a href="#" onClick={handleShow}>edit </a>
                                     | 
                                     <a>delete</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
            {/* modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" id="league_id"  value={id} onChange={e => setId(e.target.value)}></input>
                    <input type="text" id="name"  value={name} onChange={e => setName(e.target.value)}></input>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export default League;