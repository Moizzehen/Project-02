import { createContext, useState } from "react";

const Data = createContext();

function DataContext({ children }) {

    const [loginUser, setLoginUser] = useState("");
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(true);

    return (
        <div>
            <Data.Provider value={{ loginUser, setLoginUser, login, setLogin, signUp, setSignUp }} >
                {children}
            </Data.Provider>
        </div>
    )
}

export default DataContext;
export { Data };