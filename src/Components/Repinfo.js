import React, { useState, useEffect } from "react";
import Axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";

const Repinfo = ({ repos_url, m }) => {
  function compare(a, b) {
    if (a.commits > b.commits) {
      return -1;
    }
    if (a.commits < b.commits) {
      return 1;
    }
    return 0;
  }
  // Suppose I get array of users by the above url
  const [committees, setCommittees] = useState([]);

  const fetchCommittees = async () => {
    let response = await Axios.get(repos_url);
    //console.log(response);
    response.data.sort(compare);
    const committees = response.data.slice(0, m);
    setCommittees(committees);
    console.log(committees);
  };
  useEffect(() => {
    fetchCommittees();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[repos_url,m]);

  return (
    <ListGroup flex>
      {committees.map((user) => (
        <ListGroupItem key={user.id} style={{marginBottom:"8px",backgroundColor:"Lavender"}}>
          <div style={{color:"DarkSlateGrey"}}><b>Login : {user.login}</b></div>
          <div style={{color:"DarkSlateGrey"}}><b>Contributions : {user.contributions}</b></div>
        </ListGroupItem>
      ))} 
    </ListGroup>
  );
};
export default Repinfo;
