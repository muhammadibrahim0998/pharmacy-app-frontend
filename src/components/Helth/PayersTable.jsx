import React, { useState, useEffect } from 'react'
import { Table, Button, Dropdown, Modal, Form } from 'react-bootstrap'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/payers'

const PayersTable = () => {
  const [payers, setPayers] = useState([])
  const [show, setShow] = useState(false)
  const [newPayer, setNewPayer] = useState({
    Name: '',
    Code: '',
    Status: 'ACTIVE',
  })

  // Fetch all payers
  const fetchPayers = async () => {
    try {
      const res = await axios.get(API_URL)
      setPayers(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPayers()
  }, [])

  // Modal toggle
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // Form input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPayer((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Save new payer
  const handleSave = async () => {
    if (!newPayer.Name || !newPayer.Code) return
    try {
      await axios.post(API_URL, newPayer)
      fetchPayers()
      setNewPayer({ Name: '', Code: '', Status: 'ACTIVE' })
      handleClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Payers List</h5>
        <Button variant="primary" onClick={handleShow}>
          Add Payer
        </Button>
      </div>

      {/* Table */}
      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Status</th>
            <th style={{ width: '120px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payers.length > 0 ? (
            payers.map((payer) => (
              <tr key={payer.Id}>
                <td>{payer.Name}</td>
                <td>{payer.Code}</td>
                <td>
                  <span
                    className={`badge ${payer.Status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}
                  >
                    {payer.Status}
                  </span>
                </td>
                <td>
                  {/* Actions dropdown (inactive) */}
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm">
                      ⋮
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>View HA Credential</Dropdown.Item>
                      <Dropdown.Item>Register HA Credential</Dropdown.Item>
                      <Dropdown.Item>Update Payer</Dropdown.Item>
                      <Dropdown.Item>Deactivate</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No payers found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter payer name"
                name="Name"
                value={newPayer.Name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter payer code"
                name="Code"
                value={newPayer.Code}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select name="Status" value={newPayer.Status} onChange={handleChange}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PayersTable
