export function protectSeller(user, router) {
  if (!user) {
    router.push("/login");
    return false;
  }

  if (user.role !== "seller") {
    router.push("/");
    return false;
  }

  return true;
}