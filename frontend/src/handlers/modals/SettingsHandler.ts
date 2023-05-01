import {reactive} from "vue";
import {Config} from "../../models/Config";
import {LoadConfig, SaveConfig} from "../../../wailsjs/go/main/App";

export const SettingsHandler = reactive({
    // config object
    config: new Config(),
    visible: false,
    title: "okAPI settings",

    // Check whether to show or not the modal window
    isVisible() {
        return this.visible
    },

    // Loading config file to object
    load() {
        LoadConfig().then((response) => {
            // response stores the main structure as an object
            this.config.setData(response.Settings)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            this.applyConfiguration()
        })
    },

    save() {
        const data = {
            Settings: this.config
        }
        SaveConfig(JSON.stringify(data)).then(() => {
            // response stores the main structure as an object
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            this.applyConfiguration()
        })
    },

    applyConfiguration() {
        if (this.config.DarkMode) {
            document.documentElement.className = "dark-mode";
        } else {
            document.documentElement.className = "";
        }
    },

    changeDarkMode(value: boolean) {
        this.config.DarkMode = value
    },

    open() {
        this.visible = true
    },

    close() {
        this.visible = false
    },
});
