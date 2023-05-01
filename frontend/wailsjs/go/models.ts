export namespace main {
	
	
	
	export class ResponseError {
	    type: string;
	    description: string;
	
	    static createFrom(source: any = {}) {
	        return new ResponseError(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.description = source["description"];
	    }
	}
	export class ResponseData {
	    responseStatusCode: number;
	    responseHttpStatus: string;
	    responseBody: string;
	    responseHeaders: {[key: string]: string[]};
	
	    static createFrom(source: any = {}) {
	        return new ResponseData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.responseStatusCode = source["responseStatusCode"];
	        this.responseHttpStatus = source["responseHttpStatus"];
	        this.responseBody = source["responseBody"];
	        this.responseHeaders = source["responseHeaders"];
	    }
	}
	export class Response {
	    responseData?: ResponseData;
	    responseError?: ResponseError;
	
	    static createFrom(source: any = {}) {
	        return new Response(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.responseData = this.convertValues(source["responseData"], ResponseData);
	        this.responseError = this.convertValues(source["responseError"], ResponseError);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	

}

