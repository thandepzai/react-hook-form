import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddStudent from "./pages/add-student/AddStudent";
import ListStudent from "./pages/list-student";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ListStudent />,
    },
    {
      path: "/add-student",
      element: <AddStudent />,
    },
    {
      path: "/add-student/:id",
      element: <AddStudent />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer/>
    </div>
  );
}

export default App;
