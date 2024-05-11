import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "./components/loader/loader.component";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { InterestComponentComponent } from './components/interest-component/interest-component.component';
//import { ConversionModalComponent } from './components/modals/conversion-modal/conversion-modal.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    LoaderComponent,
    InterestComponentComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    
  ],
  exports: [
    LoaderComponent,
    InterestComponentComponent,
  ],
})
export class SharedModule { }
