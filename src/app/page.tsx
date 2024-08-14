import Image from "next/image";
import Link from "next/link";
import BarbershopItem from "./_components/barbershop-item";
import BookingItem from "./_components/booking-item";
import Header from "./_components/header";
import Search from "./_components/search";
import { Button } from "./_components/ui/button";
import { quickSearchOptions } from "./_constants/search";
import { db } from "./_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";

const Home = async () => {
  const session = await getServerSession(authOptions);

  const booking = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        orderBy: {
          date: "asc",
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
      })
    : [];

  const barbershops = await db.barbershop.findMany({});
  const popularsBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div>
      <Header />
      <div className="p-5">
        {/*Texto*/}
        <h2 className="text-xl font-bold">Olá, Felipe!</h2>
        <p>Segunda Feira, 05 de Agosto</p>

        {/*Busca*/}
        <div className="mt-6">
          <Search />
        </div>

        {/*Filtro*/}
        <div className="flex gap-3 mt-6 overflow-x-scroll  [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              variant="secondary"
              className="gap-2"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/*Imagem*/}
        <div className="relative w-full h-[150px] mt-6">
          <Image
            alt="Agende com os melhores"
            src="/banner-01.png"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/*Agendamento*/}
        <h2 className="mt-6 mb-3 text-xs uppercase text-gray-400 font-bold">
          Agendamentos
        </h2>
        <div className="flex">
          {booking.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>

        {/*Barbearias*/}
        <h2 className="mt-6 mb-3 text-xs uppercase text-gray-400 font-bold">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto  [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/*Populares*/}
        <h2 className="mt-6 mb-3 text-xs uppercase text-gray-400 font-bold">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto  [&::-webkit-scrollbar]:hidden">
          {popularsBarbershops.map((popularBarbershop) => (
            <BarbershopItem
              key={popularBarbershop.id}
              barbershop={popularBarbershop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
