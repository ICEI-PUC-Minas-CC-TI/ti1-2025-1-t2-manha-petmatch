export function isAdult(value) {
  const birthDate = new Date(value);
  const today = new Date();

  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  const isOfAge =
    age > 18 || (age === 18 && m >= 0 && today.getDate() >= birthDate.getDate());

  return isOfAge
}
