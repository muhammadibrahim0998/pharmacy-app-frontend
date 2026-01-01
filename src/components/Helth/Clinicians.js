import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const Clinicians = () => {
  const [clinicians, setClinicians] = useState([])
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    specialty: '',
    licensenumber: '',
    phone: '',
    status: 'active',
  })
  const [editId, setEditId] = useState(null)

  const fetchClinicians = async () => {
    const res = await axios.get('http://localhost:5000/api/clinicians')
    setClinicians(res.data)
  }

  useEffect(() => {
    fetchClinicians()
  }, [])

  const handleSave = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/api/clinicians/${editId}`, formData)
    } else {
      await axios.post('http://localhost:5000/api/clinicians', formData)
    }
    setShow(false)
    setEditId(null)
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      specialty: '',
      licensenumber: '',
      phone: '',
      status: 'active',
    })
    fetchClinicians()
  }

  const handleEdit = (clinician) => {
    setFormData(clinician)
    setEditId(clinician.id)
    setShow(true)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/clinicians/${id}`)
    fetchClinicians()
  }

  return (
    <div className="p-4">
      {/* Header with Add button on right */}
      <Row className="mb-3 align-items-center">
        <Col>
          <h3>Clinicians</h3>
        </Col>
        <Col className="text-end">
          <Button onClick={() => setShow(true)}>+ Add Clinician</Button>
        </Col>
      </Row>

      {/* Table */}
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Specialty</th>
            <th>License Number</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clinicians.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.firstname}</td>
              <td>{c.lastname}</td>
              <td>{c.email}</td>
              <td>{c.specialty}</td>
              <td>{c.licensenumber}</td>
              <td>{c.phone}</td>
              <td>{c.status}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(c)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Clinician' : 'Add Clinician'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Firstname</Form.Label>
              <Form.Control
                type="text"
                value={formData.firstname}
                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Lastname</Form.Label>
              <Form.Control
                type="text"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                type="text"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.licensenumber}
                onChange={(e) => setFormData({ ...formData, licensenumber: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>

            {/* Dropdown for status */}
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Clinicians
