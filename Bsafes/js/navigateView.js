
var server_addr = 'https://www.openbsafes.com'
var forge = require('node-forge');
var ejse = require ("electron").remote.require('ejs-electron');
var BSON = require('bson');
var remote = require ("electron").remote;

function makeCallNavigate(link)
{
	var href = "javascript:navigateView('" + link + "')";
	console.log(href);
	return href;
}

function navigateView_old(view)
{
	//console.log(view);

	
	const url = require('url');
	const path = require('path');

	if ( view.startsWith("/team/") ) {
		teamId = view.replace("/team/", "")
		view = 'team.ejs'
	} else if ( view.startsWith("/page/") ) {
		itemId = view.replace("/page/", "")
		view = 'page.ejs'
	} else if ( view.startsWith("/box/") ) {
		itemId = view.replace("/box/", "")
		view = 'box.ejs'
	} else if ( view.startsWith("/notebook/p/") ) {
		itemId = view.replace("/notebook/p/", "")
		view = 'notebookPage.ejs'
	} else if ( view.startsWith("/notebook/") ) {
		itemId = view.replace("/notebook/", "")
		view = 'notebook.ejs'
	} else if ( view.startsWith("/folder/p/") ) {
		itemId = view.replace("/folder/p/", "")
		view = 'folderPage.ejs'
	} else if ( view.startsWith("/folder/") ) {
		itemId = view.replace("/folder/", "")
		view = 'folder.ejs'
	} else if ( view.startsWith("/diary/p/") ) {
		itemId = view.replace("/diary/p/", "")
		view = 'diaryPage.ejs'
	} else if ( view.startsWith("/diary/") ) {
		itemId = view.replace("/diary/", "")
		view = 'diary.ejs'
	}

	switch (view) {
		case 'keyEnter.ejs' :
			ejse.data('redirectURL', 'teams.ejs')
			ejse.data('keyHint', 'keyHint')
			break;
		case 'team.ejs' :
			ejse.data('teamId', teamId)
			break;		
		case 'folder.ejs' :
		case 'box.ejs' :
		case 'notebook.ejs' :
		case 'diary.ejs' :
			//ejse.data('initialDisplay', 'contents')
		case 'page.ejs' :
		case 'notebookPage.ejs' :		
		case 'folderPage.ejs' :	
		case 'diaryPage.ejs' :	
			ejse.data('itemId', itemId)			
			break;
		default :
			console.log('err:(navigateView)', view);
			break;
	}


	const remote_win = remote.getCurrentWindow ();

	remote_win.loadURL(url.format({
	    pathname: path.join(__dirname, view),
	    protocol: 'file:',
	    slashes: true
	  }));

}

$('.btnLocal').click(function(e) {
	navigateView('../../Local/views/teams.ejs');
})


function jsonToBinary(json)
{
	return BSON.serialize(json);
}

function insertRow(url, data)
{
	db = remote.getGlobal('sqliteDB');
	blobData = BSON.serialize(data);
    sql = "INSERT INTO teams (url, jsonData) VALUES (?, ?)";
    var stmt = db.prepare(sql);
    stmt.run(url, blobData);
    stmt.finalize();
}