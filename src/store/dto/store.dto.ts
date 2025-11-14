import { isDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  logoUrl: string;

  @IsNotEmpty()
  @IsString()
  ownerId: string;
}

export class UpdateStoreDto extends CreateStoreDto {}
