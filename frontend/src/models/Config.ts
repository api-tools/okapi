export class Config {
    DarkMode: boolean = false

    public setData(data: {DarkMode: boolean}) {
        this.DarkMode = data.DarkMode
    }
}
