import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

/*interface BarbershopPropsI {
    id: string,
    name: string,
    address: string,
    phones: string[],
    description: string,
    imageUrl: string,
    services: BarbershopService[]
}*/

interface BarbershopProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/*Imagem*/}
        <div className="relative h-[159px] w-full">
          <Image
            fill
            className="object-cover rounded-2xl"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />
          <Badge
            className="absolute top-2 left-2 space-x-1 opacity-80"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/*Texto*/}
        <div className=" py-3 px-1">
          <h3 className="font-semibold truncate">{barbershop.name}</h3>
          <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
