
// Find all cards
const cards = document.querySelectorAll('.plate')

// Hide all cards
cards.forEach(function (item) {
    item.classList.add('none')
})

// Counter for cards
let currentIndex = 0

// Counter for progressbar
let currentCard = 0

// Show 1-st card
cards[currentCard].classList.remove('none')
cards[currentCard].classList.add('visible')

// Start the progressbar
progressBar()

// Hide button 'Prev' on the 1-st card
cards[0].querySelector('[data-nav="prev"]').remove()


//////////////////////// Listen the cards ///////////////////////////

window.addEventListener('click', function (event) {

    // Next
    if (event.target.closest('[data-nav="next"]')) {

        // Check of pushed the radio button
        const result = checkAnswer(cards[currentIndex])

        // Find data attribute for not choose
        const answerWrapper = cards[currentIndex].querySelector('[data-answers]')

        if (result) {

            //Update pogressbar
            progressBar('next')

            // Delay for progressbar
            setTimeout(function () {
                // Hide current card
                cards[currentIndex].classList.remove('visible')

                setTimeout(function () {

                    // Hide current card with animation
                    cards[currentIndex].classList.add('none')

                    //Prepare for next card
                    currentIndex = currentIndex + 1
                    cards[currentIndex].classList.remove('none')

                    setTimeout(function () {
                        cards[currentIndex].classList.add('visible')
                    }, 100)

                }, 500)

                // Remove class if push the answer
                answerWrapper.classList.remove('required')
            }, 500)
        } else {
            // Add class if not choose the answer
            answerWrapper.classList.add('required')
        }
    }

    // Prev
    if (event.target.closest('[data-nav="prev"]')) {

        //Update pogressbar
        progressBar('prev')

        setTimeout(function () {
            //if there is a button that should not go back
            if (currentIndex === 0) return

            // Hide current card
            cards[currentIndex].classList.remove('visible')

            // Prepare previous card
            setTimeout(function () {
                if (currentIndex === 0) return
                cards[currentIndex].classList.add('none')

                currentIndex = currentIndex - 1
                cards[currentIndex].classList.remove('none')

                setTimeout(function () {
                    cards[currentIndex].classList.add('visible')
                }, 100)
            }, 500)

            // Show prev card
            cards[currentIndex].classList.add('visible')
        }, 500)
    }
})

function checkAnswer(card) {

    // RadioBtn check

    // Choose all inpute with type radio
    const radioBtns = card.querySelectorAll('input[type = "radio"]')

    if (radioBtns.length > 0) {

        // Sort all inpute with type radio
        for (let item of radioBtns) {

            // Check if user push the button
            if (item.checked) return true
        }
    }

    // Checkbox check

    // Choose all inpute with type checkbox
    const checkbox = card.querySelectorAll('input[type = "checkbox"]')

    if (checkbox.length > 0) {

        // Sort all inpute with type checkbox
        for (let item of checkbox) {

            // Check if user push the button
            if (item.checked) return true
        }
    }

}

function progressBar(direction = 'start') {

    // Update progressbar
    if (direction === 'next') {
        currentCard = currentCard + 1
    }

    if (direction === 'prev') {
        currentCard = currentCard - 1
    }

    // Number of progress-bar
    const progresVal = document.querySelectorAll('.progress__label strong')

    // Line of progress-bar
    const progresLineBar = document.querySelectorAll('.progress__line-bar')

    // How many cards
    const countCards = document.querySelectorAll('[data-progress]').length

    // Count a progress
    const progress = Math.round((100 * currentCard) / countCards)

    // Set a each number
    progresVal.forEach(function (item) {
        item.innerText = progress + '%'
    })

    // Set a each line
    progresLineBar.forEach(function (item) {
        item.style.width = progress + '%'
    })
}

///////////////////////// Phone mask ////////////////////////////////

mask('#tel')

// Find submit button
const submitForm = document.querySelector('#submitForm')

// Find input of form
const telInput = document.querySelector('#tel')

// Check input for value
submitForm.onclick = function () {
    if (telInput.value === '+' || telInput.value.length < 6) {
        telInput.value = ''
    }
}

///////////////////////// Focus on checkbox ////////////////////////////////

// Find the checkBox
const checkboxPolicy = document.querySelector('#policy')

// Focus and blur border of action
checkboxPolicy.addEventListener('focus', function () {
    checkboxPolicy.closest('label').classList.add('hovered')
})

checkboxPolicy.addEventListener('blur', function () {
    checkboxPolicy.closest('label').classList.remove('hovered')
})


