import { useState } from "react"
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../utils/Api"

const Add = () => {
  const navigate = useNavigate()
  const [provinceId, setProvinceId] = useState("")
  const [provinceName, setProvinceName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const addProvince = async () => {
    try {
      setError("")
      setSuccess("")
      const { data } = await Api().post("add", {
        id: provinceId,
        name: provinceName,
      })
      if (data?.message) {
        navigate(`/view/${provinceId}`, {
          state: {
            message: data.message
          }
        })
      }
    } catch (error: any) {
      if (error?.errors) {
        setError(error.errors)
      } else {
        setError("Invalid ID")
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="mt-5">
            <Card.Header>
              <h3>Add Province</h3>{" "}
            </Card.Header>
            <Card.Body>
              <Form>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label>
                    <b>ID</b>
                  </Form.Label>
                  <Form.Control
                    className=""
                    type="text"
                    max={2}
                    placeholder="Enter ID"
                    value={provinceId}
                    onChange={(e) => setProvinceId(e.target.value)}
                  />
                  {/* <Form.Text className="text-danger">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <b>Name</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={provinceName}
                    onChange={(e) => setProvinceName(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => navigate("/")}
                >
                  Back
                </Button>
                <Button variant="primary" onClick={() => addProvince()}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Add
