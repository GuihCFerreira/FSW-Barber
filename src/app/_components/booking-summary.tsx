const BookingSummary = () => {
  return (
    <>
      {/* <Card>
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
              {format(selectedDay, "d 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-sm">Horário</h2>
            <p className="text-sm">{selectedTime}</p>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="text-sm">Barbearia</h2>
            <p className="text-sm">{barbershop.name}</p>
          </div>
        </CardContent>
      </Card> */}
    </>
  );
};

export default BookingSummary;
