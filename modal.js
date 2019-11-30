const baseShapeWidth = 600;
const baseShapeHeight = 100;
const igLogoWidth = 80;
const igLogoHeight = 80;
const igNameWidth = 200;
const igStatWidth = 150;
const doubleArrowURL = "https://image.flaticon.com/icons/svg/25/25358.svg";
const APP_ID = '3074457347020167168'

window.onload = function() {
  let searchButton = document.querySelector('.search-button');
    if (searchButton){
        searchButton.focus(); 
    }
}

let closeButton = document.querySelector('.close-button');
if (closeButton){
    closeButton.addEventListener('click', () => {
        miro.board.ui.closeModal();
    })
}

let showHideLoading= function(isLoading){
    let loadingElem = document.querySelector('#loading');
    if (loadingElem){
        loadingElem.style.display = isLoading ? "inherit" : "none";
    }
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
        usernameStatusText.style.display = isValid ? "none" : "inherit";
    }
}

function getBaseShape(igUserName, igUserID){
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
        },
        metadata: {
            [APP_ID]: {
                isBaseShape: true,
                igUserName: igUserName,
                igUserID: igUserID
            },
        }
    }
}

function getLogoImage(url, igUserName){
    return {
        type: 'IMAGE',
        x: - baseShapeWidth / 2 + 10 + igLogoWidth / 2,
        y: 0,
        url: url,
        capabilities: {
            editable: false
        },
        metadata: {
            [APP_ID]: {
                igUserName: igUserName,
            },
        }
    }
}

function getDownArrow(url, igUserName, igUserID){
    return {
        type: 'IMAGE',
        x: 0,
        y: + baseShapeHeight * 3 / 8,
        url: url,
        capabilities: {
            editable: false
        },
        metadata: {
            [APP_ID]: {
                isDownArrow: true,
                igUserName: igUserName,
                igUserID: igUserID
            },
        }
    }
}

function getInstNameText(name, igUserName){
    return {
        type: 'shape',
        text: name,
        x: - baseShapeWidth / 2 + 110 + igNameWidth / 2,
        y: + baseShapeHeight * 3 / 16,
        width: igNameWidth,
        height: baseShapeHeight * 3 / 16 * 2,
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
        },
        metadata: {
            [APP_ID]: {
                igUserName: igUserName,
            },
        }
    }
}

function getInstLoginText(name, igUserName){
    return {
        type: 'shape',
        text: name,
        x: - baseShapeWidth / 2 + 110 + igNameWidth / 2,
        y: - baseShapeHeight * 3 / 16,
        width: igNameWidth,
        height: baseShapeHeight * 3 / 16 * 2 ,
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
            editable: false
        },
        metadata: {
            [APP_ID]: {
                igUserName: igUserName,
            },
        }
    }
}

function getInstStatText(name, xIndex, igUserName){
    return {
        type: 'shape',
        text: name,
        x: + baseShapeWidth / 2 - 10 - igStatWidth * (1/2 + xIndex),
        y: - baseShapeHeight * 3 / 16,
        width: igNameWidth,
        height: baseShapeHeight * 3 / 16 * 2,
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
            editable: false
        },
        metadata: {
            [APP_ID]: {
                igUserName: igUserName,
            },
        }
    }
}

function getInstStatValue(name, xIndex, igUserName){
    return {
        type: 'shape',
        text: name,
        x: + baseShapeWidth / 2 - 10 - igStatWidth * (1/2 + xIndex),
        y: + baseShapeHeight * 3 / 16,
        width: igNameWidth,
        height: baseShapeHeight * 3 / 16 * 2,
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
            editable: false
        },
        metadata: {
            [APP_ID]: {
                igUserName: igUserName,
            },
        }
    }
}

function isBaseShapeWidget(widget) {
    return widget.metadata[APP_ID] && widget.metadata[APP_ID].isBaseShape;
}

function isUserWidget(widget, username) {
    return widget.metadata[APP_ID] && widget.metadata[APP_ID].igUserName === username;
}

function updateCardForUser(userInfo, xDelta, yDelta) {
    miro.board.widgets.get().then(shapes => {
        userShapes = shapes.filter(shape => isUserWidget(shape, userInfo.username));        
        miro.board.widgets.deleteById(userShapes.map(userShape => userShape.id)).then(data => {            
            createCardForUser(userInfo, xDelta, yDelta);  
        })
    })
}

function createCardForUser(userInfo, xDelta, yDelta) {
    let widgets = [];
    widgets.push(getBaseShape(userInfo.username, userInfo.id));
    widgets.push(getLogoImage(userInfo.profile_pic_url_hd, userInfo.username));                
    widgets.push(getDownArrow(doubleArrowURL, userInfo.username, userInfo.id));
    widgets.push(getInstNameText(userInfo.full_name, userInfo.username));
    widgets.push(getInstLoginText('@' + userInfo.username, userInfo.username));
    widgets.push(getInstStatText('Folowers', 0, userInfo.username));
    widgets.push(getInstStatValue(formatNumberToAverage(userInfo.edge_followed_by ? userInfo.edge_followed_by.count : 0), 0, userInfo.username));
    widgets.push(getInstStatText('Uploads', 1, userInfo.username));
    widgets.push(getInstStatValue(formatNumberToAverage(userInfo.edge_owner_to_timeline_media ? userInfo.edge_owner_to_timeline_media.count : 0), 1, userInfo.username));
    miro.board.widgets.create(widgets).then(wdgts => {
        // Image scale isn't working.
        let logoImg = {
            id: wdgts[1].id,
            scale: igLogoWidth/wdgts[1].bounds.width
        }
        let arrowImg = {
            id: wdgts[2].id,
            scale: 1/25,
            rotation: 90
        }
        miro.board.widgets.update([logoImg, arrowImg]).then(updtwdgts => {
            if (xDelta || yDelta){
                miro.board.widgets.transformDelta(wdgts.map(widget => widget.id), xDelta, yDelta)
            }

            showHideLoading(false);
            miro.board.ui.closeModal();                        
        })
    });
}

function showIgUserInfo(userInfo){
    if (!userInfo){
        setValid(false);
        showHideLoading(false);
    }

    if (userInfo && miro){
        miro.board.widgets.get({type: 'shape'}).then(shapes => {
            let baseShapeExisted = shapes.filter(shape => isBaseShapeWidget(shape) && isUserWidget(shape, userInfo.username));
            if (baseShapeExisted && baseShapeExisted.length){
                if (confirm('This board has card for @' + userInfo.username + '. Do you want refresh it?')) {
                    let baseShapeX = baseShapeExisted[0].bounds.x;
                    let baseShapeY = baseShapeExisted[0].bounds.y;
                    updateCardForUser(userInfo, baseShapeX, baseShapeY);
                } else {
                    showHideLoading(false);
                }
            } else {
                createCardForUser(userInfo);        
            }    
        });        
    }
}

let validate = function(){
    let usernameInput = document.querySelector('.username-input .miro-input');
    let username = usernameInput.value.toLowerCase();
    let regex = RegExp('(@?[A-Za-z0-9._](?:(?:[A-Za-z0-9._]|(?:\.(?!\.))){2,28}(?:[A-Za-z0-9._]))?)');
    let isValid = regex.test(username);
    setValid(isValid);
    if (isValid){
        if (getIgUserInfo){
            showHideLoading(true);
            getIgUserInfo(username.replace(/^@/, ''), showIgUserInfo)
        }
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