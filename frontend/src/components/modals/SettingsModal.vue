<template>
    <div class="modal-settings" v-show="SettingsHandler.isVisible()">
        <div class="modal-bg">
        </div>
        <div class="modal-container wh100pc">
            <div class="modal-window">
                <div class="flex-justify" style="border-bottom: 1px solid var(--col-border)">
                    <div class="pad1 modal-title">
                        <span>{{ SettingsHandler.title }}</span>
                    </div>
                    <div class="pad1">
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" @click="SettingsHandler.close()" class="pointer">
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
                <div class="pad1 txtl">
                    <div class="flex-justify">
                        <div>dark mode</div>
                        <div>
                            <SliderOnOff :state="SettingsHandler.config.DarkMode" @changeState="this.changeDarkMode"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {SettingsHandler} from "@/handlers/modals/SettingsHandler.ts";
import SliderOnOff from "@/components/SliderOnOff.vue";

export default {
    computed: {
        SettingsHandler() {
            return SettingsHandler
        }
    },
    components: {
        SliderOnOff,
        SettingsHandler,
    },
    methods: {
        changeDarkMode(value) {
            SettingsHandler.config.setData({DarkMode: value})
            SettingsHandler.save()
        }
    }
}
</script>
