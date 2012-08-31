function DetailView() {
	var self = Ti.UI.createView();
	
	var name = Ti.UI.createLabel({text:'',color:'#900',size: {height: '16px'}, top: 2, left: 10});
	var image = Titanium.UI.createImageView({top: 30}); 
	var cuisine = Ti.UI.createLabel({text:'',color:'#333', top: 230, left: 10});
	var serves = Ti.UI.createLabel({text:'',color:'#333',top: 230, right: 10});
	var yelds = Ti.UI.createLabel({text:'',color:'#333',top: 250, left: 10});
	var cost = Ti.UI.createLabel({text:'',color:'#333',top: 250, right: 10});
	var ingredients = Ti.UI.createLabel({text:'Ingredients',color:'#000',top: 280, left: 10});

	self.add(name);
	self.add(image);
	self.add(cuisine);
	self.add(serves);
	self.add(yelds);
	self.add(cost);
	self.add(ingredients);
	
	self.addEventListener('itemSelected2', function(e) {
		 	    	    
	    var client = Ti.Network.createHTTPClient({
	    	
	        onload : function(e) {
	        		
	            newData = JSON.parse(this.responseText);
				
				name.text = newData.name;
				cuisine.text = 'Cuisine: '+newData.cuisine;
				serves.text = 'Serves: '+newData.serves;
				yelds.text = 'Yelds: '+newData.yelds;
			 	cost.text = 'Cost: USD'+newData.cost;
			 	
			 	image.image = newData.image;
			 	
			 	var topBase = 280;
			 				 	
			 	for(var i in newData.ingredients) {
			 		topBase = topBase+20;
			 		Ti.API.info('. '+newData.ingredients[i].quantity+' '+newData.ingredients[i].unit+' '+newData.ingredients[i].name);
			        var ings= Ti.UI.createLabel({text:'. '+newData.ingredients[i].quantity+' '+newData.ingredients[i].unit+' '+newData.ingredients[i].name, top: topBase, left: 10});
			        self.add(ings);
			    }
	            
	        },
	        
	        onerror : function(e) {
	        	alert('Não conseguiu acessar a API')
	            return false;
	        },
	        timeout : 10000
	    });
	    client.open("GET", e.url.replace('?','.json?'));
	    client.send();

	});
	
	return self;
};

module.exports = DetailView;
