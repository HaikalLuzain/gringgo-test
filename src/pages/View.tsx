import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IProvince } from "../types/IProvince";
import { Api } from "../utils/Api";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const location = useLocation()
  const [province, setProvince] = useState<IProvince>()
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if ((location?.state as any)?.message) {
      setSuccess((location.state as any).message)
    }
  }, [])

  useEffect(() => {
    const getProvinceDetail = async () => {
      try {
        const {
          data: { data },
        } = await Api().get("viewedit/", {
          params: {
            id_prov: id
          }
        })
        setProvince(data[0])
      } catch (error) {
        console.log(error)
      }
    }

    getProvinceDetail()
  }, [id])
  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="mt-5">
            <Card.Header>
              <h3>Province Detail</h3>{" "}
            </Card.Header>
            <Card.Body>
              {success && <Alert variant="success">{success}</Alert>}
              {province && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label><b>ID</b></Form.Label>
                    <Form.Control type="text" max={2} placeholder="Enter ID" value={province?.id} disabled />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label><b>Name</b></Form.Label>
                    <Form.Control type="text" placeholder="Name" value={province?.name} disabled />
                  </Form.Group>
                  <Button variant="secondary" className="me-2" onClick={() => navigate("/")}>
                    Back Home
                  </Button>
                  <Button variant="warning" onClick={() => navigate(`/edit/${province.id}`)}>
                    Edit
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

export default View
