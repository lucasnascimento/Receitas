function ListView() {

	var self = Ti.UI.createView();
		
	self.addEventListener('itemSelected', function(e) {
		
	    var url = "http://api.pearson.com/kitchen-manager/v1/courses/"+e.id+".json?limit=40&apikey=200c57565155aa31005a74bb41de134a";
	    	    
	    listContainerWindow.title="Recipes: "+e.name;
	    
	    var client = Ti.Network.createHTTPClient({
	    	
	        onload : function(e) {
	
	            newData = JSON.parse(this.responseText);
	
			    var itemList = newData.recipes;
			    var x = 0;
			    
			    tableData = [];
			 
			    for(var i in itemList) {
			        var thisItem = itemList[i];
			        tableData.push({title: thisItem.name, url: thisItem.url, hasChild:true, color: '#000'});
			    }   
				
				var table = Ti.UI.createTableView({
					data:tableData
				});
				self.add(table);
				
				table.addEventListener('click', function(e) {
					self.fireEvent('itemSelected2', {
						url:e.rowData.url
					});
				});
	            
	        },
	        
	        onerror : function(e) {
	        	alert('Não conseguiu acessar a API')
	            return false;
	        },
	        timeout : 10000
	    });
	    client.open("GET", url);
	    client.send();

	});
	
	return self;
};

module.exports = ListView;
