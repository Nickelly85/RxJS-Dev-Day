import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(firstName?: string, lastName?: string): string {
    if (!firstName && !lastName) return '';

    const firstInitial = firstName?.charAt(0).toUpperCase() ?? '';
    const lastInitial = lastName?.charAt(0).toUpperCase() ?? '';

    return `${firstInitial}${lastInitial}`;
  }
}
