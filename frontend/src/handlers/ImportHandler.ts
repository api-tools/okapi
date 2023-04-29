import {reactive} from "vue";

export const ImportHandler = reactive({
    visible: false,
    modalTitle: "Import collection",
    modalMessage: "",
    isVisible() {
        return this.visible
    },
    showModalImport(title: string, text: string) {
        this.visible = true
        this.modalTitle = title
        this.modalMessage = text
    },
    closeModalImport() {
        this.visible = false
        this.modalMessage = ""
    }
});
