import { makeAutoObservable } from "mobx";

export default class CarStore {
  constructor() {
    this._cars = [];
    this._brands = [];
    this._types = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    makeAutoObservable(this);
  }

  setCar(cars) {
    this._cars = cars;
  }

  setType(types) {
    this._types = types;
  }
  setBrand(brands) {
    this._brands = brands;
  }

  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }

  setLimit(limit) {
    this._limit = limit;
  }

  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }

  get getSelectedType() {
    return this._selectedType;
  }

  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }

  get getSelectedBrand() {
    return this._selectedBrand;
  }

  get cars() {
    return this._cars;
  }
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }

  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}
