if(!localStorage.buttonClickCount) {
    document.getElementById("SubmitCountDisplay").innerHTML = 0;
}else {
    document.getElementById("SubmitCountDisplay").innerHTML = document.getElementById("SubmitCountDisplay").innerHTML + localStorage.buttonClickCount;
}

function storageHandler () {
    sessionStorage.textTypeDisplay = document.getElementById('TextType').value;
    document.getElementById("TextTypeDisplay").innerHTML = sessionStorage.textTypeDisplay;

    sessionStorage.passwordTypeDisplay = document.getElementById('PasswordType').value;
    document.getElementById("PasswordTypeDisplay").innerHTML = sessionStorage.passwordTypeDisplay;
    
    sessionStorage.emailTypeDisplay = document.getElementById('EmailType').value;
    document.getElementById("EmailTypeDisplay").innerHTML = sessionStorage.emailTypeDisplay;

    if(!localStorage.buttonClickCount){
        localStorage.buttonClickCount = 1;
    }else {
        localStorage.buttonClickCount++;
    }
    document.getElementById("SubmitCountDisplay").innerHTML = document.getElementById("SubmitCountDisplay").innerHTML + localStorage.buttonClickCount;
}