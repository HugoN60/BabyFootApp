<template>
  <UApp>
    <!-- Colonne type « app mobile » : plein écran sur téléphone, cadre centré sur grands écrans -->
    <div class="flex min-h-dvh justify-center bg-stone-200/90">
      <div
        class="relative w-full max-w-md min-h-dvh bg-white shadow-2xl shadow-stone-300/50 ring-1 ring-stone-200/80"
      >
        <NuxtPage />
      </div>
    </div>
  </UApp>
</template>
