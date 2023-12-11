import EditTemplate from "../pages/EditTemplate";
import Home from "../pages/Home";
import GlobalLayout from "../components/HOC/GlobalLayout";
import CreateTemplate from "../pages/CreateTemplate";

export const routes = [
  {
    title: "Home",
    path: "/",
    element: (
      <GlobalLayout>
        <Home />
      </GlobalLayout>
    ),
    requiredLogin: false,
  },
  {
    title: "Edit Template",
    path: "/edit-template",
    requiredLogin: true,
    element: (
      <GlobalLayout>
        <EditTemplate />
      </GlobalLayout>
    ),
  },
  {
    title: "Create Template",
    path: "/create-template",
    requiredLogin: true,
    element: (
      <GlobalLayout>
        <CreateTemplate />
      </GlobalLayout>
    ),
  },
];
