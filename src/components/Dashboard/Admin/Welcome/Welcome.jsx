import React from "react";
import PageCenter from "../../../../containers/PageCenter/PageCenter";

const Welcome = (props) => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="jumbotron">
          <h1>Welcome</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
            vitae tempora atque ut nemo illum ipsa nisi quibusdam similique
            dolor odit ullam perspiciatis hic, dolorum culpa eos, nostrum
            molestiae! Aspernatur? Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Neque vitae tempora atque ut nemo illum ipsa nisi
            quibusdam similique dolor odit ullam perspiciatis hic, dolorum culpa
            eos, nostrum molestiae! Aspernatur?
          </p>
          <p>
            <button
              className="btn btn-primary btn-lg pull-right"
              // onClick={() => props.setPage("address")}
            >
              Getting Started
            </button>
            <div className="clearfix"></div>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Welcome;
