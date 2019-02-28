import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './service/auth-guard.service';
import { PermissionComponent } from './components/permission/permission.component';
import { SpecializationComponent } from './components/specialization/specialization.component';
import { ExamCategoryComponent } from './components/exam-category/exam-category.component';
import { ClientComponent } from './components/client/client.component';
import { ExaminerComponent } from './components/examiner/examiner.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { ExamComponent } from './components/exam/exam.component';
import { SectionComponent } from './components/section/section.component';
import { QuestionComponent } from './components/question/question.component';
import { CollegeComponent } from './components/college/college.component';
import { SectionCategoryComponent } from './components/section-category/section-category.component';
import { LicenseComponent } from './components/license/license.component';
import { QuestionBankComponent } from './components/question-bank/question-bank.component';

const routes: Routes = [ {
  path: 'login',
  component: LoginComponent
},
{
  path: 'college',
  component: CollegeComponent,
  canActivate : [AuthGuard]
},
{
  path: 'permission',
  component: PermissionComponent,
  canActivate : [AuthGuard]
},
{
  path: 'specialization',
  component: SpecializationComponent,
  canActivate : [AuthGuard]
},
{
  path: 'exam-category',
  component: ExamCategoryComponent,
  canActivate : [AuthGuard]
},
{
  path: 'section-category',
  component: SectionCategoryComponent,
  canActivate : [AuthGuard]
},
{
  path: 'license',
  component: LicenseComponent,
  canActivate : [AuthGuard]
},
{
  path: 'client',
  component: ClientComponent,
  canActivate : [AuthGuard]
},
{
  path: 'examiner',
  component: ExaminerComponent,
  canActivate : [AuthGuard]
},
{
  path: 'candidate',
  component: CandidateComponent,
  canActivate : [AuthGuard]
},
{
  path: 'exam',
  component: ExamComponent,
  canActivate : [AuthGuard]
},
{
  path: 'section',
  component: SectionComponent,
  canActivate : [AuthGuard]
},
{
  path: 'question',
  component: QuestionComponent,
  canActivate : [AuthGuard]
},
{
  path: 'question-bank',
  component: QuestionBankComponent,
  canActivate : [AuthGuard]
},
{
  path: '',
  redirectTo: 'candidate',
  pathMatch: 'full'

},
{
  path: '**',
  redirectTo: 'candidate',
  pathMatch: 'full'

}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
