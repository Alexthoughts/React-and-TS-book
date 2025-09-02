import { isChecked } from "./isChecked";

test("should return true when in checkIds", () => {
  const result = isChecked([1, 2, 3], 2);
  expect(result).toBe(true);
});

test("should return false when not in checkIds", () => {
  const result = isChecked([1, 2, 3], 4);
  expect(result).toBe(false);
});
