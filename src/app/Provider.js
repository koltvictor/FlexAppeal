import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const Provider = ({ children }) => {
  console.log("QueryClientProvider initialized"); // <-- Add this line
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
