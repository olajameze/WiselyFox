import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChildSignInForm } from "@/features/auth/ui/ChildSignInForm";

const signInChildMock = vi.hoisted(() => vi.fn());

vi.mock("@/features/auth/actions/auth.actions", () => ({
  signInChild: signInChildMock,
}));

afterEach(() => {
  cleanup();
  signInChildMock.mockReset();
});

describe("ChildSignInForm", () => {
  it("shows a kid-friendly helper message that explains the login flow", async () => {
    signInChildMock.mockResolvedValue({ success: true, data: { redirectTo: "/learn" } });

    const user = userEvent.setup();
    render(<ChildSignInForm />);

    expect(screen.getByText(/No email needed/i)).toBeInTheDocument();
    expect(screen.getByText(/quick, child-friendly sign in/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^Family access code$/i), "wfox-demo-alex");
    await user.type(screen.getByLabelText(/pin/i), "1234");
    await user.click(screen.getByRole("button", { name: /let's learn/i }));

    expect(signInChildMock).toHaveBeenCalledWith({
      accessCode: "wfox-demo-alex",
      pin: "1234",
    });
  });
});
