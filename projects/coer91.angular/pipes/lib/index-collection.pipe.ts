import { Pipe, PipeTransform } from '@angular/core';
import { Collections } from 'coer91.angular/tools';

@Pipe({ name: 'index-collection', standalone: false })
export class IndexCollectionPipe implements PipeTransform {

    transform<T>(value: T[]): any[] {
        return Collections.SetIndex(value || []);
    }
}