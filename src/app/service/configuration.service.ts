import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../constant/global.variable';

const GET_COLLEGE_LIST = 'college/list';
const GET_PERMISSION_LIST = 'permission/list';
const GET_SPECIALIZATION_LIST = 'specialization/list';
const GET_EXAM_CATEGORY_LIST = 'exam-category/list';
const GET_SECTION_CATEGORY_LIST = 'question-category/list';
const GET_SECTION_SUB_CATEGORY_LIST = 'question-category/list-by-category-id';
const GET_EXAM_SUB_CATEGORY_LIST = 'exam-category/list-by-category-id';


const CREATE_COLLEGE = 'college/create';
const CREATE_PERMISSION = 'permission/create';
const CREATE_SPECIALIZATION = 'specialization/create';
const CREATE_EXAM_CATEGORY = 'exam-category/create';
const CREATE_SECTION_CATEGORY = 'question-category/create';


const UPDATE_COLLEGE = 'college/update';
const UPDATE_PERMISSION = 'permission/update';
const UPDATE_SPECIALIZATION = 'specialization/update';
const UPDATE_EXAM_CATEGORY = 'exam-category/update';
const UPDATE_SECTION_CATEGORY = 'question-category/update';
const UPDATE_CLIENT = 'client/update';
const UPDATE_EXAMINER = 'examiner/update';
const UPDATE_CANDIDATE = 'candidate/update';
const UPDATE_LICENSE = 'test-conductor-license/update';
const MAP_PERMISSION_LICENSE = 'user-permission/create-batch';





@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) { }


  getCollegeList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_COLLEGE_LIST}`, request);
  }
  getPermissionList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_PERMISSION_LIST}`, request);
  }
  getSpecializationList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_SPECIALIZATION_LIST}`, request);
  }
  getExamCategoryList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_EXAM_CATEGORY_LIST}`, request);
  }

  getSectionCategoryList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_SECTION_CATEGORY_LIST}`, request);
  }
  getSectionSubCategoryList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_SECTION_SUB_CATEGORY_LIST}`, request);
  }
  getExamSubCategoryList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_EXAM_SUB_CATEGORY_LIST}`, request);
  }




  createCollege(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_COLLEGE}`, request);
  }
  createPermission(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_PERMISSION}`, request);
  }
  createSpecialization(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_SPECIALIZATION}`, request);
  }
  createExamCategory(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_EXAM_CATEGORY}`, request);
  }

  createSectionCategory(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_SECTION_CATEGORY}`, request);
  }

  updateCollege(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_COLLEGE}`, request);
  }
  updatePermission(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_PERMISSION}`, request);
  }
  updateLicense(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_LICENSE}`, request);
  }
  updateSpecialization(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_SPECIALIZATION}`, request);
  }
  updateExamCategory(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_EXAM_CATEGORY}`, request);
  }

  updateSectionCategory(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_SECTION_CATEGORY}`, request);
  }

  mapLicensePermission(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${MAP_PERMISSION_LICENSE}`, request);
  }
}
