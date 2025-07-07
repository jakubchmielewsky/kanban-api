export interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  resetToken: string;
  newPassword: string;
  confirmNewPassword: string;
}
