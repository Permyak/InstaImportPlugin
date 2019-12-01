let igIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="48px" height="48px"><path fill="#8585cc" d="M30.5,38.5c4.418,0,8-3.582,8-8v-21c0-4.418-3.582-8-8-8h-21c-4.418,0-8,3.582-8,8v21 c0,4.418,3.582,8,8,8H30.5z"/><path fill="#8d8dd8" d="M3.4,4.331C2.217,5.726,1.5,7.528,1.5,9.5v21c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8v-21 c0-0.503-0.052-0.992-0.141-1.469C32.135,4.22,24.832,2,17,2C12.229,2,7.657,2.832,3.4,4.331z"/><path fill="#bd82f4" d="M1.505,9.404C1.504,9.437,1.5,9.468,1.5,9.5v21c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8V12.897 C32.439,8.56,25.021,6,17,6C11.465,6,6.22,7.226,1.505,9.404z"/><path fill="#ed73f4" d="M1.5,13.88V30.5c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8V17.981C32.724,13.013,25.217,10,17,10 C11.394,10,6.124,11.414,1.5,13.88z"/><path fill="#f97dcd" d="M17,14c-5.705,0-11.014,1.664-15.5,4.509V30.5c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8v-6.935 C33.194,17.698,25.534,14,17,14z"/><path fill="#fc9c95" d="M17,18c-5.861,0-11.237,2.033-15.5,5.411V30.5c0,4.418,3.582,8,8,8h21c4.418,0,8-3.582,8-8v-0.238 C34.143,22.925,26.152,18,17,18z"/><path fill="#ffac99" d="M17,22c-6.145,0-11.66,2.651-15.5,6.859V30.5c0,4.418,3.582,8,8,8h21c2.465,0,4.668-1.117,6.136-2.87 C33.648,27.674,25.999,22,17,22z"/><path fill="#ffc49c" d="M30.5,38.5c0.957,0,1.87-0.177,2.721-0.485C31.087,31.065,24.649,26,17,26 c-6.186,0-11.592,3.309-14.566,8.248C3.778,36.777,6.437,38.5,9.5,38.5H30.5z"/><path fill="#ffde8d" d="M17,30c-5.137,0-9.573,2.984-11.684,7.309C6.535,38.06,7.964,38.5,9.5,38.5h19.683 C27.35,33.542,22.595,30,17,30z"/><path fill="#fff69f" d="M17,34c-3.319,0-6.193,1.813-7.753,4.487C9.332,38.49,9.415,38.5,9.5,38.5h15.26 C23.203,35.818,20.324,34,17,34z"/><path fill="#8b75a1" d="M31,2c3.86,0,7,3.14,7,7v22c0,3.86-3.14,7-7,7H9c-3.86,0-7-3.14-7-7V9c0-3.86,3.14-7,7-7H31 M31,1H9 C4.582,1,1,4.582,1,9v22c0,4.418,3.582,8,8,8h22c4.418,0,8-3.582,8-8V9C39,4.582,35.418,1,31,1L31,1z"/><path fill="#fff" d="M27.5 11A1.5 1.5 0 1 0 27.5 14A1.5 1.5 0 1 0 27.5 11Z"/><path fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" d="M20 14A6 6 0 1 0 20 26A6 6 0 1 0 20 14Z"/><path fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" d="M33,14.5c0-4.142-3.358-7.5-7.5-7.5 c-2.176,0-8.824,0-11,0C10.358,7,7,10.358,7,14.5c0,2.176,0,8.824,0,11c0,4.142,3.358,7.5,7.5,7.5c2.176,0,8.824,0,11,0 c4.142,0,7.5-3.358,7.5-7.5C33,23.324,33,16.676,33,14.5z"/></svg>';

const postSize = 160;


miro.onReady(() => {
  miro.initialize({
    extensionPoints: {
      toolbar: {
        title: 'Instagram Import', 
        toolbarSvgIcon: igIcon,
        librarySvgIcon: igIcon,
        onClick: function () {
          miro.board.ui.openModal('modal.html', { width: 400, height: 150 });          
        }
      }
    }
  });
  miro.addListener(miro.enums.event.SELECTION_UPDATED, onSelectionChange)
})

function onSelectionChange(e) {
    checkSelection(e.data)
}

