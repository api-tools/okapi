<template>
    <div class="pad05 flex menu-left-buttons">
        <div class="marr05">Collections</div>
<!--        <img class="ico" src="@/assets/images/ico-load.svg" alt="load collection" />-->
        <div @click="this.loadCollection()" class="menu-left-button">New</div>
        <div @click="this.showImport()" class="menu-left-button">Import</div>
    </div>
    <div class="padl1 padt1" style="border-top: 1px solid var(--col-bg-light)" v-if="this.collectionStructure">
        <MenuItem v-for="(item, index) in this.collectionStructure" v-if="this.collectionStructure.length"
                  :key="index"
                  :id="item.Id"
                  :url="item.Url"
                  :name="item.Name"
                  :items="item.Items"
                  :type="item.Type"
        />
    </div>
</template>

<script>
import {LoadCollection} from "../../wailsjs/go/main/App.js";
import MenuItem from "@/components/MenuItem.vue";
import {ImportHandler} from "@/handlers/ImportHandler.ts";

export default {
    components: {
        ImportHandler,
        MenuItem
    },
    data() {
        return {
            collectionName: "",
            collectionStructure: [],
        }
    },
    mounted() {
        this.loadCollection()
    },
    methods: {
        loadCollection() {
            LoadCollection().then((response) => {
                // response stores the main structure as an object
                this.collectionName = response.Name
                this.collectionStructure = response.Structure
            }).catch((err) => {
                console.log(err)
            })
        },
        showImport() {
            ImportHandler.visible = true
        }
    }
}
</script>
