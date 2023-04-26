class DataModel {
    static data = [];
  
    static setData(data) {
      DataModel.data = data;
    }
  
    static getData() {
      return DataModel.data;
    }
  
    static addData(data) {
      DataModel.data = [...DataModel.data, data];
    }
  
    static updateData(data) {
      const index = DataModel.data.findIndex((item) => item.id === data.id);
      DataModel.data[index] = data;
    }
  
    static deleteData(id) {
      DataModel.data = DataModel.data.filter((item) => item.id !== id);
    }
  }
  
  export default DataModel;
  