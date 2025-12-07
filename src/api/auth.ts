const URL = import.meta.env.VITE_BASE_API_URL || "http://localhost:3000";

export const login = async (username: string, password: string) => {
  console.log("Logging in with", { username, password });
  console.log(`POST ${URL}/api/v1/auth/login`);
  const response = await fetch(`${URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const register = async (form: FormData) => {
  for (let pair of form.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  const response = await fetch(`${URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: form,
  });

  console.log("Response received");
  console.log(response);
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
};
