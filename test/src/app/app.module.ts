import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { ClientModule } from './modules/client.module';

@NgModule({
    declarations: [AppComponent],
    imports: [ClientModule, CommonModule, AppRoutingModule],
    providers: [DataService],
    bootstrap: [AppComponent],
})
export class AppModule {}
