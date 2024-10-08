import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import SidebarSheet from "@/app/_components/sidebar-sheet";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { getBarbershopById } from "@/app/_data/get-barbershop-by-id";
import { getBarbershopRating } from "@/app/_data/get-barbershop-rating";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopPageProps {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await getBarbershopById(params);
  const barbershopRating = await getBarbershopRating(params);

  if (!barbershop) return notFound();

  return (
    <div>
      <div className="relative w-full h-[250px]">
        <Image
          src={barbershop?.imageUrl}
          alt={barbershop?.name}
          fill
          className="object-cover"
        />

        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger>
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      <div className="p-5 border-b border-solid">
        <h1 className="font-bold text-xl mb-3">{barbershop?.name}</h1>

        <div className="flex items-center gap-2 mb-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sn">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sn">
            {barbershopRating.rating} ({barbershopRating.totalRatings}{" "}
            Avaliações)
          </p>
        </div>
      </div>

      <div className="border-b border-solid p-5 space-y-3">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-sm text-justify">{barbershop?.description}</p>
      </div>

      <div className="p-5 space-y-3 border-b border-solid">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={JSON.parse(JSON.stringify(service))}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          ))}
        </div>
      </div>

      <div className="p-5 space-y-3">
        {barbershop.phones.map((phone) => (
          <PhoneItem phone={phone} key={phone} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;
