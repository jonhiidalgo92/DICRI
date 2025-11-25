import React from "react";
import { Routes, Route } from "react-router-dom";

import Navegacion from "./components/Home/Nav";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Registro } from "./components/Registro/registro";
import { Perfil } from "./components/tecnico/tecnico";
import Administrador from "./components/coordinador/admin";
import {Expedi} from "./components/Evidencias/Expedientes/expedientes"

import { ProvideAuth } from "./hooks/useAuth";

function App() {
  return (
    <ProvideAuth>
      {/* barra de navegación */}
      <Navegacion />

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/administrador" element={<Administrador />} />
        <Route path="/tecnico" element={<Perfil />} />
        <Route path="/expedientes" element={<Expedi />} />
        
      </Routes>
    </ProvideAuth>
  );
}

export default App;
