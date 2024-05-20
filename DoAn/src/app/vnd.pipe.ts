import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vnd'
})
export class VndPipe implements PipeTransform {

  transform(value: number): unknown {
    if (!value) return '0 VND'; // Nếu giá trị không tồn tại, trả về '0 VND'
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

}
