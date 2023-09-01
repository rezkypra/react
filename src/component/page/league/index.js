

import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";


import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';



let League = () => {
    const [data, setData] = useState([{}])

    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [status, setStatus] = useState(false);

    
    // add
    const [show, setShow] = useState(id);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    // update
    const [show2, setShow2] = useState(false);
    const updateShow = () => setShow2(true);
    const handleClose2 = () => setShow2(false);
    
    

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

    // modal add
    const  onSubmit = () => {
        handleClose();

        let data = {
            "league_id": id,
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



    // modal update
    const handleEdit = (rowData) => {
        setId(rowData.league_id);
        setName(rowData.name);
        updateShow();
      }

    const  onUpdate = () => {
        handleClose2();

        let data = {
            "league_id": id,
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

    // delete
    const remove = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
              method: "DELETE",
              headers: {
                  'Content-Type': 'application/json',
              },
              url: "http://localhost:8088/api/League/"+ id,
          }).then((response) => {
              if(response.data.status === 200){
                  setStatus(true)
                  Swal.fire({
                    text:"data has been deleted",
                    icon: "success",
                    });
              }
          }).catch((error)=> {
              console.log(error)
          }).finally(()=>{
              setStatus(false)
          })
        }
      });
    };

    

    return (
        <>
            <Container
                className="mt-3"
            >
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
                                        <a href="#" onClick={() => handleEdit(x)}>edit </a>
                                        | 
                                        <a href="#" onClick={() => remove(x.league_id)}>delete</a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                
                {/* modal add*/}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add League</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" id="league_id"  onChange={e => setId(e.target.value)}></input>
                        <input type="text" id="name"   onChange={e => setName(e.target.value)}></input>
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

                {/* modal update */}
                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update League</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" id="league_id"  value={id} onChange={e => setId(e.target.value)}></input>
                        <input type="text" id="name"  value={name} onChange={e => setName(e.target.value)}></input>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onUpdate}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>;
        </>

    )
}


export default League;