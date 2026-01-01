import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Badge } from 'react-bootstrap'
import axios from 'axios'

const DiagnosisList = () => {
  const [diagnoses, setDiagnoses] = useState([])
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    status: 'Active',
  })
  const [editId, setEditId] = useState(null)

  // ✅ Fetch diagnosis list
  const fetchDiagnoses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/diagnoses')
      setDiagnoses(res.data)
    } catch (err) {
      console.error('❌ Error fetching diagnoses:', err)
    }
  }

  useEffect(() => {
    fetchDiagnoses()
  }, [])

  // ✅ Save diagnosis
  const handleSave = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/diagnoses/${editId}`, formData)
      } else {
        await axios.post('http://localhost:5000/api/diagnoses', formData)
      }
      setShow(false)
      resetForm()
      fetchDiagnoses()
    } catch (err) {
      console.error('❌ Error saving:', err)
    }
  }

  const handleEdit = (d) => {
    setFormData(d)
    setEditId(d.id)
    setShow(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    try {
      await axios.delete(`http://localhost:5000/api/diagnoses/${id}`)
      fetchDiagnoses()
    } catch (err) {
      console.error('❌ Error deleting:', err)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', code: '', status: 'Active' })
    setEditId(null)
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Diagnosis Lists</h3>
        <Button onClick={() => setShow(true)}>+ Add Diagnosis List</Button>
      </div>

      {/* ✅ Table */}
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
          {diagnoses.length > 0 ? (
            diagnoses.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.code}</td>
                <td>
                  <Badge bg={d.status === 'Active' ? 'success' : 'secondary'}>
                    {d.status.toUpperCase()}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(d.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No diagnosis lists found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ✅ Modal */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Diagnosis List' : 'Add New Diagnosis List'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter diagnosis list name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter diagnosis list code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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

export default DiagnosisList
