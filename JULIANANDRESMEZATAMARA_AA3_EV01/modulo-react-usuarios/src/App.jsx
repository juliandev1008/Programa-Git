import { useState } from 'react'; // Importa el Hook que permite guardar datos que cambian en pantalla.

const usuarioInicial = { documento: '', nombres: '', apellidos: '', correo: '', telefono: '' }; // Define un formulario vacío reutilizable.

const datosIniciales = [ // Declara datos de ejemplo para mostrar la consulta al abrir el módulo.
  { id: 1, documento: '1000000001', nombres: 'Ana', apellidos: 'Gómez', correo: 'ana@finflow.com', telefono: '3001234567' } // Crea el primer usuario de demostración.
];

function App() { // Declara el componente principal que React mostrará en la interfaz.
  const [usuarios, setUsuarios] = useState(datosIniciales); // Guarda la lista de usuarios registrados.
  const [formulario, setFormulario] = useState(usuarioInicial); // Guarda lo escrito actualmente en los campos.
  const [idEdicion, setIdEdicion] = useState(null); // Guarda el identificador del usuario que se está editando.
  const [mensaje, setMensaje] = useState(''); // Guarda los mensajes que se muestran a la persona usuaria.

  const actualizarCampo = (evento) => { // Define la función que responde cuando cambia un campo del formulario.
    const { name, value } = evento.target; // Obtiene el nombre del campo y el texto ingresado.
    setFormulario({ ...formulario, [name]: value }); // Copia el formulario anterior y actualiza solo el campo modificado.
  }; // Finaliza la función de actualización del formulario.

  const limpiarFormulario = () => { // Declara una función para volver el formulario a su estado inicial.
    setFormulario(usuarioInicial); // Limpia todos los valores escritos en los campos.
    setIdEdicion(null); // Indica que ya no hay un usuario seleccionado para edición.
  }; // Finaliza la función que limpia el formulario.

  const guardarUsuario = (evento) => { // Declara la función que procesa el envío del formulario.
    evento.preventDefault(); // Evita que el navegador recargue la página al enviar el formulario.
    const datosLimpios = Object.fromEntries(Object.entries(formulario).map(([clave, valor]) => [clave, valor.trim()])); // Elimina espacios innecesarios en cada dato.
    const repetido = usuarios.some((usuario) => usuario.id !== idEdicion && (usuario.documento === datosLimpios.documento || usuario.correo.toLowerCase() === datosLimpios.correo.toLowerCase())); // Busca documento o correo repetidos.

    if (repetido) { // Comprueba si se encontró un dato que ya pertenece a otro usuario.
      setMensaje('No se puede guardar: el documento o el correo ya están registrados.'); // Informa claramente la regla de validación.
      return; // Detiene la operación para no duplicar información.
    } // Finaliza la condición de datos repetidos.

    if (idEdicion) { // Comprueba si el formulario se está usando para editar un usuario existente.
      setUsuarios(usuarios.map((usuario) => usuario.id === idEdicion ? { ...datosLimpios, id: idEdicion } : usuario)); // Reemplaza solo el usuario seleccionado.
      setMensaje('Usuario actualizado correctamente.'); // Muestra el resultado de la actualización.
    } else { // Ejecuta esta parte cuando se desea crear un nuevo usuario.
      setUsuarios([...usuarios, { ...datosLimpios, id: Date.now() }]); // Agrega el nuevo usuario con un identificador único.
      setMensaje('Usuario registrado correctamente.'); // Muestra el resultado de la inserción.
    } // Finaliza la decisión entre crear y actualizar.

    limpiarFormulario(); // Restablece el formulario después de guardar correctamente.
  }; // Finaliza la función de guardado.

  const editarUsuario = (usuario) => { // Declara la función que prepara un registro para ser modificado.
    setFormulario({ documento: usuario.documento, nombres: usuario.nombres, apellidos: usuario.apellidos, correo: usuario.correo, telefono: usuario.telefono }); // Copia los datos del usuario en el formulario.
    setIdEdicion(usuario.id); // Guarda el identificador para saber qué registro actualizar.
    setMensaje(`Editando a ${usuario.nombres} ${usuario.apellidos}.`); // Indica qué usuario está en modo edición.
  }; // Finaliza la función de edición.

  const eliminarUsuario = (id) => { // Declara la función que elimina un usuario de la lista.
    const confirmar = window.confirm('¿Desea eliminar este usuario?'); // Solicita confirmación para evitar eliminaciones accidentales.
    if (!confirmar) return; // Detiene la operación si la persona cancela la confirmación.
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id)); // Conserva todos los usuarios excepto el seleccionado.
    setMensaje('Usuario eliminado correctamente.'); // Informa que la eliminación se completó.
    if (id === idEdicion) limpiarFormulario(); // Limpia el formulario si se eliminó el usuario que se estaba editando.
  }; // Finaliza la función de eliminación.

  return ( // Devuelve el contenido JSX que se visualizará en el navegador.
    <main className="contenedor"> {/* Agrupa todo el contenido principal del módulo. */}
      <header> {/* Agrupa el título y la explicación del módulo. */}
        <p className="etiqueta">FINFLOW · REACT</p> {/* Identifica la tecnología usada en la evidencia. */}
        <h1>Gestión de usuarios</h1> {/* Muestra el título principal de la interfaz. */}
        <p>Registre y administre los datos de los usuarios del sistema financiero.</p> {/* Explica la finalidad funcional de la pantalla. */}
      </header> {/* Cierra el encabezado. */}

      {mensaje && <p className="mensaje" role="status">{mensaje}</p>} {/* Presenta mensajes solo cuando existe alguno. */}

      <section className="tarjeta"> {/* Agrupa el formulario dentro de una tarjeta visual. */}
        <h2>{idEdicion ? 'Actualizar usuario' : 'Registrar usuario'}</h2> {/* Cambia el título según la operación. */}
        <form onSubmit={guardarUsuario}> {/* Ejecuta guardarUsuario al enviar datos válidos. */}
          <Campo etiqueta="Documento de identidad" nombre="documento" valor={formulario.documento} alCambiar={actualizarCampo} /> {/* Renderiza el campo documento. */}
          <Campo etiqueta="Nombres" nombre="nombres" valor={formulario.nombres} alCambiar={actualizarCampo} /> {/* Renderiza el campo nombres. */}
          <Campo etiqueta="Apellidos" nombre="apellidos" valor={formulario.apellidos} alCambiar={actualizarCampo} /> {/* Renderiza el campo apellidos. */}
          <Campo etiqueta="Correo electrónico" nombre="correo" tipo="email" valor={formulario.correo} alCambiar={actualizarCampo} /> {/* Renderiza el campo correo con validación HTML. */}
          <Campo etiqueta="Teléfono de contacto" nombre="telefono" valor={formulario.telefono} alCambiar={actualizarCampo} /> {/* Renderiza el campo teléfono. */}
          <div className="acciones"> {/* Agrupa los botones del formulario. */}
            <button type="submit">{idEdicion ? 'Guardar cambios' : 'Registrar usuario'}</button> {/* Envía el formulario. */}
            {idEdicion && <button type="button" className="secundario" onClick={limpiarFormulario}>Cancelar</button>} {/* Permite abandonar la edición. */}
          </div> {/* Cierra el grupo de botones. */}
        </form> {/* Cierra el formulario. */}
      </section> {/* Cierra la tarjeta del formulario. */}

      <section className="tarjeta"> {/* Agrupa la tabla de consulta de usuarios. */}
        <h2>Usuarios registrados ({usuarios.length})</h2> {/* Muestra la cantidad actual de registros. */}
        <div className="tabla-responsive"> {/* Permite desplazar la tabla en pantallas pequeñas. */}
          <table> {/* Inicia la tabla con los datos consultados. */}
            <thead><tr><th>Documento</th><th>Nombres</th><th>Apellidos</th><th>Correo</th><th>Teléfono</th><th>Acciones</th></tr></thead> {/* Define los encabezados de columna. */}
            <tbody> {/* Inicia el cuerpo de la tabla. */}
              {usuarios.map((usuario) => ( // Recorre cada usuario y genera una fila.
                <tr key={usuario.id}> {/* Asigna una clave única a la fila para React. */}
                  <td>{usuario.documento}</td><td>{usuario.nombres}</td><td>{usuario.apellidos}</td><td>{usuario.correo}</td><td>{usuario.telefono}</td> {/* Muestra los datos del usuario. */}
                  <td><button className="editar" onClick={() => editarUsuario(usuario)}>Editar</button><button className="eliminar" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button></td> {/* Incluye las acciones de actualización y eliminación. */}
                {/* Cierra la fila del usuario. */}</tr>
              ))} {/* Finaliza el recorrido de usuarios. */}
            </tbody> {/* Cierra el cuerpo de la tabla. */}
          </table> {/* Cierra la tabla. */}
        </div> {/* Cierra el contenedor adaptable de la tabla. */}
      </section> {/* Cierra la tarjeta de consulta. */}
    {/* Cierra el contenido principal. */}</main>
  ); // Finaliza el JSX devuelto.
} // Finaliza el componente App.

function Campo({ etiqueta, nombre, valor, alCambiar, tipo = 'text' }) { // Declara un componente reutilizable para cada campo del formulario.
  return ( // Devuelve la etiqueta y el control de entrada.
    <label> {/* Relaciona el texto descriptivo con el campo de entrada. */}
      <span>{etiqueta}</span> {/* Muestra el nombre legible del campo. */}
      <input type={tipo} name={nombre} value={valor} onChange={alCambiar} required /> {/* Captura el dato y comunica cambios a App. */}
    {/* Cierra la etiqueta del campo. */}</label>
  ); // Finaliza el JSX del componente Campo.
} // Finaliza el componente reutilizable.

export default App; // Exporta App para que main.jsx pueda renderizarlo.
