"use server";

import { db } from "../_lib/prisma";

interface GetBarbershopsProps {
  title: string;
  service: string;
}

export const getBarbershopsByNameOrService = async (
  params: GetBarbershopsProps,
) => {
  if (!params) return [];

  return await db.barbershop.findMany({
    where: {
      OR: [
        params.title
          ? {
              name: {
                contains: params.title,
                mode: "insensitive",
              },
            }
          : {},
        params.service
          ? {
              services: {
                some: {
                  name: {
                    contains: params.title,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  });
};
