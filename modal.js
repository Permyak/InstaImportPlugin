const baseShapeWidth = 600;
const baseShapeHeight = 100;
const igLogoWidth = 80;
const igLogoHeight = 80;
const igNameWidth = 200;
const igStatWidth = 150;

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

function getBaseShape(){
    return {
        type: 'shape',
        x: 0,
        y: 0,
        width: baseShapeWidth,
        height: baseShapeHeight,
        style: {
            shapeType: 7,
            borderColor: "#F0F0F3",
            borderWidth: 2,
            borderOpacity: 20,
            backgroundColor: "#FFFFFF"
        },
        capabilities: {
            editable: false
        }
    }
}

function getLogoImage(url){
    return {
        type: 'shape',
        x: - baseShapeWidth / 2 + 10 + igLogoWidth / 2,
        y: 0,
        width: igLogoWidth,
        height: igLogoHeight,
        style: {
            shapeType: 7,
            backgroundColor: "#827F9B"
        },
        capabilities: {
            editable: false
        }
    }
}

function getInstNameText(name){
    return {
        type: 'shape',
        text: name,
        x: - baseShapeWidth / 2 + 110 + igNameWidth / 2,
        y: + baseShapeHeight * 3 / 16,
        width: igNameWidth,
        //height: igNameWidth,
        style: {
            shapeType: 7,
            backgroundColor: "#FFFFFF",
            backgroundOpacity: 0,
            borderWidth: 0,
            fontSize: 36,
            fontFamily: 10,
            textAlign: 'l',
            textAlignVertical: 'm',
            bold: 1
        },
        capabilities: {
            editable: false
        }
    }
}

function getInstLoginText(name){
    return {
        type: 'shape',
        text: name,
        x: - baseShapeWidth / 2 + 110 + igNameWidth / 2,
        y: - baseShapeHeight * 3 / 16,
        width: igNameWidth,
        //height: igNameWidth,
        style: {
            shapeType: 7,
            backgroundColor: "#FFFFFF",
            backgroundOpacity: 0,
            borderWidth: 0,
            fontSize: 24,
            fontFamily: 10,
            textAlign: 'l',
            textAlignVertical: 'm',
            bold: 1
        },
        capabilities: {
            //editable: false
        }
    }
}

function getInstStatText(name, xIndex){
    return {
        type: 'shape',
        text: name,
        x: + baseShapeWidth / 2 - 10 - igStatWidth * (1/2 + xIndex),
        y: - baseShapeHeight * 3 / 16,
        width: igNameWidth,
        //height: igNameWidth,
        style: {
            shapeType: 7,
            backgroundColor: "#FFFFFF",
            backgroundOpacity: 0,
            borderWidth: 0,
            fontSize: 24,
            fontFamily: 10,
            textAlign: 'c',
            textAlignVertical: 'm',
            bold: 1
        },
        capabilities: {
            //editable: false
        }
    }
}

function getInstStatValue(name, xIndex){
    return {
        type: 'shape',
        text: name,
        x: + baseShapeWidth / 2 - 10 - igStatWidth * (1/2 + xIndex),
        y: + baseShapeHeight * 3 / 16,
        width: igNameWidth,
        //height: igNameWidth,
        style: {
            shapeType: 7,
            backgroundColor: "#FFFFFF",
            backgroundOpacity: 0,
            borderWidth: 0,
            fontSize: 24,
            fontFamily: 10,
            textAlign: 'c',
            textAlignVertical: 'm',
            bold: 1
        },
        capabilities: {
            //editable: false
        }
    }
}

let validate = function(){
    let usernameInput = document.querySelector('.username-input .miro-input');
    //let isValid = usernameInput && (usernameInput.value.toLowerCase() === "mirohq" || usernameInput.value.toLowerCase() === "@mirohq");
    let isValid = true;
    setValid(isValid);
    if (true){
        let widgets = []
        widgets.push(getBaseShape());
        widgets.push(getLogoImage('https://scontent-arn2-1.cdninstagram.com/vp/2f6b4b0fac0385a2f77625f9900a3965/5E57E650/t51.2885-19/s320x320/52703034_780107255705290_1686152710996361216_n.jpg?_nc_ht=scontent-arn2-1.cdninstagram.com'));
        widgets.push(getInstNameText('Miro'));
        widgets.push(getInstLoginText('@mirohq'));
        widgets.push(getInstStatText('Folowers', 0));
        widgets.push(getInstStatValue('1,6K', 0));
        widgets.push(getInstStatText('Uploads', 1));
        widgets.push(getInstStatValue('26', 1));
        miro.board.widgets.create(widgets)
        miro.board.ui.closeModal();
    }
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