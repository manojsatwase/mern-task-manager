import { createBrowserRouter,Outlet, } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from "./components/Header/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MyTasks from "./pages/MyTasks/MyTasks";
import CreateTask from "./pages/CreateTask/CreateTask";
import UpdateTask from "./pages/UpdateTask/UpdateTask";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import "./App.css";

const AppLayout = () => {
  return (
   <>
    <Header />
     <main>
     <Outlet />
     </main>
    <Footer/>
    </>
  )
}

export const AppRouter = createBrowserRouter([{
  path: "/",
  element:<AppLayout />,
  children:[
    {
      path:"/",
      element:<LandingPage/>
    },{
      path:"register",
      element:<RegisterPage/>
      }
    ,{
      path:"login",
      element:<LoginPage/>
    },{
        path:"mytasks",
        element:<MyTasks/>
      },{
          path:"mytasks/createtask",
          element:<CreateTask/>
      },{
          path:"/tasks/:id",
          element:<UpdateTask />
      }, {
          path:"/myprofile",
          element:<ProfilePage/>
         }
  ]
},
])


