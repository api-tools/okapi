// @ts-ignore
import _ from "underscore";
import { reactive } from "vue";
import TabContent from "../components/TabContent.vue";

export const TabContainer = reactive({
    count: 0,
    tabs: [],
    activeTab: "",
    getTabById(tabId: any) {
        return _.find(this.tabs, (element: { id: any; }) => {
            return element.id === tabId
        })
    },
    setActiveTab(id: string) {
        this.activeTab = id
    },
    hasTab(data: { id: string; }) {
        return _.find(this.tabs, (element: { id: string; }) => {
            return element.id === data.id
        })
    },
    addTab(data: { id: string; url: string; name: string }) {
        const newTab = {
            id: data.id,
            name: data.name,
            component: TabContent,
            url: data.url
        };

        // @ts-ignore
        this.tabs.push(newTab);
        this.activeTab = data.id;
    },
    closeTab(id: string) {
        this.tabs = _.without(this.tabs, _.findWhere(this.tabs, {
            id: id
        }));
    }
});
