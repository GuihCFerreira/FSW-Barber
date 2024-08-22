import { Button } from "./ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Booking } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { deleteBooking } from "../_actions/delete-booking";

interface CancelBookingDialogProps {
  booking: Pick<Booking, "id">;
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
}

const CancelBookingDialog = ({
  booking,
  setIsSheetOpen,
}: CancelBookingDialogProps) => {
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

  return (
    <>
      <DialogHeader>
        <DialogTitle> Você quer cancelar a reserva?</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja realizar o cancelamento da sua reserva? Essa
          ação é irreversível.
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
    </>
  );
};

export default CancelBookingDialog;
