const title  = document.querySelector("#title")
title.style.textDecoration = "underline"
title.style.textUnderlineOffset = "4px"
title.style.textDecorationThickness = "1px"
title.textContent

const buttons = document.querySelectorAll("button")


buttons.forEach( (button) => {
    button.addEventListener('click', () => {
        console.log(button.textContent)
    })
})

