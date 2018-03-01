
// Tell Angular2 we're creating a Pipe with TypeScript decorators
import {Pipe, PipeTransform} from "@angular/core";
import {ChatService} from "./service/chat.service";
@Pipe({
  name: 'translateP'
})
export class TranslatePipe implements PipeTransform {
  constructor(private chatService: ChatService){}
  transform(value, exponent) {
    let flag = false;
    let translate;
    console.log(value, exponent);


    this.chatService.translate(value).subscribe((data: any)=> {
      if(data.data.translations && data.data.translations[0])
        translate =  data.data.translations[0].translatedText;

      console.log(data.data.translations[0].translatedText)
    });

    setTimeout(() => {
      return 12;
    }, 10000);
  }
}
