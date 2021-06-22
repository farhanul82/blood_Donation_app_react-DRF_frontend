import React from "react";
import { useHistory } from "react-router-dom";

export default function Starter() {
  const history = useHistory();
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-cente align-items-centre">
            <div className="">
              <img className=" startImg" src="/images/1.png" alt="1"></img>
            </div>

            <div className="start-text">
              <h3>
                <span className="span1">Blood</span>{" "}
                <span className="span2">Donation</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {" "}
        <div className="col-md-12">
          <button
            onClick={() => history.push("/login")}
            className="btn start_btn"
          >
            Start Donation
          </button>
        </div>
      </div>
    </div>
  );
}
