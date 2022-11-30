const toggler = document.querySelector(".toggler")
const list = document.querySelector('.flags')
const mainImage = document.querySelector('#main-image')
const countries = document.querySelectorAll('.country')
const countryCode = document.querySelector('.country-code')
const input = document.querySelector('#in')
const error = document.querySelector('.error')
const success = document.querySelector('.success')

list.style.display = 'none'

toggler.addEventListener("click", () => {
    if (list.style.display === 'none') {
        list.style.display = 'block'
    } else {
        list.style.display = 'none'
    }
})

let countries_arr = [...countries]

countries_arr.forEach(function (item) {
    item.addEventListener("click", () => {
        list.style.display = 'none'
        mainImage.src = item.children[0].src
        countryCode.textContent = item.children[1].innerHTML.split('(')[1].replace(')', '')
    })
})

input.addEventListener("keydown", function(e) {
    if (e.code === 'Enter') {
        if (countryCode.innerHTML === '+1') {
            input.value = formatPhoneNumberUSA(input.value)
        } else if (countryCode.innerHTML === '+49') {
            input.value = formatPhoneNumberGermany(input.value)
        } else if (countryCode.innerHTML === '+598') {
            input.value = formatPhoneNumberUrguay(input.value)
        } else if (countryCode.innerHTML === '+213') {
            input.value = formatPhoneNumberAlgeria(input.value)
        }
    }
})

function formatPhoneNumberUSA(phoneNumberString) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        error.style.display = 'none'
        success.style.display = 'block'
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    error.style.display = 'block'
    success.style.display = 'none'
    return null;
}

function formatPhoneNumberGermany(phoneNumberString) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    console.log(cleaned)
    let replaced = '+49' + cleaned.substr(0, 3) + ' - ' + cleaned.substr(3, 6) + cleaned.substr(9, 2)
    let match = replaced.match(/(\(?([\d \-\)\–\+\/\(]+)\)?([ .\-–\/]?)([\d]+))/)

    if (match) {
        error.style.display = 'none'
        success.style.display = 'block'
        return replaced.replace('+49', '')
    }

    success.style.display = 'none'
    error.style.display = 'block'
    return null
}

function formatPhoneNumberUrguay(phoneNumberString) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    let match = ("598" + cleaned).match(/^(?:(598\d{3})|\d{3})[9]\d{7}$/)

    if (match) {
        error.style.display = 'none'
        success.style.display = 'block'
        return cleaned.replace('+598', '')
    }

    error.style.display = 'block'
    success.style.display = 'none'
    return null
}

function formatPhoneNumberAlgeria(phoneNumberString) {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    let match = cleaned.match(/^(00213|\+213|0)(5|6|7)[0-9]{8}$/)

    if (match) {
        error.style.display = 'none'
        success.style.display = 'block'
        return cleaned.replace('+213', '')
    }

    success.style.display = 'none'
    error.style.display = 'block'
    return null
}