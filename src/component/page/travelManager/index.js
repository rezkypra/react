import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { CDBCard, CDBCardBody, CDBDataTable, CDBContainer, CDBBtn, CDBIcon} from 'cdbreact';

import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';



let TravelManager = () => {
    const [data, setData] = useState([{}])
    const [status, setStatus] = useState(false);
    
    const [dataemployee, setDataemployee] = useState([{}])

    const [travel_id, setTravel_id] = useState(0)
    const [employee, setEmployee] = useState([{}])
    const [departure, setDeparture] = useState("")
    const [duration, setDuration] = useState("")
    const [go_back, setGo_back] = useState("")
    const [destination, setDestination] = useState("")
    const [transportation, setTransportation] = useState("")
    const [remarks, setRemarks] = useState("")
    const [status_manager, setStatus_manager] = useState("")
    const [status_hr, setStatus_hr] = useState("")

    const [employee_id, setEmployeeId] = useState(0)
    const [posttravel_id, setPostravel_id] = useState(0)
    
    useEffect(() => {
        
        axios({
            method: "GET",
            url: "http://localhost:8088/api/travel"
        }).then((response) => {
            setData(response.data.data)
            console.log()
        }).catch((error) => {
            console.log()
        })
    }, [status])
    
    
    
    // approval manager
    const handleManager = (rowData) => {
        setTravel_id(rowData.travel_id);
        setEmployee(rowData.employee)
        setDeparture(rowData.departure)
        setDuration(rowData.duration)
        setGo_back(rowData.go_back)
        setDestination(rowData.destination)
        setTransportation(rowData.transportation)
        setRemarks(rowData.remarks)
        setStatus_manager(rowData.status_manager);
        setStatus_hr(rowData.status_hr);

        managerShow();
    }
    const managerShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    
    // approval hr
    const handleHr = (rowData) => {
        setTravel_id(rowData.travel_id);
        setEmployee(rowData.employee)
        setDeparture(rowData.departure)
        setDuration(rowData.duration)
        setGo_back(rowData.go_back)
        setDestination(rowData.destination)
        setTransportation(rowData.transportation)
        setRemarks(rowData.remarks)
        setStatus_manager(rowData.status_manager);
        setStatus_hr(rowData.status_hr);

        hrShow();
    }
    
    const hrShow = () => setShow2(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);

    
    // modal approve
    const  onUpdate = () => {
        handleClose();
        handleClose2();

        let data = {
            "travel_id": travel_id,
            "employee": employee,
            "departure": departure,
            "duration": duration,
            "go_back": go_back,
            "destination": destination,
            "transportation": transportation,
            "remarks": remarks,
            "status_manager": status_manager,
            "status_hr": status_hr
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



    // modal add report
    const handleReport = (rowData) => {
        setPostravel_id(rowData.travel_id);
        setEmployee(rowData.employee)
        setDeparture(rowData.departure)
        setDuration(rowData.duration)
        setGo_back(rowData.go_back)
        setDestination(rowData.destination)
        setTransportation(rowData.transportation)
        setRemarks(rowData.remarks)
        setStatus_manager(rowData.status_manager);
        setStatus_hr(rowData.status_hr);

        reportShow();
    }
    const reportShow = () => setShow3(true);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);

    const  onReport = () => {
        handleClose3();

    let data = {
        "posttravel_id": posttravel_id,
        "employee": employee,
        "departure": departure,
        "duration": duration,
        "go_back": go_back,
        "destination": destination,
        "transportation": transportation,
        "remarks": remarks,
        "status_manager": status_manager,
        "status_hr": status_hr
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
        })
    };

    

    // return (
    //     <>
    const handleApprove = (id) => {
        setTravel_id(id.travel_id);
        setEmployeeId(id.employee.employee_id)
        setDeparture(id.departure)
        setDuration(id.duration)
        setGo_back(id.go_back)
        setDestination(id.destination)
        setTransportation(id.transportation)
        setRemarks(id.remarks)
        setStatus_manager(id.status_manager);
        setStatus_hr(id.status_hr);

        let data = {
            "travel_id": travel_id,
            "employee": {"employee_id":employee_id},
            "departure": departure,
            "duration": duration,
            "go_back": go_back,
            "destination": destination,
            "transportation": transportation,
            "remarks": remarks,
            "status_manager": "Approve",
            "status_hr": status_hr
        }

        Swal.fire({
            title: "Are you sure want to approve this request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!",
          }).then((result) => {
              if (result.isConfirmed) {
              axios({
                  method: "POST",
                  headers: {
                      'Content-Type': 'application/json',
                    },
                  url: "http://localhost:8088/api/travel",
                  data:JSON.stringify(data)
                }).then((response) => {
                    if(response.data.status === 200){
                        setStatus(true)
                        Swal.fire({
                            text:"Data has been approved",
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
    }

    const handleReject = (id) => {
        setTravel_id(id.travel_id);
        setEmployeeId(id.employee.employee_id)
        setDeparture(id.departure)
        setDuration(id.duration)
        setGo_back(id.go_back)
        setDestination(id.destination)
        setTransportation(id.transportation)
        setRemarks(id.remarks)
        setStatus_manager(id.status_manager);
        setStatus_hr(id.status_hr);

        let data = {
            "travel_id": travel_id,
            "employee": {"employee_id":employee_id},
            "departure": departure,
            "duration": duration,
            "go_back": go_back,
            "destination": destination,
            "transportation": transportation,
            "remarks": remarks,
            "status_manager": "Reject",
            "status_hr": status_hr
        }

        Swal.fire({
            title: "Are you sure want to reject this request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!",
          }).then((result) => {
              if (result.isConfirmed) {
              axios({
                  method: "POST",
                  headers: {
                      'Content-Type': 'application/json',
                    },
                  url: "http://localhost:8088/api/travel",
                  data:JSON.stringify(data)
                }).then((response) => {
                    if(response.data.status === 200){
                        setStatus(true)
                        Swal.fire({
                            text:"Data has been rejected",
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
    }

                {/* table */}
    const dataRows = data.map((x) => {
        return {
            travel_id: x.travel_id,
            employee: x?.employee?.name,
            departure: x.departure,
            duration: x.duration,
            go_back: x.go_back,
            destination: x.destination,
            transportation: x.transportation,
            remarks: x.remarks,
            status_manager: (
            <div>
                {x.status_manager}{' '}
                <CDBBtn color="success" variant="link" onClick={() => handleApprove(x)} circle style={{marginTop: "10px"}}>
                    {/* <CDBIcon icon="magic" className="ms-1" /> */}
                        Approve
                </CDBBtn>
                <CDBBtn color="danger" variant="link" onClick={() => handleReject(x)} circle style={{marginTop: "10px"}}>
                    Reject
                </CDBBtn>
            </div>
            ),
            // status_hr: (
            // <div>
            //     {x.status_hr}{' '}
            //     <CDBBtn color="secondary" variant="link" onClick={() => handleHr(x)} circle style={{marginTop: "10px"}}>
            //         {/* <CDBIcon icon="magic" className="me-1" /> */}
            //             Edit HR
            //     </CDBBtn>
            // </div>
            // ),
            // actions: (
            // <div>
            //     <CDBBtn color="info" variant="link" onClick={() => handleReport(x)} circle size="large" style={{marginTop: "10px"}}>
            //     Add Report
            //     </CDBBtn>
            // </div>
            // ),
        };
    });
    const tableData = {
        columns: [
            { label: 'ID', field: 'travel_id'},
            { label: 'Employe Name', field: 'employee' },
            { label: 'Departure', field: 'departure' },
            { label: 'Duration', field: 'duration' },
            { label: 'Return', field: 'go_back' },
            { label: 'Destination', field: 'destination' },
            { label: 'Transportation', field: 'transportation' },
            { label: 'Remarks', field: 'remarks' },
            { label: 'Status Manager', field: 'status_manager' },
            // { label: 'Status HR', field: 'status_hr' },
            // { label: 'Actions', field: 'actions' },
        ],
        rows: dataRows,
    };
                    
        // ...
    return (
    <>
        <Container className="mt-3" >
        <CDBContainer style={{margin: "10px"}}>
            <CDBCard >
            <CDBCardBody>
                <CDBDataTable
                striped
                bordered
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={tableData}
                sortable={false}
                materialSearch={true}
                />
            </CDBCardBody>
            </CDBCard>
        </CDBContainer>
        </Container>

        {/* modal approve manager */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Approve manager</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" id="travel_id"  value={travel_id} onChange={e => setTravel_id(e.target.value)} hidden></input>
                <input type="text" id="employee"  value={employee} onChange={e => setEmployee(e.target.value)} hidden></input>
                <input type="datetime-local" id="departure"  value={departure} onChange={e => setDeparture(e.target.value)} hidden></input>
                <input type="text" id="duration"  value={duration} onChange={e => setDuration(e.target.value)} hidden></input>
                <input type="datetime-local" id="go_back"  value={go_back} onChange={e => setGo_back(e.target.value)} hidden></input>
                <input type="text" id="destination"  value={destination} onChange={e => setDestination(e.target.value)} hidden></input>
                <input type="text" id="transportation"  value={transportation} onChange={e => setTransportation(e.target.value)} hidden></input>
                <input type="text" id="remarks"  value={remarks} onChange={e => setRemarks(e.target.value)} hidden></input>
                <select id="status_manager"  onChange={e => setStatus_manager(e.target.value)} value={status_manager}>
                <option value="pending" selected>pending</option>
                    <option value="accept">accept</option>
                    <option value="reject">reject</option>
                </select>
                <input type="text" id="status_hr"  value={status_hr} onChange={e => setStatus_hr(e.target.value)} hidden></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={onUpdate}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>

                    
        {/* modal approve hr*/}
        <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
            <Modal.Title>Approve HR</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <input type="text" id="travel_id"  value={travel_id} onChange={e => setTravel_id(e.target.value)} hidden></input>
                <input type="text" id="employee"  value={employee} onChange={e => setEmployee(e.target.value)} hidden></input>
                <input type="datetime-local" id="departure"  value={departure} onChange={e => setDeparture(e.target.value)} hidden></input>
                <input type="text" id="duration"  value={duration} onChange={e => setDuration(e.target.value)} hidden></input>
                <input type="datetime-local" id="go_back"  value={go_back} onChange={e => setGo_back(e.target.value)} hidden></input>
                <input type="text" id="destination"  value={destination} onChange={e => setDestination(e.target.value)} hidden></input>
                <input type="text" id="transportation"  value={transportation} onChange={e => setTransportation(e.target.value)} hidden></input>
                <input type="text" id="remarks"  value={remarks} onChange={e => setRemarks(e.target.value)} hidden></input>
                <input type="text" id="status_manager"  value={status_manager} onChange={e => setStatus_manager(e.target.value)}hidden></input>
                <select id="status_hr"  onChange={e => setStatus_hr(e.target.value)} value={status_hr}>
                <option value="pending" selected>pending</option>
                    <option value="accept">accept</option>
                    <option value="reject">reject</option>
                </select>
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

        {/* modal add Reporting */}
        <Modal show={show3} onHide={handleClose3}>
            <Modal.Header closeButton>
            <Modal.Title>Add Reporting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" id="travel_id"  value={travel_id} onChange={e => setTravel_id(e.target.value)} hidden></input>
                <input type="text" id="employee"  value={employee} onChange={e => setEmployee(e.target.value)} readOnly></input>
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
            <Button variant="secondary" onClick={handleClose3}>
                Close
            </Button>
            <Button variant="primary" onClick={onReport}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
);
};

export default TravelManager;