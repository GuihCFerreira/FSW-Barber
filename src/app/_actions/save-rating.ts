"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

interface SaveRatingParams {
  barbershopId: string;
  value: number;
}

export const saveRating = async (params: SaveRatingParams) => {
  const user = await getServerSession(authOptions);
  if (!user) throw new Error("Usuário não autenticado");
  await db.rating.create({
    data: {
      ...params,
      userId: (user.user as any).id,
    },
  });
  revalidatePath("/bookings");
};
