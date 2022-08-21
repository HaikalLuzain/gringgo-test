import { useEffect, useState } from "react"
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { IProvince } from "../types/IProvince"
import { Api } from "../utils/Api"

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [province, setProvince] = useState<IProvince>()
  const [provinceName, setProvinceName] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const getProvinceDetail = async () => {
      try {
        const {
          data: { data },
        } = await Api().get("viewedit/", {
          params: {
            id_prov: id,
          },
        })
        const prov: IProvince = data[0]
        setProvince(prov)
        setProvinceName(prov.name)
      } catch (error) {
        console.log(error)
      }
    }

    getProvinceDetail()
  }, [id])

  const editProvince = async () => {
    if (!provinceName) {
      setError("Province name cannot be null!")
    } else {
      setSuccess("")
      try {
        const { data } = await Api().post(
          "update/",
          {
            name: provinceName,
          },
          {
            params: {
              id_prov: id,
            },
          }
        )
        if (data?.message) {
          if (data?.message) {
            navigate(`/view/${id}`, {
              state: {
                message: data.message
              }
            })
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="mt-5">
            <Card.Header>
              <h3>Edit Province</h3>{" "}
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              {province && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>ID</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      max={2}
                      placeholder="Enter ID"
                      value={province?.id}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Name</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      required
                      value={provinceName}
                      onChange={(e) => setProvinceName(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => navigate("/")}
                  >
                    Back Home
                  </Button>
                  <Button variant="primary" onClick={() => editProvince()}>
                    Submit
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Edit
