<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import honoLogo from "./assets/hono.png";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import LoveIcon from "./icons/LoveIcon.svelte";
  import DenoLogo from "./assets/Deno_2021.svg";
  import tailwindLogo from "./assets/tailwind.svg";
  import ZasiferIcon from "./icons/ZasiferIcon.svelte";

  let files = {
    accepted: [],
    rejected: [],
  };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;

    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }
</script>

<div id="container" class="bg-white min-w-screen min-h-screen relative isolate">
  <Dropzone on:drop={handleFilesSelect} noClick>
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>

    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div id="logo-container" class="relativeflex items-center justify-center mb-5">
        <Dropzone on:drop={handleFilesSelect} noDrag>
          <ZasiferIcon class="w-10 text-black hover:scale-125 ease-in-out duration-100" />
          <ZasiferIcon class="w-10 text-black absolute animate-ping opacity-40 -z-10" />
        </Dropzone>
      </div>

      <div class="flex justify-center">
        <div
          class="relative flex gap-1 rounded-full px-3 py-1 text-sm leading-6 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-800/20"
        >
          Made with <LoveIcon class="w-4 text-red-600" /> by Fariz in
          <a href="/" class="font-semibold text-indigo-600">Surabaya</a>
        </div>
      </div>

      <div
        class="flex flex-wrap items-center justify-center gap-1 mt-2 text-gray-800 text-sm"
      >
        <span class="text-gray-500 mr-2 text-xs">Version 1.0</span>
        <span class="mr-1">Build with</span>
        <a href="https://deno.land/">
          <img class="h-7 w-auto" src={DenoLogo} alt="Deno Logo" />
        </a>
        <a href="https://hono.dev/">
          <img class="h-7 w-auto" src={honoLogo} alt="Hono Logo" />
        </a>
        <a href="https://svelte.dev/">
          <img class="h-6 w-auto" src={svelteLogo} alt="Svelte Logo" />
        </a>
        <a href="https://svelte.dev/">
          <img class="h-6 w-auto ml-1" src={tailwindLogo} alt="Tailwind Logo" />
        </a>
      </div>

      <div class="mt-10">
        <ol>
          {#each files.accepted as item}
            <li>{item.name}</li>
          {/each}
        </ol>
      </div>
    </div>

    <div
      class="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>
  </Dropzone>
</div>
