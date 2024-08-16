"use client";

import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import { Dialog } from "@radix-ui/react-dialog";
import { addDays, format, isPast, isToday, set } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createBooking } from "../_actions/create-booking";
import { getBookings } from "../_actions/get-booking";
import SignInDialog from "./signin-dialog";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { DialogContent } from "./ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import BookingSummary from "./booking-summary";

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

interface GetTimeListProps {
  bookings: Booking[];
  selectedDay: Date;
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0]);
    const minute = Number(time.split(":")[1]);

    const timeIsOnThePast = isPast(
      set(new Date(), { hours: hour, minutes: minute }),
    );

    if (timeIsOnThePast && isToday(selectedDay)) {
      return false;
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minute,
    );

    if (hasBookingOnCurrentTime) return false;

    return true;
  });
};

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, "name">;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<String | undefined>(
    undefined,
  );
  const [sheetBookingIsOpen, setSheetBookingIsOpen] = useState(false);
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);

  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  const handleBookingClick = () => {
    if (data?.user) {
      return setSheetBookingIsOpen(true);
    }
    return setSignInDialogIsOpen(true);
  };

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return;
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectedDay, service.id]);

  const handleSelectDay = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleSelectTime = (time: String | undefined) => {
    setSelectedTime(time);
  };

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
    setSheetBookingIsOpen(false);
  };

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return;
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    });
  }, [selectedDay, selectedTime]);

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return;

      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      });
      handleBookingSheetOpenChange();
      toast.success("Reserva criada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar reserva!");
    }
  };

  const timeList = useMemo(() => {
    if (!selectedDay) return [];
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    });
  }, [dayBookings, selectedDay]);

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-sm">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between">
              <p className="font-bold text-primary text-sm">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={sheetBookingIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size={"sm"}
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>
                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="py-5 border-b border-solid">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleSelectDay}
                      fromDate={addDays(new Date(), 1)}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="p-5 flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden border-b border-solid">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="rounded-full"
                            onClick={() => handleSelectTime(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p>Não há horário disponíveis para este dia.</p>
                      )}
                    </div>
                  )}

                  {selectedDate && (
                    <div className="p-5">
                      <BookingSummary
                        barbershop={barbershop}
                        service={service}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}

                  <SheetFooter className="px-5 mt-5">
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceItem;
