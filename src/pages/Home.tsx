import { useEffect, useState } from "react"
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap"
import { IProvince } from "../types/IProvince"
import { Api } from "../utils/Api"
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [provinces, setProvinces] = useState<IProvince[]>()
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const header = [
    {
      title: "ID",
      prop: "id",
      isSortable: true,
    },
    {
      title: "Name",
      prop: "name",
      isFilterable: true,
      isSortable: true,
    },
    {
      title: "Action",
      prop: "location",
      cell: (row: IProvince) => {
        return (
          <div>
            <Button
              className="me-2"
              variant="info"
              onClick={() => navigate(`/view/${row.id}`)}
            >
              View
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm("Delete this province?"))
                  deleteProvince(row.id)
              }}
            >
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  const getProvinces = async () => {
    try {
      const {
        data: { data },
      } = await Api().get("list")
      setProvinces(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProvinces()
  }, [])

  const deleteProvince = async (id: string) => {
    setSuccess("")
    try {
      const { data } = await Api().post("delete", {
        id_prov: id,
      })
      if (data?.message) {
        setSuccess(data.message)
        getProvinces()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto mt-5">
          {success && <Alert variant="success">{success}</Alert>}
          {provinces?.length && (
            <Card className="mt-2">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h3>The List of Provinces</h3>{" "}
                <Button variant="primary" onClick={() => navigate("/add")}>Add Province</Button>
              </Card.Header>
              <Card.Body>
                <DatatableWrapper
                  body={provinces}
                  headers={header as any}
                  paginationOptionsProps={{
                    initialState: {
                      rowsPerPage: 10,
                      options: [5, 10, 15, 20],
                    },
                  }}
                >
                  <Row className="mb-4 p-2">
                    <Col
                      xs={12}
                      lg={4}
                      className="d-flex flex-col justify-content-end align-items-end"
                    >
                      <Filter />
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      lg={4}
                      className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                    >
                      <PaginationOptions />
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      lg={4}
                      className="d-flex flex-col justify-content-end align-items-end"
                    >
                      <Pagination />
                    </Col>
                  </Row>
                  <Table>
                    <TableHeader />
                    <TableBody />
                  </Table>
                </DatatableWrapper>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Home
