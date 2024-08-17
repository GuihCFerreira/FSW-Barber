import BarbershopItem from "../_components/barbershop-item";
import Header from "../_components/header";
import Search from "../_components/search";
import SessionTitle from "../_components/session-title";
import { getBarbershopsByNameOrService } from "../_data/get-barbershops-by-name-or-service";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
  searchParams: {
    title: string;
    service: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await getBarbershopsByNameOrService(searchParams);

  return (
    <div>
      <Header />

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <SessionTitle
          title={`Resultados para ${searchParams.title || searchParams.service}`}
        />

        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopsPage;
