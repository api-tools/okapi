<template>
    <div class="flex w100 h100">
        <div class="flex-col">
            <div class="wh100pc overflow-hidden h-auto">
                <div class="flex pad1"><span class="font-w-600">okAPI</span></div>
            </div>
            <div class="splitter-horizontal"></div>
            <div class="flex flex-1 overflow-auto">
                <div class="w100">
                    <div class="flex-row">
                        <div id="pane-left-menu" class="flex-col overflow-hidden w20pc">
                            <MenuLeft/>
                        </div>
                        <div class="splitter-vertical h100pc movable container-resizer"
                             data-direction="horizontal"></div>
                        <div id="pane-content" class="split-panes pane flex flex-col w80pc">
                            <div class="flex-col">
                                <div class="wh100pc overflow-hidden h-auto">
                                    <div class="flex">
                                        <div v-for="(tab, index) in TabContainer.tabs" :key="index"
                                             @click="TabContainer.setActiveTab(tab.id)">
                                            <div :class="tab.id === TabContainer.activeTab ? 'active pad05 tab-head' : 'pad05 tab-head'">
                                                <div class="flex-justify">
                                                    <div class="ellipsis">
                                                        {{ tab.name }}
                                                    </div>
                                                    <div class="flex-items-center ico">
                                                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" @click="this.closeTab(tab.id)" class="pointer">
                                                            <g id="Layer_1">
                                                                <title>Layer 1</title>
                                                                <g stroke="null" id="svg_3">
                                                                    <rect stroke="#000000" rx="2" id="svg_1" height="11.15869" width="11.15869"
                                                                          y="2.42066" x="2.42066" fill="none" class="ico-svg" />
                                                                    <path stroke="null" stroke-width="0" id="ico-close" class="ico-svg"
                                                                          d="m11.18281,10.1022l-2.10201,-2.10201l2.10163,-2.10201l-1.08042,-1.08119l-2.10201,2.10201l-2.10201,-2.10201l-1.08042,1.08119l2.10163,2.10201l-2.10201,2.10201l1.08119,1.0808l2.10163,-2.10201l2.10163,2.10201"
                                                                          fill="#000000"/>
                                                                </g>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="splitter-horizontal"></div>
                                <div class="flex flex-1 overflow-auto">
                                    <template
                                            v-if="TabContainer.activeTab && TabContainer.getTabById(TabContainer.activeTab) !== undefined">
                                        <KeepAlive>
                                            <component v-if="TabContainer.activeTab !== ''"
                                                       :key="TabContainer.getTabById(TabContainer.activeTab).id"
                                                       :is="TabContainer.getTabById(TabContainer.activeTab).component"
                                                       :id="TabContainer.getTabById(TabContainer.activeTab).id"
                                                       :url="TabContainer.getTabById(TabContainer.activeTab).url"></component>
                                        </KeepAlive>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="splitter-horizontal"></div>
            <div class="wh100pc overflow-hidden h-auto flex-justify pad1">
                <div class="flex">Collections</div>
                <div class="flex">
                    <span @click="this.showSettings()">Settings</span>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-error" v-show="ErrorHandler.hasError()">
        <div class="modal-bg">
        </div>
        <div class="modal-container wh100pc">
            <div class="modal-window">
                <div class="flex-justify" style="border-bottom: 1px solid #e3e3e3">
                    <div class="pad1 modal-title">
                        <span v-if="ErrorHandler.errorTitle">{{ ErrorHandler.errorTitle }}</span>
                        <span v-else>An error has occurred</span>
                    </div>
                    <div class="pad1">
                        <img src="@/assets/images/ico-close.svg" alt="close" class="modal-close"
                             @click="this.closeError()">
                    </div>
                </div>
                <div class="pad1 txtl">
                    {{ ErrorHandler.errorMessage }}
                </div>
            </div>
        </div>
    </div>
    <div class="modal-import" v-show="ImportHandler.isVisible()">
        <div class="modal-bg">
        </div>
        <div class="modal-container wh100pc">
            <div class="modal-window">
                <div class="flex-justify" style="border-bottom: 1px solid #e3e3e3">
                    <div class="pad1 modal-title">
                        <span>{{ ImportHandler.modalTitle }}</span>
                    </div>
                    <div class="pad1">
                        <img src="@/assets/images/ico-close.svg" alt="close" class="modal-close"
                             @click="this.closeImport()">
                    </div>
                </div>
                <div class="pad1 txtl">
                    {{ ImportHandler.modalMessage }}
                </div>
            </div>
        </div>
    </div>
    <SettingsModal @close="this.closeSettings()" />
</template>

<script>
import _ from "underscore";
import MenuLeft from "@/components/MenuLeft.vue";
import {ResizeHandler} from "@/handlers/ResizeHandler.ts";
import TabContent from "@/components/TabContent.vue";
import {markRaw} from "vue";
import {TabContainer} from "@/handlers/TabContainer.ts";
import {ErrorHandler} from "@/handlers/ErrorHandler.ts";
import {ImportHandler} from "@/handlers/ImportHandler.ts";
import {SettingsHandler} from "@/handlers/modals/SettingsHandler.ts";
import SettingsModal from "@/components/modals/SettingsModal.vue";

export default {
    components: {
        SettingsModal,
        MenuLeft,
        TabContent: markRaw(TabContent),
    },
    data() {
        return {
            ErrorHandler,
            ImportHandler,
            SettingsHandler,
            TabContainer,
            resizeHandler: null,
            errorHandler: null,
            temp: 0
        }
    },
    mounted() {
        this.resizeHandler = new ResizeHandler(window.document)
        SettingsHandler.load()
    },
    methods: {
        closeError() {
            ErrorHandler.clearError()
        },
        closeImport() {
            ImportHandler.closeModalImport()
        },
        closeTab(id) {
            TabContainer.closeTab(id)
        },
        showSettings() {
            SettingsHandler.open()
        },
        closeSettings() {
            SettingsHandler.close()
        }
    }
};
</script>

<style>

</style>
