import { NavigateFunction } from "react-router-dom";

export const logoutUser = (navigate: NavigateFunction) => {
    // 1. Usuń token i dane użytkownika
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 2. Przekieruj na stronę logowania
    //    replace: true żeby nie dało się „wrócić” przyciskiem back
    navigate("/login", { replace: true });
};
