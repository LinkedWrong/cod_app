import { useEffect, useState } from "react"
import { useQRScanner, useWebApp } from "twa-sdk-react"
import { usePopup } from "twa-sdk-react"
import { useMainButton } from "twa-sdk-react"

function App() {
  const webApp = useWebApp()
  const scanner = useQRScanner()
  const popup = usePopup()
  const mainButton = useMainButton()
  // const [message, _] = useState("")

  useEffect(() => {
    const openScanner = async () => {
      let res = await scanner.open()
      if (res) {
        await popup.open({ message: res })
      }
      scanner.close()
    }

    mainButton.setText("Сканировать").show()
    mainButton.on("click", openScanner)
    mainButton.commit()
    webApp.ready()
  }, [webApp, mainButton, popup, scanner])

  return (
    <div>
      {/* <p>{message}</p> */}
      <p>{webApp.platform}</p>
    </div>
  )
}

export default App
