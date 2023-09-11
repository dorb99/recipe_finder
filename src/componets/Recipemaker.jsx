import axios from "axios";
import Recipe from "./Recipe";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
let response = null;

function Recipemaker({ whatWeWant, setResponseData, responseData }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const secondKEY = JSON.parse(import.meta.env.VITE_SECOND_KEY);
  function randomApi() {
    const keys = JSON.parse(import.meta.env.VITE_API_KEY);
    const randomIndex = Math.floor(Math.random() * (keys.length - 1));
    let randomApiKey = keys[randomIndex];
    return randomApiKey;
  }
  function fetching() {
    setIsLoading(true);
    axios
      .get(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${randomApi()}&ingredients=${whatWeWant}&number=10`
      )
      .then((response) => {
        setResponseData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        axios
          .get(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${secondKEY}&ingredients=${whatWeWant}&number=10`
          )
          .then((response) => {
            setResponseData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            navigate("/errorpage");
          });
      });
  }
  if (whatWeWant.includes(",+")) {
    useEffect(() => {
      fetching();
    }, [whatWeWant]);
    return (
      <div className="big-container">
        <h2>hi! Here are the recipes you wanted. </h2>
        <h4>
          Remember, just hit the heart button and it will appear in your
          favorite page
        </h4>
        {isLoading ? (
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        ) : (
          responseData.length !== 0 && (
            <ul>
              {Array.from({ length: 10 }, (_, index) => (
                <Recipe responseData={responseData} index={index} key={index} />
              ))}
            </ul>
          )
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
