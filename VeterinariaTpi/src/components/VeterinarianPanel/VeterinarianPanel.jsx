import React from "react";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

const VeterinarianPanel = () => {
  return (
    <>
      <Container className="user-panel mt-3 mb-4">
        <h3>Bienvenido dr .... Turnos: </h3>
    <Table striped="columns">
      <thead>
        <tr>
          <th>User</th>
          <th>Pet</th>
          <th>Date</th>
          <th>Study</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cristian Salinas</td>
          <td>Otto</td>
          <td>12/10</td>
          <td>Castracion</td>
        </tr>
         <tr>
          <td>Aldana Iramaz</td>
          <td>Gala</td>
          <td>22/10</td>
          <td>Cirujia</td>
        </tr>
         <tr>
          <td>Agus Sentis</td>
          <td>Pepe</td>
          <td>1/11</td>
          <td>Castracion</td>
        </tr>
         <tr>
          <td>Tomas Burack</td>
          <td>Tussi</td>
          <td>23/10</td>
          <td>Estilista</td>
        </tr>
      </tbody>
    </Table>
      </Container>
    </>
  );
};

export default VeterinarianPanel;
