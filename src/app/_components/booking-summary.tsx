import { Barbershop, BarbershopService } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">;
  barbershop: Pick<Barbershop, "name">;
  selectedDate: Date;
}

const BookingSummary = ({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <>
      <Card>
        <CardContent className="p-3 space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm font-bold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-sm">Data</h2>
            <p className="text-sm">
              {format(selectedDate, "d 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-sm">Horário</h2>
            <p className="text-sm">
              {format(selectedDate, "HH:mm", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-sm">Barbearia</h2>
            <p className="text-sm">{barbershop.name}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingSummary;
