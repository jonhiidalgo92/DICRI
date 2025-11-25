import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="container py-5">

      {/* Hero Section */}
      <div className="row align-items-center">
        <div className="col-md-6">
          
          <h1 className="display-4 fw-bold text-primary mb-3">
            Bienvenido a DICRI
          </h1>

          <p className="lead text-muted mb-4">
            Sistema de gestión de Evidencias 
          </p>

          <div>
            <Link to="/login" className="btn btn-primary btn-lg me-3">
              Iniciar Sesión
            </Link>

            <Link to="/registro" className="btn btn-outline-primary btn-lg">
              Registrarse
            </Link>
          </div>
        </div>

        {/* Imagen decorativa */}
        <div className="col-md-6 mt-4 mt-md-0 text-center">
          <div className="p-4">
            <div 
              className="bg-light shadow-sm rounded"
              style={{ height: "260px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                    <img 
                        src="https://www.mp.gob.gt/wp-content/themes/ministerio-publico/assets/img/MP_logo.png"
                        alt="Imagen del sistema"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row text-center mt-5 pt-4 border-top">
        <div className="col-md-4 mb-4">
          <div className="p-3">
            <h4 className="fw-semibold text-primary">Fácil de Usar</h4>
            <p className="text-muted">
              Interfaz intuitiva para navegar y realizar tareas rápidamente.
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="p-3">
            <h4 className="fw-semibold text-primary">Seguro</h4>
            <p className="text-muted">
              Autenticación con roles y protección mediante tokens.
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="p-3">
            <h4 className="fw-semibold text-primary">Optimizado</h4>
            <p className="text-muted">
              Diseñado para técnicos y administradores con alto rendimiento.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};