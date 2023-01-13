import React, { PropsWithChildren } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { SDKProvider, useSDK } from "twa-sdk-react"
import { InitOptions } from "twa-sdk"
import { stringify } from "querystring"

export const Loader = ({ children }: PropsWithChildren) => {
  const { didInit, components, error } = useSDK()

  if (!didInit) {
    return <div>SDK init function is not yet called.</div>
  }

  if (error !== null) {
    return <div>Something went wrong. {stringify(error as {})}</div>
  }

  if (components === null) {
    return <div>Warming up SDK.</div>
  }

  // Safely render application.
  return <>{children}</>
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const options: InitOptions = {
  debug: true,
}

root.render(
  <React.StrictMode>
    <SDKProvider initOptions={options}>
      <Loader>
        <App />
      </Loader>
    </SDKProvider>
  </React.StrictMode>
)
