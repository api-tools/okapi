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
                                                {{ tab.name }}
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
                <div class="flex">LEFT BOTTOM</div>
                <div class="flex">RIGHT BOTTOM</div>
            </div>
        </div>
    </div>
    <div class="modal-error" v-show="ErrorHandler.hasError()">
        <div class="modal-error-bg">
        </div>
        <div class="modal-error-container wh100pc">
            <div class="modal-error-window">
                <div class="flex-justify" style="border-bottom: 1px solid #e3e3e3">
                    <div class="pad1 error-title">
                        <span v-if="ErrorHandler.errorTitle">{{ ErrorHandler.errorTitle }}</span>
                        <span v-else>An error has occurred</span>
                    </div>
                    <div class="pad1">
                        <img src="@/assets/images/ico-close.svg" alt="close" class="error-close" @click="this.closeError()">
                    </div>
                </div>
                <div class="pad1 txtl">
                    {{ ErrorHandler.errorMessage }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from "underscore";
import MenuLeft from "@/components/MenuLeft.vue";
import {ResizeHandler} from "@/handlers/ResizeHandler.ts";
import TabContent from "@/components/TabContent.vue";
import {markRaw} from "vue";
import {TabContainer} from "@/handlers/TabContainer.ts";
import {ErrorHandler} from "@/handlers/ErrorHandler.ts";

export default {
    components: {
        MenuLeft,
        TabContent: markRaw(TabContent),
    },
    data() {
        return {
            ErrorHandler,
            TabContainer,
            resizeHandler: null,
            errorHandler: null,
            temp: 0
        }
    },
    mounted() {
        this.resizeHandler = new ResizeHandler(window.document)
    },
    methods: {
        closeError() {
            ErrorHandler.clearError()
        }
    }
};
</script>

<style>
.bar-url, .bar-method {
    background-color: var(--col-light-one);
}

.bar-method {
    cursor: pointer;
}
</style>
