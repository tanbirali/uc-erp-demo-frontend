const URL = import.meta.env.VITE_BASE_API_URL || "http://localhost:3000";

export const registerCompany = async (
  companyName: string,
  userId: string,
  token: string
) => {
  console.log("Registering company with", { companyName, userId });

  const response = await fetch(`${URL}/api/v1/company/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ company_name: companyName, user_id: userId }),
  });
  if (!response.ok) {
    throw new Error("Company registration failed");
  }
  return response.json();
};

export interface BranchRegistrationData {
  companyId: string;
  name: string;
  indusstry: string;
  state: string;
  buiding_number: string;
  street: string;
  city: string;
  zip_code: string;
  currency: string;
  lanugage: string;
  time_zone: string;
  is_vat_registered: boolean;
  vat_registered_number?: string;
  tax_registration_number?: string;
}

export const registerBranch = async (body: any, token: string) => {
  console.log("Registering branch with", body);
  const response = await fetch(`${URL}/api/v1/branches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Branch registration failed");
  }
  return response.json();
};
