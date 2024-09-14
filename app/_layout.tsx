import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

// Create a client
const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{headerShown:false}} />
    </QueryClientProvider>
  );
}
