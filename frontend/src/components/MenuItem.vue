<template>
    <div :class="type === 'folder' ? 'tree-folder' : 'tree-request'">
        <div v-if="type === 'folder'">
            <div class="tree-item flex">
                <div>
                    <img src="@/assets/images/ico-folder.svg" alt="folder">
                </div>
                <div class="padl05">
                    {{ name }}
                </div>
            </div>
            <div>
                <div v-if="items && items.length" class="tree-subitem">
                    <MenuItem v-for="(item, index) in items"
                              :key="index"
                              :id="item.Id"
                              :url="item.Url"
                              :name="item.Name"
                              :items="item.Items"
                              :type="item.Type"
                    />
                </div>
            </div>
        </div>
        <div v-else class="tree-item">
            <div>
                <span class="tree-item-request-method">GET</span>
                <span @click="this.dispatchTabRequest(this)">
                    {{ name }}
                </span>
<!--                <span><input type="text"/></span>-->
            </div>
        </div>
    </div>
</template>

<script>
import {TabContainer} from '@/handlers/TabContainer.ts'

export default {
    name: "MenuItem",
    emits: ["dispatchRequest"],
    data() {
        return {
            TabContainer
        }
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: false
        },
        items: {
            default: () => []
        }
    },
    methods: {
        dispatchRequest() {
            TabContainer.count++
            //this.$emit("dispatchRequest", this)
        },
        dispatchTabRequest(item) {
            if (TabContainer.hasTab(item)) {
                TabContainer.setActiveTab(item.id)
            } else {
                TabContainer.addTab(item)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tree-subitem {
  margin-left: 10px;
  border-left: 1px solid var(--col-bg-light-hover);
  padding-left: 1rem;
}

.tree-item {
  padding-top: 0.5rem;
  cursor: pointer;
}

.tree-item-request-method {
  color: var(--col-blue-hover);
  font-weight: 100;
  margin-right: 0.5rem;
  font-size: 0.7rem;
}

</style>
