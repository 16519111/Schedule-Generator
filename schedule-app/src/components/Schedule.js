import React from 'react';
import { Container, Row, Col, Button, Form, Accordion, Card } from 'react-bootstrap';

function Schedule() {
    const [penilaian, setPenilaian] = React.useState("")
    const [SKS, setSKS] = React.useState("")
    const [bobot, setBobot] = React.useState("")
    const [data, setData] = React.useState([])

    const handleChangeForm = (e, attr) => {
        if (attr === "penilaian") {
            setPenilaian(e.target.value);
        }
        else if (attr === "SKS") {
            setSKS(e.target.value);
        }
        else {
            setBobot(e.target.value);
        }
    }

    const handleSubmit = () => {
        let tempData = data
        tempData.push({penilaian: penilaian, sks: SKS, bobot: bobot, price: SKS*bobot})
        console.log(tempData)
        setData([...tempData])
    }

    console.log(penilaian)
    console.log(SKS)
    console.log(bobot)

    return (
        <div className="App">
            <Container>
                <Col xs={{ span: 4, offset: 4 }}>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label>Penilaian</Form.Label>
                            <Form.Control type="text" placeholder="Nama penilaian" onChange={(e) => handleChangeForm(e, "penilaian")}/>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>SKS</Form.Label>
                            <Form.Control type="text" placeholder="Jumlah SKS mata kuliah" onChange={(e) => handleChangeForm(e, "SKS")}/>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Bobot</Form.Label>
                            <Form.Control type="text" placeholder="Bobot Penilaian" onChange={(e) => handleChangeForm(e, "bobot")}/>
                        </Form.Group>

                        <Button variant="primary" className="mt-4" onClick={() => handleSubmit()}>
                            Tambah Penilaian
                        </Button>
                    </Form>

                    <Accordion defaultActiveKey="0" className="mt-4">
                        {data.map((value, index) => (
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Card.Title} className="text-left" eventKey={index.toString()}>
                                            {value.penilaian}
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={index.toString()}>
                                        <Card.Body>
                                            <Card.Text>
                                                Jumlah SKS: {(value.sks).toString()}
                                            </Card.Text>
                                            <Card.Text>
                                                Bobot Penilaian: {(value.bobot).toString()}
                                            </Card.Text>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            ))
                        }
                    </Accordion>
                    <div className="mt-4">
                        <Button variant="success" className="me-1" onClick={() => handleSubmit()}>
                            Buat Jadwal
                        </Button>
                        <Button variant="danger" className="ms-1" onClick={() => handleSubmit()}>
                            Reset
                        </Button>
                    </div>
                </Col>
            </Container>
        </div>
    );
}

export default Schedule;