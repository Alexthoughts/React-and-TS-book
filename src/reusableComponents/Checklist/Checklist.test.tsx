import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Checklist } from "./Checklist";
import userEvent from "@testing-library/user-event";
import { IdValue } from "./types";

test("should render correct list when data specified", () => {
  render(
    <Checklist
      data={[{ id: 1, name: "Lucy", role: "Manager" }]}
      id="id"
      primary="name"
      secondary="role"
    />
  );
  expect(screen.getByText("Lucy")).toBeInTheDocument();
  expect(screen.getByText("Manager")).toBeInTheDocument();
});

test("should render correct list when renderItem specified", () => {
  render(
    <Checklist
      data={[{ id: 1, name: "Lucy", role: "Manager" }]}
      id="id"
      primary="name"
      secondary="role"
      renderItem={(item) => (
        <li key={item.id}>
          {item.name}-{item.role}
        </li>
      )}
    />
  );
  expect(screen.getByText("Lucy-Manager")).toBeInTheDocument();
});

test("should render correct checked items", () => {
  render(
    <Checklist
      data={[{ id: 1, name: "Lucy", role: "Manager" }]}
      id="id"
      primary="name"
      secondary="role"
      checkedIds={[1]}
    />
  );
  expect(screen.getByTestId("Checklist__input__1")).toBeChecked();
});

test("should check item when clicked", async () => {
  const user = userEvent.setup();
  render(
    <Checklist
      data={[{ id: 1, name: "Lucy", role: "Manager" }]}
      id="id"
      primary="name"
      secondary="role"
      checkedIds={[1]}
    />
  );

  const lucyCheckbox = screen.getByTestId("Checklist__input__1");
  expect(lucyCheckbox).not.toBeChecked;
  await user.click(lucyCheckbox);
  expect(lucyCheckbox).toBeChecked;
});

test("should call onCheckedIdChange when clicked", async () => {
  const user = userEvent.setup();
  let calledWith: IdValue[] | undefined = undefined;

  render(
    <Checklist
      data={[{ id: 1, name: "Lucy", role: "Manager" }]}
      id="id"
      primary="name"
      secondary="role"
      onCheckedIdsChange={(checkedIds) => (calledWith = checkedIds)}
    />
  );
  await user.click(screen.getByTestId("Checklist__input__1"));
  //The toStrictEqual matcher is a standard Jest matcher that
  // is ideal for checking arrays and objects.
  expect(calledWith).toStrictEqual([1]);
});
