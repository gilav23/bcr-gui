import { HeaderComponent } from 'src/app/components/header/header.component';
import { DatetimePipe } from 'src/app/pipes/datetime.pipe';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { I18nKey, I18nService } from 'src/app/services/i18n.service';
import { AppDateTimeFormat, SettingsService } from 'src/app/services/settings.service';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-datetime-format-editor',
  templateUrl: './datetime-format-editor.component.html',
  styleUrls: ['../shared.scss', './datetime-format-editor.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatetimePipe,
    FormsModule,
    HeaderComponent,
    IonicModule,
    NgIf,
    TranslatePipe,
  ],
})
export class DatetimeFormatEditorComponent {

  // sample datetime (last second of current year)
  protected readonly dateTimeSample = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);

  protected format = signal<AppDateTimeFormat>({...this.settings.dateTimeFormat });

  // datetime format elements
  protected readonly DATETIME_FORMAT_ELEMS = [
    'YY',
    'YYYY',
    'M',
    'MM',
    'MMM',
    'MMMM',
    'D',
    'DD',
    'H',
    'HH',
    'h',
    'hh',
    'm',
    'mm',
    's',
    'ss',
    'A',
    'a',
  ];

  constructor(
    protected i18n: I18nService,
    protected mc: ModalController,
    protected settings: SettingsService,
  ) { }

  cancel() {
    this.mc.dismiss();
  }

  async confirm() {
    this.settings.dateTimeFormat = this.format();
    await this.settings.save();
    location.reload();  // force page reload to clear pipes cache (if date format has changed)
    this.cancel();
  }

  protected getElementKey(el: string): I18nKey {
    return <I18nKey>("DTF_EDITOR_PH_" + el);
  }

}
