export const filterPacient = (id, pacients) => {
  return pacients.filter((pacient) => pacient.id === id);
};
