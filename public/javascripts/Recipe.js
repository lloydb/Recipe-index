/*
	RecipeView - functions to manipulate and display Views
*/

function Recipe(){
	  //ltkTrace("Recipe:()" );
		// Public properties
		this.recipes;					// The set of currently selected nodes
		this.dom;


		// Public method pointers
		this.query = query;
		this.queryRender = queryRender;
		this.renderResults = renderResults;
		this.total = total;
		this.selfTest = selfTest;

		window.status="Loading RecipeIndex, please wait..."
		this.dom=loadXML(LB_RECDIR + "Recipe.xml");
		if (isNull(this.dom)) return null;
		this.dom.setProperty('SelectionLanguage', 'XPath');
		window.status="Loading RecipeIndex...OK"
		//
		//   Get values from form, do a query and render the results
		//																		
		function queryRender() {
				var searchResults=document.getElementById("searchResults");
				this.query(rqName.value);
				searchResults.innerHTML=this.renderResults();
		}
		function query(keywords) {
			  try {
       		 ltkTrace("Recipe:query(" + keywords + ")");
					 var aKeyword = new Array();
					 var keyword="";
					 var xpathFilter=""

					 aKeyword = keywords.split(" ");		 	 // Put keywords into an array
					 var i=0;
//									     "translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')," +

					 for (i in aKeyword) {
  					 if (aKeyword[i] != "") {
						 		if (xpathFilter == "") {
									 xpathFilter="contains(" +
									     "translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')," +
											 "'" + aKeyword[i] + "')";
								}
								else {
									 xpathFilter+=" and contains(" +
									     "translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')," +
											 "'" + aKeyword[i] + "')";
								}
						 }
					 }
					 //alert(xpathFilter);
        	 this.recipes = this.dom.selectNodes("/dataroot/qRecipe_web" +
        				"[" + xpathFilter + "]");
	    		 //ltkTrace("Recipe:query(ok)");
					 return true;
        }
        catch(err) {
        	 ltkErrorAlert("Recipe:query() ERROR", err);
					 return false;
    		}
		}
		function total() {
				this.recipes = this.dom.selectNodes("/dataroot/qRecipe_web");
				return this.recipes.length;
		}
		
		function renderResults() {
			  try {
       		  //ltkTrace("Recipe:renderResults()");
        		var html="";

        		html="<table width=100%>"

      			html+="<tr bgcolor=#ffff99 >"
        		//html+="<th align=left>ID</th>"
        		html+="<th align=left>Category</th>"
        		html+="<th align=left>Recipe</th>"
        		html+="<th align=left>Location</th>"
      			html+="</tr>"

       		  //ltkTrace("Recipe:renderResults() - looping through " + this.recipes.length + " results");
        		for (var i=0; i < this.recipes.length; i++) {
      					html+="<tr>"
      					//html+="<td>"
        				//html+=xmlGetNodeValue(this.recipes[i],"ID");
      					//html+="</td>"
      					html+="<td>"
        				html+=xmlGetNodeValue(this.recipes[i],"MainCategory");
      					html+="</td>"
      					html+="<td>"
        				html+=xmlGetNodeValue(this.recipes[i],"Recipe");
      					html+="</td>"
      					html+="<td>"
        				href=xmlGetNodeValue(this.recipes[i],"href");
					if (href != null) {
						html+="<a href=" + href + " target=recipe>";
        					html+=xmlGetNodeValue(this.recipes[i],"PubPage");
						html+="</a>"
					} else {
        					html+=xmlGetNodeValue(this.recipes[i],"PubPage");
					}
      					html+="</td>"
      					html+="</tr>"
        		}
       		  //ltkTrace("Recipe:renderResults() - looping OK");
						//ltkStatus("Found " + this.recipes.length + " recipes");
       		  //ltkTrace("Recipe:renderResults(ok)");
					  return html;
        }
        catch(err) {
        	 ltkErrorAlert("Recipe:renderResults() ERROR", err);
					 return false;
    		}
		}
	
		//
		//	ojName is the name of the instance of this object - used for form fields
		//
		function selfTest() {
			  try {
       		 //ltkTrace("LocationView:selfTest()");
					 var results="";
					 results+="<div id=lvResults></div>"
					 //results += this.render();
       		 //ltkTrace("LocationView:selfTest(ok)");
					 return results;
        }
        catch(err) {
        	 ltkErrorAlert("LocationView:selfTest() ERROR", err);
					 return false;
    		}
		}

	  //ltkTrace("Recipe:() OK" );
}