import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

// data : 데코레이터에 입력할 값
// context: 요청객체 가져오는 곳
export const User = createParamDecorator((data, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  const user = req.user;

  if (!user) {
    throw new InternalServerErrorException(
      'Request에 user프로퍼티가 존재하지 않습니다.',
    );
  }

  return user;
});
