const { getVehicles, getTotalVehicles } = require('../../../infrastructure/repositories/vehicleRepository');

const getVehiclesUseCase = async (filter = {}, page = 1, limit = 10) => {
  // Ensure page and limit are positive integers
  const pageNumber = Math.max(1, parseInt(page, 10));
  const pageSize = Math.max(1, parseInt(limit, 10));

  // Fetch vehicles from the repository
  const vehicles = await getVehicles(filter, pageNumber, pageSize);
  const total = await getTotalVehicles(filter);
  return {
    vehicles,
    total:total,
    page: pageNumber,
    limit: pageSize,
  };
};

module.exports = getVehiclesUseCase;
