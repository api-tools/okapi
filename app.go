package main

import (
	"context"
	"errors"
	"gopkg.in/yaml.v2"
	"io"
	"log"
	"net/http"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

type ResponseError struct {
	Type        string `json:"type"`
	Description string `json:"description"`
}

func GetErrorType(e error) ResponseError {
	var osError *os.SyscallError
	//var netAddrError *net.AddrError
	//var netDNSError *net.DNSError
	//var netInvalidAddrError *net.InvalidAddrError
	//var netParseError *net.ParseError
	//var netUnknownNetworkError *net.UnknownNetworkError
	//var osSyscallError *os.SyscallError

	var re ResponseError

	if errors.As(e, &osError) {
		re.Type = osError.Syscall
		re.Type = osError.Err.Error()
	}

	return re
}

type Collection struct {
	Name      string           `yaml:"name"`
	Structure []CollectionItem `yaml:"structure"`
}

type CollectionItem struct {
	Id    string           `yaml:"id"`
	Type  string           `yaml:"type"`
	Name  string           `yaml:"name"`
	Url   string           `yaml:"url"`
	Items []CollectionItem `yaml:"items"`
}

// startup is called when the app starts. The context is saved, so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

type ResponseData struct {
	ResponseStatusCode int                 `json:"responseStatusCode"`
	ResponseHttpStatus string              `json:"responseHttpStatus"`
	ResponseBody       string              `json:"responseBody"`
	ResponseHeaders    map[string][]string `json:"responseHeaders"`
}

type Response struct {
	ResponseData  *ResponseData  `json:"responseData"`
	ResponseError *ResponseError `json:"responseError"`
}

func (a *App) Send(url string) Response {
	var r Response
	var rd ResponseData
	var re ResponseError

	resp, err := http.Get(url)
	if err != nil {
		re = GetErrorType(err)
		r.ResponseError = &re
		r.ResponseData = nil

		return r
	} else {
		r.ResponseError = nil
	}
	defer resp.Body.Close()

	rd.ResponseHttpStatus = resp.Status
	rd.ResponseStatusCode = resp.StatusCode

	// We Read the response body on the line below.
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	rd.ResponseHeaders = make(map[string][]string)
	for key, value := range resp.Header {
		rd.ResponseHeaders[key] = value
	}

	// Convert the body to type string
	rd.ResponseBody = string(body)

	r.ResponseData = &rd

	return r
}

func (a *App) LoadCollection() Collection {
	// Load the configuration file
	data, err := os.ReadFile("collection.yaml")
	if err != nil {
		log.Fatalf("failed to load collection file: %v", err)
	}

	// Parse the YAML data into the configuration struct
	var collection Collection
	err = yaml.Unmarshal(data, &collection)
	if err != nil {
		log.Fatalf("failed to parse collection file: %v", err)
	}

	return collection
}
