import React, { useState } from "react";
import Axios from "axios";

import {
  Row,
  Container,
  Col,
  Input,
  Button,
  InputGroupAddon,
} from "reactstrap";

import Repinfo from "./Repinfo";

const Home = () => {
  function compare(a, b) {
    if (a.forks > b.forks) {
      return -1;
    }
    if (a.forks < b.forks) {
      return 1;
    }
    return 0;
  }
  const [m, setM] = useState("");
  const [n, setN] = useState("");
  const [organization, setOrganization] = useState("");
  const [repos, setRepos] = useState([]);
  const fetchRepos = async () => {
      if(organization==="" || m==="" || n==="")
      {
        alert("Please Enter all the fields");
      }
      else if(m>=0 && n>=0)
      {
      try {
        let repoArray = await Axios.get(
          `https://api.github.com/orgs/${organization}/repos`
        );
        repoArray.data.sort(compare);
        const repos = repoArray.data.slice(0, n);
        //console.log(repos);
        setRepos(repos);
      } catch (err) {
        alert("Not able to locate organization", {
        });
      }
    }
    else{
      alert("Please Enter a number in m and n fields");
    }
  };
  return (
    <Container>
     <Row className=" mt-3" >
     <Col md="6" style={{ marginTop:"100px"}}>
      <Row className=" mt-3">
      <h5 style={{ color:"Maroon"}}>Name of Organization</h5>
        <Col md="6">
          <Input
            type="text"
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
            required
          />
        </Col>
      </Row>
      <Row className=" mt-3">
      <h5 style={{ color:"Maroon"}}>Number of  repositories</h5>
        <Col md="6">
          <Input
            type="text"
            value={n}
            onChange={(event) => setN(event.target.value)}
            required
          />
        </Col>
      </Row>
      <Row className=" mt-3">
      <h5 style={{ color:"Maroon"}}>Number of Committees</h5>
        <Col md="6">
          <Input
            type="text"
            value={m}
            onChange={(event) => setM(event.target.value)}
            required
          />
        </Col>
      </Row>
      <Row className=" mt-3">
        <Col md="12">
          <InputGroupAddon addonType="append">
            <Button style={{marginLeft:"150px"}} color="primary" onClick={fetchRepos}>
              Fetch Details
            </Button>
          </InputGroupAddon>
        </Col>
      </Row>
      </Col>
      <Col md="6">
      <Row className=" mt-3">
      <Col md="7">
      </Col>
      </Row>
      <Row className=" mt-3">
        <Col md="7" style={{marginBottom:"100px", marginTop:"70px"}}>
          {repos.map((item, index) => (
            <div>
              <h5>{item.name}: {item.forks} forks</h5>
              {item ? <Repinfo repos_url={item.contributors_url} m={m} /> : null}
            </div>
          ))}
        </Col>
      </Row>
      </Col>
      </Row>
    </Container>
  );
};
export default Home;
