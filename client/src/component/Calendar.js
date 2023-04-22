import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPligin from '@fullcalendar/timegrid';
import InteractionPlugin from "@fullcalendar/interaction";
import ListPlugin from "@fullcalendar/list";
import Datetime from 'react-datetime';
import Popup from 'reactjs-popup';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import *as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-datetime/css/react-datetime.css';
import NavbarCalendar from '../pages/NavbarCalendar';






export default function () {

  const [username, setuserName] = useState("");
  const [title, setTitle] = useState("");
  const [roomName, setroomName] = useState("Big Room");
  const [StartTime, setStartTime] = useState(new Date());
  const [EndTime, setEndTime] = useState(new Date());
  const [availability, setAvailability] = useState(true);
  const [Data, setData] = useState([]); // store the post data
  const [eventData, setEventData] = useState([]); // store the Display data
  const [RowData, setRowData] = useState([]);
  const [ViewShow, setViewShow] = useState(false);
  const handleViewShow = () => { setViewShow(true) }
  const handleViewClose = () => { setViewShow(false) }


  // For Edit Modal*****
  const [ViewEdit, setEditShow] = useState(false);
  const handleEditShow = () => { setEditShow(true) }
  const handleEditClose = () => { setEditShow(false) }

  // For delete Modal*****
  const [ViewDelete, setDeleteShow] = useState(false);
  const handleDeletShow = () => { setDeleteShow(true) }
  const handleDeleteClose = () => { setDeleteShow(false) }

  // For Add new data Modal*****
  const [ViewPost, setPostShow] = useState(false);
  const handlePostShow = () => { setPostShow(true) }
  const handlePostClose = () => { setPostShow(false) }

  const [Delete, setDelete] = useState(false);
  //id for update record and delete
  const [id, setId] = useState("");



  const handleclick = async (event) => {
    event.preventDefault();
    const payload = {
      username: username,
      title: title,
      roomName: roomName,
      StartTime: StartTime,
      EndTime: EndTime,
      availability: availability
    }
    const config = { headers: { "Content-Type": "Application/json" } }
    await axios.post('http://localhost:4000/create-event', payload, config)

      .then(() => { alert("Event is Confirmed") })
      .catch((e) => { alert("The slot is already booked") })
    .catch((e) => { alert("EndTime cannot be less than StartTime") })
    window.location.reload()
    // .then(() => { console.log("added data from axios") })
    // .catch((e) => { alert("EndTime cannot be less than StartTime") })

  }

  useEffect(() => {
    axios.get('http://localhost:4000/get-events')
      .then((d) => {
        const cdata = d.data.map(item => {
          return { username: item.username, title: item.title, date: item.StartTime, EndTime }
        })
        setData(cdata)
      })
      .catch((e) => { console.log(e) })

  }, [])

  //this api Display Event 

  useEffect(() => {
    axios.get('http://localhost:4000/get-events')
      .then((d) => {

        setEventData(d.data)
      })
      .catch((e) => { console.log(e) })

  }, [])



  //Update the Event
  const handleEdit = () => {
    const Credentials = { title, roomName, StartTime, EndTime, availability }
    axios.put(`http://localhost:4000/update-event/${id}`, Credentials)
      .then((d) => {
        setData(d.data)
      })
      .catch((e) => { console.log(e) })
    window.location.reload();

  }

  //handle delete function

  const handleDelete = () => {

    axios.delete(`http://localhost:4000/delete-event/${id}`)
      .then((d) => {
        setData(d.data)
      })
      .catch((e) => { console.log(e) })
    window.location.reload();

  }






  return (
    <div>
      <NavbarCalendar />
      <div>

        <div className='text-center'>
          <Popup trigger=
            {<Button className='text-black' style={{ backgroundColor: 'skyblue' }}><i className='fa fa-plu'></i>𝐒𝐜𝐡𝐞𝐝𝐮𝐥𝐞 𝐌𝐞𝐞𝐭𝐢𝐧𝐠</Button>}
            position="bottom right" backgroundColor="black">
            <div>
              {/* <form onSubmit={handleclick} style={{ backgroundColor: "pink" }}>

                            <input placeholder="Enter Your Name" value={username} onChange={e => setuserName(e.target.value)} required='Please enter your Name' />
                            <input placeholder="Enter Event Title" value={title} onChange={e => setTitle(e.target.value)} required='Please enter your Title' />
                            <select placeholder="Select Room" value={roomName} onChange={e => setroomName(e.target.value)} required='Please Select your Room'>
                                <option>Big Room</option>
                                <option>Small Room</option>
                                <option>Booth One</option>
                                <option>Booth Two</option>
                            </select>
                            <div>
                                <label className='text-darkBlack' >StartTime</label>
                                <Datetime value={StartTime} onChange={date => setStartTime(date)} required='Start time is misiing' />
                            </div>
                            <div>
                                <label className='text-darkBlack'>EndTime</label>
                                <Datetime value={EndTime} onChange={date => setEndTime(date)} required='End Time is Missing' />
                            </div>
                            <button className='text-white' style={{ background: 'gray' }} >Add Event</button>
                        </form> */}

              {/* <form onSubmit={handleclick} style={{ backgroundColor: "pink" }}>
                            <input placeholder="Enter Your Name" value={username} onChange={e => setuserName(e.target.value)} required='Please enter your Name' />
                            <input placeholder="Enter Event Title" value={title} onChange={e => setTitle(e.target.value)} required='Please enter your Title' />
                            <select placeholder="Select Room" value={roomName} onChange={e => setroomName(e.target.value)} required='Please Select your Room'>
                                <option>Big Room</option>
                                <option>Small Room</option>
                                <option>Booth One</option>
                                <option>Booth Two</option>
                            </select>
                            <div>
                                <label className='text-darkBlack' >Start and End Time</label>
                                <Datetime value={[StartTime, EndTime]} onChange={value => { setStartTime(value[0]); setEndTime(value[1]) }} required='Time is missing' range={true} />
                            </div>
                            <button className='text-white' style={{ background: 'gray' }}>Add Event</button>
                        </form> */}

              <form onSubmit={handleclick} style={{ backgroundColor: 'pink', padding: '20px', borderRadius: '5px', width: '350px' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: '#444' }}>Enter Your Name</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setuserName(e.target.value)}
                  required='please enter your name'
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
                />
                <label style={{ display: 'block', marginBottom: '10px', color: '#444' }}>Enter Event Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required='please provide a title'
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
                />
                <label style={{ display: 'block', marginBottom: '10px', color: '#444' }}>Select Room</label>
                <select
                  value={roomName}
                  onChange={e => setroomName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
                >

                  <option value="Big Room">Big Room</option>
                  <option value="Small Room">Small Room</option>
                  <option value="Booth One">Booth One</option>
                  <option value="Booth Two">Booth Two</option>
                </select>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                  <label style={{ marginBottom: '10px', color: '#444' }}>Start Time</label>
                  <Datetime
                    value={StartTime}
                    onChange={date => setStartTime(date)}
                    required
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '5px' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}>
                  <label style={{ marginBottom: '10px', color: '#444' }}>End Time</label>
                  <Datetime
                    value={EndTime}
                    onChange={date => setEndTime(date)}
                    required
                    style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '5px' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: '#444', color: '#fff', padding: '10px 20px', borderRadius: '3px', border: 'none' }}>Add Event</button>
              </form>
            </div>

          </Popup>
        </div>

        <section style={{ backgroundColor: 'white' }}>
          <div style={{ position: "relative", zIndex: 0 }}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPligin, InteractionPlugin, ListPlugin]}
              initialView="dayGridMonth"
              events={Data}
              headerToolbar={{
                start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
                center: 'title',
                end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",// will normally be on the right. if RTL, will be on the left
                eventColor: '#378006',
              }}
              height="80vh"
              eventBackgroundColor="green"
              eventDidMount={(info) => {
                return new bootstrap.Popover(info.el, {
                  title: info.event.title,
                  placement: "auto",
                  trigger: "hover",
                  customClass: "PopoverStyle",
                  content: " ",
                  html: true,
                });
              }}
            />



          </div>

        </section>

        <div className='row'>
          <div className='mt-5 mb-4'>

            <h2 className='text-center'>🅴🆅🅴🅽🆃🆂</h2>

            {/* <Button varient='primary' onClick={() => { handlePostShow() }} ><i className='fa fa-plu'></i>Add New event</Button> */}

            {/* <Button varient='primary'  onClick={() => { handlePostShow() }} ><i className='fa fa-plu'></i>Add New event</Button> */}

          </div>
        </div>

        <div className='row'>
          <div className='table-responsive'>
            <table className='table table-striped table-hover table-bordered'>
              <thead className='bg-warning text-white'>
                <tr>
                  <th>Title</th>
                  <th>Room Name</th>
                  <th>StartTime</th>
                  <th>EndTime</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  eventData.map((item) =>
                    <tr key={item._id}>
                      <td>{item.title}</td>
                      <td>{item.roomName}</td>
                      <td>{item.StartTime}</td>
                      <td>{item.EndTime}</td>
                      <td style={{ minWidth: 190 }}>
                        <Button size='sm' varient='primary' style={{ backgroundColor: 'Green' }} onClick={() => { handleViewShow(setRowData(item)) }}>View</Button>|
                        <Button size='sm' varient='warning' className='text-black' style={{ backgroundColor: 'yellow' }} onClick={() => { handleEditShow(setRowData(item), setId(item._id)) }}>Edit</Button>|
                        <Button size='sm' varient='danger' style={{ backgroundColor: 'Red' }} onClick={() => { handleViewShow(setRowData(item), setId(item._id), setDelete(true)) }}>Delete</Button>
                      </td>
                    </tr>

                  )}
              </tbody>
            </table>
          </div>
        </div>


        {/* create modal for view data */}
        <div className='model-box-view'>
          <Modal
            show={ViewShow}
            onHide={handleViewClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Event Detail</Modal.Title>

            </Modal.Header>
            <Modal.Body>
              <div>
                <div>
                  <div className='form-group'>
                    <input type='text' className='form-control' required value={RowData.title} readOnly />
                  </div>
                </div>
                <div>
                  <div className='form-group mt-3'>
                    <input type='text' className='form-control' required value={RowData.roomName} readOnly />
                  </div>
                </div>
                <div>
                  <div className='form-group mt-3'>
                    <input type='text' className='form-control' required value={RowData.StartTime} readOnly />
                  </div>
                </div>
                <div>
                  <div className='form-group mt-3'>
                    <input type='text' className='form-control' required value={RowData.EndTime} readOnly />
                  </div>
                </div>



              </div>
              {
                Delete && (
                  <Button type='submit' style={{ backgroundColor: 'red' }} className='btn btn-danger mt-4' onClick={handleDelete}>Confirm Again</Button>
                )
              }


            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' className='text-black' style={{ backgroundColor: 'Gray' }} onClick={handleViewClose}>Close</Button>
            </Modal.Footer>

          </Modal>
        </div>

        {/* modal for Submit data to database */}

        <div className='model-box-view'>
          <Modal
            show={ViewPost}
            onHide={handlePostClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Book Your Conference Meeting</Modal.Title>

            </Modal.Header>
            <Modal.Body>
              <div>
                <div className='form-group'>
                  <input type='text' className='form-control' required value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Please Enter your Title' />
                </div>

                <div>
                  <div className='form-group mt-3'>
                    <label style={{ color: "blue" }}>Select your Room</label>
                    <select placeholder="Select Room" value={roomName} required onChange={e => setroomName(e.target.value)}>
                      <option>  </option>
                      <option>RoomOne</option>
                      <option>RoomTwo</option>
                      <option>RoomThree</option>
                      <option>RoomFour</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className='form-group mt-3'>
                    <label style={{ color: "blue" }}>StartTime</label>
                    <Datetime value={StartTime} required onChange={date => setStartTime(date)} />
                    {/* <Datetime type='text' className='form-control' value={StartTime} onChange={Datetime => setStartTime(Datetime)} placeholder='Event Start Time' /> */}
                  </div>
                </div>
                <div>
                  <div className='form-group mt-3'>
                    <label style={{ color: "blue" }}>EndTime</label>
                    <Datetime value={EndTime} required onChange={date => setEndTime(date)} />
                    {/* <Datetime type='text' className='form-control' value={EndTime} onChange={Datetime => setEndTime(Datetime)} placeholder='Event End Time' /> */}
                  </div>
                </div>

                <Button type='submit' className='btn btn-success mt-4' onClick={handleclick}>Add new Event</Button>
                {/* <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmit}>Add new Event</Button> */}

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' className='text-black' style={{ backgroundColor: 'yellow' }} onClick={handlePostClose}>Close</Button>
            </Modal.Footer>

          </Modal>
        </div>

        {/* modal for Edit data to database */}

        <div className='model-box-view'>
          <Modal
            show={ViewEdit}
            onHide={handleEditClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Book Your Conference Meeting</Modal.Title>

            </Modal.Header>
            <Modal.Body>
              <div>
                <div className='form-group'>
                  <lable>Title</lable>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required defaultValue={RowData.title}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
                  />

                  {/* <input type='text' className='form-control' required='Enter your Title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Please Enter your Title' defaultValue={RowData.title} /> */}
                </div>

                <div>
                  <select
                    value={roomName}
                    onChange={e => setroomName(e.target.value)} defaultValue={RowData.roomName}
                    required
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '15px' }}
                  >

                    <option value="Big Room">Big Room</option>
                    <option value="Small Room">Small Room</option>
                    <option value="Booth One">Booth One</option>
                    <option value="Booth Two">Booth Two</option>
                  </select>
                  {/* <div className='form-group mt-3'>
                                    <label style={{ color: "blue" }}>Select your Room</label>
                                    <select placeholder="Select Room" required='please Select a room' value={roomName}  onChange={e => setroomName(e.target.value)} defaultValue={RowData.roomName}>
                                        <option>Big Room</option>
                                        <option>Small Room</option>
                                        <option>Booth One</option>
                                        <option>Booth Two</option>
                                    </select>
                                </div> */}
                </div>
                <div>
                  <div className='form-group mt-3'>
                    <label style={{ color: "blue" }}>StartTime</label>
                    <Datetime
                      value={StartTime}
                      onChange={date => setStartTime(date)}
                      defaultValue={RowData.StartTime}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '5px' }}
                    />
                    {/* <Datetime type='text' required="start time is missing" className='form-control' value={StartTime} onChange={(e) => setStartTime(e)} placeholder='Event Start Time' defaultValue={RowData.StartTime} /> */}
                  </div>
                </div>
                <div>
                  <div className='form-group mt-3'>
                    <label style={{ color: "blue" }}>EndTime</label>
                    <Datetime
                      value={EndTime}
                      onChange={date => setEndTime(date)}
                      defaultValue={RowData.EndTime}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '3px', marginBottom: '5px' }}
                    />
                    {/* <Datetime type='text' required="end time is missing" className='form-control' value={EndTime} onChange={(e) => setEndTime(e)} placeholder='Event End Time' defaultValue={RowData.EndTime} /> */}
                  </div>
                </div>
                <Button type='submit' style={{ backgroundColor: 'skyblue' }} className='btn btn-warning mt-4' onClick={handleEdit}>Update</Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' className='text-black' style={{ backgroundColor: 'gray' }} onClick={handleEditClose}>Close</Button>
            </Modal.Footer>

          </Modal>
        </div>

      </div>
    </div>


  )
}


