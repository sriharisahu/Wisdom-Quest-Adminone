import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../constant/global.variable';

const GET_CLIENT_LIST = 'test-conductor/list';
const GET_EXAMINER_LIST = 'test-conductor/list';
const GET_CANDIDATE_LIST = 'user/list';
// const GET_FILTER_CANDIDATE_LIST = 'exam/result-list';
const GET_FILTER_CANDIDATE_LIST = 'exam/result-list-by-examId';
const GET_LICENSE_LIST = 'license/list';
const GET_EXTERNAL_LICENSE_LIST = 'test-conductor-license/external-license-list';
const GET_EXAMINER_LICENSE_LIST = 'test-conductor-license/list-by-tc-id';
const GET_LICENSE_EXAMINER_LIST = 'test-conductor/list';
const GET_LICENSE_CANDIDATE_LIST = 'test-conductor-test-code/list-test-conductor-license-id';
const GET_CLIENT_EXAMINER_LIST = 'test-conductor/tc-list';


const CREATE_CLIENT = 'test-conductor/create';
const CREATE_EXAMINER = 'test-conductor/create';
const CREATE_CANDIDATE = 'user/create';
const CREATE_LICENSE = 'test-conductor-license/admin-assign-license';
const CREATE_TC_LICENSE = 'test-conductor-licence/tc-assign-license';
const CREATE_EXTERNAL_LICENSE_LIST = 'test-conductor-license/external-license-assign';

const UPDATE_CLIENT = 'test-conductor/update';
const UPDATE_EXAMINER = 'examiner/update';
const UPDATE_CANDIDATE = 'user/update';
const UPDATE_CANDIDATE_BULK = 'user/create-batch';
const UPDATE_LICENSE = 'test-conductor-license/update';
const ALLOCATE_CANDIDATE = 'test-conductor-test-code/test-code-assign-user';

const DELETE_CLIENT = 'client/update';
const DELETE_EXAMINER = 'examiner/update';
const DELETE_CANDIDATE = 'user/update';
const DELETE_LICENSE = 'license/update';

const GENERATE_KEY = 'exam-license/publish';
const VIEW_KEY = 'exam-license/read';
const DISABLE_KEY = 'exam-license/deactivate';





@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



  generateLicenseKey(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GENERATE_KEY}`, request);
  }
  viewLicenseKey(request) {
    return this.http.get(`${GlobalVariable.BASE_API_URL}${VIEW_KEY}/${request.testConductorLicenseId}`);
  }
  disableLicenseKey(request) {
    return this.http.get(`${GlobalVariable.BASE_API_URL}${DISABLE_KEY}/${request.testConductorLicenseId}`);
  }


  getClientList(request) {
    const requestPayload = {...request, adminType: 'ADMIN'};
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_CLIENT_LIST}`, requestPayload);
  }
  getExaminerList(request) {
    const requestPayload = {...request, adminType: 'TESTCONDUCTOR'};
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_EXAMINER_LIST}`, requestPayload);
  }

  getClientExaminerList(request) {
    const requestPayload = {...request};
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_CLIENT_EXAMINER_LIST}`, requestPayload);
  }

  getCandidateList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_CANDIDATE_LIST}`, request);
  }
  getFilterCandidateList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_FILTER_CANDIDATE_LIST}`, request);
  }
  getLicenseCandidateList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_LICENSE_CANDIDATE_LIST}`, request);
  }
  getLicenseExaminerList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_LICENSE_EXAMINER_LIST}`, request);
  }

  getLicenseList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_LICENSE_LIST}`, request);
  }
  getExternalLicenseList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_EXTERNAL_LICENSE_LIST}`, request);
  }
  getTestconductorLicenseList(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${GET_EXAMINER_LICENSE_LIST}`, request);
  }
  // tslint:disable-next-line:member-ordering
  getClientLicenseList = this.getTestconductorLicenseList;
  // tslint:disable-next-line:member-ordering
  getExaminerLicenseList = this.getTestconductorLicenseList;
  createClient(request) {
    const requestPayload = {...request, adminType: 'ADMIN'};
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_CLIENT}`, requestPayload);
  }

  createExaminer(request) {
    const requestPayload = {...request, adminType: 'TESTCONDUCTOR'};
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_EXAMINER}`, requestPayload);
  }

  createCandidate(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_CANDIDATE}`, request);
  }
  createLicense(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_LICENSE}`, request);
  }
  createExatenalLicense(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_EXTERNAL_LICENSE_LIST}`, request);
  }
  allocateCandidate(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${ALLOCATE_CANDIDATE}`, request);
  }
  createTcLicense(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${CREATE_TC_LICENSE}`, request);
  }
  updateClient(request) {
    const requestPayload = {...request, adminType: 'ADMIN'};
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_CLIENT}`, requestPayload);
  }
  updateExaminer(request) {
    const requestPayload = {...request, adminType: 'TESTCONDUCTOR'};
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_EXAMINER}`, requestPayload);
  }

  updateCandidate(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_CANDIDATE}`, request);
  }
  createCandidateBulk(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_CANDIDATE_BULK}`, request);
  }
  updateLicense(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${UPDATE_LICENSE}`, request);
  }

  deleteClient(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${DELETE_CLIENT}`, request);
  }
  deleteExaminer(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${DELETE_EXAMINER}`, request);
  }

  deleteCandidate(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${DELETE_CANDIDATE}`, request);
  }
  deleteLicense(request) {
    return this.http.post(`${GlobalVariable.BASE_API_URL}${DELETE_LICENSE}`, request);
  }

}