function checkSelection(selectedWidgets) {
  if (selectedWidgets.length === 1 
    && selectedWidgets[0].type === "IMAGE"
    && selectedWidgets[0].metadata[APP_ID]){

    if (selectedWidgets[0].metadata[APP_ID].isDownArrow){
      if (getIgUserContent){
        getIgUserContent(selectedWidgets[0].metadata[APP_ID], showIgUserContent);
      }
    } else if (selectedWidgets[0].metadata[APP_ID].isRefreshButton){
      refreshCard(selectedWidgets[0].metadata[APP_ID].igUserName);
    } else if (selectedWidgets[0].metadata[APP_ID].isPostImage){
      let data = selectedWidgets[0].metadata[APP_ID].data;
      let igPostData = {
        imgUrl: data.display_url,
        time: data.taken_at_timestamp,
        comment: data.edge_media_to_caption.edges[0].node.text
      }
      localStorage.setItem('currentIgPostData', JSON.stringify(igPostData))
      miro.board.ui.openModal('postDetailsPopup.html', { width: 450, height: 300 });      
    }
  }
}

function refreshCard(username){
  getIgUserInfo(username, showIgUserInfoFromBoard);
}

function isDownArrowWidget(widget) {
    return widget.metadata[APP_ID] && widget.metadata[APP_ID].isDownArrow;
}

function isUserIdWidget(widget, userID) {
    return widget.metadata[APP_ID] && widget.metadata[APP_ID].igUserID === userID;
}

function getIgPost(url, x, y, userName, metaData){
  return {
      type: 'IMAGE',
      x: x,
      y: y,
      url: url,
      capabilities: {
          //editable: false
      },
      metadata: {
          [APP_ID]: {
              isPostImage: true,
              igUserName: userName,
              data: metaData
          },
      }
  }
}

function generateIgPosts(posts, baseShape, downArrow, pageInfo){
  let widgets = [];
  for (var i = 0; i < posts.length / 3  ; i++) {
    for (var j = 0; j < 3 && j + i * 3 < posts.length ; j++) {
      let post = posts[ i * 3 + j ].node;
      if (post.display_url){
        widgets.push(getIgPost(
          post.display_url, 
          (j-1) * (postSize + 40), 
          (i + 1/2) * (postSize + 20) - 10 + baseShape.bounds.height, 
          downArrow.metadata[APP_ID].igUserName,
          post)
        );
      }
    }
  }

  let heightDelta = Math.ceil(posts.length / 3) * (postSize +20);

  miro.board.widgets.create(widgets).then(wdgts => {
    let updWidgets = []
    // Image scale isn't working.
    for (var k = 0; k < wdgts.length; k++){
      let imgHeight = posts[k].node.dimensions.height;
      let imgWidth = posts[k].node.dimensions.width;
      let size = imgHeight > imgWidth ? imgHeight : imgWidth;
      updWidgets.push({
        id: wdgts[k].id,
        scale: postSize / size
      });      
    }

    updWidgets.push({
      id: baseShape.id,
      height: baseShape.bounds.height + heightDelta,
      y: baseShape.bounds.y + heightDelta / 2,
      style:{
        shapeType: 3
      }
    })

    if (pageInfo.has_next_page){
      let metaInfo = downArrow.metadata[APP_ID];
      metaInfo.end_cursor = pageInfo.end_cursor;

      updWidgets.push({
        id: downArrow.id,
        y: downArrow.bounds.y + heightDelta,
        metadata: {
            [APP_ID]: metaInfo
        }
      });
    } else {
      miro.board.widgets.deleteById([downArrow.id]);
    }

    miro.board.widgets.update(updWidgets).then(updtwdgts => {
      updtwdgts.pop();
      if (pageInfo.has_next_page){
        updtwdgts.pop();
      }
      let xDelta = baseShape.bounds.x;
      let yDelta = baseShape.bounds.top;
      if (xDelta || yDelta){
          miro.board.widgets.transformDelta(wdgts.map(widget => widget.id), xDelta, yDelta)
      }                     
    })
  });
}

function showIgPosts(posts, userID, pageInfo){
  miro.board.widgets.get({type: 'shape'}).then(shapes => {
    let baseShapeExisted = shapes.filter(shape => isBaseShapeWidget(shape) && isUserIdWidget(shape, userID));
    if (baseShapeExisted && baseShapeExisted.length){
      miro.board.widgets.get({type: 'image', url:doubleArrowURL }).then(images => {
        let downArraw = images.filter(image => isDownArrowWidget(image) && isUserIdWidget(image, userID));
        if (downArraw && downArraw.length){
          generateIgPosts(posts, baseShapeExisted[0], downArraw[0], pageInfo);
        }
      });
    } else {
      console.log('Base card for userID = ' + userID + ' is not finded');    
    }    
  }); 
}

function showIgUserContent(userContent, userID){
    if (userContent && userContent.status==='ok' && miro){
      let pageInfo = userContent.data.user.edge_owner_to_timeline_media.page_info;
      showIgPosts(userContent.data.user.edge_owner_to_timeline_media.edges, userID, pageInfo);
    }
}