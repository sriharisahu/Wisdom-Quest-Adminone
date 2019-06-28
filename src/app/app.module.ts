import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { QuillModule } from 'ngx-quill';
import { TimepickerModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { ClientComponent } from './components/client/client.component';
import { ExaminerComponent } from './components/examiner/examiner.component';
import { ExamComponent } from './components/exam/exam.component';
import { SectionComponent } from './components/section/section.component';
import { QuestionComponent } from './components/question/question.component';
import { CollegeComponent } from './components/college/college.component';
import { PermissionComponent } from './components/permission/permission.component';
import { SpecializationComponent } from './components/specialization/specialization.component';
import { ExamCategoryComponent } from './components/exam-category/exam-category.component';
import { SectionCategoryComponent } from './components/section-category/section-category.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CandidateRegistrationComponent } from './components/candidate-registration/candidate-registration.component';
import { PermissionRegistrationComponent } from './components/permission-registration/permission-registration.component';
import { SpecializationRegistrationComponent } from './components/specialization-registration/specialization-registration.component';
import { ExamCategoryRegistrationComponent } from './components/exam-category-registration/exam-category-registration.component';
import { SectionCategoryRegistrationComponent } from './components/section-category-registration/section-category-registration.component';
import { ExamRegistrationComponent } from './components/exam-registration/exam-registration.component';
import { SectionRegistrationComponent } from './components/section-registration/section-registration.component';
import { QuestionRegistrationComponent } from './components/question-registration/question-registration.component';
import { InformerService } from './service/informer.service';
import { IconModule } from './icon/icon.module';
import { ChartsModule } from 'ng2-charts';
import { ConfigurationService } from './service/configuration.service';
import { AuthenticationService } from './service/authentecation.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './service/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './service/auth-guard.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EmptyListComponent } from './components/empty-list/empty-list.component';
import { ModalModule } from 'ngx-bootstrap';
import { ExamSettingsComponent } from './components/exam-settings/exam-settings.component';
import { QuestionHostComponent } from './components/question-host/question-host.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { CollegeRegistrationComponent } from './components/college-registration/college-registration.component';
import { ClientRegistrationComponent } from './components/client-registration/client-registration.component';
import { ExaminerRegistrationComponent } from './components/examiner-registration/examiner-registration.component';
import { LicenseComponent } from './components/license/license.component';
import { LicenseRegistrationComponent } from './components/license-registration/license-registration.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { QuestionBankComponent } from './components/question-bank/question-bank.component';
import { ErrorInterceptor } from './service/error.interceptor';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { LicensePermissionMappingComponent } from './components/license-permission-mapping/license-permission-mapping.component';
import { ResultComponent } from './components/result/result.component';
import { LicenseCandidateMappingComponent } from './license-candidate-mapping/license-candidate-mapping.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { LicenseKeyComponent } from './components/license-key/license-key.component';
import { ExamAnalysisComponent } from './components/exam-analysis/exam-analysis.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { ImportFromCsvComponent } from './components/import-from-csv/import-from-csv.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CandidateComponent,
    ClientComponent,
    ExaminerComponent,
    ExamComponent,
    SectionComponent,
    QuestionComponent,
    CollegeComponent,
    PermissionComponent,
    SpecializationComponent,
    ExamCategoryComponent,
    SectionCategoryComponent,
    HeaderComponent,
    SidebarComponent,
    CandidateRegistrationComponent,
    PermissionRegistrationComponent,
    SpecializationRegistrationComponent,
    ExamCategoryRegistrationComponent,
    SectionCategoryRegistrationComponent,
    ExamRegistrationComponent,
    SectionRegistrationComponent,
    QuestionRegistrationComponent,
    SearchBarComponent,
    LoadingComponent,
    EmptyListComponent,
    ExamSettingsComponent,
    QuestionHostComponent,
    ReplacePipe,
    CollegeRegistrationComponent,
    PermissionRegistrationComponent,
    ClientRegistrationComponent,
    ExaminerRegistrationComponent,
    LicenseComponent,
    LicenseRegistrationComponent,
    DeleteConfirmationComponent,
    QuestionBankComponent,
    ErrorMsgComponent,
    LicensePermissionMappingComponent,
    ResultComponent,
    CertificateComponent,
    CandidateComponent,
    LicenseCandidateMappingComponent,
    LicenseKeyComponent,
    ExamAnalysisComponent,
    DoughnutChartComponent,
    LineChartComponent,
    BarChartComponent,
    ImportFromCsvComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    AppRoutingModule,
    InfiniteScrollModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],        // toggled buttons
          ['blockquote'],

    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'size': ['small', false, 'large', 'huge'],
    'header': [1, 2, 3, 4, 5, 6, false] }],  // custom dropdown

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image']
        ]
      }
    })
  ,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    AuthenticationService,
    ConfigurationService,
    InformerService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ImportFromCsvComponent,
    ExamRegistrationComponent,
    SectionRegistrationComponent,
    QuestionRegistrationComponent,
    CollegeRegistrationComponent,
    ExamSettingsComponent,
    PermissionRegistrationComponent,
    SectionCategoryRegistrationComponent,
    SpecializationRegistrationComponent,
    ExamCategoryRegistrationComponent,
    DeleteConfirmationComponent,
    ClientRegistrationComponent,
    ExaminerRegistrationComponent,
    LicenseRegistrationComponent,
    CandidateRegistrationComponent,
    ErrorMsgComponent,
    LicensePermissionMappingComponent,
    ResultComponent,
    CandidateComponent,
    LicenseCandidateMappingComponent,
    CertificateComponent,
    LicenseKeyComponent,
    ExamAnalysisComponent,
    DoughnutChartComponent
  ]
})
export class AppModule { }
