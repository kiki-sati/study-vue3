<template>
  <div>
    <main class="my-4">
      <header
        class="p-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800 mb-4"
      >
        <UContainer>
          <div class="flex justify-between">
            <NuxtLink to="/">
              <Logo class="w-8 h-8"></Logo>
            </NuxtLink>
            <div class="inline-flex justify-end gap-4 items-center">
              <slot name="actions"></slot>

              <ColorSwicher />
              <UDropdown :items="dropdownItems">
                <UIcon class="w-6 h-6" name="i-heroicons-user-circle"></UIcon>
                <template #profile>
                  <div class="text-left">
                    <p>Signed in as</p>
                    <p
                      class="truncate font-medium text-gray-900 dark:text-white"
                    >
                      {{ data?.user?.email }}
                    </p>
                  </div>
                </template>
              </UDropdown>
            </div>
          </div>
        </UContainer>
      </header>
      <UContainer>
        <slot></slot>
      </UContainer>
    </main>
  </div>
</template>

<script lang="ts" setup>
const { data, signOut } = useAuth();

const dropdownItems = ref([
  [
    {
      label: "Profile",
      slot: "profile",
      disabled: true,
    },
  ],
  [
    {
      label: "Billing",
      icon: "i-heroicons-credit-card",
      click: () => {},
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: handleSignOut,
    },
  ],
]);

async function handleSignOut() {
  await signOut();
}
</script>

<style scoped></style>
