import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    value = value.replace(/(\r\n|\n|\r)/gm, '');
    return value.replace(/["]+/g, '');
  }

}
