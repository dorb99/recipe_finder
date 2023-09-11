import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate();
    function GoTo() {
        navigate("/Ingredients")
    }
  return (
      <h1 id="errorpage">Oops, it seems like there was an error!
      <br/>
      <button onClick={GoTo}>Lets go back</button>
      </h1>
  );
}

export default ErrorPage;
