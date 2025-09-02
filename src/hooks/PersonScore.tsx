import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { getPerson } from "./getPerson";
import ResetButton from "./ResetButton";

type State = {
  name: string | undefined;
  score: number;
  loading: boolean;
};

type Action =
  | {
      type: "initialize";
      name: string;
    }
  | {
      type: "increment";
    }
  | {
      type: "decrement";
    }
  | {
      type: "reset";
    };

export function PersonScore() {
  //   const [name, setName] = useState<string | undefined>();
  //   const [score, setScore] = useState(0);
  //   const [loading, setLoading] = useState(true);
  const buttonAddRef = useRef<HTMLButtonElement>(null);

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "initialize":
        return { name: action.name, score: 0, loading: false };
      case "increment":
        return { ...state, score: state.score + 1 };
      case "decrement":
        return { ...state, score: state.score - 1 };
      case "reset":
        return { ...state, score: 0 };
    }
  };

  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [{ name, score, loading }, dispatch] = useReducer(reducer, {
    name: undefined,
    score: 0,
    loading: true,
  });

  useEffect(() => {
    // const getThePerson = async () => {
    //   const person = await getPerson();
    //   setLoading(false);
    //   setName(person.name);
    getPerson().then((person) => {
      dispatch({ type: "initialize", name: person.name }); // dispatch trigger re-render
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      buttonAddRef.current?.focus();
    }
  }, [loading]);

  const handleReset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const exteremeCalculation = () => {
    console.log("exteremeCalculation");
    let sum = 0;
    for (let i = 0; i <= 1000; i++) {
      sum += i;
    }
    return sum;
  };

  const exteremeCalculationResult = useMemo(() => exteremeCalculation(), []); //will never updated

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    // <div>
    //   <h3>
    //     {name}, {score}
    //   </h3>
    //   <button onClick={() => setScore(score + 1)}>Add</button>
    //   <button onClick={() => setScore(score - 1)}>Subtract</button>
    //   <button onClick={() => setScore(0)}>Reset</button>
    // </div>
    <div>
      <h3>
        {name}, {score}
      </h3>
      <button ref={buttonAddRef} onClick={() => dispatch({ type: "increment" })}>
        Add
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>Subtract</button>
      <ResetButton onClick={handleReset} />
      {/* <button onClick={() => dispatch({ type: "reset" })}>Reset</button> */}
      <p>{exteremeCalculationResult}</p>
    </div>
  );
}
