import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>
        <DialogDescription>
          Conect-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>

      <Button
        variant={"secondary"}
        className="gap-2 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image src={"/google.svg"} width={18} height={18} alt="Google" />
        Google
      </Button>
    </>
  );
};

export default SignInDialog;
