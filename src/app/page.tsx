import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({});
  const popularsBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div>
      <Header />
      <div className="p-5">
        {/*Texto*/}
        <h2 className="text-xl font-bold">Olá, Felipe!</h2>
        <p>Segunda Feira, 05 de Agosto</p>

        {/*Busca*/}
        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/*Filtro*/}
        <div className="flex gap-3 mt-6 overflow-x-scroll  [&::-webkit-scrollbar]:hidden">
          <Button variant="secondary" className="gap-2">
            <Image src="/cabelo.svg" width={16} height={16} alt="Cabelo" />
            Cabelo
          </Button>

          <Button variant="secondary" className="gap-2">
            <Image src="/barba.svg" width={16} height={16} alt="Barba" />
            Barba
          </Button>

          <Button variant="secondary" className="gap-2">
            <Image
              src="/acabamento.svg"
              width={16}
              height={16}
              alt="Acabamento"
            />
            Acabamento
          </Button>

          <Button variant="secondary" className="gap-2">
            <Image
              src="/sobrancelha.svg"
              width={16}
              height={16}
              alt="Sobrancelha"
            />
            Sobrancelha
          </Button>

          <Button variant="secondary" className="gap-2">
            <Image src="/massagem.svg" width={16} height={16} alt="Massagem" />
            Massagem
          </Button>

          <Button variant="secondary" className="gap-2">
            <Image
              src="/hidratacao.svg"
              width={16}
              height={16}
              alt="Hidratacao"
            />
            Hidratacao
          </Button>
        </div>

        {/*Imagem*/}
        <div className="relative w-full h-[150px] mt-6">
          <Image
            alt="Agende com os melhores"
            src="/banner-01.png"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/*Agendamento*/}
        <h2 className="mt-6 mb-3 text-xs uppercase text-gray-400 font-bold">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

        {/*Barbearias*/}
        <h2 className="mt-6 mb-3 text-xs uppercase text-gray-400 font-bold">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto  [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/*Populares*/}
        <h2 className="mt-6 mb-3 text-xs uppercase text-gray-400 font-bold">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto  [&::-webkit-scrollbar]:hidden">
          {popularsBarbershops.map((popularBarbershop) => (
            <BarbershopItem
              key={popularBarbershop.id}
              barbershop={popularBarbershop}
            />
          ))}
        </div>
      </div>

      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              © 2023 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  );
};

export default Home;
