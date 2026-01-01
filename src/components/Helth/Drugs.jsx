import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Dropdown, InputGroup, FormControl } from 'react-bootstrap'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/drugs'

const Drugs = () => {
  const [show, setShow] = useState(false)
  const [editingDrug, setEditingDrug] = useState(null)
  const [drugs, setDrugs] = useState([])
  const [formData, setFormData] = useState({
    ndcCode: '',
    quantity: '',
    days: '',
    instructions: '',
  })
  const [search, setSearch] = useState('') // 🔹 Search state

  useEffect(() => {
    fetchDrugs()
  }, [])

  const fetchDrugs = async () => {
    try {
      const res = await axios.get(API_URL)
      setDrugs(res.data)
    } catch (error) {
      console.error('Error fetching drugs:', error)
    }
  }

  const handleClose = () => {
    setShow(false)
    setEditingDrug(null)
    setFormData({ ndcCode: '', quantity: '', days: '', instructions: '' })
  }

  const handleShow = (drug = null) => {
    if (drug) {
      setEditingDrug(drug)
      setFormData(drug)
    }
    setShow(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingDrug) {
        await axios.put(`${API_URL}/${editingDrug.id}`, formData)
      } else {
        await axios.post(API_URL, formData)
      }
      fetchDrugs()
      handleClose()
    } catch (error) {
      console.error('Error saving drug:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchDrugs()
    } catch (error) {
      console.error('Error deleting drug:', error)
    }
  }

  // 🔹 Filter drugs based on search input
  const filteredDrugs = drugs.filter(
    (d) =>
      d.ndcCode.toLowerCase().includes(search.toLowerCase()) ||
      d.instructions.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* 🔹 Search bar */}
        <InputGroup style={{ maxWidth: '300px' }}>
          <FormControl placeholder="Search..." value={search} onChange={handleSearch} />
        </InputGroup>

        <Button variant="primary" onClick={() => handleShow()}>
          + Add Drugs
        </Button>
      </div>

      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ndc drug code</th>
            <th>dispensed quantity</th>
            <th>days of supply</th>
            <th>instructions</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrugs.length > 0 ? (
            filteredDrugs.map((d) => (
              <tr key={d.id}>
                <td>{d.ndcCode}</td>
                <td>{d.quantity}</td>
                <td>{d.days}</td>
                <td>{d.instructions}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle size="sm" variant="secondary">
                      ...
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleShow(d)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(d.id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No drugs found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add / Edit Drugs Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingDrug ? 'Edit Drug' : 'Add Drug'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>ndc drug code</Form.Label>
              <Form.Control
                type="text"
                name="ndcCode"
                value={formData.ndcCode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>dispensed quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>days of supply</Form.Label>
              <Form.Control
                type="number"
                name="days"
                value={formData.days}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                type="text"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingDrug ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Drugs
