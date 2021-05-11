import React from 'react';
import { Container, Col, Button, Form, Accordion, Card, Table } from 'react-bootstrap';

function Schedule() {
    const [penilaianMode, setPenilaianMode] = React.useState(false);
    const [penilaian, setPenilaian] = React.useState("");
    const [SKS, setSKS] = React.useState("");
    const [bobot, setBobot] = React.useState("");
    const [ideal, setIdeal] = React.useState("");
    const [data, setData] = React.useState([]);
    const [strategi, setStrategi] = React.useState(null);
    const [waktuMahasiswa, setWaktuMahasiswa] = React.useState(null);
    const [showJadwal, setShowJadwal] = React.useState(false);
    const [tableData, setTableData] = React.useState([]);
    const [finalScore, setFinalScore] = React.useState([]);

    const handleChangePenilaianMode = () => {
        setPenilaianMode(!penilaianMode);
    }

    const handleChangeForm = (e, attr) => {
        if (attr === "penilaian") {
            setPenilaian(e.target.value);
        }
        else if (attr === "SKS") {
            setSKS(e.target.value);
        }
        else if (attr === "bobot") {
            setBobot(e.target.value);
        }
        else if (attr === "ideal") {
            setIdeal(e.target.value);
        }
        else {
            setWaktuMahasiswa(e.target.value);
            setShowJadwal(false);
        }
    }

    const handleSubmit = () => {
        let tempData = data;
        tempData.push({penilaian: penilaian, sks: SKS, bobot: bobot, price: SKS*bobot, weight: ideal});
        setData([...tempData]);
    }

    const handleReset = () => {
        setPenilaian("");
        setSKS("");
        setBobot("");
        setIdeal("");
        setData([]);
        setStrategi(null);
        setShowJadwal(false);
    }

    const handleRadioButton = (strategi) => {
        setStrategi(strategi);
        setShowJadwal(false);
        let dataPenilaian = data;

        // Sorting berdasarkan strategi
        if(strategi === "price") {
            dataPenilaian.sort(function(a, b){return b.price - a.price});
        }
        else if(strategi === "weight") {
            dataPenilaian.sort(function(a, b){return a.weight - b.weight});
        }
        else {
            dataPenilaian.sort(function(a, b){return (b.price/b.weight) - (a.price/a.weight)});
        }

        setData([...dataPenilaian]);
    }

    const handleGenerateSchedule = () => {
        let dataPenilaian = data;
        let tableData = [];
        let maxWeightAvailable = waktuMahasiswa;
        let profit = 0;
        let maxProfit = 0;

        for(let i=0;i<dataPenilaian.length;i++) {
            if(maxWeightAvailable >= Number(dataPenilaian[i].weight)) {
                profit = profit + dataPenilaian[i].price;
                tableData.push({penilaian: dataPenilaian[i].penilaian, durasi: dataPenilaian[i].weight});
                maxWeightAvailable = maxWeightAvailable - dataPenilaian[i].weight;
            }
            else {
                profit = profit + (maxWeightAvailable/dataPenilaian[i].weight) * dataPenilaian[i].price;
                tableData.push({penilaian: dataPenilaian[i].penilaian, durasi: maxWeightAvailable});
                maxWeightAvailable = 0;
            }
            maxProfit = maxProfit + dataPenilaian[i].price;
        }

        setTableData(tableData);
        setFinalScore((profit/maxProfit) * 100);
        setShowJadwal(true);
    }

    return (
        <div className="App">
            <Container>
                <Col xs={{ span: 4, offset: 4 }}>
                    {(penilaianMode) ?
                        <Form>
                            <Form.Group className="mt-3">
                                <Form.Label>Penilaian</Form.Label>
                                <Form.Control type="text" placeholder="Nama penilaian" value={penilaian} onChange={(e) => handleChangeForm(e, "penilaian")}/>
                            </Form.Group>

                            <Form.Group className="mt-3">
                                <Form.Label>SKS</Form.Label>
                                <Form.Control type="text" placeholder="Jumlah SKS mata kuliah" value={SKS} onChange={(e) => handleChangeForm(e, "SKS")}/>
                            </Form.Group>

                            <Form.Group className="mt-3">
                                <Form.Label>Bobot (Persen)</Form.Label>
                                <Form.Control type="text" placeholder="Bobot Penilaian" value={bobot} onChange={(e) => handleChangeForm(e, "bobot")}/>
                            </Form.Group>

                            <Form.Group className="mt-3">
                                <Form.Label>Waktu Ideal (Jam)</Form.Label>
                                <Form.Control type="text" placeholder="Waktu Ideal Persiapan" value={ideal} onChange={(e) => handleChangeForm(e, "ideal")}/>
                            </Form.Group>

                            <Button variant="success" className="mt-4 me-1" onClick={() => handleSubmit()}>
                                Tambah
                            </Button>
                            <Button variant="danger" className="mt-4 ms-1" onClick={() => handleChangePenilaianMode()}>
                                Tutup
                            </Button>
                        </Form>
                    :
                        <Button variant="primary" className="mt-4 me-1" onClick={() => handleChangePenilaianMode()}>
                            Tambah Penilaian
                        </Button>
                    }

                    {data.length > 0 ?
                        <>
                            <hr/>
                            <p class="d-inline p-2 text-center text-muted mb-2">Daftar Penilaian</p>
                            <Accordion className="mt-2">
                                <>
                                    {
                                    data.map((value, index) => (
                                        <Card>
                                            <Card.Header>
                                                <Accordion.Toggle as={Card.Title} className="text-left" eventKey={index.toString()} style={{cursor: "pointer"}}>
                                                    {value.penilaian}
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={index.toString()}>
                                                <Card.Body>
                                                    <Card.Text>
                                                        Jumlah SKS: {(value.sks).toString()}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Bobot Penilaian: {(value.bobot).toString()}%
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Price: {(value.price).toString()}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Waktu Ideal (Weight): {(value.weight).toString()}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Density: {(value.price / value.weight).toFixed(2)}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    ))}
                                </>
                            </Accordion>
                        </>
                    : 
                        <>
                            <hr/>
                            <p class="d-inline p-2 text-center text-muted">Data penilaian masih kosong <br/></p>
                            {(penilaianMode) ?
                                <p class="d-inline p-2 text-center text-muted">Tambahkan penilaian terlebih dahulu</p>
                            :
                                <p class="d-inline p-2 text-center text-muted">Klik "Tambah Penilaian" untuk menambah penilaian</p>
                            }
                        </>
                    }

                    {data.length >= 1 ?
                        <div className="mt-4">
                            <hr/>
                            <p class="d-inline p-2 text-center text-muted">Pilih Strategi</p>
                            <Form className="d-flex justify-content-around mt-2">
                                <div style={{width: "100px"}}>
                                    <Form.Check
                                        custom
                                        type="radio"
                                        id="price"
                                        name="strategi"
                                        onClick={() => handleRadioButton("price")}
                                    />
                                    <label class="form-check-label" for="price">Price</label>
                                </div>
                                <div style={{width: "100px"}}>
                                    <Form.Check
                                        custom
                                        type="radio"
                                        id="weight"
                                        name="strategi"
                                        onClick={() => handleRadioButton("weight")}
                                    />
                                    <label class="form-check-label" for="weight">Weight</label>
                                </div>
                                <div style={{width: "100px"}}>
                                    <Form.Check
                                        custom
                                        type="radio"
                                        id="density"
                                        name="strategi"
                                        onClick={() => handleRadioButton("density")}
                                    />
                                    <label class="form-check-label" for="density">Density</label>
                                </div>
                            </Form>
                        </div>
                    : null}

                    {(strategi !== null) ?
                        <>
                            <hr/>
                            <Form>
                                <Form.Group className="mt-3">
                                    <p class="d-inline p-2 text-center text-muted">Waktu Dimiliki (Jam)</p>
                                    <Form.Control className="mt-2" type="text" placeholder="Waktu yang dimiliki" value={waktuMahasiswa} onChange={(e) => handleChangeForm(e, "waktu")}/>
                                </Form.Group>
                            </Form>
                        </>
                    : null}

                    {(strategi !== null && waktuMahasiswa !== null) ?
                        <>
                            <hr/>
                            <div className="mt-4">
                                <Button variant="success" className="me-1" onClick={() => handleGenerateSchedule()}>
                                    Buat Jadwal
                                </Button>
                                <Button variant="danger" className="ms-1" onClick={() => handleReset()}>
                                    Reset
                                </Button>
                            </div>
                        </>
                    : null}

                    {(showJadwal) ?
                        <>
                            <hr/>
                            {(strategi === "price") ?
                                <p class="d-inline p-2 text-center text-muted">Greedy By Price<br/></p>
                            : (strategi === "weight") ?
                                <p class="d-inline p-2 text-center text-muted">Greedy By Weight<br/></p>
                            :
                                <p class="d-inline p-2 text-center text-muted">Greedy By Density<br/></p>
                            }
                            <Table striped bordered hover className="mt-2">
                                <thead>
                                    <tr>
                                        <th>Penilaian</th>
                                        <th>Durasi (jam)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((value) => (
                                        <tr>
                                            <td>{value.penilaian}</td>
                                            <td>{value.durasi}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <hr/>
                            <p class="d-inline p-2 text-center text-muted">Nilai Akhir (t)<br/></p>
                            <h4>{finalScore.toFixed(2)}%</h4>
                        </>
                    : null}

                </Col>
            </Container>
        </div>
    );
}

export default Schedule;