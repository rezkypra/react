import axios from "axios";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
 
function LoadingButton({ onClick, isLoading, children }) {
    return (
      <Button variant="primary" disabled={isLoading} onClick={onClick}>
        {isLoading ? 'Loading...' : children}
      </Button>
    );
  }

let TravelEmployee = () => {
    const [data, setData] = useState([{}])
    const [status, setStatus] = useState(false);
    const [isLoading, setLoading] = useState(false);
    
    const [dataemployee, setDataemployee] = useState([{}])

    const [travel_id, setTravel_id] = useState(0)
    const [employee, setEmployee] = useState([{}])
    const [departure, setDeparture] = useState("")
    const [duration, setDuration] = useState("")
    const [go_back, setGo_back] = useState("")
    const [destination, setDestination] = useState("")
    const [transportation, setTransportation] = useState("")
    const [remarks, setRemarks] = useState("")
    const [status_manager, setStatus_manager] = useState("pending")
    const [status_hr, setStatus_hr] = useState("pending")
    const [pending_value, setPendingValue] = useState("pending")
    const [showReportModal, setShowReportModal] = useState(false);

    const dataDummy = {
        "data": [
            {
                "travel_id": 9,
                "employee": {
                    "employee_id": 10,
                    "name": "ramadhan",
                    "address": null,
                    "phone_number": null,
                    "email": "ramadhan@gmail.com"
                },
                "departure": "2023-08-26T19:41:00.000+00:00",
                "duration": 2,
                "go_back": "2023-08-28T19:41:00.000+00:00",
                "destination": "bandung",
                "transportation": "darat",
                "remarks": "meet",
                "status_manager": "pending",
                "status_hr": "reject"
            },
            {
                "travel_id": 11,
                "employee": {
                    "employee_id": 10,
                    "name": "ramadhan",
                    "address": null,
                    "phone_number": null,
                    "email": "ramadhan@gmail.com"
                },
                "departure": "2023-08-25T05:48:00.000+00:00",
                "duration": 3,
                "go_back": "2023-08-28T05:48:00.000+00:00",
                "destination": "jogja",
                "transportation": "darat",
                "remarks": "meet",
                "status_manager": "accept",
                "status_hr": "accept"
            }
        ],
        "message": "All Datas Retrieved",
        "status": 200
    }

    const [posttravel_id, setPostravel_id] = useState(0)
    const [employee_id, setEmployeeId] = useState(0)


    //get all
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8088/api/travel"
        }).then((response) => {
            // console.log(response.data.data)
            setData(response.data.data);
            // console.log(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [status])

    //get all employee
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8088/api/employee"
        }).then((response) => {
            setDataemployee(response.data.data);
        }).catch((error) => {
            console.log(error)
        })
    }, [status])

    //add request

    const requestShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const  onSubmit = () => {
        handleClose();

        let data = {
            "travel_id": travel_id,
            "employee" : {"employee_id": employee_id},
            "departure": departure,
            "duration": duration,
            "go_back": go_back,
            "destination": destination,
            "transportation": transportation,
            "remarks": remarks,
            "status_manager": "pending",
            "status_hr": "pending"
        }

        axios({
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            url: "http://localhost:8088/api/travel",
            data:JSON.stringify(data)
        }).then((response) => {
            if(response.data.status === 200){
                setStatus(true)
                console.log(setStatus)
                
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setStatus(false)
        })
    }

    //add report
    const handleReport = (rowData) => {
        console.log(rowData)
        setPostravel_id(rowData.travel_id);
        setEmployeeId(rowData.employee.employee_id)
        setDeparture(rowData.departure)
        setDuration(rowData.duration)
        setGo_back(rowData.go_back)
        setDestination(rowData.destination)
        setTransportation(rowData.transportation)
        setRemarks(rowData.remarks)
        setStatus_manager(rowData.status_manager);
        setStatus_hr(rowData.status_hr);
        setShowReportModal(true);

        reportShow();
    }

    const handleCloseReportModal = () => setShowReportModal(false);
    const reportShow = () => setShow2(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);

    const  onReport = () => {
        setLoading(true);
        handleClose2();

        let data = {
            "posttravel_id": posttravel_id,
            "employee": {"employee_id":employee_id},
            "departure": departure,
            "duration": duration,
            "go_back": go_back,
            "destination": destination,
            "transportation": transportation,
            "remarks": remarks,
            "status_manager": "pending",
            "status_hr": "pending"
        }

        axios({
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            url: "http://localhost:8088/api/posttravel",
            data:JSON.stringify(data)
        }).then((response) => {
            if(response.data.status === 200){
                setStatus(true)
                console.log(setStatus)
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setStatus(false)
            setLoading(false); // End loading
            setShowReportModal(false); // Close the modal
        })
    }
    
    return(
        <>
            <Container
                className="mt-3"
            >
                {/* <button onClick={handleShow}>Create</button> */}
                <Button variant="primary" onClick={requestShow}>
                    Add Request
                </Button>
                
                {/* table */}
                <Table className="table" striped bordered hover variant="success">
                    <thead >
                        <tr>
                            <th style={{ verticalAlign: "middle" }}>ID</th>
                            <th style={{ verticalAlign: "middle" }}>Employe Name</th>
                            <th style={{ verticalAlign: "middle" }}>Departure</th>
                            <th style={{ verticalAlign: "middle" }}>Duration</th>
                            <th style={{ verticalAlign: "middle" }}>Return</th>
                            <th style={{ verticalAlign: "middle" }}>Destination</th>
                            <th style={{ verticalAlign: "middle" }}>Transportation</th>
                            <th style={{ verticalAlign: "middle" }}>Remarks</th>
                            <th style={{ verticalAlign: "middle" }}>Status Manager</th>
                            <th style={{ verticalAlign: "middle" }}>Status HR</th>
                            <th style={{ verticalAlign: "middle" }}>Reporting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(x => {
                            return (
                                <tr key={x.travel_id}>
                                    <td style={{ verticalAlign: "middle" }}>{x.travel_id}</td>
                                    <td style={{ verticalAlign: "middle" }}>{x?.employee?.name}</td>
                                    <td style={{ verticalAlign: "middle" }}>{x.departure}</td>
                                    <td>{x.duration}</td>
                                    <td>{x.go_back}</td>
                                    <td>{x.destination}</td>
                                    <td>{x.transportation}</td>
                                    <td>{x.remarks}</td>
                                    <td>{x.status_manager}</td>
                                    <td>{x.status_hr}</td> 
                                    <td>
                                        <LoadingButton
                                            onClick={() => handleReport(x)}
                                            isLoading={isLoading}
                                        >
                                            Add
                                        </LoadingButton>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {/* end table */}

                {/* modal add*/}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" id="travel_id" onChange={e => setTravel_id(e.target.value)} hidden></input>
                        
                        <select id="employee_id" onChange={e => setEmployeeId(e.target.value)} value={employee_id}>
                            {dataemployee.map(x => (
                                <option key={x.employee_id} value={x.employee_id}>{x.name}</option>
                            ))}
                        </select>

                        <input type="datetime-local" id="departure"   onChange={e => setDeparture(e.target.value)} ></input>
                        
                        <label for="destination"> destination:</label>
                        <input type="text" id="destination" onChange={e => setDestination(e.target.value)}></input>
                        
                        <label for="duration"> duration:</label>
                        <input type="text" id="duration"  onChange={e => setDuration(e.target.value)} ></input>

                        <label for="Return"> Return :</label>
                        <input type="datetime-local" id="go_back" onChange={e => setGo_back(e.target.value)}></input>

                        <label for="transportation"> transportation:</label>
                        <input type="text" id="transportation" onChange={e => setTransportation(e.target.value)} ></input>

                        <label for="remarks"> remarks:</label>
                        <input type="text" id="remarks"  onChange={e => setRemarks(e.target.value)}></input>

                        <input type="text" id="status_manager" onChange={e => setStatus_manager(e.target.value)} hidden></input>
                        <input type="text" id="status_hr" onChange={e => setStatus_hr(e.target.value)} hidden></input>
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
                {/* end modal add */}

                {/* modal add Reporting */}
                <Modal show={showReportModal} onHide={handleCloseReportModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Reporting</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" id="travel_id"  value={travel_id} onChange={e => setTravel_id(e.target.value)} hidden></input>

                        <label for="employee_id"> employee_id:</label>
                        <input type="text" id="employee_id"  value={employee_id} onChange={e => setEmployeeId(e.target.value)} readOnly></input>

                        <input type="datetime-local" id="departure"  value={departure} onChange={e => setDeparture(e.target.value)} hidden></input>
                        
                        <label for="destination"> destination:</label>
                        <input type="text" id="destination"  value={destination} onChange={e => setDestination(e.target.value)}></input>
                        
                        <label for="duration"> duration:</label>
                        <input type="text" id="duration"  value={duration} onChange={e => setDuration(e.target.value)} ></input>

                        <label for="Return"> Return :</label>
                        <input type="datetime-local" id="go_back"  value={go_back} onChange={e => setGo_back(e.target.value)}></input>
                        <input type="text" id="transportation"  value={transportation} onChange={e => setTransportation(e.target.value)} hidden></input>

                        <label for="remarks"> remarks:</label>
                        <input type="text" id="remarks"  value={remarks} onChange={e => setRemarks(e.target.value)} readOnly></input>

                        <input type="text" id="status_manager"  value={status_manager} onChange={e => setStatus_manager(e.target.value)}hidden></input>
                        <input type="text" id="status_hr"  value={status_hr} onChange={e => setStatus_hr(e.target.value)}hidden></input>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseReportModal}>
                        Close
                    </Button>
                    <LoadingButton onClick={onReport} isLoading={isLoading}>
                        Save Changes
                    </LoadingButton>
                    </Modal.Footer>
                </Modal>
                {/* end modal add Reporting */}
            </Container>
        </>
    )
}

export default TravelEmployee;