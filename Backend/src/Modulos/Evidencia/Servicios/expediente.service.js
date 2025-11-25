import * as expedienteRepository from "../Repositorios/expediente.repository.js";

export const obtenerExpedientes = async () => {
  return await expedienteRepository.findAll();
};

export const obtenerExpediente = async (id) => {
  return await expedienteRepository.findById(id);
};

export const crearExpediente = async (data) => {
  return await expedienteRepository.create(data);
};

export const actualizarExpediente = async ( data) => {
      const { idExpediente, Etapa_idEtapa, descripcion } = data;
  
  if (!idExpediente || !Etapa_idEtapa || !descripcion) {
     throw new Error("Error: Falta de campos Obligatorios");
  }

  return await expedienteRepository.update( idExpediente, Etapa_idEtapa, descripcion);
};

export const eliminarExpediente = async (id) => {
  return await expedienteRepository.remove(id);
};