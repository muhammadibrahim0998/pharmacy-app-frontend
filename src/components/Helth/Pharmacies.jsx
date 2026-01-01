import React, { useState, useEffect } from 'react'
import { Table, Button, Card, Modal, Form } from 'react-bootstrap'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/pharmacies'

const PharmaciesTable = () => {
  const [pharmacies, setPharmacies] = useState([])
  const [show, setShow] = useState(false)
  const [editId, setEditId] = useState(null)

  const [formData, setFormData] = useState({
    PharmacyName: '',
    Email: '',
    Address: '',
    ContactInfo: '',
    HealthAuthority: '',
  })

  useEffect(() => {
    fetchPharmacies()
  }, [])

  const fetchPharmacies = async () => {
    try {
      const res = await axios.get(API_URL)
      setPharmacies(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleClose = () => {
    setShow(false)
    setEditId(null)
    setFormData({
      PharmacyName: '',
      Email: '',
      Address: '',
      ContactInfo: '',
      HealthAuthority: '',
    })
  }
  const handleShow = () => setShow(true)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // ✅ Create or Update Pharmacy
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData)
      } else {
        await axios.post(API_URL, formData)
      }
      fetchPharmacies()
      handleClose()
    } catch (err) {
      console.error(err)
    }
  }

  // ✅ Edit
  const handleEdit = (pharmacy) => {
    setFormData({
      PharmacyName: pharmacy.PharmacyName,
      Email: pharmacy.Email,
      Address: pharmacy.Address,
      ContactInfo: pharmacy.ContactInfo,
      HealthAuthority: pharmacy.HealthAuthority,
    })
    setEditId(pharmacy.Id)
    setShow(true)
  }

  // ✅ Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pharmacy?')) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        fetchPharmacies()
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className="p-3">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Registered Pharmacies</h6>
          <Button variant="primary" onClick={handleShow}>
            Add Pharmacy
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          <Table striped bordered hover responsive className="mb-0">
            <thead>
              <tr>
                <th>PharmacyName</th>
                <th>Email</th>
                <th>Address</th>
                <th>ContactInfo</th>
                <th>HealthAuthority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pharmacies.map((pharmacy) => (
                <tr key={pharmacy.Id}>
                  <td>{pharmacy.PharmacyName}</td>
                  <td>{pharmacy.Email}</td>
                  <td>{pharmacy.Address}</td>
                  <td>{pharmacy.ContactInfo}</td>
                  <td>{pharmacy.HealthAuthority}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(pharmacy)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(pharmacy.Id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Pharmacy' : 'Add New Pharmacy'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>PharmacyName</Form.Label>
              <Form.Control
                type="text"
                name="PharmacyName"
                value={formData.PharmacyName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>ContactInfo</Form.Label>
              <Form.Control
                type="text"
                name="ContactInfo"
                value={formData.ContactInfo}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>HealthAuthority</Form.Label>
              <Form.Control
                type="text"
                name="HealthAuthority"
                value={formData.HealthAuthority}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success">
              {editId ? 'Update' : 'Save'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default PharmaciesTable
