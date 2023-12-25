import { Pipe, PipeTransform } from '@angular/core';
import { StatusTexts } from '@core/consts';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(status: number): string {
    return StatusTexts[status] || 'Статус не известен';
  }
}
