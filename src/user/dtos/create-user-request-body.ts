import { IsNotEmpty } from 'class-validator';

export class CreateUsersBodyRequest {
  @IsNotEmpty()
  access_token: string;

  @IsNotEmpty()
  role: string;
}
