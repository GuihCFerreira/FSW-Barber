"use server";

import { db } from "../_lib/prisma";

interface GetBarbershopByIdProps {
  id: string;
}

export const getBarbershopById = async ({ id }: GetBarbershopByIdProps) => {
  return await db.barbershop.findUnique({
    where: {
      id: id,
    },
    include: {
      services: true,
    },
  });
};
