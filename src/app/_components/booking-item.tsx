"use client";

import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { deleteBooking } from "../_actions/delete-booking";
import PhoneItem from "./phone-item";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import BookingSummary from "./booking-summary";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date);
  const {
    service: { barbershop },
  } = booking;

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id);
      setIsSheetOpen(false);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cancelar reserva. Tente novamente.");
    }
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger className="w-full min-w-[90%]">
          <Card>
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge
                  className="w-fit"
                  variant={isConfirmed ? "default" : "secondary"}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <h3 className="font-semibold">{booking.service.name}</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>
                  <p className="text-sm">{barbershop.name}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
                <p className="text-sm capitalize">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>

        <SheetContent className="w-[85%]">
          <SheetHeader className="text-left">
            Informações da Reserva
          </SheetHeader>

          <div className="relative h-[180px] w-full flex items-end mt-6">
            <Image
              src={"/map.png"}
              fill
              className="oject-cover rounded-xl"
              alt={`Mapa da barbearia ${barbershop.name}`}
            />

            <Card className="z-50 w-full mb-3 mx-5 rounded-xl">
              <CardContent className="px-5 py-3 flex items-center gap-3 ">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs truncate">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            <div className="mb-3 mt-6">
              <BookingSummary
                barbershop={barbershop}
                service={booking.service}
                selectedDate={booking.date}
              />
            </div>

            <div className="space-y-3">
              {barbershop.phones.map((phone) => (
                <PhoneItem key={phone} phone={phone} />
              ))}
            </div>
          </div>

          <SheetFooter className="mt-6">
            <div className="flex items-center gap-3">
              <SheetClose asChild>
                <Button variant={"outline"} className="w-full">
                  Voltar
                </Button>
              </SheetClose>
              {isConfirmed && (
                <Dialog>
                  <DialogTrigger asChild className="w-full">
                    <Button variant={"destructive"} className="w-full">
                      Cancelar Reserva
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle> Você quer cancelar a reserva?</DialogTitle>
                      <DialogDescription>
                        Tem certeza que deseja realizar o cancelamento da sua
                        reserva? Essa ação é irreversível.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row gap-3">
                      <DialogClose asChild>
                        <Button variant={"secondary"} className="w-full">
                          Voltar
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          variant={"destructive"}
                          className="w-full"
                          onClick={handleCancelBooking}
                        >
                          Confirmar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BookingItem;
