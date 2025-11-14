import {
  isDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  logoUrl: string;

  @IsNotEmpty()
  @IsString()
  ownerId: string;
}

export class UpdateStoreDto extends CreateStoreDto {}
