export default function whats_navigator(): void {
  console.info("::::::::::::::::::::::::::::::::::::::::::::::::")
  console.info("Browser CodeName: ", navigator.appCodeName);
  console.info("Browser Name: ", navigator.appName);
  console.info("Browser Version: ", navigator.appVersion);
  console.info("Cookies Enabled: ", navigator.cookieEnabled);
  console.info("Browser Language: ", navigator.language);
  console.info("Browser Online: ", navigator.onLine);
  console.info("Platform: ", navigator.platform);
  console.info("User-agent header: ", navigator.userAgent);
  console.info("::::::::::::::::::::::::::::::::::::::::::::::::");
  //TODO - uma forma de imprimir em uma variavel
  // document.getElementById("demo").innerHTML = txt;
}
