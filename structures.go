package main

type Config struct {
	Settings Settings `yaml:"settings"`
}

type Settings struct {
	DarkMode bool `yaml:"darkMode"`
}

type ResponseError struct {
	Type        string `json:"type"`
	Description string `json:"description"`
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
