"use client"

import { createContext, useContext } from "react"
import type { ReactNode } from "react"
import { UserCrudClassNames } from "./class-names"
import { defaultClassNames } from "./default-styles"

type StyleContextValue = {
  classNames: Required<UserCrudClassNames>;
};

const StyleContext = createContext<StyleContextValue>({
    classNames: defaultClassNames,
})

type UserCrudStyleProviderProps = {
    children: ReactNode
    classNames?: UserCrudClassNames
}

// Provide package style overrides safely
export function UserCrudStyleProvider({
    children,
    classNames = {}
}: UserCrudStyleProviderProps){
    return (
        <StyleContext.Provider
            value={{
                classNames: {
                ...defaultClassNames,
                ...classNames,
                },
            }}
            >
            {children}
        </StyleContext.Provider>
    )
}

// Retrieve merged package styles
export function useUserCrudStyles(){
    return useContext(StyleContext)
}