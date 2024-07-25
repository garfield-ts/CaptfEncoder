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

import {
  TextEditor,
  TextEditorModule
} from "../../../../shared/text-editor/text-editor";

import { RailFenceCipherEncoder } from "../../services/RailFenceCipherEncoder";
import { RailFenceCipherDecoder } from "../../services/RailFenceCipherDecoder";

@Component({
  selector: "app-content-rail-fence-cipher-encoder",
  templateUrl: "./index.html",
  styleUrls: ["./index.scss"]
})
export class RailFenceCipherEncoderComponent implements OnInit, OnDestroy {
  @ViewChild('txtText1', {static: false}) txtText1: TextEditor;
  @ViewChild('txtText2', {static: false}) txtText2: TextEditor;
  optNumber: number = 2;

  flagForButtonToggle = "ENCODE";

  constructor(public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    //console.log('ngOnInit');
  }

  ngOnDestroy(): void {
    //console.log('ngOnInit');
  }

  async handleText() {
    this.txtText2.val = "";

    try {
      if (this.flagForButtonToggle == "ENCODE") {
        this.txtText2.val = await new RailFenceCipherEncoder({
          number: this.optNumber
        }).handle(this.txtText1.val);
      } else {
        this.txtText2.val = await new RailFenceCipherDecoder({
          number: this.optNumber
        }).handle(this.txtText1.val);
      }
    } catch (e) {
      this.snackBar.open(e, "Close", {
        duration: 2000
      });
    }
  }

  syncText(): void {
    this.txtText1.set(this.txtText2.val);
    this.handleText();
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
    TextEditorModule
  ],
  exports: [RailFenceCipherEncoderComponent],
  declarations: [RailFenceCipherEncoderComponent],
  entryComponents: [RailFenceCipherEncoderComponent]
})
export class RailFenceCipherEncoderModule {
  static entry = RailFenceCipherEncoderComponent;
}
