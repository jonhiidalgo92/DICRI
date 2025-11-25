import * as indicioRepository from "../Repositorios/indicio.repository.js";

export const obtenerIndicios = async (data) => {
  return await indicioRepository.findAll(data);
};

export const obtenerIndicio = async (id) => {
  return await indicioRepository.findById(id);
};

export const crearIndicio = async (indicioData) => {
  // Aquí podrías validar datos, reglas de negocio, etc.
  return await indicioRepository.create(indicioData);
};

export const actualizarIndicio = async ( data) => {
  return await indicioRepository.update( data);
};

export const eliminarIndicio = async (id) => {
  return await indicioRepository.remove(id);
};