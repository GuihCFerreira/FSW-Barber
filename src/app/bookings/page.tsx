import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { Dialog, DialogContent } from "../_components/ui/dialog";
import SignInDialog from "../_components/signin-dialog";
import DialogLogin from "../_components/dialog-login";

const Bookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <DialogLogin />;
  }

  const confirmedBookings = await db.booking.findMany({
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
  });

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        lt: new Date(),
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
  });

  return (
    <>
      <Header />
      <div className="p-5 space-y-3">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs uppercase text-gray-400 font-bold">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs uppercase text-gray-400 font-bold">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Bookings;
