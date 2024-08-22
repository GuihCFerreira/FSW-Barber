import { getServerSession } from "next-auth";
import BookingItem from "../_components/booking-item";
import DialogLogin from "../_components/dialog-login";
import Header from "../_components/header";
import SessionTitle from "../_components/session-title";
import { getConcludedBookings } from "../_data/get-concluded-bookings";
import { getConfirmedBookings } from "../_data/get-confirmed-bookings";
import { authOptions } from "../_lib/auth";

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
            <SessionTitle title="Confirmados" />
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
            <SessionTitle title="Finalizados" />
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
