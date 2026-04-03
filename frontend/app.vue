<template>
  <UApp>
    <!-- Colonne type « app mobile » : plein écran sur téléphone, cadre centré sur grands écrans -->
    <div class="flex min-h-dvh justify-center bg-gradient-to-b from-stone-200/95 to-red-50/40">
      <div
        class="relative w-full max-w-md min-h-dvh bg-white shadow-2xl shadow-red-950/10 ring-1 ring-red-100/90"
      >
        <NuxtPage />
      </div>
    </div>
  </UApp>
</template>
