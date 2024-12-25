<template>
   <div class="flex justify-between items-start">
      <div class="flex flex-col">
         <div class="font-semibold text-md">
            <slot name="header" />
         </div>
         <div class="text-muted-foreground font-light text-sm">
            <slot name="description" />
         </div>
      </div>
      <slot name="input" />
   </div>
</template>