"use client";

import { createPublicClient, createWalletClient, custom, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { scrollSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: scrollSepolia,
  transport: http(),
});
