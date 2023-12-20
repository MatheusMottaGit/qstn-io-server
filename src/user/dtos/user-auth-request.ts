import { IsNotEmpty } from 'class-validator';

export class UserAuthRequest {
  @IsNotEmpty()
  access_token: string;
  role: string;
}
