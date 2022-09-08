const uuid = require("uuid");
const path = require("path");
const { Car, CarInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class carController {
  async create(req, res, next) {
    try {
      let {
        name,
        model_year,
        brandId,
        typeId,
        info,
        model,
        MOTendDay,
        InsuranceEndDate,
        Fuel,
        OwnershipTtype,
      } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const car = await Car.create({
        name,
        MOTendDay,
        InsuranceEndDate,
        Fuel,
        OwnershipTtype,
        model,
        model_year,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          CarInfo.create({
            title: i.title,
            description: i.description,
            deviceId: car.id,
          })
        );
      }

      return res.json(car);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let cars;
    if (!brandId && !typeId) {
      cars = await Car.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      cars = await Car.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      cars = await Car.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      cars = await Car.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(cars);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const car = await Car.findOne({
      where: { id },
      include: [{ model: CarInfo, as: "info" }],
    });
    return res.json(car);
  }
}

module.exports = new carController();
