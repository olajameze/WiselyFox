import { SkipLink } from "@/shared/ui/SkipLink/SkipLink";

export function AppSkipLinks({ mainId = "main-content" }: { mainId?: string }) {
  return (
    <>
      <SkipLink href={`#${mainId}`}>Skip to main content</SkipLink>
      <SkipLink href="#app-nav">Skip to navigation</SkipLink>
    </>
  );
}
