import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import BookingItem from "../_components/booking-item";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { Dialog, DialogContent } from "../_components/ui/dialog";
import SignInDialog from "../_components/signin-dialog";
import DialogLogin from "../_components/dialog-login";
import { getConfirmedBookings } from "../_data/get-confirmed-bookings";
import { getConcludedBookings } from "../_data/get-concluded-bookings";

const Bookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <DialogLogin />;
  }

  const confirmedBookings = await getConfirmedBookings();

  const concludedBookings = await getConcludedBookings();

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
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs uppercase text-gray-400 font-bold">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Bookings;
