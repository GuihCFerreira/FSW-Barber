"use server";

import { db } from "../_lib/prisma";

interface GetBarbershopRatingProps {
  id: string;
}

export const getBarbershopRating = async ({ id }: GetBarbershopRatingProps) => {
  const rating = await db.rating.aggregate({
    _count: true,
    _sum: {
      value: true,
    },
    where: {
      barbershopId: id,
    },
  });

  return {
    totalRatings: rating._count,
    rating:
      rating._sum.value == null
        ? (0).toFixed(1)
        : (rating._sum.value / rating._count).toFixed(1),
  };
};
