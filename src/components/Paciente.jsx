const Paciente = ({ paciente }) => {
  //   const { setEdicion, eliminarPaciente } = usePacientes();
  const setEdicion = () => {};
  const eliminarPaciente = () => {};

  const { email, fecha, nombre, apellido, telefono, seguimiento, _id } =
    paciente;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);

    return new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };

  return (
    <div className="flex flex-col mx-5 mt-4 mb-10 bg-white shadow-[10px_10px_10px_2px_rgba(67,56,202,0.3)] px-5 py-5 rounded-xl">
      <div className="w-full flex flex-wrap">
        <div className="w-3/4">
          <p className="font-bold uppercase text-indigo-700 my-2">
            Nombre: {""}
            <span className="font-normal normal-case text-black">{nombre}</span>
          </p>
          <p className="font-bold uppercase text-indigo-700 my-2">
            Apellido: {""}
            <span className="font-normal normal-case text-black">
              {apellido}
            </span>
          </p>
          <p className="font-bold uppercase text-indigo-700 my-2">
            Email Contacto: {""}
            <a
              href={"mailto:" + email}
              className="font-normal normal-case text-black"
            >
              {email}
            </a>
          </p>
          <p className="font-bold uppercase text-indigo-700 my-2">
            Fecha: {""}
            <span className="font-normal normal-case text-black">
              {formatearFecha(fecha)}
            </span>
          </p>
          <p className="font-bold uppercase text-indigo-700 my-2">
            Contacto: {""}
            {telefono ? (
              <a
                href={`https://wa.me/${telefono}`}
                className="font-normal normal-case text-white bg-[#28e46d] hover:bg-[#25D366] py-1 px-2 rounded-lg"
                target="_blank"
              >
                Whatsapp
              </a>
            ) : (
              <span className="font-normal normal-case text-white py-1 px-2 rounded-lg bg-indigo-700">
                Sin Numero
              </span>
            )}
          </p>
        </div>
        <div className="w-1/4 flex items-start justify-end">
          {seguimiento ? (
            <span className="font-bold uppercase text-indigo-700 my-2">
              Seguimiento
            </span>
          ) : (
            <span className="font-normal normal-case text-white bg-indigo-700 py-1 px-2 rounded-lg">
              Primer Turno
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-between my-5">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
          onClick={() => setEdicion(paciente)}
        >
          Editar
        </button>

        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
          onClick={() => eliminarPaciente(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
