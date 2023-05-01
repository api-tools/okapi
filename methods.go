package main

import (
	"encoding/json"
	"errors"
	"gopkg.in/yaml.v3"
	"io"
	"log"
	"net/http"
	"os"
)

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

func (a *App) LoadConfig() Config {
	// Load the configuration file
	data, err := os.ReadFile("config.yaml")
	if err != nil {
		log.Fatalf("failed to load configuration file: %v", err)
	}

	// Parse the YAML data into the configuration struct
	var config Config
	err = yaml.Unmarshal(data, &config)
	if err != nil {
		log.Fatalf("failed to parse configuration file: %v", err)
	}

	return config
}

func (a *App) SaveConfig(cfg string) {
	var config Config
	err := json.Unmarshal([]byte(cfg), &config)
	if err != nil {
		log.Fatalf("Failed to unmarshal JSON: %v", err)
	}

	// Marshal Go struct into YAML
	yamlData, err := yaml.Marshal(&config)
	if err != nil {
		log.Fatalf("Failed to marshal YAML: %v", err)
	}

	// Write YAML to file
	err = os.WriteFile("config.yaml", yamlData, 0644)
	if err != nil {
		log.Fatalf("Failed to save configuration: %v", err)
	}
}
