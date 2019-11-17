
let closeButton = document.querySelector('.close-button');
if (closeButton){
    closeButton.addEventListener('click', () => {
        miro.board.ui.closeModal();
    })
}

let setValid = function(isValid){
    let usernameInputField = document.querySelector('.miro-input-field.username-input');
    if (usernameInputField){
        if (isValid){
            usernameInputField.classList.remove('miro-input-field--invalid');
        } else {
            usernameInputField.classList.add('miro-input-field--invalid');
        }
    }

    let usernameInputGroup = document.querySelector('.username-input .miro-input-group');
    if (usernameInputGroup){
        if (isValid){
            usernameInputGroup.classList.remove('miro-input-group--invalid');
        } else {
            usernameInputGroup.classList.add('miro-input-group--invalid');
        }
    }

    let usernameStatusText = document.querySelector('.username-input .status-text');
    if (usernameStatusText){
        usernameStatusText.style.display = isValid ? "none" : "flex";
    }
}

let validate = function(){
    let usernameInput = document.querySelector('.username-input .miro-input');
    setValid(usernameInput && (usernameInput.value.toLowerCase() === "mirohq" || usernameInput.value.toLowerCase() === "@mirohq"));
}

let searchButton = document.querySelector('.search-button');
if (searchButton){
    searchButton.addEventListener('click', () => {
        validate();
    })
}

let usernameForm = document.querySelector(".miro-input-field.username-input");
if (usernameForm){
    usernameForm.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            validate();
            return false;
        }
    });
}