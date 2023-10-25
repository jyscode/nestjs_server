import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.length <= 8) {
      throw new BadRequestException('비밀번호 8글자 이상으로 입력해주세요');
    }
    return value;
  }
}
