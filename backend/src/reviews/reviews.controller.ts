import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";

@Controller('reviews') // filter for requests that start with 'reviews'
export class ReviewsController {
    
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    async addReview(
        @Body('date') revDate: string, 
        @Body('description') revDesc: string
    ) {
        const generatedId = await this.reviewsService.insertProduct(
            revDate, 
            revDesc,
            );
        return {id: generatedId};
    }
    @Get()
    async getAllReviews() {
        const reviews = await this.reviewsService.getReviews();
        return reviews;
    }

    @Get(':id')
    getReview(@Param('id') revId: string,) {
        return this.reviewsService.getSingleReview(revId);
    }

    @Patch(':id')
    async updateReview(
        @Param('id') revId: string, 
        @Body('date') revDate: string, 
        @Body('description') revDesc: string,
        ) {
           await this.reviewsService.updateReview(revId, revDate, revDesc);
           return null; 
    }

    @Delete(':id')
    async removeReview(@Param('id') revId: string,) {
        await this.reviewsService.deleteReview(revId);
        return null;
    }
}