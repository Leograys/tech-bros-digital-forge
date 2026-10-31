export interface RegistrationRequest {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

export async function registerAccount(_request: RegistrationRequest): Promise<void> {
  throw new Error(
    "Account registration is not configured yet. Connect an authentication provider before creating an account.",
  );
}
