
 fetch("https://puzzle.mead.io/puzzle")
 .then((res) => res.json())
 .then((data) => console.log(data));

console.log('client side js')
  let form = document.getElementById('input-form')
  let input = document.getElementById('input-text')
  let message1 = document.getElementById('message-1')
  let message2 = document.getElementById('message-2')
  let errorMsg = document.getElementById('error-msg')
  message1.textContent=''
  message2.textContent=''
  errorMsg.textContent=''
  
  form.addEventListener('submit',(event)=>{
      errorMsg.textContent='loadingg...'
    event.preventDefault()
    let location = input.value
     console.log(location)
    //  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    //     response.json().then((data) => {
    //         if (data.error) {
    //             console.log(data.error)
    //         } else {
    //             console.log(data.location)
    //             console.log(data.forecast)
    //         }
    //     })
    // })

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMsg.textContent=data.error
                console.log(data.error)
            } else {
                message1.textContent+=data.location
                message2.textContent+=data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
   
  })

  