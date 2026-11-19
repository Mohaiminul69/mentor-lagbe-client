export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateEmail = (email: string) => {
  if (!email.trim()) return "Email is required"
  if (!emailPattern.test(email.trim())) return "Enter a valid email address"
  return ""
}

export const validatePassword = (password: string) => {
  if (!password) return "Password is required"
  if (password.length < 6) return "Password must be at least 6 characters"
  return ""
}

export const validateName = (name: string) => {
  if (!name.trim()) return "Full name is required"
  return ""
}
