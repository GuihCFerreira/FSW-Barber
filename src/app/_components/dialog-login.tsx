"use client";

import { useState } from "react";
import SignInDialog from "./signin-dialog";
import { Dialog, DialogContent } from "./ui/dialog";

const DialogLogin = () => {
  const [dialgogIsOpen, setDialogIsOpen] = useState(true);

  return (
    <>
      <Dialog
        open={dialgogIsOpen} /*onOpenChange={(open) => setDialogIsOpen(open)}*/
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogLogin;
