// @ts-ignore
import _ from "underscore";
import {isNumber} from "util";

export class ResponseHandler {
    protected headers: any;
    protected body: any;
    protected statusCode: any;
    protected httpStatus: any;
    protected responseSize: any;
    protected error: any;

    STATUS_INIT: number = 0;
    STATUS_LOADING: number = 1;
    STATUS_LOADING_ERROR: number = 2;
    STATUS_LOADED: number = 3;

    public setResponseData(data: {responseData: any, responseError: any}) {
        console.log(data.responseData)
        if (data.responseData !== null) {
            this.headers = _.mapObject(data.responseData.responseHeaders, (value: any[], key: any) => {
                return value.join(",")
            })
            this.body = data.responseData.responseBody
            this.statusCode = data.responseData.responseStatusCode
            this.httpStatus = data.responseData.responseHttpStatus
            if (this.headers['Content-Length']) {
                this.responseSize = this.headers['Content-Length']
            } else {
                this.responseSize = this.body.length
            }
        }
        this.error = data.responseError
    }

    public getContentType(): string {
        // Check if the header defines content as json
        if (_.isMatch(this.headers, {'Content-Type': 'application/json'})) {
            return 'json'
        }

        // If there is no Content-Type application/json header, check parsing
        if ((this.body.startsWith('{') || this.body.startsWith('[')) && JSON.parse(this.body)) {
            return 'json'
        }

        // Check if the header defines content as xml
        if (_.isMatch(this.headers, {'Content-Type': 'application/xml'}) ||
            _.isMatch(this.headers, {'Content-Type': 'text/xml'}) ||
            (this.body.startsWith('<?xml') && new window.DOMParser().parseFromString(this.body, "application/xml"))
        ) {
            return 'xml'
        }

        return 'text'
    }
}
