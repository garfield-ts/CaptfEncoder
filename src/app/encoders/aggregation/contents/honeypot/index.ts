import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  NgModule,
  NgZone,
  ViewChild
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatTooltip,
  MatTooltipModule,
  MatButtonToggleModule,
  MatSnackBar,
  MatSnackBarModule
} from "@angular/material";

import { ShodanHoneypotHelper } from "../../services/ShodanHoneypotHelper";


@Component({
  selector: "app-content-honeypot",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class HoneypotComponent {
  txtText1: string = "";
  txtText2: string = "";

  optQueryText: string = "";
  working: boolean = false;

  constructor(public snackBar: MatSnackBar) {}

 
  
  async query() {
    this.txtText2 = "";
    this.working = true;
    try {
      this.txtText2 = await ShodanHoneypotHelper.query(this.optQueryText)
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
    this.working = false;
  }  
}

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatSnackBarModule,    
  ],
  exports: [HoneypotComponent],
  declarations: [HoneypotComponent],
  entryComponents: [HoneypotComponent]
})
export class HoneypotModule {
  static entry = HoneypotComponent;
}
