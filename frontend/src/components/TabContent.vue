<template>
    <div class="flex-col flex-1 overflow-y-auto">
        <div class="flex-col">
            <div>
                <div class="sticky top-0">
                    <div class="flex pad1">
                        <div class="bar-method flex pad05 border-no-right rounded-l">GET</div>
                        <div class="bar-url flex flex-1 border whitespace-nowrap rounded-r padl1">
                            <input type="text" class="url-input flex-1" v-bind:value="url" id="request-url">
                        </div>
                        <div class="flex marl05">
                            <button class="btn-send relative rounded pad05 w5" @click="fetchData()">send</button>
                        </div>
                        <div class="flex marl05">
                            <button class="btn-url-options relative rounded" @click="toggleParams()">&#9881</button>
                        </div>
                    </div>
                </div>
                <div v-show="this.showRequestParams" style="height: 100px;">params</div>
            </div>
            <div class="splitter-horizontal movable container-resizer" data-direction="vertical">&nbsp;</div>
            <div class="pad05 flex-justify">
                <div v-if="this.response && this.response.responseError !== null">
                    <span>Status: <span class="col-blue-light">{{ this.response.httpStatus }}</span></span>
                    <span class="marl1" v-if="this.response.responseSize">Size: <span class="col-blue-light">{{ this.response.responseSize }} B</span></span>
                </div>
                <div>
                    &#x21A9;
                </div>
            </div>
            <div class="splitter-horizontal"></div>
            <div class="flex-col overflow-auto">
                <div class="flex flex-col flex-1">
                    <div class="flex flex-1 h-full flex-nowrap flex-col h-auto">
                        <div class="wh100pc flex-1 flex-col" ref="editor">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from "underscore";
import {defineComponent, readonly} from "vue";
import {Send} from "../../wailsjs/go/main/App.js";
import xmlFormatter from 'xml-formatter'
import {minimalSetup, EditorView} from "codemirror"
import {EditorState} from "@codemirror/state"
import {json} from "@codemirror/lang-json"
import {xml} from "@codemirror/lang-xml"
import {lineNumbers} from "@codemirror/view"
import {foldGutter} from "@codemirror/language"
import {ResizeHandler} from "@/handlers/ResizeHandler.ts";
import {ResponseHandler} from "@/handlers/ResponseHandler.ts";
import {ErrorHandler} from "@/handlers/ErrorHandler.ts";

export default defineComponent({
    components: {},
    props: ['url', 'id'],
    data() {
        return {
            ErrorHandler,
            showRequestParams: false,
            resizerHandler: null,
            responseText: "",
            showResponseHeaders: false,
            contentType: "",
            languageExtension: null,
            contentView: null,
            responseState: null,
            response: null
        }
    },
    methods: {
        detectContentType() {
            const type = this.response.getContentType()
            if (type === 'json') {
                this.responseText = JSON.stringify(JSON.parse(this.response.body), null, 2)
                this.languageExtension = json()
            } else if (type === 'xml') {
                this.responseText = xmlFormatter(this.response.responseBody)
                this.languageExtension = xml()
            } else if (type === 'text') {
                this.responseText = this.response.body
            }
        },
        toggleResponseHeaders() {
            this.showResponseHeaders = !this.showResponseHeaders
        },
        toggleParams() {
            this.showRequestParams = !this.showRequestParams
        },
        fetchData() {
            this.responseState = this.response.STATUS_LOADING
            let requestUrl = document.getElementById('request-url').value
            Send(requestUrl).then((response) => {
                this.response.setResponseData(response)

                if (this.response.error !== null) {
                    this.responseState = this.response.STATUS_LOADING_ERROR
                    ErrorHandler.addError("Response error", this.response.error.type)
                } else {
                    this.detectContentType()
                    this.responseState = this.response.STATUS_LOADED
                }
            }).finally(() => {
                if (this.response.error !== null) {
                    if (this.contentView) {
                        this.contentView.destroy()
                    }
                    return
                }
                if (this.contentView) {
                    this.contentView.destroy()
                }
                const state = EditorState.create({
                    doc: this.responseText,
                    extensions: [
                        minimalSetup,
                        lineNumbers(),
                        foldGutter({
                            openText: "-",
                            closedText: "+"
                        }),
                        this.languageExtension
                    ]
                })

                this.contentView = new EditorView({
                    state: state,
                    parent: this.$refs.editor,
                })
            })
        },
    },
    mounted() {
        this.response = new ResponseHandler()
        this.responseState = this.response.STATUS_INIT
    }
});
</script>

<style lang="less">
.btn-url-options {
  font-size: 1.2rem;
  width: 2.5rem;
  background-color: var(--col-bg-light);
  color: var(--col-txt-gray);
  border: 1px solid var(--col-light);
  cursor: pointer;
}

.btn-url-options:hover {
  background-color: var(--col-bg-light-hover)
}
</style>
