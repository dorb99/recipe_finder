import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./css files/ingredients.css"

function Ingredients({
  setRestriction,
  restrictions,
  whatWeWant,
  setWhatWeWant,
}) {
  const { register, handleSubmit, reset } = useForm();
  const [vegetarian, setVegetarian] = useState(
    restrictions?.vegetarian || false
  );
  const [vegan, setVegan] = useState(restrictions?.vegan || false);
  const [peanutAllergy, setPeanutAllergy] = useState(
    restrictions?.peanutAllergy || false
  );
  const [lactoseIntolerance, setLactoseIntolerance] = useState(
    restrictions?.lactoseIntolerance || false
  );
  const [glutenFree, setGlutenFree] = useState(
    restrictions?.glutenFree || false
  );
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setRestriction(data);
    setTimeout(() => {
      navigate("/Recipemaker");
    }, 50);
  };

  useEffect(() => {
    if (Object.keys(restrictions).length !== 0) {
      updateWhatWeWant(restrictions);
    }
  }, [restrictions]);

  const handleReset = () => {
    reset({
      mustHave: ["", "", "", "", ""],
    });
    setVegetarian(false);
    setVegan(false);
    setPeanutAllergy(false);
    setLactoseIntolerance(false);
    setGlutenFree(false);
  };

  const checkboxStates = [
    { state: vegetarian, setState: setVegetarian, name: "vegetarian" },
    { state: vegan, setState: setVegan, name: "vegan" },
    { state: peanutAllergy, setState: setPeanutAllergy, name: "peanutAllergy" },
    {
      state: lactoseIntolerance,
      setState: setLactoseIntolerance,
      name: "lactoseIntolerance",
    },
    { state: glutenFree, setState: setGlutenFree, name: "glutenFree" },
  ];

  const checkboxes = [
    { label: "Vegetarian", name: "vegetarian" },
    { label: "Vegan", name: "vegan" },
    { label: "Peanut allergy", name: "peanutAllergy" },
    { label: "Lactose intolerance", name: "lactoseIntolerance" },
    { label: "Gluten-free", name: "glutenFree" },
  ];

  function updateWhatWeWant(restrictions) {
    let selectedIngredients = [];
    for (let index = 0; index < 5; index++) {
      if (restrictions.mustHave[index] !== "") {
        selectedIngredients.push(restrictions.mustHave[index]);
      }
    }
    for (const checkbox of checkboxStates) {
      if (checkbox.state) {
        selectedIngredients.push(checkbox.name);
      }
    }
    setWhatWeWant(selectedIngredients.join(",+"));
  }

  return (
    <div className="big-container">
      <h1>Hello!</h1>
      <h3>
        Please fill out the following form, and we will find you recipes in
        no time!
        fill at least 2 ingredients
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <h4>What ingredients do you want to be in the recipe?</h4>
          {Array.from({ length: 5 }, (_, index) => (
            <li key={index}>
              <input
                defaultValue={restrictions.mustHave?.[index]}
                {...register(`mustHave[${index}]`, { maxLength: 20 })}
              />
            </li>
          ))}
          <h4>Special requests?</h4>
          {checkboxes.map((checkbox) => (
            <li key={checkbox.name}>
              {checkbox.label}
              <input
                type="checkbox"
                checked={
                  checkboxStates.find((c) => c.name === checkbox.name)?.state
                }
                {...register(checkbox.name)}
                onChange={() => {
                  const checkboxState = checkboxStates.find(
                    (c) => c.name === checkbox.name
                  );
                  if (checkboxState) {
                    checkboxState.setState(!checkboxState.state);
                  }
                }}
              />
            </li>
          ))}
        </ul>
            <input type="submit" />
            <button className="resetbutton" type="button" onClick={handleReset}>
              Reset
            </button>
      </form>
    </div>
  );
}

export default Ingredients;
