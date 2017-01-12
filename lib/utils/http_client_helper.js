export const HttpClientHelper = function() {
	this.get = (url, callback) => {
		let HttpRequest = new XMLHttpRequest();
		HttpRequest.onreadystatechange = () => {
			if (HttpRequest.readyState == 4 && HttpRequest.status == 200) {
				callback(HttpRequest.responseText);
    	}
    }
    
    HttpRequest.open("GET", url, true );            
    HttpRequest.send( null );
	}
}
