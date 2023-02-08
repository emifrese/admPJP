export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

export const getDays = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const compareHours = (a, b) =>
  parseInt(a.props.children.toString().replaceAll(/(\W)/g, "")) <
  parseInt(b.props.children.toString().replaceAll(/(\W)/g, ""))
    ? -1
    : 1;
