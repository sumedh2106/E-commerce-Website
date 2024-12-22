function validation(event) {
  const form = event.target;
  const username = form.querySelector("#username").value;
  const password = form.querySelector("#password").value;

  if (form.id === "signupform") {
    const confirmPassword = form.querySelector("#confirmpassword").value;

    if (confirmPassword !== password) {
      alert("Confirm Password Do Not Match");
      event.preventDefault();
      return false;
    }
    alert("Sign Up Successful");
    form.reset();
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    event.preventDefault();
  }

  if (form.id === "signinform") {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (username !== savedUsername || password !== savedPassword) {
      event.preventDefault();
      alert("invalid Username or Password");
      form.reset();;
      return false;
    }
    alert("Successfully signed In");
    form.reset();
  }
  return true;
}
