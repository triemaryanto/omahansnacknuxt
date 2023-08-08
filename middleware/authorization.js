export default async function ({ store, route, redirect }) {
  try {
    const response = await this.$axios.get("api/dashboard/check-permissions");
    const { roles, permissions } = response.data;
    console.log(roles);
    if (authorized) {
      redirect("dashboard/main");
    } else {
      // User is not authorized, redirect or show an error
      // For example, you might redirect to a forbidden page
      redirect("/forbidden");
    }
  } catch (error) {
    // Handle error, possibly due to invalid token or network issues
    // Redirect to a login page or show an error message
    redirect("/");
  }
}
