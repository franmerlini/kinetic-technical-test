import { Pipe, PipeTransform } from '@angular/core';

import { SelectItem } from '@shared/model';

@Pipe({
  name: 'commaSeparated',
})
export class CommaSeparatedPipe implements PipeTransform {
  transform(items: SelectItem[]): string {
    if (!items || items.length === 0) {
      return '';
    }
    return items.map(({ name }) => name).join(', ');
  }
}
