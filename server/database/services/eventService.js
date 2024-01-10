const EventModel = require('../models/eventModel');
const { Op } = require('sequelize');
const validationUtils = require('../../utils/validationUtils');

class EventService{
	
	static async createEvent({newEvent}){
		const result = await EventModel.createEvent({newEvent});
		return result;
	}

	static async getAllEvent(){
		const result = await EventModel.getAllEvent();
		return result;
	}

	static async getCategoryEvent(options){
		const wheres = this.buildWhereClause(options);
		let result = await EventModel.getCategoryEvent(wheres);
    if (result.length == 0) {
      result.errorMessage = "카테고리ID 잘못 입력 OR 카테고리에 등록된 상품이 없음";
			return result
    }

    // result = result.map(el => el.get({ plain: true }));

		result.map((order, index) => {
      const { created_at } = result[index];

      // console.log(`${created_at.getFullYear()}-${created_at.getMonth()+1}-${created_at.getDate()}`);
      result[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
      result[index].created_at = result[index].created_at.toISOString().split('T')[0];
    })
    
		return result;
	}

	static async getSearchEvent(input){
		const validationInput = this.buildWhereClause(input);
		let result = await EventModel.getSearchEvent(validationInput);
    if (result.length == 0) {
      result.errorMessage = "잘못 입력 OR 관련 도서 없음";
			return result
    }

    // result = result.map(el => el.get({ plain: true }));

		result.map((order, index) => {
      const { created_at } = result[index];

      // console.log(`${created_at.getFullYear()}-${created_at.getMonth()+1}-${created_at.getDate()}`);
      result[index].created_at = new Date(created_at.setHours(created_at.getHours() + 9));
      result[index].created_at = result[index].created_at.toISOString().split('T')[0];
    })
    
		return result;
	}

	static async getOneEvent({event_id}){
		const result = await EventModel.getOneEvent({event_id});
		return result;
	}

	static async updateEvent({ event_id, toUpdate }){
		console.log("서비스에서: ",toUpdate);
		const result = await EventModel.updateEvent({ event_id, toUpdate });
		return result;
	}

	static async deleteEvent({ event_id }){
    const result = await EventModel.deleteEvent({ event_id });
    return result;
  }


	static buildWhereClause(options){
		const wheres = {};

		//책 id 조회
		if (options.event_id && validationUtils.validateString(options.event_id)) {
			wheres.event_id = {
				[Op.eq]: options.event_id,
			};
		}

		//책 이름 조회
		if (options.event_name && validationUtils.validateString(options.event_name)) {
			wheres.event_name = {
				[Op.eq]: options.event_name,
			};
		}

		//저자 조회
		if (options.event_author) {
			wheres.event_author = {
				[Op.eq]: options.event_author,
			};
		}

		//출판사 조회
		if (options.event_publisher) {
			wheres.event_publisher = {
				[Op.eq]: options.event_publisher,
			};
		}

		//장르 조회
		if (options.event_genre && validationUtils.isValidGenre(options.event_genre)) { //장르가 존재하고 진짜 있는 장르인지
			wheres.event_genre = options.event_genre;
		}
	
		//도서 대출 여부
		if (options.event_availability !== undefined) { //장르 쿼리스트링에 넣었으면
			wheres.event_availability = Boolean(options.event_availability); //뭘 입력하든 불린으로 강제 변환해서 안전
		}
	
		//도서 고유 번호
		if (options.event_ISBN && validationUtils.validateString(options.event_ISBN)) {
			wheres.event_ISBN = {
				[Op.eq]: options.event_ISBN,
			};
		}
		return wheres;
	}

	
}
module.exports = EventService;