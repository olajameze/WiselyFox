import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/shared/ui/Button/Button";

afterEach(() => cleanup());

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("handles click", async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => { clicked = true; }}>Go</Button>);
    await user.click(screen.getByRole("button", { name: "Go" }));
    expect(clicked).toBe(true);
  });
});
