import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Dropdown } from 'react-bootstrap'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/drugTable'

const DrugTable = () => {
  const [show, setShow] = useState(false)
  const [editingDrug, setEditingDrug] = useState(null)
  const [drugs, setDrugs] = useState([])
  const [formData, setFormData] = useState({
    ndcCode: '',
    haCode: '',
    tradeName: '',
    manufacturer: '',
    localAgent: '',
    dosageForm: '',
    granularUnit: '',
    unitType: '',
    activeIngredients: '',
    strengths: '',
    startDate: '',
    endDate: '',
    packageType: '',
    packageSize: '',
    dispensedQuantity: '',
    daysOfSupply: '',
    instructions: '',
  })

  useEffect(() => {
    fetchDrugs()
  }, [])

  const fetchDrugs = async () => {
    try {
      const res = await axios.get(API_URL)
      setDrugs(res.data)
    } catch (err) {
      console.error('Error fetching drugs:', err)
    }
  }

  const handleClose = () => {
    setShow(false)
    setEditingDrug(null)
    resetForm()
  }

  const handleShow = (drug = null) => {
    if (drug) {
      setEditingDrug(drug)
      setFormData({
        ndcCode: drug.ndcCode || '',
        haCode: drug.haCode || '',
        tradeName: drug.tradeName || '',
        manufacturer: drug.manufacturer || '',
        localAgent: drug.localAgent || '',
        dosageForm: drug.dosageForm || '',
        granularUnit: drug.granularUnit || '',
        unitType: drug.unitType || '',
        activeIngredients: drug.activeIngredients || '',
        strengths: drug.strengths || '',
        startDate: drug.startDate ? drug.startDate.slice(0, 10) : '',
        endDate: drug.endDate ? drug.endDate.slice(0, 10) : '',
        packageType: drug.packageType || '',
        packageSize: drug.packageSize || '',
        dispensedQuantity: drug.dispensedQuantity || '',
        daysOfSupply: drug.daysOfSupply || '',
        instructions: drug.instructions || '',
      })
    }
    setShow(true)
  }

  const resetForm = () => {
    setFormData({
      ndcCode: '',
      haCode: '',
      tradeName: '',
      manufacturer: '',
      localAgent: '',
      dosageForm: '',
      granularUnit: '',
      unitType: '',
      activeIngredients: '',
      strengths: '',
      startDate: '',
      endDate: '',
      packageType: '',
      packageSize: '',
      dispensedQuantity: '',
      daysOfSupply: '',
      instructions: '',
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
    } catch (err) {
      console.error('Error saving drug:', err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchDrugs()
    } catch (err) {
      console.error('Error deleting drug:', err)
    }
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Drug List</h3>
        <Button variant="primary" onClick={() => handleShow()}>
          + Add Drug
        </Button>
      </div>

      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>NDC Code</th>
            <th>Trade Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Instructions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.length > 0 ? (
            drugs.map((d) => (
              <tr key={d.id}>
                <td>{d.ndcCode}</td>
                <td>{d.tradeName}</td>
                <td>{d.startDate?.slice(0, 10)}</td>
                <td>{d.endDate?.slice(0, 10)}</td>
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
              <td colSpan="6" className="text-center">
                No drugs found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingDrug ? 'Edit Drug' : 'Add Drug'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              {Object.keys(formData).map((field, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <Form.Label>{field}</Form.Label>
                  <Form.Control
                    type={field.toLowerCase().includes('date') ? 'date' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Close
              </Button>
              <Button variant="primary" type="submit">
                {editingDrug ? 'Update' : 'Add Drug'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DrugTable
