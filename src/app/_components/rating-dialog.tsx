import { Barbershop } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { saveRating } from "../_actions/save-rating";
import RatingStar from "./rating-stars";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface RatingDialogProps {
  barbershop: Pick<Barbershop, "name" | "id">;
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
}

const RatingDialog = ({ barbershop, setIsSheetOpen }: RatingDialogProps) => {
  const [rating, setRating] = useState(0);

  const handleRatingBarbershop = async () => {
    try {
      if (rating == 0) return;

      await saveRating({
        barbershopId: barbershop.id,
        value: rating,
      });

      setIsSheetOpen(false);
      toast.success("Avaliação registrada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar avaliação. Tente novamente.");
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle> Avalie sua experiência</DialogTitle>
        <DialogDescription>
          Toque nas estrelas para avaliar sua experiência na {barbershop.name}
          <RatingStar setRating={setRating} />
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
            variant={"default"}
            className="w-full"
            onClick={handleRatingBarbershop}
            disabled={rating == 0}
          >
            Confirmar
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default RatingDialog;
