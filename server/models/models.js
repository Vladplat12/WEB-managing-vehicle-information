const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const User_main = sequelize.define("user_main", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const User_photo = sequelize.define("user_photo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const Car = sequelize.define("car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  model_year: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 }, // added defaultValue: 0
  img: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  MOTendDay: { type: DataTypes.STRING, allowNull: false },
  InsuranceEndDate: { type: DataTypes.STRING, allowNull: false },
  Fuel: { type: DataTypes.STRING, allowNull: false },
  OwnershipTtype: { type: DataTypes.STRING, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const CarInfo = sequelize.define("car_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});
const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(User_main);
User_main.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User_main.hasMany(User_photo);
User_photo.belongsTo(User_main);

Type.hasMany(Car);
Car.belongsTo(Type);

Brand.hasMany(Car);
Car.belongsTo(Brand);

Car.hasMany(Rating);
Rating.belongsTo(Car);

Car.hasMany(User_photo);
User_photo.belongsTo(Car);

Car.hasMany(CarInfo, { as: "info" });
CarInfo.belongsTo(Car);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  User_photo,
  User_main,
  Car,
  Type,
  Brand,
  Rating,
  TypeBrand,
  CarInfo,
};
