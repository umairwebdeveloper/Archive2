"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";


const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("359f89d2-5d30-4343-8256-6151532fd7e8");
  });

  return null;
}

export default CrispChat;