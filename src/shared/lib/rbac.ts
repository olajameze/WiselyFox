export type RoleBoundaryInput = {
  role?: string;
  method?: string;
  pathname?: string;
};

const MUTATION_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function shouldBlockCrossRoleMutation({ role, method, pathname }: RoleBoundaryInput) {
  if (!role || !method || !pathname) return false;
  if (!MUTATION_METHODS.has(method.toUpperCase())) return false;

  const normalizedPath = pathname.toLowerCase();
  const isChildArea = normalizedPath.startsWith("/learn") || normalizedPath.startsWith("/child");

  if (role === "PARENT" && isChildArea) {
    return true;
  }

  if (role === "TUTOR" && normalizedPath.startsWith("/parent")) {
    return true;
  }

  return false;
}
