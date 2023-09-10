import axios from "axios";
import Recipe from "./Recipe";
import { useEffect } from "react";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

let response = null;

function Recipemaker({ whatWeWant, setResponseData, responseData }) {
  const keys = JSON.parse(import.meta.env.VITE_API_KEY);
  const navigate = useNavigate();
  if (whatWeWant.includes(",+")) {
    const randomIndex = Math.floor(Math.random() * (keys.length - 1));
    let randomApiKey = keys[randomIndex];
    useEffect(() => {
      axios
        .get(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${randomApiKey}&ingredients=${whatWeWant}&number=10`
        )
        .then((response) => {
          setResponseData(response.data);
        })
        .catch((error) => {
          console.error("Error occurred while fetching data:", error);
          navigate("/Error");
        });
    }, []);
    useEffect(() => {
      axios
        .get(
          `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${randomApiKey}&ingredients=${whatWeWant}&number=10`
        )
        .then((response) => {
          setResponseData(response.data);
        })
        .catch((error) => {
          console.error("Error occurred while fetching data:", error);
          navigate("/Error");
        });
    }, [whatWeWant]);
    return (
      <div className="big-container">
        <h2>hi! Here are the recipes you wanted. </h2>
        <h4>
          Remember, just hit the heart button and it will appear in your
          favorite page
        </h4>
        {responseData.length !== 0 && (
          <ul>
            {Array.from({ length: 10 }, (_, index) => (
              <Recipe responseData={responseData} index={index} key={index} />
            ))}
          </ul>
        )}
      </div>
    );
  } else {
    return (
      <div className="big-container">
        <h1>please fill the ingredients page</h1>
      </div>
    );
  }
}
export default Recipemaker;
