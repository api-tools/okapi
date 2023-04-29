import {reactive} from "vue";

export const ErrorHandler = reactive({
    error: false,
    errorTitle: "",
    errorMessage: "",
    hasError() {
        return this.error
    },
    addError(title: string, text: string) {
        this.error = true
        this.errorTitle = title
        this.errorMessage = text
    },
    clearError() {
        this.error = false
        this.errorTitle = ""
        this.errorMessage = ""
    }
});
