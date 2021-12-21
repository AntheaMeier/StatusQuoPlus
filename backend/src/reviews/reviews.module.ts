import { Module } from "@nestjs/common";
import { ReviewsController } from "./reviews.controller";
import { ReviewsService } from "./reviews.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ReviewSchema } from "./review.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Review', schema: ReviewSchema}])],
    controllers: [ReviewsController],
    providers: [ReviewsService],
})

export class ReviewsModule {}