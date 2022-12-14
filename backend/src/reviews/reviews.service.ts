import { Injectable, NotFoundException } from '@nestjs/common';
import { Review } from './review.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
  ) {}

  async insertReview(date: string, desc: string, userid: string) {
    const newReview = new this.reviewModel({
      date,
      description: desc,
      userid,
    });
    const result = await newReview.save();
    return result.id as string;
  }

  async getReviews() {
    const reviews = await this.reviewModel.find().exec();
    return reviews.map((rev) => ({
      id: rev.id,
      date: rev.date,
      description: rev.description,
      userid: rev.userid,
    }));
  }

  async getSingleReview(reviewId: string) {
    const review = await this.findReview(reviewId);
    return {
      id: review.id,
      date: review.date,
      description: review.description,
      userid: review.userid,
    };
  }

  async updateReview(
    revId: string,
    date: string,
    description: string,
    userid: string,
  ) {
    const updatedReview = await this.findReview(revId);
    if (date) {
      updatedReview.date = date;
    }
    if (description) {
      updatedReview.description = description;
    }
    if (userid) {
      updatedReview.userid = userid;
    }
    await updatedReview.save();
  }

  async deleteReview(revId: string) {
    const result = await this.reviewModel.deleteOne({ _id: revId }).exec();
  }

  async getReviewsToUser(userid: string) {
    let reviews;

    try {
      reviews = await this.reviewModel.find({ userid: userid });
    } catch (error) {
      throw new NotFoundException('Could not find review');
    }
    if (!reviews) {
      throw new NotFoundException('Could not find review review');
    }
    return reviews;
  }

  private async findReview(id: string): Promise<Review> {
    let review;
    try {
      review = await this.reviewModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find review');
    }
    if (!review) {
      throw new NotFoundException('Could not find review');
    }
    return review;
  }
}
