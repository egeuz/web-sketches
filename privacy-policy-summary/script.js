window.addEventListener("DOMContentLoaded", async () => {
  const textfile = await fetch("testpolicy.txt")
  const text = await textfile.text()

  const apiKey = "3F0779CF0C"
  const url = `https://api.smmry.com/&SM_API_KEY=${apiKey}`

  const options = {
    method: 'POST',
    body: { "sm_api_input": text }
  }
  const response = await fetch(url)
  const summary = await response.json()
  console.log(summary)

})