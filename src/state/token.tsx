import { createContext, useState } from "react";

export interface TokenContextType {
  token: string;
  setToken: Function;
}

export const TokenContext = createContext<TokenContextType | null>(null);

// export interface TokenContextProviderType {
//   children: React.ReactNode;
// }

// export const TokenContextProvider = ({
//   children,
// }: TokenContextProviderType) => {
//   const [token, setToken] = useState<string | null>(null);

//   return (
//     <TokenContext.Provider value={{ token, setToken }}>
//       {children}
//     </TokenContext.Provider>
//   );
// };
