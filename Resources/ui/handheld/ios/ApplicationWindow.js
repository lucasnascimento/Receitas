function ApplicationWindow() {
	//declare module dependencies
	var MasterView 	= require('ui/common/MasterView'),
		ListView 	= require('ui/common/ListView');
		DetailView 	= require('ui/common/DetailView');
		
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	var masterView 	= new MasterView(),
		listView 	= new ListView();
		detailView 	= new DetailView();
		
	var masterContainerWindow = Ti.UI.createWindow({
		title:'Courses'
	});
	masterContainerWindow.add(masterView);

	listContainerWindow = Ti.UI.createWindow({
	});
	listContainerWindow.add(listView);
	
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Recipe Details'
	});
	detailContainerWindow.add(detailView);
	
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);
	
	masterView.addEventListener('itemSelected', function(e) {
		listView.fireEvent('itemSelected',e);
		navGroup.open(listContainerWindow);
	});
	
	listView.addEventListener('itemSelected2', function(e) {
		detailView.fireEvent('itemSelected2',e);
		navGroup.open(detailContainerWindow);
	});

	return self;
};

module.exports = ApplicationWindow;
