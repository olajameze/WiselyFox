import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "@/shared/ui/Header/Header";
import manifestFactory from "@/app/manifest";
import { PasswordField } from "@/shared/ui/PasswordField/PasswordField";

describe("Header navigation", () => {
  it("keeps display preferences tucked into a compact toggle that can be shown and hidden", async () => {
    const user = userEvent.setup();
    render(<Header />);

    expect(screen.getByRole("button", { name: /show display tools/i })).toBeInTheDocument();
    expect(screen.queryByRole("group", { name: /display preferences/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /show display tools/i }));
    expect(screen.getByRole("group", { name: /display preferences/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /hide display tools/i }));
    expect(screen.queryByRole("group", { name: /display preferences/i })).not.toBeInTheDocument();
  });
});

describe("Password visibility", () => {
  it("lets users reveal and hide a password field", async () => {
    const user = userEvent.setup();
    render(<PasswordField label="Password" name="password" defaultValue="secret123" />);

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: /show password/i }));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: /hide password/i }));
    expect(input).toHaveAttribute("type", "password");
  });
});

describe("PWA manifest", () => {
  it("opens the installed app directly at the login screen", () => {
    const manifest = manifestFactory();

    expect(manifest.start_url).toBe("/sign-in");
    expect(manifest.display).toBe("standalone");
  });
});
