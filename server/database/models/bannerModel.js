const Banner = require('../schemas/banner'); 

class BannerModel {
  static async createBanner({newBanner}){
    console.log("newBanner",newBanner);
    const result = await Banner.create(newBanner);
    return result;
  }

  static async getAllBanner(){
    const result = await Banner.findAll();
    return result;
  }
  
  static async updateBanner({ Banner_id, toUpdate }){
    console.log("update: ",toUpdate);
    const result = await Banner.update({
      ...toUpdate
    }, {
      where: {
        banner_id: Banner_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

  static async deleteBanner({ Banner_id }){
    // console.log("bannerId",bannerId);
    const result = await Banner.destroy({
      where: {
        banner_id: Banner_id
      }
    });//where: {id: asdf} 형태가 들어와야함
    return result;
  }

}

module.exports = BannerModel; 