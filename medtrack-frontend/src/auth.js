export const getRole = () =>
  (localStorage.getItem("role") || "patient").toLowerCase().trim();

export const isDoctor = () => getRole() === "doctor";
export const isPatient = () => getRole() === "patient";

export const myPatientId = () => (localStorage.getItem("patient_id") || "").trim();