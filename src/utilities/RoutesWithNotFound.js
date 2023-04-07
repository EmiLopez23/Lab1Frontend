import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export default function RoutesWithNotFound({children}){
    return (
        <Routes>
          {children}
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      );
}