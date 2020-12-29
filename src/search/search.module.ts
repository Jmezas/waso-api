import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

// Providers
import { SearchService } from './search.service';
import { orderProviders } from '../core/order/order.provider';
import { materialProviders } from '../material/material.provider';
import { customerProviders } from 'src/customer/customer.provider';

// Controllers
import { SearchController } from './search.controller';

@Module({
  imports: [ DatabaseModule ],
  providers: [
    ...orderProviders,
    ...materialProviders,
    ...customerProviders,
    SearchService
  ],
  controllers: [SearchController]
})
export class SearchModule {}
