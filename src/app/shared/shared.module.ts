import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TooltipModule } from 'primeng/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { UiPrimengModule } from './ui-primeng/ui-primeng.module';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ConfirmationModalService } from './services/confirmation-modal.service';
import { SortingPipe } from './pipes/sorting.pipe';

import { DeleteUserService } from '../auth/services/delete-user.service';
import { ApiControlService } from '../auth/services/api-control.service';
import { ApiHelpersService } from '../auth/services/api-helpers.service';
import { MainService } from '../main/services/main.service';
import { TranslocoRootModule } from '../transloco-root.module';
import { ApiSearchService } from '../pages/search/services/api-search.service';

@NgModule({
  declarations: [ConfirmationModalComponent, SortingPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UiPrimengModule,
    TranslocoRootModule,
    MatDialogModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    UiPrimengModule,
    ConfirmationModalComponent,
    TranslocoRootModule,
    MatDialogModule,
    SortingPipe,
  ], // m.b. delete
  providers: [
    ConfirmationModalService,
    DeleteUserService,
    ApiControlService,
    ApiHelpersService,
    MainService,
    ApiSearchService,
  ],
})
export class SharedModule {}
