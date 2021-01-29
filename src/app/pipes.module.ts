import { NgModule } from "@angular/core";
import { AppPipe ,RoundPipe} from "./app.pipe";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [AppPipe,RoundPipe],
  imports: [TranslateModule],

  exports: [TranslateModule, AppPipe,RoundPipe]
})
export class PipesModule {}
