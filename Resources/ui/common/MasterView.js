function MasterView() {

	var self = Ti.UI.createView({
		backgroundColor:'white'
	});

    var url = "http://api.pearson.com/kitchen-manager/v1/courses.json?limit=20&apikey=200c57565155aa31005a74bb41de134a";
    
    var client = Ti.Network.createHTTPClient({
    	
        onload : function(e) {

            newData = JSON.parse(this.responseText);

		    var itemList = newData.results;
		    var x = 0;
		    
		    tableData = [];
		 
		    for(var i in itemList) {
		        var thisItem = itemList[i];
		        tableData.push({title: thisItem.name, catId: thisItem.id, hasChild:true, color: '#000'});
		    }   
			
			var table = Ti.UI.createTableView({
				data:tableData
			});
			self.add(table);
			
			table.addEventListener('click', function(e) {
				self.fireEvent('itemSelected', {
					name:e.rowData.title,
					id:e.rowData.catId
				});
			});
            
        },
        
        onerror : function(e) {
        	alert('Não conseguiu acessar a API')
            return false;
        },
        timeout : 5000
    });
    client.open("GET", url);
    client.send();
	
	return self;
};

module.exports = MasterView;