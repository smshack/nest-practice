import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { BrandRequestDto, BrandResponseDto } from '@src/brand/dto/brand.dto'
@ApiTags('ApiTags')
@Controller('brand')
export class BrandController {
    @ApiOperation({ summary: 'ApiOperation', description: 'ApiOperation description' })
    @ApiCreatedResponse({ description: 'ApiCreatedResponse' })
    @ApiResponse({ status: 200, description: 'ApiResponse', type: BrandResponseDto })
    @Get()
    getBrand(@Query() query: BrandRequestDto): BrandResponseDto {
      if (query.brand) {
        return { succeess: true };
      } else {
        return { succeess: false };
      }
    }
}
