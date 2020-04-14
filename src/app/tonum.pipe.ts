import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tonum'
})
export class TonumPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return parseFloat(value);
  }

}
