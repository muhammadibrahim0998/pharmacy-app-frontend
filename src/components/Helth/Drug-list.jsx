import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Dropdown } from 'react-bootstrap'
import axios from 'axios'

const DrugList = () => {
  const [show, setShow] = useState(false)
  const [drugs, setDrugs] = useState([])
  const [formData, setFormData] = useState({ id: null, name: '', code: '', status: 'Active' })
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    fetchDrugs()
  }, [])

  const fetchDrugs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/drugs_list')
      setDrugs(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleClose = () => {
    setShow(false)
    setFormData({ id: null, name: '', code: '', status: 'Active' })
    setIsEdit(false)
  }

  const handleShow = () => setShow(true)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/drugs_list/${formData.id}`, formData)
      } else {
        await axios.post('http://localhost:5000/api/drugs_list', formData)
      }
      fetchDrugs()
      handleClose()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/drugs_list/${id}`)
      fetchDrugs()
    } catch (err) {
      console.error(err)
    }
  }

  const handleEdit = (drug) => {
    setFormData({
      id: drug.id,
      name: drug.name,
      code: drug.code,
      status: drug.status,
    })
    setIsEdit(true)
    setShow(true)
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Drug Lists</h5>
        <Button variant="primary" onClick={handleShow}>
          Add Drug List
        </Button>
      </div>

      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>name</th>
            <th>code</th>
            <th>status</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.length > 0 ? (
            drugs.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.code}</td>
                <td style={{ color: d.status === 'Active' ? 'green' : 'red', fontWeight: 'bold' }}>
                  {d.status}
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle size="sm" variant="secondary">
                      ...
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleEdit(d)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(d.id)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Drug List Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Drug' : 'Add Drug List'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>code</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option>Active</option>
                <option>Inactive</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {isEdit ? 'Update' : 'Save'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DrugList
