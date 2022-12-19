import { ApiProperty } from '@nestjs/swagger';
 
export class BrandRequestDto {
  @ApiProperty({
    example: 'ABC',
    description: '이름',
    required: true,
  })
  brand!: string;
}
 
export class BrandResponseDto {
  @ApiProperty()
  succeess!: boolean;
}