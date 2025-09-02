import { memo } from "react";

type ResetButtonType = {
  onClick: () => void;
};

const ResetButton = memo(({ onClick }: ResetButtonType) => {
  console.log("Reset button clicked");
  return <button onClick={onClick}>Reset</button>;
});

export default ResetButton;
