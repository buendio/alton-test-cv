// src/CryptoDashboard.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Web3Integration from './Web3Integration';


Chart.register(CategoryScale);

const CryptoDashboard = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

    ws.onmessage = (event) => {
      const trade = JSON.parse(event.data);
      setData((prevData) => [...prevData, parseFloat(trade.p)].slice(-30)); 
      setLabels((prevLabels) => [
        ...prevLabels,
        new Date(trade.T).toLocaleTimeString(),
      ].slice(-30));
    };

    return () => ws.close();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'BTC/USDT',
        data,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
        pointStyle: false
      },
    ],
  };

  return (
    <div className="dashboard-container">

      <Container fluid className="mb-4">
        <Row className="justify-content-center">
          <Col>
            <Web3Integration />
          </Col>
        </Row>
      </Container>

      <Container fluid >
      <div className="chart-container">
        <Card className="border-1 h-100">
          <Card.Header as="h5" className="text-center">
          Courses BTC/USDT
          </Card.Header>
          <Card.Body className="p-0 h-100">
            <Line
              data={chartData}
              options={{
                maintainAspectRatio: true, 
                responsive: true,
                scales: {
                  x: {
                    ticks: {
                      maxRotation: 0,
                      autoSkip: true,
                    },
                  },
                },
              }}
            />
          </Card.Body>
        </Card>
      </div>
      </Container>
    </div>
  );
};

export default CryptoDashboard;
