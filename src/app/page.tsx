import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import BarbershopItem from "./_components/barbershop-item";
import BookingItem from "./_components/booking-item";
import Header from "./_components/header";
import Search from "./_components/search";
import SessionTitle from "./_components/session-title";
import { Button } from "./_components/ui/button";
import { quickSearchOptions } from "./_constants/search";
import { getConfirmedBookings } from "./_data/get-confirmed-bookings";
import { authOptions } from "./_lib/auth";
import { db } from "./_lib/prisma";

const Home = async () => {
  const session = await getServerSession(authOptions);

  const booking = await getConfirmedBookings();

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
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : " bem vindo!"}
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd ", {
              locale: ptBR,
            })}
          </span>
          de
          <span className="capitalize">
            {format(new Date(), " MMMM", {
              locale: ptBR,
            })}
          </span>
        </p>

        {/*Busca*/}
        <div className="mt-6 md:hidden ">
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

        {booking.length > 0 && (
          <>
            <SessionTitle title="Agendamentos" />
            <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {booking.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}

        {/*Barbearias*/}
        <SessionTitle title="Recomendados" />
        <div className="flex gap-4 overflow-auto  [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/*Populares*/}
        <SessionTitle title="Populares" />
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
