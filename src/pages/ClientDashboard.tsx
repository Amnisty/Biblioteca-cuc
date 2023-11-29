import { Layout } from "../components";

export const ClientDashboard = () => {
  return (
    <Layout title="Biblioteca CUC">
      <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
        <h3>Mision</h3>
        <p>
          Potenciar el aprendizaje en los estudiantes y el ejercicio de la
          función docente e investigativa, mediante el acceso efectivo a los
          recursos de información y la provisión de escenarios físicos y
          virtuales, que respondan a los diferentes estilos de aprendizaje y que
          promueva la visibilidad académica y científica generada en la
          Universidad.
        </p>
        <hr></hr>
        <h3>Vision</h3>
        <p>
          Ser el servicio académico de la Universidad de la Costa, más utilizado
          por la comunidad universitaria interna y externa.
        </p>
      </div>
    </Layout>
  );
};
