import { initThemeMode } from "flowbite-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import App from "./App.tsx";
import ChakraExample from "./ChakraExample.tsx";
import AntExample from "./AntExample.tsx";
import Material from "./Material.tsx";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});

const chakraRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chakra",
  component: ChakraExample
});

const antRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ant",
  component: AntExample
});

const material = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mui",
  component: Material
});

const routeTree = rootRoute.addChildren([indexRoute, chakraRoute,antRoute,material]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

initThemeMode();
