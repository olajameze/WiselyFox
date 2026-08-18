import React from "react";

export default function TutorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // By using a React Fragment (<>), we allow the root layout to wrap this page's
    // content, ensuring the main navbar and footer are displayed correctly.
    // This file can be used later to add UI specific to the /tutors section.
    <>{children}</>
  );
}
