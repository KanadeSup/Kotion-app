<template>
   <div class="min-w-[400px] w-full">
      <SettingItem>
         <template #header> Vault location </template>
         <template #description> Set your vault location to store your data </template>
         <template #input>
            <FileInputText
               input-class="w-60"
               v-model:value="settingValue.vaultPath"
               @change="
                  (value: string) => {
                     handleValueChange('vault-path', value);
                  }
               "
            />
         </template>
      </SettingItem>
   </div>
</template>

<script setup lang="ts">
import FileInputText from "~/components/atoms/FileInputText.vue";
import SettingItem from "./SettingItem.vue";

type SettingValue = {
   vaultPath: string | null;
};
const settingValue = ref<SettingValue>({
   vaultPath: null,
});

const configStore = useConfigStore();
const fileSystemStore = useFileSystemStore();
async function handleValueChange(field: string, value: string) {
   if (field === "vault-path") {
      const isSuccess = await configStore.setPath(value);
      if (isSuccess) {
         await fileSystemStore.fetch();
         await navigateTo('/')
      }
   }
}
onMounted(() => {
   settingValue.value.vaultPath = configStore.vaultPath;
});
</script>
