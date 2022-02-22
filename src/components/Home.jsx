import React from "react";
import { useState, useEffect } from "react";

export default function Home() {
  const [details, setdetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://private-052d6-testapi4528.apiary-mock.com/info",
        {
          method: "get",
          headers: { authorization: localStorage.token },
        }
      );

      const data = await res.json();
      setdetails(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <div className="tbl">
      <h1>Team Info's</h1>
      <table>
        <h2>First api Table</h2>
        <tr>
          <th>Name</th>
          <th>Team</th>
          <th>Joined-At</th>
          <th>Avatar</th>
        </tr>

        <tr>
          <td>{localStorage.name}</td>
          <td>{localStorage.team}</td>
          <td>{localStorage.joined}</td>
          <td>
            <img src={localStorage.avatar} alt="" />
          </td>
        </tr>
        <br></br>
        <br></br>
        <h2>Second api Table</h2>
        <tr className="head">
          <th>ID</th>
          <th>Name</th>
          <th>Bugs</th>
          <th>Duration</th>
          <th>Score</th>
        </tr>

        <td>
          <h4>
            {details.map((i) => (
              <tr className="body">
                <td>{i.id}</td>
              </tr>
            ))}
          </h4>
        </td>
        <h4>
          {details.map((n) => (
            <tr>
              <td>{n.name}</td>
            </tr>
          ))}
        </h4>
        <td>
          <h4>
            {details.map((b) => (
              <tr>
                <td>{b.bugsCount}</td>
              </tr>
            ))}
          </h4>
        </td>
        <td>
          <h4>
            {details.map((d) => (
              <tr>
                <td>{d.durationInDays}</td>
              </tr>
            ))}
          </h4>
        </td>
        <td>
          {details.map((s) => (
            <tr>
              <td style={{ backgroundColor: s.score < 70 ? "red" : "green" }}>
                {s.score}
              </td>
            </tr>
          ))}
        </td>
      </table>
    </div>
  );
}
