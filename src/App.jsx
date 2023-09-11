import { Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Favorite from "./componets/Favorite";
import Homepage from "./componets/Homepage";
import { useState } from "react";
import Recipemaker from "./componets/Recipemaker";
import Ingredients from "./componets/Ingredients";
import ErrorPage from "./componets/Error";

function App() {
  const [restrictions, setRestriction] = useState({});
  const [whatWeWant, setWhatWeWant] = useState("");
  const [responseData, setResponseData] = useState([]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/Ingredients"
          element={
            <Ingredients
              setRestriction={setRestriction}
              restrictions={restrictions}
              whatWeWant={whatWeWant}
              setWhatWeWant={setWhatWeWant}
            />
          }
        />
        <Route path="/Favorite" element={<Favorite />} />
        <Route
          path="/Recipemaker"
          element={
            <Recipemaker
              whatWeWant={whatWeWant}
              setResponseData={setResponseData}
              responseData={responseData}
            />
          }
        />
        <Route path="*" element={<Homepage />} />
        <Route path="/Error" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
export default App;
