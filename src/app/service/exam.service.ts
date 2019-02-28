import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../constant/global.variable';

const GET_EXAM = 'exam/list';
const CREATE_EXAM = 'exam/create';
const UPDATE_EXAM = 'exam/update';
const UPDATE_QUESTION = 'exam-section-question/update';
const UPDATE_QUESTION_BANK = 'question-bank/update';
const CREATE_SECTION = 'exam-section/create';
const UPDATE_SECTION = 'exam-section/update';
const GET_SECTION = 'exam-section/list-exam-id';
const GET_SUB_SECTION = 'exam-section/list-sub-section';
const GET_QUESTIONS = 'exam-section-question/list-examSection-id';
const GET_QUESTION_BANK = 'question-bank/list';
const GET_CATEGORY = 'exam-category/list';
const GET_SUB_CATEGORY = 'exam-category/list-by-category-id';
const GET_SECTION_CATEGORY = 'question-category/list';
const GET_QUESTION_CATEGORY = 'question-category/list-by-category-id';
const CREATE_QUESTION = 'exam-section-question/create';



@Injectable({
  providedIn: 'root'
})
export class ExamService {

  questionToAttach;

  constructor(private http: HttpClient) { }

  toFormData(request) {
    const formData = new FormData();

for ( const key in request ) {
  if (request.hasOwnProperty(key)) {
    formData.append(key, JSON.stringify(request[key]));
  }
}
return formData;
  }

  createQuestion(request) {
    const requestPayload = this.toFormData(request);
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_QUESTION}`, requestPayload);
  }
  getExamList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_EXAM}`, request);
  }
  getQuestionBankList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_QUESTION_BANK}`, request);
  }
  createExam(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_EXAM}`, request);
  }
 
  updateExam(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_EXAM}`, request);
  }
  updateQuestion(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_QUESTION}`, request);
  }
  getSubSectionList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_SUB_SECTION}`, request);
  }
  getSectionList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_SECTION}`, request);
  }
  createSection(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_SECTION}`, request);
  }
  updateSection(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_SECTION}`, request);
  }
  getQuestionList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_QUESTIONS}`, request);
  }
  getCategoryList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_CATEGORY}`, request);
  }
  getSectionCategoryList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_SECTION_CATEGORY}`, request);
  }
  getQuestionCategoryList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_QUESTION_CATEGORY}`, request);
  }
  getSubCategoryList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_SUB_CATEGORY}`, request);
  }
}
