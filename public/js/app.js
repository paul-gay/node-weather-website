console.log('client side js file has loaded')

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchTerm.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''



    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error
            } else {
                // console.log(data.location)
                // console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }

        })
    })
})